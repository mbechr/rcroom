import urllib.request
from bs4 import BeautifulSoup
import re
import json
import csv
import time
import os
import concurrent.futures

BASE_URL = 'https://uk.ixl.com'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-GB,en;q=0.9',
}

SUBJECT_URLS = {
    'Maths': 'https://uk.ixl.com/maths',
    'English': 'https://uk.ixl.com/english',
    'Science': 'https://uk.ixl.com/science'
}

def fetch_html(url, retries=3, delay=1):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as resp:
                if resp.status == 200:
                    return resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            print(f"[Retry {i+1}/{retries}] Error fetching {url}: {e}")
            time.sleep(delay * (i + 1))
    return None

def discover_grades(subject, subject_url):
    print(f"Discovering grades for {subject} from {subject_url}...")
    html = fetch_html(subject_url)
    if not html:
        print(f"Failed to fetch {subject_url}")
        return []

    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)
    grade_map = {}

    pattern = re.compile(r'^/' + subject.lower() + r'/(reception|year-\d+)$')
    for a in links:
        href = a['href']
        m = pattern.match(href)
        if m:
            slug = m.group(1)
            name = slug.replace('-', ' ').title()
            if slug not in grade_map:
                grade_map[slug] = {
                    'subject': subject,
                    'grade_slug': slug,
                    'grade_name': name,
                    'url': BASE_URL + href
                }

    def sort_key(item):
        slug = item['grade_slug']
        if slug == 'reception':
            return 0
        m = re.search(r'\d+', slug)
        return int(m.group(0)) if m else 99

    sorted_grades = sorted(grade_map.values(), key=sort_key)
    print(f"  Found {len(sorted_grades)} grades for {subject}: {[g['grade_name'] for g in sorted_grades]}")
    return sorted_grades

def parse_grade_page(grade_info):
    url = grade_info['url']
    subject = grade_info['subject']
    grade_name = grade_info['grade_name']
    grade_slug = grade_info['grade_slug']

    print(f"Scraping {subject} - {grade_name} ({url})...")
    html = fetch_html(url)
    if not html:
        print(f"  FAILED to load {url}")
        return {**grade_info, 'categories': [], 'skills_count': 0, 'categories_count': 0}

    soup = BeautifulSoup(html, 'html.parser')

    title = soup.title.string.strip() if soup.title and soup.title.string else f"IXL - {grade_name} {subject}"
    meta_desc_el = soup.find('meta', attrs={'name': 'description'})
    meta_desc = meta_desc_el['content'].strip() if meta_desc_el and 'content' in meta_desc_el.attrs else ""

    categories = []
    total_skills = 0

    cat_divs = soup.find_all('div', class_=re.compile(r'skill-tree-(category|supercategory-category)'))
    for cat_div in cat_divs:
        cat_id = cat_div.get('id', '')
        
        super_name = ""
        super_cat = cat_div.find_parent('div', class_=re.compile(r'skill-tree-supercategory'))
        if super_cat:
            super_h = super_cat.find(['h2', 'h3'], class_=re.compile(r'skill-tree-supercategory-name'))
            if super_h:
                super_name = super_h.get_text(strip=True)

        code_el = cat_div.find('span', class_=re.compile(r'category-code'))
        name_el = cat_div.find('span', class_=re.compile(r'category-name'))
        
        cat_code = code_el.get_text(strip=True).rstrip('.') if code_el else ""
        cat_name = name_el.get_text(strip=True) if name_el else ""

        if not cat_name:
            h2 = cat_div.find(['h2', 'h3', 'div'], class_=re.compile(r'category'))
            if h2:
                cat_name = h2.get_text(strip=True)

        skills = []
        skill_nodes = cat_div.find_all(['li', 'div', 'span'], class_=re.compile(r'skill-tree-skill-node|skill-tree-skill'))
        for s_node in skill_nodes:
            a_link = s_node.find('a', class_=re.compile(r'skill-tree-skill-link|skill-link')) or (s_node if s_node.name == 'a' else None)
            if not a_link:
                continue

            num_el = s_node.find('span', class_=re.compile(r'grades-landing-order-number|skill-tree-skill-number'))
            skill_num = num_el.get_text(strip=True) if num_el else ""

            full_code = f"{cat_code}.{skill_num}" if cat_code and skill_num else (cat_code or skill_num)

            name_span = a_link.find('span', class_=re.compile(r'skill-tree-skill-name|skill-name'))
            skill_name = name_span.get_text(strip=True) if name_span else a_link.get_text(strip=True)

            href = a_link.get('href', '')
            skill_url = BASE_URL + href if href.startswith('/') else href
            
            permacode = a_link.get('data-permacode', '')
            skill_id = a_link.get('data-skill', '') or s_node.get('data-skill', '')
            preview_text = a_link.get('data-preview-text', '')
            screenshot_hash = a_link.get('data-screenshot-version', '')
            screenshot_url = f"https://www.ixl.com/screenshot/{screenshot_hash}.png" if screenshot_hash else ""

            if skill_name:
                skills.append({
                    'id': skill_id,
                    'code': full_code,
                    'permacode': permacode,
                    'name': skill_name,
                    'url': skill_url,
                    'preview_text': preview_text,
                    'screenshot_hash': screenshot_hash,
                    'screenshot_url': screenshot_url,
                    'super_category': super_name,
                    'category_code': cat_code,
                    'category_name': cat_name,
                    'subject': subject,
                    'grade': grade_name,
                    'grade_slug': grade_slug
                })

        if skills:
            total_skills += len(skills)
            categories.append({
                'category_id': cat_id,
                'super_category': super_name,
                'category_code': cat_code,
                'category_name': cat_name,
                'skills_count': len(skills),
                'skills': skills
            })

    print(f"  -> Done {subject} - {grade_name}: {len(categories)} categories, {total_skills} skills.")
    return {
        'subject': subject,
        'grade_slug': grade_slug,
        'grade_name': grade_name,
        'url': url,
        'title': title,
        'description': meta_desc,
        'categories_count': len(categories),
        'skills_count': total_skills,
        'categories': categories
    }

def main():
    print("=== Starting IXL UK Curriculum Full Extraction ===")
    start_time = time.time()

    all_grades = []
    for subject, url in SUBJECT_URLS.items():
        grades = discover_grades(subject, url)
        all_grades.extend(grades)

    print(f"\nTotal grade pages to scrape: {len(all_grades)}")

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        future_to_grade = {executor.submit(parse_grade_page, g): g for g in all_grades}
        for future in concurrent.futures.as_completed(future_to_grade):
            grade_res = future.result()
            results.append(grade_res)

    subject_order = {'Maths': 1, 'English': 2, 'Science': 3}
    def sort_grade_key(item):
        subj_weight = subject_order.get(item['subject'], 99)
        slug = item['grade_slug']
        if slug == 'reception':
            gr_weight = 0
        else:
            m = re.search(r'\d+', slug)
            gr_weight = int(m.group(0)) if m else 99
        return (subj_weight, gr_weight)

    results.sort(key=sort_grade_key)

    flat_skills = []
    for gr in results:
        for cat in gr.get('categories', []):
            for sk in cat.get('skills', []):
                flat_skills.append(sk)

    hierarchy = {}
    for gr in results:
        subj = gr['subject']
        if subj not in hierarchy:
            hierarchy[subj] = {
                'subject': subj,
                'grades_count': 0,
                'skills_count': 0,
                'grades': []
            }
        hierarchy[subj]['grades_count'] += 1
        hierarchy[subj]['skills_count'] += gr['skills_count']
        hierarchy[subj]['grades'].append(gr)

    total_subjects = len(hierarchy)
    total_grades = len(results)
    total_categories = sum(gr['categories_count'] for gr in results)
    total_skills = len(flat_skills)

    summary = {
        'source': 'https://uk.ixl.com',
        'scraped_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'total_subjects': total_subjects,
        'total_grades': total_grades,
        'total_categories': total_categories,
        'total_skills': total_skills,
        'subjects': {
            s: {
                'grades_count': hierarchy[s]['grades_count'],
                'skills_count': hierarchy[s]['skills_count']
            } for s in hierarchy
        }
    }

    os.makedirs('data', exist_ok=True)

    with open('data/ixl_complete_curriculum.json', 'w', encoding='utf-8') as f:
        json.dump(hierarchy, f, ensure_ascii=False, indent=2)

    with open('data/ixl_skills_flat.json', 'w', encoding='utf-8') as f:
        json.dump(flat_skills, f, ensure_ascii=False, indent=2)

    with open('data/ixl_summary.json', 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    # Save to curriculum_data.js for standalone offline execution
    with open('data/curriculum_data.js', 'w', encoding='utf-8') as f:
        f.write('// IXL UK Complete Curriculum Dataset - Apple Edition\n')
        f.write('window.IXL_SUMMARY = ' + json.dumps(summary, ensure_ascii=False) + ';\n')
        f.write('window.IXL_CURRICULUM = ' + json.dumps(hierarchy, ensure_ascii=False) + ';\n')

    csv_file = 'data/ixl_skills.csv'
    with open(csv_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Subject', 'Grade', 'Super Category', 'Category Code', 'Category Name', 'Skill Code', 'Permacode', 'Skill ID', 'Skill Name', 'Question Preview URL', 'URL'])
        for s in flat_skills:
            writer.writerow([
                s['subject'],
                s['grade'],
                s.get('super_category', ''),
                s['category_code'],
                s['category_name'],
                s['code'],
                s['permacode'],
                s['id'],
                s['name'],
                s.get('screenshot_url', ''),
                s['url']
            ])

    elapsed = time.time() - start_time
    print("\n" + "="*50)
    print(f"SCRAPING COMPLETED IN {elapsed:.2f}s!")
    print(f"Total Subjects: {total_subjects}")
    print(f"Total Grades: {total_grades}")
    print(f"Total Categories: {total_categories}")
    print(f"Total Skills Extracted: {total_skills}")
    for s, info in summary['subjects'].items():
        print(f"  - {s}: {info['grades_count']} grades, {info['skills_count']} skills")
    print("Files saved in ./data/:")
    print("  - data/ixl_complete_curriculum.json")
    print("  - data/ixl_skills_flat.json")
    print("  - data/ixl_skills.csv")
    print("  - data/ixl_summary.json")
    print("  - data/curriculum_data.js")
    print("="*50)

if __name__ == '__main__':
    main()
