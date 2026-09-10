"""
IXL UK Local Offline Database Query Tool
Query and explore the local SQLite database without any internet connection.

Usage:
  python query_offline.py --search "fractions"
  python query_offline.py --subject Maths --grade "Year 2"
  python query_offline.py --permacode 9QF
  python query_offline.py --stats
"""

import sqlite3
import argparse
import sys
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'ixl_curriculum.db')

def get_db():
    if not os.path.exists(DB_PATH):
        print(f"Error: Database not found at {DB_PATH}")
        sys.exit(1)
    return sqlite3.connect(DB_PATH)

def show_stats():
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute("SELECT COUNT(*) FROM skills")
    total_skills = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM categories")
    total_cats = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM grades")
    total_grades = cur.fetchone()[0]

    print("\n" + "="*50)
    print("  IXL UK LOCAL DATABASE OVERVIEW (100% OFFLINE)")
    print("="*50)
    print(f"  • Total Skills Indexed:     {total_skills:,}")
    print(f"  • Total Curriculum Topics:  {total_cats:,}")
    print(f"  • Total Year Levels:        {total_grades}")
    print("-" * 50)
    
    cur.execute("""
        SELECT subject_name, COUNT(DISTINCT grade_name), COUNT(*) 
        FROM skills 
        GROUP BY subject_name
    """)
    for subj, g_count, s_count in cur.fetchall():
        print(f"  • {subj:8}: {g_count:2} Grades | {s_count:5,} Skills")
    print("="*50 + "\n")
    conn.close()

def search_skills(query=None, subject=None, grade=None, permacode=None, limit=25):
    conn = get_db()
    cur = conn.cursor()
    
    sql = "SELECT subject_name, grade_name, category_code, category_name, skill_code, permacode, skill_name FROM skills WHERE 1=1"
    params = []
    
    if permacode:
        sql += " AND UPPER(permacode) = UPPER(?)"
        params.append(permacode)
    if subject:
        sql += " AND LOWER(subject_name) = LOWER(?)"
        params.append(subject)
    if grade:
        sql += " AND LOWER(grade_name) LIKE LOWER(?)"
        params.append(f"%{grade}%")
    if query:
        sql += " AND (skill_name LIKE ? OR category_name LIKE ? OR skill_code LIKE ?)"
        params.extend([f"%{query}%", f"%{query}%", f"%{query}%"])
        
    sql += f" ORDER BY id ASC LIMIT {limit}"
    
    cur.execute(sql, params)
    rows = cur.fetchall()
    conn.close()
    
    print(f"\nFound {len(rows)} matching skill(s) (capped at {limit}):\n")
    for r in rows:
        subj, gr, cat_code, cat_name, s_code, perma, name = r
        perma_str = f"[{perma}]" if perma else "     "
        code_str = f"{s_code:6}" if s_code else "      "
        print(f"  {subj:7} | {gr:7} | {code_str} | {perma_str:5} | {name}")
    print()

def main():
    parser = argparse.ArgumentParser(description="Query IXL UK Offline Database")
    parser.add_argument("--search", "-s", help="Search by keyword in skill or category")
    parser.add_argument("--subject", help="Filter by subject (Maths, English, Science)")
    parser.add_argument("--grade", "-g", help="Filter by grade (e.g. 'Year 1', 'Reception')")
    parser.add_argument("--permacode", "-p", help="Lookup by 3-letter permacode (e.g. 9QF)")
    parser.add_argument("--stats", action="store_true", help="Show database overview statistics")
    parser.add_argument("--limit", type=int, default=25, help="Limit number of results (default 25)")
    
    args = parser.parse_args()
    
    if args.stats or len(sys.argv) == 1:
        show_stats()
    if args.search or args.subject or args.grade or args.permacode:
        search_skills(args.search, args.subject, args.grade, args.permacode, args.limit)

if __name__ == '__main__':
    main()
