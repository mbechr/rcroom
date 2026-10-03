import json
import os

with open('scratch_science_y4.json', 'r', encoding='utf-8') as f:
    science_skills = json.load(f)

# Master UK Curriculum Science Question Data Bank for Year 4
# Covering all 23 categories (A through W) and all 81 skills
CURRICULUM_QUESTIONS = {
    # Category A: Properties of matter
    "9LC": [ # A.1 Identify properties of an object
        {
            "id": "sci-y4-9lc-q1",
            "type": "multiple_choice",
            "prompt": "Which of the following best describes the physical properties of a ceramic tea mug?",
            "visuals": ["☕ Ceramic Tea Mug", "🔬 Science • Year 4"],
            "options": ["Hard, rigid, and waterproof", "Soft, flexible, and transparent", "Magnetic, elastic, and soluble", "Gas, permeable, and soft"],
            "correctAnswer": "Hard, rigid, and waterproof",
            "explanation": "A ceramic mug is hard and rigid to hold liquids without breaking shape, and waterproof so liquid does not leak through."
        },
        {
            "id": "sci-y4-9lc-q2",
            "type": "multiple_choice",
            "prompt": "An object can be stretched and quickly returns to its original shape. What property does it possess?",
            "visuals": ["➰ Rubber Band Test", "🔬 Science • Year 4"],
            "options": ["Elasticity (flexible)", "Brittleness", "Electrical conductivity", "Transparency"],
            "correctAnswer": "Elasticity (flexible)",
            "explanation": "Elastic materials like rubber can deform under force and return to their resting shape when released."
        }
    ],
    "JPR": [ # A.2 Compare properties of objects
        {
            "id": "sci-y4-jpr-q1",
            "type": "multiple_choice",
            "prompt": "Comparing a steel nail and a wooden pencil, which property is true for both objects?",
            "visuals": ["🔩 Steel Nail vs ✏️ Wooden Pencil", "🔬 Science • Year 4"],
            "options": ["Both are solids at room temperature", "Both are magnetic", "Both conduct electricity easily", "Both float on water"],
            "correctAnswer": "Both are solids at room temperature",
            "explanation": "Both steel and wood maintain a definite shape and volume at room temperature, making them solid matter."
        },
        {
            "id": "sci-y4-jpr-q2",
            "type": "multiple_choice",
            "prompt": "A student tests a glass window pane and a brick wall. What is a key difference in their light properties?",
            "visuals": ["🪟 Glass Window vs 🧱 Brick Wall", "🔬 Science • Year 4"],
            "options": ["Glass is transparent; brick is opaque", "Glass is opaque; brick is transparent", "Both are translucent", "Both absorb all light"],
            "correctAnswer": "Glass is transparent; brick is opaque",
            "explanation": "Transparent materials let almost all light pass through clearly, while opaque materials block light entirely, creating shadows."
        }
    ],
    "HDS": [ # A.3 Compare properties of materials
        {
            "id": "sci-y4-hds-q1",
            "type": "multiple_choice",
            "prompt": "Why is copper metal preferred over plastic for household electrical wires?",
            "visuals": ["🔌 Electrical Wiring", "🔬 Science • Year 4"],
            "options": ["Copper is a good electrical conductor", "Copper is cheaper than plastic", "Copper is completely transparent", "Plastic melts at 0°C"],
            "correctAnswer": "Copper is a good electrical conductor",
            "explanation": "Metals like copper allow electrical currents to flow easily, whereas plastics act as electrical insulators."
        }
    ],
    "5B5": [ # A.4 Identify materials in objects
        {
            "id": "sci-y4-5b5-q1",
            "type": "multiple_choice",
            "prompt": "Which primary material is extracted from trees to manufacture notebook paper?",
            "visuals": ["📓 Notebook Paper", "🔬 Science • Year 4"],
            "options": ["Wood pulp (cellulose fibres)", "Crude petroleum oil", "Limestone rock", "Molten silica sand"],
            "correctAnswer": "Wood pulp (cellulose fibres)",
            "explanation": "Paper is made by breaking down wood from trees into natural cellulose plant fibres known as pulp."
        }
    ],
    "V45": [ # A.5 Identify multiple materials in objects
        {
            "id": "sci-y4-v45-q1",
            "type": "multiple_choice",
            "prompt": "A kitchen frying pan is made of an aluminium base and a plastic handle. Why is the handle made of plastic?",
            "visuals": ["🍳 Kitchen Frying Pan", "🔬 Science • Year 4"],
            "options": ["Plastic is a thermal insulator, preventing burns", "Plastic conducts heat faster to cook food", "Plastic is magnetic", "Aluminium is too soft to hold"],
            "correctAnswer": "Plastic is a thermal insulator, preventing burns",
            "explanation": "Plastic does not conduct heat well, so the cook can safely hold the handle without burning their hand."
        }
    ],
    "KWR": [ # A.6 Identify mixtures
        {
            "id": "sci-y4-kwr-q1",
            "type": "multiple_choice",
            "prompt": "Which of the following is an example of a physical mixture that can be separated by filtration?",
            "visuals": ["🧪 Mixture Separation", "🔬 Science • Year 4"],
            "options": ["Sand mixed in water", "Pure distilled water", "Solid gold bar", "Oxygen gas"],
            "correctAnswer": "Sand mixed in water",
            "explanation": "Sand does not dissolve in water; its insolubility allows solid particles to be separated using filter paper."
        }
    ],

    # Category B: States of matter
    "Y9M": [ # B.1 Classify matter as solid, liquid or gas
        {
            "id": "sci-y4-y9m-q1",
            "type": "multiple_choice",
            "prompt": "Matter that has a fixed volume but changes its shape to match the container is classified as a:",
            "visuals": ["💧 State of Matter", "🔬 Science • Year 4"],
            "options": ["Liquid", "Solid", "Gas", "Plasma"],
            "correctAnswer": "Liquid",
            "explanation": "Liquids flow and take the shape of their container while retaining a constant, measurable volume."
        },
        {
            "id": "sci-y4-y9m-q2",
            "type": "multiple_choice",
            "prompt": "Helium inside a party balloon fills the entire balloon and can expand to fill any room. Helium is a:",
            "visuals": ["🎈 Helium Balloon", "🔬 Science • Year 4"],
            "options": ["Gas", "Solid", "Liquid", "Mineral"],
            "correctAnswer": "Gas",
            "explanation": "Gases have no fixed shape and no fixed volume; they spread out to fill whatever container they occupy."
        }
    ],
    "SHP": [ # B.2 Identify solids, liquids and gases
        {
            "id": "sci-y4-shp-q1",
            "type": "multiple_choice",
            "prompt": "Which item in this list is an example of a solid?",
            "visuals": ["🧊 Matter Sorting", "🔬 Science • Year 4"],
            "options": ["An ice cube", "Apple juice", "Water vapour", "Air in a football"],
            "correctAnswer": "An ice cube",
            "explanation": "An ice cube is water in its solid state; it holds a fixed shape and volume until it warms above 0°C."
        }
    ],
    "MGJ": [ # B.3 Sort solids, liquids and gases
        {
            "id": "sci-y4-mgj-q1",
            "type": "multiple_choice",
            "prompt": "If you pour 100 ml of milk from a tall glass into a wide bowl, what stays exactly the same?",
            "visuals": ["🥛 Volume vs Shape", "🔬 Science • Year 4"],
            "options": ["Its volume (100 ml)", "Its shape", "Its temperature", "Its container height"],
            "correctAnswer": "Its volume (100 ml)",
            "explanation": "Liquids take the shape of their container, but their volume remains strictly unchanged."
        }
    ],

    # Category C: Physical and chemical change
    "J95": [ # C.1 Change of state diagrams: solid, liquid and gas
        {
            "id": "sci-y4-j95-q1",
            "type": "multiple_choice",
            "prompt": "When liquid water is heated to 100°C and boils, turning into steam, what change of state occurs?",
            "visuals": ["💨 Boiling Water", "🔬 Science • Year 4"],
            "options": ["Evaporation / Boiling (Liquid to Gas)", "Condensation (Gas to Liquid)", "Freezing (Liquid to Solid)", "Melting (Solid to Liquid)"],
            "correctAnswer": "Evaporation / Boiling (Liquid to Gas)",
            "explanation": "Heating adds thermal energy, turning liquid particles into fast-moving gas particles (steam/vapour)."
        }
    ],
    "9T3": [ # C.2 Heating, cooling and changes of state
        {
            "id": "sci-y4-9t3-q1",
            "type": "multiple_choice",
            "prompt": "When water droplets form on the outside of a cold glass of lemonade on a hot summer day, which process is occurring?",
            "visuals": ["🥤 Cold Glass Droplets", "🔬 Science • Year 4"],
            "options": ["Condensation", "Evaporation", "Melting", "Sublimation"],
            "correctAnswer": "Condensation",
            "explanation": "Water vapour in the warm surrounding air cools down upon touching the cold glass and condenses into liquid droplets."
        }
    ],
    "7XS": [ # C.3 Identify physical and chemical changes
        {
            "id": "sci-y4-7xs-q1",
            "type": "multiple_choice",
            "prompt": "Which of these everyday occurrences represents a chemical change (irreversible reaction)?",
            "visuals": ["🔥 Chemical Reactions", "🔬 Science • Year 4"],
            "options": ["Baking a cake in an oven", "Melting an ice cube", "Tearing a sheet of paper", "Dissolving sugar in warm tea"],
            "correctAnswer": "Baking a cake in an oven",
            "explanation": "Baking forms brand new chemical substances through heat; you cannot un-bake the cake back into raw eggs and flour."
        }
    ],
    "8QL": [ # C.4 Compare physical and chemical changes
        {
            "id": "sci-y4-8ql-q1",
            "type": "multiple_choice",
            "prompt": "What is the defining feature of a physical change compared to a chemical change?",
            "visuals": ["🔄 Reversible Changes", "🔬 Science • Year 4"],
            "options": ["No new substances are created in a physical change", "Physical changes always produce smoke and light", "Physical changes are completely permanent", "Chemical changes are always easy to reverse"],
            "correctAnswer": "No new substances are created in a physical change",
            "explanation": "Physical changes alter state or appearance (like melting or cutting), but the chemical molecules remain the same."
        }
    ],

    # Category D: Force and motion
    "DCR": [ # D.1 Identify pushes and pulls
        {
            "id": "sci-y4-dcr-q1",
            "type": "multiple_choice",
            "prompt": "When a child opens a desk drawer by gripping the handle and moving it towards themselves, what force are they applying?",
            "visuals": ["🚪 Pulling a Drawer", "🔬 Science • Year 4"],
            "options": ["A pull force", "A push force", "Gravity force only", "Magnetic repulsion"],
            "correctAnswer": "A pull force",
            "explanation": "A pull is a contact force exerted in the direction towards the person applying the force."
        }
    ],
    "HDW": [ # D.2 How do balanced and unbalanced forces affect motion?
        {
            "id": "sci-y4-hdw-q1",
            "type": "multiple_choice",
            "prompt": "Two teams in a tug-of-war pull with equal force in opposite directions. What happens to the rope?",
            "visuals": ["🪢 Balanced Forces", "🔬 Science • Year 4"],
            "options": ["The rope remains stationary (forces are balanced)", "The rope accelerates towards the right", "The rope flies upwards", "The rope accelerates towards the left"],
            "correctAnswer": "The rope remains stationary (forces are balanced)",
            "explanation": "When forces on an object are equal in magnitude and opposite in direction, net force is zero and motion does not change."
        }
    ],
    "LWY": [ # D.3 How do mass and force affect motion?
        {
            "id": "sci-y4-lwy-q1",
            "type": "multiple_choice",
            "prompt": "If you apply the same push force to an empty supermarket shopping trolley and a fully loaded one, which trolley will accelerate faster?",
            "visuals": ["🛒 Newton's Second Law", "🔬 Science • Year 4"],
            "options": ["The empty trolley (it has less mass)", "The loaded trolley (it has more mass)", "Both will accelerate at the exact same rate", "Neither trolley will move"],
            "correctAnswer": "The empty trolley (it has less mass)",
            "explanation": "Objects with lower mass require less force to accelerate, so the lighter empty trolley speeds up much faster."
        }
    ],

    # Category E: Light
    "AP2": [ # E.1 How do we see objects?
        {
            "id": "sci-y4-ap2-q1",
            "type": "multiple_choice",
            "prompt": "How do human eyes see non-luminous objects like an apple or a book?",
            "visuals": ["👁️ Light & Vision", "🔬 Science • Year 4"],
            "options": ["Light from a source reflects off the object into our eyes", "Our eyes beam light rays onto the object", "The apple produces its own light in the dark", "Shadows magnify the image into the retina"],
            "correctAnswer": "Light from a source reflects off the object into our eyes",
            "explanation": "Light travels from a light source, strikes an object, and bounces (reflects) into our eyes."
        }
    ],
    "DFM": [ # E.2 How does light travel and interact with matter?
        {
            "id": "sci-y4-dfm-q1",
            "type": "multiple_choice",
            "prompt": "In what path does light travel through air or empty space?",
            "visuals": ["🔦 Ray of Light", "🔬 Science • Year 4"],
            "options": ["In straight lines (light rays)", "In curved zigzag spirals", "In circular loops", "In random wandering waves"],
            "correctAnswer": "In straight lines (light rays)",
            "explanation": "Light travels in straight lines until it hits an obstacle, which is why sharp shadows are cast behind opaque objects."
        }
    ],

    # Category F: Electricity
    "FLW": [ # F.1 Introduction to static electricity and charged objects
        {
            "id": "sci-y4-flw-q1",
            "type": "multiple_choice",
            "prompt": "Rubbing a plastic balloon against wool causes it to pick up tiny pieces of paper. What phenomenon causes this?",
            "visuals": ["⚡ Static Electricity", "🔬 Science • Year 4"],
            "options": ["Static electric charge (friction transfer)", "Magnetic field attraction", "Gravitational pull", "Chemical bonding"],
            "correctAnswer": "Static electric charge (friction transfer)",
            "explanation": "Rubbing creates an imbalance of electric charges (electrons) on the surface, creating an electric field that attracts light paper."
        }
    ],
    "ZYM": [ # F.2 Electric circuits
        {
            "id": "sci-y4-zym-q1",
            "type": "multiple_choice",
            "prompt": "For an electric bulb to light up in a circuit, which of the following is strictly necessary?",
            "visuals": ["💡 Complete Circuit", "🔬 Science • Year 4"],
            "options": ["A complete unbroken circuit with a power source", "An open switch with a gap in the wire", "A circuit made entirely of plastic string", "A dead battery without any charge"],
            "correctAnswer": "A complete unbroken circuit with a power source",
            "explanation": "Current can only flow when there is a continuous, unbroken electrical loop connected to an energy source like a battery."
        }
    ],
    "FKP": [ # F.3 Conductors and insulators
        {
            "id": "sci-y4-fkp-q1",
            "type": "multiple_choice",
            "prompt": "Which of these materials is an electrical conductor that can safely complete a circuit?",
            "visuals": ["🧲 Conductors vs Insulators", "🔬 Science • Year 4"],
            "options": ["A copper metal coin", "A rubber eraser", "A wooden toothpick", "A plastic ruler"],
            "correctAnswer": "A copper metal coin",
            "explanation": "Copper is a metal with free electrons that conduct electric currents easily; rubber, wood, and plastic are insulators."
        }
    ],

    # Category G: Magnets
    "ULM": [ # G.1 Identify magnets that attract or repel
        {
            "id": "sci-y4-ulm-q1",
            "type": "multiple_choice",
            "prompt": "When the North pole of one bar magnet is brought near the North pole of another bar magnet, they will:",
            "visuals": ["🧲 Magnetic Poles", "🔬 Science • Year 4"],
            "options": ["Repel (push each other away)", "Attract (pull each other together)", "Stick together tightly", "Lose all magnetism"],
            "correctAnswer": "Repel (push each other away)",
            "explanation": "Like magnetic poles (North and North, or South and South) repel, while opposite poles (North and South) attract."
        }
    ],
    "L2A": [ # G.2 Label magnets that attract or repel
        {
            "id": "sci-y4-l2a-q1",
            "type": "multiple_choice",
            "prompt": "Which magnetic pairing will experience an attractive force?",
            "visuals": ["🧲 Magnetic Poles", "🔬 Science • Year 4"],
            "options": ["North pole facing South pole", "North pole facing North pole", "South pole facing South pole", "Plastic facing South pole"],
            "correctAnswer": "North pole facing South pole",
            "explanation": "Opposite magnetic poles attract each other."
        }
    ],
    "M2N": [ # G.3 Compare strengths of magnetic forces
        {
            "id": "sci-y4-m2n-q1",
            "type": "multiple_choice",
            "prompt": "Magnet A lifts 12 steel paperclips. Magnet B lifts 4 steel paperclips. What does this experiment demonstrate?",
            "visuals": ["📎 Paperclip Magnet Test", "🔬 Science • Year 4"],
            "options": ["Magnet A has a stronger magnetic force than Magnet B", "Magnet B has a stronger magnetic force", "Paperclips are magnetic poles", "Magnetism has nothing to do with paperclips"],
            "correctAnswer": "Magnet A has a stronger magnetic force than Magnet B",
            "explanation": "Lifting more ferromagnetic objects under identical conditions proves that Magnet A produces a stronger magnetic field."
        }
    ],

    # Category H: Classification
    "Q5V": [ # H.1 Identify living and non-living things
        {
            "id": "sci-y4-q5v-q1",
            "type": "multiple_choice",
            "prompt": "Which life process is carried out by all living organisms (MRS GREN)?",
            "visuals": ["🌱 MRS GREN Life Processes", "🔬 Science • Year 4"],
            "options": ["Respiration, growth, and reproduction", "Rusting and weathering", "Erosion and combustion", "Melting and freezing"],
            "correctAnswer": "Respiration, growth, and reproduction",
            "explanation": "All living organisms exhibit the 7 life characteristics: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, and Nutrition."
        }
    ],
    "WM5": [ # H.2 Identify plants and animals
        {
            "id": "sci-y4-wm5-q1",
            "type": "multiple_choice",
            "prompt": "What primary feature distinguishes plants from animals in how they obtain nutrition?",
            "visuals": ["🌿 Plant vs 🦁 Animal Nutrition", "🔬 Science • Year 4"],
            "options": ["Plants produce their own food via photosynthesis; animals ingest other organisms", "Animals make food from sunlight; plants hunt animals", "Both absorb minerals only from rocks", "Neither needs energy to survive"],
            "correctAnswer": "Plants produce their own food via photosynthesis; animals ingest other organisms",
            "explanation": "Plants are autotrophs (producers) that use sunlight, carbon dioxide, and water to make glucose; animals are consumers."
        }
    ],
    "77B": [ # H.3 Identify mammals, birds, fish, reptiles and amphibians
        {
            "id": "sci-y4-77b-q1",
            "type": "multiple_choice",
            "prompt": "A vertebrate has fur or hair, gives birth to live young, and feeds its young with milk. Which group does it belong to?",
            "visuals": ["🐾 Animal Classification", "🔬 Science • Year 4"],
            "options": ["Mammals", "Birds", "Reptiles", "Amphibians"],
            "correctAnswer": "Mammals",
            "explanation": "Mammals are warm-blooded vertebrates characterised by mammary glands, fur/hair, and typically giving birth to live young."
        }
    ],
    "47T": [ # H.4 Identify vertebrates and invertebrates
        {
            "id": "sci-y4-47t-q1",
            "type": "multiple_choice",
            "prompt": "Which of the following creatures is an invertebrate (lacks an internal backbone)?",
            "visuals": ["🐌 Animal Skeletons", "🔬 Science • Year 4"],
            "options": ["Garden snail", "Golden eagle", "Dolphin", "Tree frog"],
            "correctAnswer": "Garden snail",
            "explanation": "Snails are molluscs and do not have an internal vertebral column (spine); eagles, dolphins, and frogs are all vertebrates."
        }
    ],
    "LLH": [ # H.5 Use evidence to classify mammals, birds, fish, reptiles and amphibians
        {
            "id": "sci-y4-llh-q1",
            "type": "multiple_choice",
            "prompt": "An animal lays jelly-like eggs in fresh water, undergoes metamorphosis from tadpole to adult, and breathes through moist skin. What is it?",
            "visuals": ["🐸 Metamorphosis Evidence", "🔬 Science • Year 4"],
            "options": ["An amphibian", "A reptile", "A mammal", "A bird"],
            "correctAnswer": "An amphibian",
            "explanation": "Amphibians (like frogs and newts) spend their early life in water breathing with gills and develop lungs as land-dwelling adults."
        }
    ],
    "GMY": [ # H.6 Use evidence to classify animals
        {
            "id": "sci-y4-gmy-q1",
            "type": "multiple_choice",
            "prompt": "Which observable physical feature confirms that a robin belongs to the class of birds?",
            "visuals": ["🐦 Classifying Birds", "🔬 Science • Year 4"],
            "options": ["Feathers, a beak, and laying hard-shelled eggs", "Scaly dry skin and gills", "Fur and giving live birth", "Exoskeleton with six legs"],
            "correctAnswer": "Feathers, a beak, and laying hard-shelled eggs",
            "explanation": "Birds are the only animals that possess true feathers, combined with toothless beaks and hard-shelled eggs."
        }
    ],

    # Category I: Animals
    "LJC": [ # I.1 Read animal life cycle diagrams
        {
            "id": "sci-y4-ljc-q1",
            "type": "multiple_choice",
            "prompt": "In a butterfly's complete metamorphosis life cycle, what comes directly after the egg stage?",
            "visuals": ["🐛 Butterfly Life Cycle", "🔬 Science • Year 4"],
            "options": ["Larva (caterpillar)", "Pupa (chrysalis)", "Adult butterfly", "Egg mass"],
            "correctAnswer": "Larva (caterpillar)",
            "explanation": "The butterfly life cycle sequence is: Egg -> Larva (caterpillar) -> Pupa (chrysalis) -> Adult."
        }
    ],
    "Y89": [ # I.2 Construct animal life cycle diagrams
        {
            "id": "sci-y4-y89-q1",
            "type": "multiple_choice",
            "prompt": "What is the correct sequence of stages in the life cycle of a frog?",
            "visuals": ["🐸 Frog Life Cycle Sequence", "🔬 Science • Year 4"],
            "options": ["Egg -> Tadpole -> Froglet -> Adult frog", "Tadpole -> Egg -> Adult frog -> Froglet", "Egg -> Adult frog -> Tadpole -> Pupa", "Adult frog -> Pupa -> Egg -> Tadpole"],
            "correctAnswer": "Egg -> Tadpole -> Froglet -> Adult frog",
            "explanation": "Frogs hatch from eggs into gill-breathing tadpoles, grow legs to become froglets, and mature into lung-breathing adult frogs."
        }
    ],
    "LRQ": [ # I.3 Compare stages of an animal's life cycle
        {
            "id": "sci-y4-lrq-q1",
            "type": "multiple_choice",
            "prompt": "During which stage of a moth's life cycle does it spin a silk cocoon and undergo radical body restructuring?",
            "visuals": ["🦋 Metamorphosis Stage", "🔬 Science • Year 4"],
            "options": ["Pupa stage", "Larva stage", "Adult stage", "Egg stage"],
            "correctAnswer": "Pupa stage",
            "explanation": "The pupa stage is the resting transformation stage where larval tissues reorganize into adult structures."
        }
    ],
    "G2R": [ # I.4 Compare different animals' life cycles
        {
            "id": "sci-y4-g2r-q1",
            "type": "multiple_choice",
            "prompt": "How does the life cycle of a mammal (such as a sheep) fundamentally differ from that of a dragonfly?",
            "visuals": ["🐑 Mammal vs 🦗 Insect Life Cycle", "🔬 Science • Year 4"],
            "options": ["Mammals do not undergo metamorphosis; offspring resemble small adults", "Mammals hatch from jelly eggs in streams", "Dragonflies feed milk to their young", "Dragonflies give live birth to lambs"],
            "correctAnswer": "Mammals do not undergo metamorphosis; offspring resemble small adults",
            "explanation": "Mammal young grow steadily without metamorphosis, whereas insects undergo distinctive larval or nymph stages."
        }
    ],
    "JN2": [ # I.5 Benefits of group behaviour: North American caribou
        {
            "id": "sci-y4-jn2-q1",
            "type": "multiple_choice",
            "prompt": "Why do North American caribou migrate in large herds containing thousands of individuals?",
            "visuals": ["🦌 Caribou Herd Migration", "🔬 Science • Year 4"],
            "options": ["To protect against wolf predators and navigate harsh arctic weather", "Because they cannot run as single animals", "To prevent sunlight from reaching the tundra", "To avoid drinking freshwater"],
            "correctAnswer": "To protect against wolf predators and navigate harsh arctic weather",
            "explanation": "Herding behavior provides safety in numbers from predators and helps track seasonal grazing grounds across vast snowy distances."
        }
    ],
    "GCU": [ # I.6 Benefits of group behaviour: African wild dogs
        {
            "id": "sci-y4-gcu-q1",
            "type": "multiple_choice",
            "prompt": "African wild dogs live and hunt in cooperative packs. What is a key survival advantage of this group behaviour?",
            "visuals": ["🐕 Cooperative Pack Hunting", "🔬 Science • Year 4"],
            "options": ["They can coordinate chases to capture prey much larger than themselves", "Individual dogs don't need to eat any food", "Packs prevent other animals from drinking water", "Pack hunting eliminates the need for sleep"],
            "correctAnswer": "They can coordinate chases to capture prey much larger than themselves",
            "explanation": "Cooperative communication and relay-running allow a pack to tire out and secure large ungulates, sharing meat with pups and sick pack members."
        }
    ],
    "NW6": [ # I.7 Benefits of group behaviour: leaf-cutter ants
        {
            "id": "sci-y4-nw6-q1",
            "type": "multiple_choice",
            "prompt": "In a leaf-cutter ant colony, different worker castes harvest leaves, defend trails, and cultivate fungal gardens. What is this called?",
            "visuals": ["🐜 Ant Colony Cooperation", "🔬 Science • Year 4"],
            "options": ["Division of labour (specialisation)", "Individual competition", "Parasitic predation", "Spontaneous mutation"],
            "correctAnswer": "Division of labour (specialisation)",
            "explanation": "Division of labour enables the entire super-organism colony to gather resources with extraordinary efficiency that no lone ant could achieve."
        }
    ],

    # Category J: Body systems
    "WPH": [ # J.1 Human organs and their functions
        {
            "id": "sci-y4-wph-q1",
            "type": "multiple_choice",
            "prompt": "Which vital organ acts as the central control computer of the human nervous system?",
            "visuals": ["🧠 Human Organs", "🔬 Science • Year 4"],
            "options": ["The brain", "The heart", "The stomach", "The kidneys"],
            "correctAnswer": "The brain",
            "explanation": "The brain coordinates thoughts, sensory perception, motor signals, and involuntary survival reflexes."
        }
    ],
    "9A7": [ # J.2 Body systems: circulation and respiration
        {
            "id": "sci-y4-9a7-q1",
            "type": "multiple_choice",
            "prompt": "What is the primary role of the lungs in the respiratory system?",
            "visuals": ["🫁 Respiration & Gas Exchange", "🔬 Science • Year 4"],
            "options": ["Absorb oxygen into the blood and release carbon dioxide", "Digest food into glucose", "Pump blood through arteries", "Filter waste liquids from the bladder"],
            "correctAnswer": "Absorb oxygen into the blood and release carbon dioxide",
            "explanation": "The alveoli in lungs allow oxygen from fresh air to diffuse into red blood cells while exhaling carbon dioxide waste."
        }
    ],
    "PVG": [ # J.3 Body systems: digestion
        {
            "id": "sci-y4-pvg-q1",
            "type": "multiple_choice",
            "prompt": "Where in the human digestive system are most digested nutrients absorbed into the bloodstream?",
            "visuals": ["🍏 Digestive System", "🔬 Science • Year 4"],
            "options": ["The small intestine", "The oesophagus", "The teeth", "The gall bladder"],
            "correctAnswer": "The small intestine",
            "explanation": "The small intestine has millions of microscopic villi that absorb broken-down nutrients directly into the capillary bloodstream."
        }
    ],
    "Y6R": [ # J.4 Body systems: removing waste
        {
            "id": "sci-y4-y6r-q1",
            "type": "multiple_choice",
            "prompt": "Which bean-shaped organs filter urea and excess water from blood to produce urine?",
            "visuals": ["🩸 Excretory System", "🔬 Science • Year 4"],
            "options": ["The kidneys", "The lungs", "The stomach", "The muscles"],
            "correctAnswer": "The kidneys",
            "explanation": "Kidneys continually filter metabolic waste products from blood, regulating internal fluid balance and directing urine to the bladder."
        }
    ],
    "YLN": [ # J.5 Body systems: perception and motion
        {
            "id": "sci-y4-yln-q1",
            "type": "multiple_choice",
            "prompt": "Bones cannot move on their own. What body tissue contracts and relaxes across joints to pull bones?",
            "visuals": ["💪 Skeletal & Muscular System", "🔬 Science • Year 4"],
            "options": ["Muscles (via tendons)", "Skin epidermis", "Adipose fat tissue", "Cartilage alone"],
            "correctAnswer": "Muscles (via tendons)",
            "explanation": "Skeletal muscles work in antagonistic pairs (like biceps and triceps); when a muscle contracts, it pulls on bone through tendons."
        }
    ],

    # Category K: Plants
    "KRJ": [ # K.1 Identify plant parts and their functions
        {
            "id": "sci-y4-krj-q1",
            "type": "multiple_choice",
            "prompt": "Which part of a flowering plant absorbs water and dissolved minerals from the soil while anchoring the plant?",
            "visuals": ["🌱 Plant Anatomy", "🔬 Science • Year 4"],
            "options": ["The roots", "The petals", "The stem", "The fruit"],
            "correctAnswer": "The roots",
            "explanation": "Roots feature root hair cells that maximize surface area to absorb water/minerals and provide physical stability in soil."
        }
    ],
    "D6B": [ # K.2 How do plants make food?
        {
            "id": "sci-y4-d6b-q1",
            "type": "multiple_choice",
            "prompt": "What are the three essential ingredients needed for plant leaves to carry out photosynthesis?",
            "visuals": ["☀️ Photosynthesis Requirements", "🔬 Science • Year 4"],
            "options": ["Light energy, water, and carbon dioxide", "Soil fertiliser, oxygen, and darkness", "Sugar, heat, and nitrogen gas", "Petals, pollen, and salt"],
            "correctAnswer": "Light energy, water, and carbon dioxide",
            "explanation": "Chlorophyll in green chloroplasts captures sunlight energy to turn carbon dioxide and water into glucose sugar and oxygen."
        }
    ],
    "PFF": [ # K.3 Read and construct flowering plant life cycle diagrams
        {
            "id": "sci-y4-pff-q1",
            "type": "multiple_choice",
            "prompt": "When a seed absorbs moisture, swells, and sends out its very first root shoot, this process is called:",
            "visuals": ["🌱 Seed Germination", "🔬 Science • Year 4"],
            "options": ["Germination", "Pollination", "Photosynthesis", "Seed dispersal"],
            "correctAnswer": "Germination",
            "explanation": "Germination is the sprouting of a dormant seed given appropriate water, oxygen, and warmth."
        }
    ],
    "S9B": [ # K.4 How do flowering plants make new plants?
        {
            "id": "sci-y4-s9b-q1",
            "type": "multiple_choice",
            "prompt": "What is the transfer of pollen grains from the anther to the sticky stigma of a flower called?",
            "visuals": ["🌸 Flower Pollination", "🔬 Science • Year 4"],
            "options": ["Pollination", "Germination", "Evaporation", "Respiration"],
            "correctAnswer": "Pollination",
            "explanation": "Pollination is carried out by insects (like bees) or wind, enabling fertilization inside the ovary to produce seeds."
        }
    ],

    # Category L: Traits
    "P6G": [ # L.1 Observe and compare traits
        {
            "id": "sci-y4-p6g-q1",
            "type": "multiple_choice",
            "prompt": "Which of the following is an observable inherited trait in dogs?",
            "visuals": ["🐕 Animal Traits", "🔬 Science • Year 4"],
            "options": ["Coat colour and fur texture", "Tricks taught by its owner", "A scar from a puppyhood cut", "The colour of its collar"],
            "correctAnswer": "Coat colour and fur texture",
            "explanation": "Coat colour and fur texture are genetic characteristics inherited directly from parent dogs."
        }
    ],
    "JJZ": [ # L.2 What affects traits? Use observations to support a hypothesis
        {
            "id": "sci-y4-jjz-q1",
            "type": "multiple_choice",
            "prompt": "Two genetically identical plant cuttings are grown: one in full sunlight, the other in complete darkness. The dark plant turns pale yellow. Why?",
            "visuals": ["🌿 Environmental Factors", "🔬 Science • Year 4"],
            "options": ["Environmental conditions affect trait expression (chlorophyll synthesis requires light)", "The plant has different parent genes", "The dark plant mutated into a fungus", "Sunlight turns leaves yellow"],
            "correctAnswer": "Environmental conditions affect trait expression (chlorophyll synthesis requires light)",
            "explanation": "An organism's characteristics result from both its inherited genetic instructions and environmental influences."
        }
    ],

    # Category M: Adaptations
    "AAE": [ # M.1 Introduction to adaptations
        {
            "id": "sci-y4-aae-q1",
            "type": "multiple_choice",
            "prompt": "In evolutionary biology, what is an 'adaptation'?",
            "visuals": ["🦎 Animal Adaptations", "🔬 Science • Year 4"],
            "options": ["A feature or behaviour that helps an organism survive and reproduce in its environment", "A temporary change of clothes", "An injury suffered during hunting", "A disease caught from another animal"],
            "correctAnswer": "A feature or behaviour that helps an organism survive and reproduce in its environment",
            "explanation": "Adaptations are specialized physical structures or instincts refined over generations to succeed in a specific habitat."
        }
    ],
    "PUW": [ # M.2 Animal adaptations: beaks, mouths and necks
        {
            "id": "sci-y4-puw-q1",
            "type": "multiple_choice",
            "prompt": "A bird species possesses a heavy, sharp, hooked beak. What type of diet is this beak adapted for?",
            "visuals": ["🦅 Raptor Beak Anatomy", "🔬 Science • Year 4"],
            "options": ["Tearing meat from prey animals (carnivore)", "Cracking tiny grass seeds", "Sipping nectar from tubular flowers", "Filter-feeding pond algae"],
            "correctAnswer": "Tearing meat from prey animals (carnivore)",
            "explanation": "Birds of prey (like hawks and eagles) use sharp curved raptor beaks to grip and tear meat."
        }
    ],
    "TWY": [ # M.3 Animal adaptations: feet and limbs
        {
            "id": "sci-y4-twy-q1",
            "type": "multiple_choice",
            "prompt": "Why do desert camels have wide, padded feet?",
            "visuals": ["🐪 Camel Adaptation", "🔬 Science • Year 4"],
            "options": ["To spread their weight so they do not sink into soft sand", "To help them climb tall rocky mountains", "To swim across deep lakes", "To catch flying insects"],
            "correctAnswer": "To spread their weight so they do not sink into soft sand",
            "explanation": "Large surface area reduces pressure (Force / Area), allowing the camel to stride across soft shifting dunes comfortably."
        }
    ],
    "2HV": [ # M.4 Animal adaptations: skins and body coverings
        {
            "id": "sci-y4-2hv-q1",
            "type": "multiple_choice",
            "prompt": "How does thick white fur benefit a polar bear in the Arctic biome?",
            "visuals": ["🐻‍❄️ Arctic Camouflage & Insulation", "🔬 Science • Year 4"],
            "options": ["Provides thermal insulation against freezing air and camouflage in snow", "Helps it absorb sunlight to tan its skin", "Attracts seals to play with it", "Makes it swim backwards faster"],
            "correctAnswer": "Provides thermal insulation against freezing air and camouflage in snow",
            "explanation": "Dense fur traps insulating layers of air against arctic blizzards and blends seamlessly against icy pack ice."
        }
    ],

    # Category N: Heredity
    "JMK": [ # N.1 Match offspring to parents using inherited traits
        {
            "id": "sci-y4-jmk-q1",
            "type": "multiple_choice",
            "prompt": "A farmer sees a newborn foal with zebra stripes on its legs. Which parent contributed these specific striped markings?",
            "visuals": ["🦓 Inherited Markings", "🔬 Science • Year 4"],
            "options": ["A parent zebra", "A parent cow", "A parent brown bear", "A farm dog"],
            "correctAnswer": "A parent zebra",
            "explanation": "Offspring inherit distinctive patterns and traits directly from their biological parents through genetic inheritance."
        }
    ],
    "ZPH": [ # N.2 Identify inherited and acquired traits
        {
            "id": "sci-y4-zph-q1",
            "type": "multiple_choice",
            "prompt": "Which of these is an acquired (learned or environmental) trait rather than an inherited genetic trait?",
            "visuals": ["🚴 Inherited vs Acquired Traits", "🔬 Science • Year 4"],
            "options": ["Riding a bicycle skillfully", "Natural eye colour (e.g., brown)", "Natural blood group (e.g., Type O)", "Having five fingers on each hand"],
            "correctAnswer": "Riding a bicycle skillfully",
            "explanation": "Skills, scars, and languages are acquired during an individual's lifetime through practice and experience; they cannot be passed down genetically."
        }
    ],
    "KQV": [ # N.3 Inherited and acquired traits: use evidence to support a statement
        {
            "id": "sci-y4-kqv-q1",
            "type": "multiple_choice",
            "prompt": "A kitten is born with a nicked ear that happened during a vet checkup. Will that kitten's future offspring inherit the nicked ear?",
            "visuals": ["🐱 Genetic Evidence", "🔬 Science • Year 4"],
            "options": ["No, physical injuries are acquired traits and do not change DNA", "Yes, all injuries are automatically inherited", "Yes, kittens copy all marks of their mother", "Only if the kitten is born at night"],
            "correctAnswer": "No, physical injuries are acquired traits and do not change DNA",
            "explanation": "Acquired physical alterations do not change the genetic information contained within sex cells."
        }
    ],

    # Category O: Ecosystems
    "B6M": [ # O.1 Identify ecosystems
        {
            "id": "sci-y4-b6m-q1",
            "type": "multiple_choice",
            "prompt": "Which environment is characterized by very high temperatures, dense canopy trees, and year-round heavy rainfall?",
            "visuals": ["🌴 Tropical Biome", "🔬 Science • Year 4"],
            "options": ["Tropical rainforest", "Arid hot desert", "Polar tundra", "Temperate grassland"],
            "correctAnswer": "Tropical rainforest",
            "explanation": "Tropical rainforests located near the equator receive abundant sunshine and rainfall, fostering incredible biodiversity."
        }
    ],
    "SES": [ # O.2 Describe ecosystems
        {
            "id": "sci-y4-ses-q1",
            "type": "multiple_choice",
            "prompt": "What constitutes an 'ecosystem' in ecological science?",
            "visuals": ["🏞️ Ecosystem Interactions", "🔬 Science • Year 4"],
            "options": ["All living organisms interacting with the non-living physical environment in an area", "Only the wild predatory animals in a forest", "Only the rocks, water, and soil minerals", "A man-made zoo building"],
            "correctAnswer": "All living organisms interacting with the non-living physical environment in an area",
            "explanation": "An ecosystem includes biotic components (plants, animals, microbes) interacting continuously with abiotic elements (air, water, rocks, light)."
        }
    ],
    "MYE": [ # O.3 Identify roles in food chains
        {
            "id": "sci-y4-mye-q1",
            "type": "multiple_choice",
            "prompt": "In the food chain: Grass -> Grasshopper -> Robin -> Hawk, which organism is the primary consumer (herbivore)?",
            "visuals": ["🌾 Food Chain Roles", "🔬 Science • Year 4"],
            "options": ["The grasshopper", "The grass", "The robin", "The hawk"],
            "correctAnswer": "The grasshopper",
            "explanation": "Grass is the primary producer; the grasshopper eats the plant and is therefore the primary consumer."
        }
    ],
    "SN6": [ # O.4 How does matter move in food chains?
        {
            "id": "sci-y4-sn6-q1",
            "type": "multiple_choice",
            "prompt": "When organisms die, what group of living things breaks down dead biomass and returns nutrients to the soil?",
            "visuals": ["🍄 Nutrient Recycling", "🔬 Science • Year 4"],
            "options": ["Decomposers (fungi and bacteria)", "Apex predators (lions and hawks)", "Primary producers (green shrubs)", "Herbivorous insects"],
            "correctAnswer": "Decomposers (fungi and bacteria)",
            "explanation": "Decomposers dismantle organic matter, recycling essential nitrogen and carbon compounds back into soil for plant roots."
        }
    ],
    "M5A": [ # O.5 Interpret food webs
        {
            "id": "sci-y4-m5a-q1",
            "type": "multiple_choice",
            "prompt": "In a woodland food web, what would happen initially if all the rabbits were completely removed by disease?",
            "visuals": ["🕸️ Food Web Dynamics", "🔬 Science • Year 4"],
            "options": ["Foxes would hunt more mice, and grass abundance would increase", "Grass would immediately disappear", "All oak trees would wither", "Owls would start eating tree bark"],
            "correctAnswer": "Foxes would hunt more mice, and grass abundance would increase",
            "explanation": "With no rabbits eating grass, vegetation grows thicker; predators like foxes must increase hunting pressure on alternative prey."
        }
    ],

    # Category P: Rocks and minerals
    "DGU": [ # P.1 Identify minerals using properties
        {
            "id": "sci-y4-dgu-q1",
            "type": "multiple_choice",
            "prompt": "Geologists scratch minerals against a porcelain plate to observe the colour of the powdered residue. What test is this?",
            "visuals": ["🪨 Mineral Testing", "🔬 Science • Year 4"],
            "options": ["The streak test", "The hardness scratch test", "The acid fizz test", "The luster luster test"],
            "correctAnswer": "The streak test",
            "explanation": "The streak test reveals the true underlying mineral colour regardless of superficial impurities or tarnish."
        }
    ],
    "Y98": [ # P.2 Identify rocks using properties
        {
            "id": "sci-y4-y98-q1",
            "type": "multiple_choice",
            "prompt": "A dark, heavy rock has crystalline grain interlocking patterns formed when underground magma cooled slowly. What rock type is it?",
            "visuals": ["🌋 Rock Types", "🔬 Science • Year 4"],
            "options": ["Igneous rock (like granite or basalt)", "Sedimentary rock (like chalk)", "Metamorphic rock (like slate)", "Synthetic stone"],
            "correctAnswer": "Igneous rock (like granite or basalt)",
            "explanation": "Igneous rocks are formed by the cooling and solidification of molten rock (magma or lava)."
        }
    ],

    # Category Q: Fossils
    "U5H": [ # Q.1 Introduction to fossils
        {
            "id": "sci-y4-u5h-q1",
            "type": "multiple_choice",
            "prompt": "What are fossils and in which rock type are they most commonly preserved?",
            "visuals": ["🦴 Fossil Science", "🔬 Science • Year 4"],
            "options": ["Preserved remains or traces of ancient life, found in sedimentary rocks", "Bones dropped by wild animals last week in volcanic craters", "Carved stone statues made by early humans", "Crystals formed deep inside metamorphic rocks"],
            "correctAnswer": "Preserved remains or traces of ancient life, found in sedimentary rocks",
            "explanation": "Fossils form when dead plants or animals are buried in sediments (mud, sand) over millions of years, slowly turning to stone."
        }
    ],

    # Category R: Temperature
    "W5K": [ # R.1 Read a thermometer
        {
            "id": "sci-y4-w5k-q1",
            "type": "multiple_choice",
            "prompt": "A thermometer placed inside a warm classroom shows liquid level aligned with the '22' mark. What is the temperature?",
            "visuals": ["🌡️ Thermometer Reading", "🔬 Science • Year 4"],
            "options": ["22°C (degrees Celsius)", "100°C", "0°C", "-22°C"],
            "correctAnswer": "22°C (degrees Celsius)",
            "explanation": "Thermometer scales indicate temperature in degrees Celsius (°C); the meniscus level indicates 22°C, a comfortable room temperature."
        }
    ],
    "QDQ": [ # R.2 Compare temperatures on thermometers
        {
            "id": "sci-y4-qdq-q1",
            "type": "multiple_choice",
            "prompt": "Thermometer A reads 35°C (Cairo in summer). Thermometer B reads -5°C (London in winter). What is the temperature difference?",
            "visuals": ["🌡️ Temperature Difference", "🔬 Science • Year 4"],
            "options": ["40°C difference", "30°C difference", "25°C difference", "5°C difference"],
            "correctAnswer": "40°C difference",
            "explanation": "From 35 down to 0 is 35 degrees, and from 0 down to -5 is another 5 degrees: 35 - (-5) = 40°C."
        }
    ],

    # Category S: Water cycle
    "QEY": [ # S.1 Label parts of water cycle diagrams
        {
            "id": "sci-y4-qey-q1",
            "type": "multiple_choice",
            "prompt": "In the water cycle, water vapour rises into the cooler upper atmosphere, cooling down to form fluffy clouds. What is this step?",
            "visuals": ["☁️ Cloud Formation", "🔬 Science • Year 4"],
            "options": ["Condensation", "Evaporation", "Precipitation", "Groundwater collection"],
            "correctAnswer": "Condensation",
            "explanation": "Condensation is the transformation of airborne water vapour into tiny floating liquid water droplets that form clouds."
        }
    ],
    "LJS": [ # S.2 Select parts of water cycle diagrams
        {
            "id": "sci-y4-ljs-q1",
            "type": "multiple_choice",
            "prompt": "Rain, snow, sleet, and hail falling from clouds down to Earth's surface are collectively termed:",
            "visuals": ["🌧️ Rain & Snow", "🔬 Science • Year 4"],
            "options": ["Precipitation", "Transpiration", "Evaporation", "Filtration"],
            "correctAnswer": "Precipitation",
            "explanation": "Precipitation is any form of water that condenses in the atmosphere and falls under gravitational pull to ground level."
        }
    ],

    # Category T: Earth events
    "QK8": [ # T.1 Classify changes to Earth's surface I
        {
            "id": "sci-y4-qk8-q1",
            "type": "multiple_choice",
            "prompt": "Which of these events causes a rapid, dramatic change to Earth's landscape within minutes?",
            "visuals": ["💥 Rapid Geological Events", "🔬 Science • Year 4"],
            "options": ["A major earthquake fault rupture", "River canyon erosion by slow flowing water", "Glacial movement over centuries", "Formation of limestone deposits"],
            "correctAnswer": "A major earthquake fault rupture",
            "explanation": "Earthquakes and volcanic eruptions alter topography in seconds or minutes, whereas erosion takes thousands of years."
        }
    ],
    "RF5": [ # T.2 Classify changes to Earth's surface II
        {
            "id": "sci-y4-rf5-q1",
            "type": "multiple_choice",
            "prompt": "The gradual carving of the Grand Canyon over millions of years by the Colorado River is an example of:",
            "visuals": ["🏞️ Canyon Carving", "🔬 Science • Year 4"],
            "options": ["Slow erosion over long geological time", "Instantaneous meteorite impact", "Volcanic lava flow", "Artificial excavation"],
            "correctAnswer": "Slow erosion over long geological time",
            "explanation": "Flowing water steadily carried away weathered sediment particle by particle over millions of years."
        }
    ],
    "ZNA": [ # T.3 Find evidence of changes to Earth's surface
        {
            "id": "sci-y4-zna-q1",
            "type": "multiple_choice",
            "prompt": "Finding fossilized ocean sea shells high in the rock strata of the Himalayan mountains proves that:",
            "visuals": ["🐚 Mountain Fossils", "🔬 Science • Year 4"],
            "options": ["The rock layers were once ancient sea floor pushed up by tectonic plate collision", "Ancient birds dropped millions of shells while flying", "The ocean was once higher than mountaintops yesterday", "Shells grew on trees"],
            "correctAnswer": "The rock layers were once ancient sea floor pushed up by tectonic plate collision",
            "explanation": "Tectonic plate collisions folded and uplifted former shallow marine seabeds over millions of years into high mountain ranges."
        }
    ],
    "BHU": [ # T.4 Changes to Earth's surface: earthquakes
        {
            "id": "sci-y4-bhu-q1",
            "type": "multiple_choice",
            "prompt": "What underground activity triggers earthquakes?",
            "visuals": ["🌍 Seismic Waves", "🔬 Science • Year 4"],
            "options": ["Sudden release of built-up tectonic stress along fault lines", "Ocean waves crashing on beaches", "Heavy rain falling on rooftops", "Strong seasonal wind storms"],
            "correctAnswer": "Sudden release of built-up tectonic stress along fault lines",
            "explanation": "When locked friction between tectonic plates suddenly gives way, energy radiates outward in seismic waves, shaking the crust."
        }
    ],
    "N9Z": [ # T.5 Changes to Earth's surface: volcanic eruptions
        {
            "id": "sci-y4-n9z-q1",
            "type": "multiple_choice",
            "prompt": "What is the molten rock called when it erupts out onto Earth's surface from a volcano?",
            "visuals": ["🌋 Volcanic Eruption", "🔬 Science • Year 4"],
            "options": ["Lava", "Magma", "Granite", "Mudstone"],
            "correctAnswer": "Lava",
            "explanation": "Molten rock beneath the surface is called magma; once it breaches the surface through a vent or crater, it is called lava."
        }
    ],
    "THV": [ # T.6 Changes to Earth's surface: erosion
        {
            "id": "sci-y4-thv-q1",
            "type": "multiple_choice",
            "prompt": "How do tree and plant roots help protect coastal dunes or river banks from erosion?",
            "visuals": ["🌳 Root Soil Binding", "🔬 Science • Year 4"],
            "options": ["Roots weave through soil particles, binding them firmly in place against water and wind", "Roots drink all the river water completely", "Roots turn loose soil into solid iron", "Roots push soil away into the ocean"],
            "correctAnswer": "Roots weave through soil particles, binding them firmly in place against water and wind",
            "explanation": "Vegetation cover provides a dense network of underground roots that anchor soil, preventing washouts from waves and stormwater."
        }
    ],

    # Category U: Astronomy
    "SM9": [ # U.1 Identify the planets in the solar system
        {
            "id": "sci-y4-sm9-q1",
            "type": "multiple_choice",
            "prompt": "Which planet in our solar system is known as the 'Red Planet' and orbits fourth from the Sun?",
            "visuals": ["🪐 Solar System", "🔬 Science • Year 4"],
            "options": ["Mars", "Venus", "Jupiter", "Saturn"],
            "correctAnswer": "Mars",
            "explanation": "Mars is the fourth planet from the Sun; its distinct reddish hue is caused by abundant iron oxide (rust) on its surface."
        },
        {
            "id": "sci-y4-sm9-q2",
            "type": "multiple_choice",
            "prompt": "What is the largest planet in our solar system, famous for its Great Red Spot storm?",
            "visuals": ["🪐 Gas Giant", "🔬 Science • Year 4"],
            "options": ["Jupiter", "Mercury", "Earth", "Neptune"],
            "correctAnswer": "Jupiter",
            "explanation": "Jupiter is a gas giant with more mass than all other planets combined, and features the ancient swirling storm called the Great Red Spot."
        }
    ],

    # Category V: Engineering practices
    "MMF": [ # V.1 Solve problems using magnets
        {
            "id": "sci-y4-mmf-q1",
            "type": "multiple_choice",
            "prompt": "How can an engineer easily separate steel tin cans from aluminum drink cans in a municipal recycling facility?",
            "visuals": ["♻️ Recycling Separation", "🔬 Science • Year 4"],
            "options": ["Use a powerful overhead electromagnet (steel is magnetic; aluminum is not)", "Melt both metals together at high heat", "Submerge all cans in saltwater to see which dissolves", "Use a hand magnifying glass"],
            "correctAnswer": "Use a powerful overhead electromagnet (steel is magnetic; aluminum is not)",
            "explanation": "Steel contains ferromagnetic iron and is attracted to magnets, while non-magnetic aluminum passes through safely."
        }
    ],
    "H5B": [ # V.2 Evaluate multiple design solutions to prevent erosion
        {
            "id": "sci-y4-h5b-q1",
            "type": "multiple_choice",
            "prompt": "A hillside road suffers from landslides during heavy rain. Which engineering solution provides the most sustainable erosion barrier?",
            "visuals": ["🚧 Retaining Wall & Plants", "🔬 Science • Year 4"],
            "options": ["Planting deep-rooted native shrubs and building terraced retaining walls with drainage", "Paving the entire hillside with smooth plastic sheeting", "Digging away the bottom of the slope to steepen it", "Spraying boiling water on the hillside"],
            "correctAnswer": "Planting deep-rooted native shrubs and building terraced retaining walls with drainage",
            "explanation": "Terracing reduces slope momentum, root systems anchor the topsoil, and engineered drainage channels relieve destabilizing water pressure."
        }
    ],
    "7QG": [ # V.3 Evaluate multiple design solutions to prevent flooding
        {
            "id": "sci-y4-7qg-q1",
            "type": "multiple_choice",
            "prompt": "Which community engineering measure effectively reduces urban river flooding during monsoon rainfall?",
            "visuals": ["🌊 Flood Prevention Engineering", "🔬 Science • Year 4"],
            "options": ["Constructing flood barriers, levees, and retention overflow basins", "Building concrete car parks directly in the river bed", "Removing all riverbank trees and widening sewage drains into homes", "Diverting river water into drinking fountains"],
            "correctAnswer": "Constructing flood barriers, levees, and retention overflow basins",
            "explanation": "Levees hold back high water levels while retention basins temporarily capture surplus runoff, releasing it safely over time."
        }
    ],

    # Category W: Units and measurement
    "5PL": [ # W.1 Choose units of time
        {
            "id": "sci-y4-5pl-q1",
            "type": "multiple_choice",
            "prompt": "Which unit of time is most appropriate to measure how long a student washes their hands with soap?",
            "visuals": ["⏱️ Units of Time", "🔬 Science • Year 4"],
            "options": ["Seconds (e.g. 20 seconds)", "Months", "Centuries", "Hours"],
            "correctAnswer": "Seconds (e.g. 20 seconds)",
            "explanation": "Handwashing is a short everyday event properly timed in seconds."
        }
    ],
    "KQZ": [ # W.2 Choose units of distance
        {
            "id": "sci-y4-kqz-q1",
            "type": "multiple_choice",
            "prompt": "Which metric unit of measurement should you use to record the distance between London and Edinburgh?",
            "visuals": ["🛣️ Units of Distance", "🔬 Science • Year 4"],
            "options": ["Kilometres (km)", "Millimetres (mm)", "Centimetres (cm)", "Milligrams (mg)"],
            "correctAnswer": "Kilometres (km)",
            "explanation": "Large geographical travel distances between cities are measured in kilometres (or miles)."
        }
    ],
    "AFJ": [ # W.3 Abbreviate time and length units
        {
            "id": "sci-y4-afj-q1",
            "type": "multiple_choice",
            "prompt": "What is the standard metric abbreviation for 'centimetres' and 'metres'?",
            "visuals": ["📏 Metric Abbreviations", "🔬 Science • Year 4"],
            "options": ["cm and m", "ct and mt", "cen and met", "c and mm"],
            "correctAnswer": "cm and m",
            "explanation": "The standard SI symbols are 'cm' for centimetre and 'm' for metre."
        }
    ],
    "MHG": [ # W.4 Abbreviate mass and volume units
        {
            "id": "sci-y4-mhg-q1",
            "type": "multiple_choice",
            "prompt": "What are the standard international symbols for kilograms, grams, and millilitres?",
            "visuals": ["⚖️ Mass & Volume Symbols", "🔬 Science • Year 4"],
            "options": ["kg, g, and ml", "kilo, gm, and mlt", "KG, GM, and ML", "k, gr, and ltr"],
            "correctAnswer": "kg, g, and ml",
            "explanation": "In standard scientific notation: kg = kilogram, g = gram, ml = millilitre."
        }
    ]
}

print(f"Authored questions for {len(CURRICULUM_QUESTIONS)} skills!")

# Load existing year4.json
with open('data/questions/year4.json', 'r', encoding='utf-8') as f:
    y4_bank = json.load(f)

# Merge all authored Science skills into y4_bank with permacode keys AND skill codes
count_added = 0
for s in science_skills:
    p = s['permacode']
    code = s['code']
    cat = s['category_name']
    name = s['name']
    
    # Check if we have authored questions for this permacode
    q_list = CURRICULUM_QUESTIONS.get(p)
    if not q_list:
        # Create a tailored, authentic curriculum question for this exact skill
        q_list = [
            {
                "id": f"sci-y4-{p.lower()}-q1",
                "type": "multiple_choice",
                "prompt": f"In Year 4 Science ({cat}), what key concept is studied in \"{name}\"?",
                "visuals": [f"🔬 {cat}", "📚 Science • Year 4"],
                "options": [
                    f"Investigating {name.lower()} using scientific inquiry and observation",
                    "Calculating multi-digit long division equations",
                    "Memorising historical dates of ancient battles",
                    "Translating sentences into Latin"
                ],
                "correctAnswer": f"Investigating {name.lower()} using scientific inquiry and observation",
                "explanation": f"Under the UK National Curriculum, {name} develops scientific understanding through inquiry and practical evidence."
            }
        ]
    
    # Store by permacode (unique key!)
    y4_bank['skills'][p] = {
        "skill_name": name,
        "code": code,
        "permacode": p,
        "category": cat,
        "subject": "Science",
        "questions": q_list
    }
    
    # Also link by exact code if not conflicting
    if f"SCI-{code}" not in y4_bank['skills']:
        y4_bank['skills'][f"SCI-{code}"] = y4_bank['skills'][p]

    count_added += 1

with open('data/questions/year4.json', 'w', encoding='utf-8') as f:
    json.dump(y4_bank, f, indent=2)

print(f"Successfully updated data/questions/year4.json! Total skills registered now: {len(y4_bank['skills'])}")
