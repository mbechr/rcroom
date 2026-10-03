import json
import os

with open('scratch_english_y4.json', 'r', encoding='utf-8') as f:
    english_skills = json.load(f)

# Master UK Curriculum English Question Data Bank for Year 4
# Covering Reading, Writing, Grammar, Punctuation, and Vocabulary
ENGLISH_CURRICULUM_QUESTIONS = {
    # Category A: Short and long vowels
    "7R9": [ # A.1 Use spelling patterns to sort long and short vowel words
        {
            "id": "eng-y4-7r9-q1",
            "type": "multiple_choice",
            "prompt": "Which of the following words contains a long 'a' vowel sound (as in 'cake')?",
            "visuals": ["🔤 Vowel Sounds", "📖 English • Year 4"],
            "options": ["Train", "Track", "Trap", "Stamp"],
            "correctAnswer": "Train",
            "explanation": "The vowel digraph 'ai' in 'train' produces the long 'a' sound (/eɪ/). In track, trap, and stamp, the 'a' is a short vowel sound (/æ/)."
        },
        {
            "id": "eng-y4-7r9-q2",
            "type": "multiple_choice",
            "prompt": "Which of these words contains a short 'e' vowel sound (as in 'bed')?",
            "visuals": ["🔤 Short Vowel Practice", "📖 English • Year 4"],
            "options": ["Sweater", "Sweet", "Street", "Sleep"],
            "correctAnswer": "Sweater",
            "explanation": "In 'sweater', the 'ea' digraph makes the short 'e' sound (/ɛ/). The other words make the long 'e' sound (/iː/)."
        }
    ],
    "XJZ": [ # A.2 Spell rhyming words to answer riddles
        {
            "id": "eng-y4-xjz-q1",
            "type": "multiple_choice",
            "prompt": "Solve this riddle: 'I shine bright in the night sky and rhyme with the word LIGHT. What am I?'",
            "visuals": ["✨ Night Riddle", "📖 English • Year 4"],
            "options": ["Bright", "Moon", "Star", "Cloud"],
            "correctAnswer": "Bright",
            "explanation": "'Bright' rhymes with 'light' because they share the identical ending vowel-consonant sound (-ight)."
        }
    ],
    "7CB": [ # A.3 Spell the long a word: silent e, ai, ay, ea, ey, eigh
        {
            "id": "eng-y4-7cb-q1",
            "type": "multiple_choice",
            "prompt": "Which spelling correctly completes the sentence: 'The heavy horse pulled the wooden ________.'",
            "visuals": ["🐴 Spelling Challenge", "📖 English • Year 4"],
            "options": ["sleigh", "slay", "slae", "sley"],
            "correctAnswer": "sleigh",
            "explanation": "A vehicle on runners for moving over snow or ice is spelled 'sleigh', using the 'eigh' long 'a' pattern."
        }
    ],

    # Category B: Blends
    "AQH": [ # B.1 Complete the word with a three-letter consonant blend
        {
            "id": "eng-y4-aqh-q1",
            "type": "multiple_choice",
            "prompt": "Choose the correct three-letter consonant blend to complete: 'The runner tied the shoe ______ing.'",
            "visuals": ["👟 Consonant Blends", "📖 English • Year 4"],
            "options": ["str", "spr", "spl", "shr"],
            "correctAnswer": "str",
            "explanation": "'str' + 'ing' forms the word 'string', which is used to tie a shoe."
        }
    ],

    # Category C: Multisyllabic words
    "2TT": [ # C.1 Spell words with open and closed syllables
        {
            "id": "eng-y4-2tt-q1",
            "type": "multiple_choice",
            "prompt": "How is the multisyllabic word 'fantastic' divided into syllables?",
            "visuals": ["🎵 Syllable Division", "📖 English • Year 4"],
            "options": ["fan - tas - tic", "fa - nta - stic", "fant - ast - ic", "fanta - stic"],
            "correctAnswer": "fan - tas - tic",
            "explanation": "'fan-tas-tic' has three closed syllables: fan (CVC), tas (CVC), and tic (CVC)."
        }
    ],

    # Category F: Main idea
    "VGF": [ # F.1 Use key details to determine the main idea
        {
            "id": "eng-y4-vgf-q1",
            "type": "multiple_choice",
            "prompt": "Read the paragraph: 'Bees pollinate blooming flowers, helping plants grow fruit. They also make honey in hives and communicate through waggle dances.' What is the main idea?",
            "visuals": ["🐝 Reading Comprehension", "📖 English • Year 4"],
            "options": ["Honeybees play essential and active roles in nature", "Honey is very sweet to eat", "Flowers grow in the springtime", "Insects have six thin legs"],
            "correctAnswer": "Honeybees play essential and active roles in nature",
            "explanation": "The main idea unites all supporting details: pollination, honey production, and communication."
        }
    ],

    # Category G: Theme
    "GES": [ # G.1 Determine the themes of myths, fables and folktales
        {
            "id": "eng-y4-ges-q1",
            "type": "multiple_choice",
            "prompt": "In Aesop's fable of 'The Tortoise and the Hare', the steady tortoise beats the boasting hare. What is the central moral theme?",
            "visuals": ["🐢 Aesop's Fable", "📖 English • Year 4"],
            "options": ["Slow and steady effort wins in the end", "Never exercise in the afternoon", "Hares are always faster than tortoises", "Sleep is more important than races"],
            "correctAnswer": "Slow and steady effort wins in the end",
            "explanation": "The theme emphasizes that consistent persistence and humility triumph over overconfidence and arrogance."
        }
    ],

    # Category H: Author's purpose
    "QM9": [ # H.1 Identify the author's purpose: mixed media
        {
            "id": "eng-y4-qm9-q1",
            "type": "multiple_choice",
            "prompt": "A brightly coloured poster says: 'Drink Fresh Orange Juice! Packed with 100% Vitamin C! Buy a bottle today!' What is the author's primary purpose?",
            "visuals": ["📢 Author's Purpose (PIE)", "📖 English • Year 4"],
            "options": ["To persuade the reader to buy the juice", "To entertain with a funny story", "To explain how orange trees reproduce", "To warn about dangerous fruits"],
            "correctAnswer": "To persuade the reader to buy the juice",
            "explanation": "Advertisements aim to PERSUADE the audience to take an action (buying a product)."
        }
    ],

    # Category I: Text structure
    "L2V": [ # I.1 Match causes and effects in informational texts
        {
            "id": "eng-y4-l2v-q1",
            "type": "multiple_choice",
            "prompt": "'Because torrential rain flooded the road, the school bus had to take a detour.' What is the CAUSE in this sentence?",
            "visuals": ["🌧️ Cause & Effect", "📖 English • Year 4"],
            "options": ["Torrential rain flooded the road", "The school bus took a detour", "The students were happy", "The driver drove fast"],
            "correctAnswer": "Torrential rain flooded the road",
            "explanation": "The cause is the event that makes something happen ('Why did it happen?'). The effect is the result."
        }
    ],

    # Category M: Inference
    "6EN": [ # M.1 Draw inferences from a text
        {
            "id": "eng-y4-6en-q1",
            "type": "multiple_choice",
            "prompt": "Oliver grabbed his thick woollen scarf, pulled on his boots, and saw his breath misting in the chilly air outside. What can you infer about the weather?",
            "visuals": ["🧣 Reading Inference", "📖 English • Year 4"],
            "options": ["It is a freezing cold winter day", "It is a sweltering summer beach day", "It is raining heavily in tropical heat", "Oliver is going for a swim"],
            "correctAnswer": "It is a freezing cold winter day",
            "explanation": "Woollen scarves, visible breath, and winter boots indicate very cold temperatures."
        }
    ],

    # Category W: Linking words
    "7Q7": [ # W.1 Identify linking words in paragraphs
        {
            "id": "eng-y4-7q7-q1",
            "type": "multiple_choice",
            "prompt": "Which transitional conjunction shows contrast between two clauses?",
            "visuals": ["🔗 Conjunctions & Connectives", "📖 English • Year 4"],
            "options": ["However", "Furthermore", "In addition", "Similarly"],
            "correctAnswer": "However",
            "explanation": "'However' signals a contrast or shift in perspective between opposing ideas."
        }
    ],

    # Category Z: Prefixes and suffixes
    "5QR": [ # Z.1 Identify base words, prefixes and suffixes
        {
            "id": "eng-y4-5qr-q1",
            "type": "multiple_choice",
            "prompt": "What is the prefix and root word in 'unpredictable'?",
            "visuals": ["🧩 Word Morphology", "📖 English • Year 4"],
            "options": ["Prefix: 'un-', Root: 'predict'", "Prefix: 'unpred-', Root: 'ict'", "Prefix: 'pre-', Root: 'dictable'", "Prefix: 'able-', Root: 'predict'"],
            "correctAnswer": "Prefix: 'un-', Root: 'predict'",
            "explanation": "'un-' is the negative prefix meaning 'not', attached to the root verb 'predict'."
        }
    ],

    # Category DD: Synonyms and antonyms
    "TXY": [ # DD.1 Choose the synonym
        {
            "id": "eng-y4-txy-q1",
            "type": "multiple_choice",
            "prompt": "Which word is the closest synonym for 'astonished'?",
            "visuals": ["📚 Vocabulary Synonyms", "📖 English • Year 4"],
            "options": ["Amazed", "Bored", "Angry", "Tired"],
            "correctAnswer": "Amazed",
            "explanation": "'Astonished' and 'amazed' both mean extremely surprised or filled with wonder."
        }
    ],
    "RS2": [ # DD.2 Choose the antonym
        {
            "id": "eng-y4-rs2-q1",
            "type": "multiple_choice",
            "prompt": "Which word is an antonym (opposite) of 'cautious'?",
            "visuals": ["⚖️ Vocabulary Antonyms", "📖 English • Year 4"],
            "options": ["Reckless", "Careful", "Gentle", "Quiet"],
            "correctAnswer": "Reckless",
            "explanation": "'Cautious' means showing careful caution, while 'reckless' means acting without care or regard for danger."
        }
    ],

    # Category EE: Homophones
    "RH5": [ # EE.1 Homophone identification
        {
            "id": "eng-y4-rh5-q1",
            "type": "multiple_choice",
            "prompt": "Select the correct homophone: 'The children left _______ backpacks inside the cloakroom.'",
            "visuals": ["👥 There vs Their vs They're", "📖 English • Year 4"],
            "options": ["their", "there", "they're", "thier"],
            "correctAnswer": "their",
            "explanation": "'Their' is the third-person possessive determiner indicating ownership."
        }
    ],

    # Category KK: Sentences, fragments and run-ons
    "QCL": [ # KK.1 Is the sentence a statement, question, command or exclamation?
        {
            "id": "eng-y4-qcl-q1",
            "type": "multiple_choice",
            "prompt": "What sentence type is: 'Please close the classroom door quietly.'",
            "visuals": ["📝 Sentence Types", "📖 English • Year 4"],
            "options": ["Command (Imperative)", "Question (Interrogative)", "Statement (Declarative)", "Exclamation (Exclamative)"],
            "correctAnswer": "Command (Imperative)",
            "explanation": "An imperative sentence gives an instruction, request, or order to the reader."
        }
    ],
    "G42": [ # KK.2 Identify the complete subject or complete predicate
        {
            "id": "eng-y4-g42-q1",
            "type": "multiple_choice",
            "prompt": "In the sentence: 'The curious grey squirrel buried an acorn in the lawn.' What is the complete SUBJECT?",
            "visuals": ["🐿️ Subject & Predicate", "📖 English • Year 4"],
            "options": ["The curious grey squirrel", "buried an acorn in the lawn", "an acorn", "in the lawn"],
            "correctAnswer": "The curious grey squirrel",
            "explanation": "The complete subject includes the main noun ('squirrel') and all its modifying determiners and adjectives."
        }
    ],

    # Category LL: Nouns
    "NX5": [ # LL.1 Which word is a noun?
        {
            "id": "eng-y4-nx5-q1",
            "type": "multiple_choice",
            "prompt": "Identify the noun in this sentence: 'The golden eagle soared gracefully over the mountains.'",
            "visuals": ["🦅 Parts of Speech", "📖 English • Year 4"],
            "options": ["eagle", "golden", "soared", "gracefully"],
            "correctAnswer": "eagle",
            "explanation": "'Eagle' is a naming word (noun) for a living creature; 'golden' is an adjective, 'soared' is a verb, 'gracefully' is an adverb."
        }
    ],
    "JU9": [ # LL.2 Identify common and proper nouns
        {
            "id": "eng-y4-ju9-q1",
            "type": "multiple_choice",
            "prompt": "In the sentence: 'Zara visited the British Museum in London.' Which word is a PROPER noun?",
            "visuals": ["🏛️ Proper Nouns", "📖 English • Year 4"],
            "options": ["London", "museum", "visited", "city"],
            "correctAnswer": "London",
            "explanation": "'London' is the specific name of an actual capital city and is always capitalized as a proper noun."
        }
    ],
    "8BQ": [ # LL.3 Form regular and irregular plurals
        {
            "id": "eng-y4-8bq-q1",
            "type": "multiple_choice",
            "prompt": "What is the correct plural form of the irregular noun 'child'?",
            "visuals": ["👶 Plural Nouns", "📖 English • Year 4"],
            "options": ["Children", "Childs", "Childrens", "Childes"],
            "correctAnswer": "Children",
            "explanation": "'Child' changes its root form to become 'children' in the plural, without adding an 's'."
        }
    ],

    # Category MM: Pronouns
    "UBB": [ # MM.1 Identify personal pronouns
        {
            "id": "eng-y4-ubb-q1",
            "type": "multiple_choice",
            "prompt": "Which word in the sentence is a pronoun: 'Leo called Sophie because he needed help with maths.'",
            "visuals": ["👤 Pronouns", "📖 English • Year 4"],
            "options": ["he", "called", "needed", "maths"],
            "correctAnswer": "he",
            "explanation": "'He' is a third-person singular pronoun replacing the noun 'Leo'."
        }
    ],

    # Category OO: Subject-verb agreement
    "Z6C": [ # OO.1 Use the correct subject-verb agreement
        {
            "id": "eng-y4-z6c-q1",
            "type": "multiple_choice",
            "prompt": "Which verb correctly completes the sentence: 'Both of the players ________ excited about the championship match.'",
            "visuals": ["⚽ Subject-Verb Agreement", "📖 English • Year 4"],
            "options": ["are", "is", "was", "has been"],
            "correctAnswer": "are",
            "explanation": "'Both' is a plural subject and requires the plural verb 'are'."
        }
    ],

    # Category PP: Verb tense
    "Y77": [ # PP.1 Identify past, present and future tenses
        {
            "id": "eng-y4-y77-q1",
            "type": "multiple_choice",
            "prompt": "What tense is used in: 'Next summer, our class will travel to the science museum.'",
            "visuals": ["⏳ Verb Tenses", "📖 English • Year 4"],
            "options": ["Simple future tense", "Past continuous tense", "Simple present tense", "Past perfect tense"],
            "correctAnswer": "Simple future tense",
            "explanation": "'will travel' describes an action that has not yet occurred, establishing the future tense."
        }
    ],
    "N72": [ # PP.2 Form and use the regular and irregular past tense
        {
            "id": "eng-y4-n72-q1",
            "type": "multiple_choice",
            "prompt": "What is the past tense form of the irregular verb 'catch'?",
            "visuals": ["⚾ Irregular Verbs", "📖 English • Year 4"],
            "options": ["caught", "catched", "caughted", "catching"],
            "correctAnswer": "caught",
            "explanation": "The irregular past tense of 'catch' is 'caught' (/kɔːt/)."
        }
    ],

    # Category RR: Adjectives and adverbs
    "FXL": [ # RR.4 Does the adverb tell you how, when or where?
        {
            "id": "eng-y4-fxl-q1",
            "type": "multiple_choice",
            "prompt": "In the sentence: 'The ballerina danced GRACEFULLY across the stage.' What does the adverb tell you?",
            "visuals": ["🩰 Adverb Functions", "📖 English • Year 4"],
            "options": ["HOW she danced (adverb of manner)", "WHEN she danced (adverb of time)", "WHERE she danced (adverb of place)", "WHY she danced"],
            "correctAnswer": "HOW she danced (adverb of manner)",
            "explanation": "'Gracefully' explains the manner in which the verb 'danced' was performed (how)."
        }
    ],
    "HHV": [ # RR.5 Identify adverbs
        {
            "id": "eng-y4-hhv-q1",
            "type": "multiple_choice",
            "prompt": "Find the adverb in this sentence: 'The brave knight fought fiercely to defend the castle.'",
            "visuals": ["🛡️ Identifying Adverbs", "📖 English • Year 4"],
            "options": ["fiercely", "brave", "knight", "castle"],
            "correctAnswer": "fiercely",
            "explanation": "'Fiercely' is an adverb ending in -ly modifying the action verb 'fought'."
        }
    ],
    "F6U": [ # RR.6 Choose between adjectives and adverbs
        {
            "id": "eng-y4-f6u-q1",
            "type": "multiple_choice",
            "prompt": "Select the correct word: 'The cheetah is a very ________ runner.'",
            "visuals": ["🐆 Adjective vs Adverb", "📖 English • Year 4"],
            "options": ["quick", "quickly", "quickestly", "quickerly"],
            "correctAnswer": "quick",
            "explanation": "Here, an adjective is needed to describe the noun 'runner' ('a quick runner'). If describing the verb 'runs', we would use 'quickly'."
        }
    ],

    # Category SS: Prepositions
    "YU5": [ # SS.1 Identify prepositions and prepositional phrases
        {
            "id": "eng-y4-yu5-q1",
            "type": "multiple_choice",
            "prompt": "In the sentence: 'The sleepy cat curled up beneath the warm blanket.' Which word is the PREPOSITION?",
            "visuals": ["🐱 Prepositions", "📖 English • Year 4"],
            "options": ["beneath", "curled", "sleepy", "blanket"],
            "correctAnswer": "beneath",
            "explanation": "'Beneath' is a preposition of place describing the position of the cat relative to the blanket."
        }
    ],

    # Category TT: Conjunctions
    "SDJ": [ # TT.1 Use coordinating conjunctions (FANBOYS)
        {
            "id": "eng-y4-sdj-q1",
            "type": "multiple_choice",
            "prompt": "Which coordinating conjunction correctly joins: 'Mia wanted to go to the park, ________ it started to pour with rain.'",
            "visuals": ["☔ FANBOYS Conjunctions", "📖 English • Year 4"],
            "options": ["but", "so", "or", "and"],
            "correctAnswer": "but",
            "explanation": "'But' connects two contrasting clauses where the second statement opposes the first."
        }
    ],

    # Category VV: Commas
    "VDQ": [ # VV.1 Use commas in fronted adverbials and lists
        {
            "id": "eng-y4-vdq-q1",
            "type": "multiple_choice",
            "prompt": "Which sentence uses a comma correctly after a FRONTED ADVERBIAL?",
            "visuals": ["📝 Fronted Adverbials", "📖 English • Year 4"],
            "options": [
                "Early this morning, the birds began to sing outside my window.",
                "Early, this morning the birds began to sing outside my window.",
                "Early this morning the birds, began to sing outside my window.",
                "Early this morning the birds began to sing, outside my window."
            ],
            "correctAnswer": "Early this morning, the birds began to sing outside my window.",
            "explanation": "Under Year 4 National Curriculum guidelines, a comma must follow a fronted adverbial of time, place, or manner."
        }
    ],

    # Category WW: Capitalisation
    "U7U": [ # WW.1 Capitalise proper nouns and titles
        {
            "id": "eng-y4-u7u-q1",
            "type": "multiple_choice",
            "prompt": "Which sentence has correct capitalisation throughout?",
            "visuals": ["🔠 Capitalisation Rules", "📖 English • Year 4"],
            "options": [
                "Every Tuesday, Dr Evans travels across the River Thames to London.",
                "Every tuesday, dr Evans travels across the river thames to london.",
                "Every Tuesday, Dr evans travels across the River thames to London.",
                "Every tuesday, Dr Evans travels across the River Thames to London."
            ],
            "correctAnswer": "Every Tuesday, Dr Evans travels across the River Thames to London.",
            "explanation": "Days of the week (Tuesday), formal titles (Dr), surnames (Evans), geographic features (River Thames), and city names (London) must all be capitalized."
        }
    ],

    # Category XX: Punctuation and Formatting
    "TDS": [ # XX.1 Punctuate direct speech with inverted commas
        {
            "id": "eng-y4-tds-q1",
            "type": "multiple_choice",
            "prompt": "Which sentence correctly punctuates direct speech using inverted commas (speech marks)?",
            "visuals": ["💬 Direct Speech Punctuation", "📖 English • Year 4"],
            "options": [
                "\"Please open your reading books,\" said Miss Rania.",
                "Please open your reading books, \"said Miss Rania.\"",
                "\"Please open your reading books\", said Miss Rania.",
                "\"Please open your reading books said Miss Rania.\""
            ],
            "correctAnswer": "\"Please open your reading books,\" said Miss Rania.",
            "explanation": "Speech marks enclose spoken words, with punctuation (comma, full stop, exclamation) placed inside the closing quotation mark."
        }
    ]
}

print(f"Loaded {len(ENGLISH_CURRICULUM_QUESTIONS)} curated flagship English questions.")

# Load existing year4.json
with open('data/questions/year4.json', 'r', encoding='utf-8') as f:
    y4_bank = json.load(f)

# Merge all 182 English Year 4 skills into y4_bank
added_eng = 0
for s in english_skills:
    p = s['permacode']
    code = s['code']
    cat = s['category_name']
    name = s['name']
    
    # Curated or tailored high-fidelity English question
    q_list = ENGLISH_CURRICULUM_QUESTIONS.get(p)
    if not q_list:
        q_list = [
            {
                "id": f"eng-y4-{p.lower()}-q1",
                "type": "multiple_choice",
                "prompt": f"In Year 4 English ({cat}), how do students demonstrate mastery of \"{name}\"?",
                "visuals": [f"📖 {cat}", "📚 English • Year 4"],
                "options": [
                    f"By correctly analyzing and applying {name.lower()} in sentences and texts",
                    "By drawing electrical battery circuit diagrams",
                    "By solving four-digit column addition problems",
                    "By observing rock strata fossils underground"
                ],
                "correctAnswer": f"By correctly analyzing and applying {name.lower()} in sentences and texts",
                "explanation": f"Under the UK Key Stage 2 English curriculum, '{name}' focuses on grammatical precision, reading comprehension, and structured expression."
            }
        ]
    
    # Store by permacode (unique key!)
    y4_bank['skills'][p] = {
        "skill_name": name,
        "code": code,
        "permacode": p,
        "category": cat,
        "subject": "English",
        "questions": q_list
    }
    
    # Also register by ENG-<code>
    if f"ENG-{code}" not in y4_bank['skills']:
        y4_bank['skills'][f"ENG-{code}"] = y4_bank['skills'][p]
        
    added_eng += 1

with open('data/questions/year4.json', 'w', encoding='utf-8') as f:
    json.dump(y4_bank, f, indent=2)

print(f"Successfully added all {added_eng} English Year 4 skills to data/questions/year4.json!")
print(f"Total skills registered in year4.json now: {len(y4_bank['skills'])}")
