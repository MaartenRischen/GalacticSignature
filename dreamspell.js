/**
 * MAYAN DREAMSPELL GALACTIC SIGNATURE CALCULATOR
 * Based on the work of José Argüelles
 *
 * Reference: July 26, 1987 = Kin 34 (White Galactic Wizard)
 * The Dreamspell counts 260 days in a cycle, skipping Feb 29 (leap days)
 */

// ============================================
// CORE DATA: THE 20 SOLAR SEALS
// ============================================

const SOLAR_SEALS = [
    {
        number: 1,
        name: "Red Dragon",
        mayanName: "Imix",
        glyph: "🐉",
        color: "red",
        action: "Nurtures",
        essence: "Being",
        power: "Birth",
        earthFamily: "Cardinal",
        chakra: "Root",
        description: "The Red Dragon represents the primordial force of creation and nurturing. It symbolizes the sacred feminine matrix, the womb of existence from which all life emerges. Dragon people are natural caregivers who provide safety, sustenance, and unconditional love.",
        lightAspect: "Supportive, embraces new beginnings, deeply nurturing",
        shadowAspect: "May neglect self while caring for others"
    },
    {
        number: 2,
        name: "White Wind",
        mayanName: "Ik",
        glyph: "🌬",
        color: "white",
        action: "Communicates",
        essence: "Spirit",
        power: "Breath",
        earthFamily: "Core",
        chakra: "Throat",
        description: "White Wind embodies the divine breath, the sacred wind of spirit that carries truth and inspiration. It represents communication in all its forms - spoken, written, and telepathic. Wind people are natural channels for spiritual messages.",
        lightAspect: "Honest, authentic expression, spiritually connected",
        shadowAspect: "May struggle to speak personal truth"
    },
    {
        number: 3,
        name: "Blue Night",
        mayanName: "Akbal",
        glyph: "🌙",
        color: "blue",
        action: "Dreams",
        essence: "Intuition",
        power: "Abundance",
        earthFamily: "Signal",
        chakra: "Third Eye",
        description: "Blue Night holds the mysteries of the dreamtime and the infinite potential of the unconscious mind. It represents the power of intuition to unlock abundance and access higher dimensional wisdom. Night people are natural dreamers and visionaries.",
        lightAspect: "Uses intuition and imagination powerfully",
        shadowAspect: "May struggle to manifest dreams into reality"
    },
    {
        number: 4,
        name: "Yellow Seed",
        mayanName: "Kan",
        glyph: "🌱",
        color: "yellow",
        action: "Targets",
        essence: "Awareness",
        power: "Flowering",
        earthFamily: "Gateway",
        chakra: "Solar Plexus",
        description: "Yellow Seed represents the divine potential encoded within all things. Like a seed containing the blueprint of a mighty tree, Seed people carry powerful possibilities waiting to flower. They understand that patience and proper conditions allow potential to bloom.",
        lightAspect: "Blossoms into potential with focused intention",
        shadowAspect: "May feel vulnerable or lack patience"
    },
    {
        number: 5,
        name: "Red Serpent",
        mayanName: "Chicchan",
        glyph: "🐍",
        color: "red",
        action: "Survives",
        essence: "Instinct",
        power: "Life Force",
        earthFamily: "Polar",
        chakra: "Root",
        description: "Red Serpent embodies the kundalini life force, the primal energy that rises through the spine. It represents instinctual wisdom, passionate vitality, and the power to shed old skins. Serpent people are deeply connected to their physical bodies and sensual nature.",
        lightAspect: "Passionate, vital, sheds old patterns easily",
        shadowAspect: "May be overly analytical or have excessive energy"
    },
    {
        number: 6,
        name: "White Worldbridger",
        mayanName: "Cimi",
        glyph: "🌉",
        color: "white",
        action: "Equalizes",
        essence: "Opportunity",
        power: "Death",
        earthFamily: "Cardinal",
        chakra: "Heart",
        description: "White Worldbridger represents the sacred transition between worlds, the bridge between life and death, physical and spiritual. It embodies the power of surrender and release. Worldbridger people excel at helping others through major life transitions.",
        lightAspect: "Surrenders to true path, helps others transition",
        shadowAspect: "May have difficulty letting go and closing cycles"
    },
    {
        number: 7,
        name: "Blue Hand",
        mayanName: "Manik",
        glyph: "✋",
        color: "blue",
        action: "Knows",
        essence: "Healing",
        power: "Accomplishment",
        earthFamily: "Core",
        chakra: "Hands",
        description: "Blue Hand represents the power of accomplishment through skillful action. It embodies healing abilities and the capacity to complete what has been started. Hand people are natural healers and craftspeople who manifest through dedicated work.",
        lightAspect: "Holistic healing approach, accomplishes goals",
        shadowAspect: "May feel off-balance or unable to complete tasks"
    },
    {
        number: 8,
        name: "Yellow Star",
        mayanName: "Lamat",
        glyph: "⭐",
        color: "yellow",
        action: "Beautifies",
        essence: "Elegance",
        power: "Art",
        earthFamily: "Signal",
        chakra: "Heart",
        description: "Yellow Star radiates the frequencies of beauty, harmony, and artistic expression. Connected to Venus, it represents elegance and the refinement of all things. Star people are natural artists who bring beauty and harmony wherever they go.",
        lightAspect: "Shares beauty and guides others toward harmony",
        shadowAspect: "May tend toward idealism and perfectionism"
    },
    {
        number: 9,
        name: "Red Moon",
        mayanName: "Muluc",
        glyph: "🌊",
        color: "red",
        action: "Purifies",
        essence: "Flow",
        power: "Universal Water",
        earthFamily: "Gateway",
        chakra: "Sacral",
        description: "Red Moon embodies the purifying flow of universal waters. It represents emotional intelligence, sensitivity to cosmic rhythms, and the power of allowing. Moon people are deeply attuned to cycles and the ebb and flow of life.",
        lightAspect: "Seeks wellbeing, allows being, emotionally fluid",
        shadowAspect: "May become moody or numb emotions"
    },
    {
        number: 10,
        name: "White Dog",
        mayanName: "Oc",
        glyph: "🐕",
        color: "white",
        action: "Loves",
        essence: "Loyalty",
        power: "Heart",
        earthFamily: "Polar",
        chakra: "Heart",
        description: "White Dog represents unconditional love and loyal companionship. It embodies the pure heart that loves without conditions and guides others through the darkness. Dog people are natural-born lovers who value deep, lasting relationships.",
        lightAspect: "Heart-centered life with deep compassion",
        shadowAspect: "May lack self-love or struggle in relationships"
    },
    {
        number: 11,
        name: "Blue Monkey",
        mayanName: "Chuen",
        glyph: "🐒",
        color: "blue",
        action: "Plays",
        essence: "Magic",
        power: "Illusion",
        earthFamily: "Cardinal",
        chakra: "Throat",
        description: "Blue Monkey holds the codes of divine play and cosmic humor. It represents the magical child who transforms reality through play and illusion. Monkey people remind us not to take life too seriously and to embrace joy.",
        lightAspect: "Loves fun, easy-going, magically playful",
        shadowAspect: "May worry too much or take things too seriously"
    },
    {
        number: 12,
        name: "Yellow Human",
        mayanName: "Eb",
        glyph: "👤",
        color: "yellow",
        action: "Influences",
        essence: "Wisdom",
        power: "Free Will",
        earthFamily: "Core",
        chakra: "Crown",
        description: "Yellow Human represents the sacred chalice of free will and conscious choice. It embodies the capacity for wisdom and the influence we have over our own destiny. Human people are learning to master the art of conscious creation.",
        lightAspect: "Uses free will for conscious, wise choices",
        shadowAspect: "May feel victimized or ignore others' needs"
    },
    {
        number: 13,
        name: "Red Skywalker",
        mayanName: "Ben",
        glyph: "🚀",
        color: "red",
        action: "Explores",
        essence: "Wakefulness",
        power: "Space",
        earthFamily: "Signal",
        chakra: "Third Eye",
        description: "Red Skywalker represents the cosmic explorer who bridges heaven and earth. It embodies the adventurous spirit that seeks new horizons and expands consciousness. Skywalker people are natural pioneers and spiritual adventurers.",
        lightAspect: "Explores new places, enjoys adventure, awakened",
        shadowAspect: "May struggle to explore within, carries burdens"
    },
    {
        number: 14,
        name: "White Wizard",
        mayanName: "Ix",
        glyph: "🧙",
        color: "white",
        action: "Enchants",
        essence: "Receptivity",
        power: "Timelessness",
        earthFamily: "Gateway",
        chakra: "Heart",
        description: "White Wizard embodies the shamanic power of enchantment and the ability to step outside of time. It represents the jaguar priest who bridges worlds through ceremony and magic. Wizard people are natural magicians and spiritual teachers.",
        lightAspect: "Self-confident creation ability, enchanting",
        shadowAspect: "May experience insecurity or low self-esteem"
    },
    {
        number: 15,
        name: "Blue Eagle",
        mayanName: "Men",
        glyph: "🦅",
        color: "blue",
        action: "Creates",
        essence: "Mind",
        power: "Vision",
        earthFamily: "Polar",
        chakra: "Third Eye",
        description: "Blue Eagle represents the visionary consciousness that sees from the highest perspective. It embodies the power of the awakened mind to perceive truth and create from vision. Eagle people are natural seers and visionary leaders.",
        lightAspect: "Expands vision, sees the big picture clearly",
        shadowAspect: "May get overwhelmed by details"
    },
    {
        number: 16,
        name: "Yellow Warrior",
        mayanName: "Cib",
        glyph: "⚔️",
        color: "yellow",
        action: "Questions",
        essence: "Fearlessness",
        power: "Intelligence",
        earthFamily: "Cardinal",
        chakra: "Solar Plexus",
        description: "Yellow Warrior embodies the fearless intelligence that questions everything. It represents the spiritual warrior who uses discernment and courage to navigate life's challenges. Warrior people are natural strategists and truth-seekers.",
        lightAspect: "Sets clear goals, fearless in pursuit",
        shadowAspect: "May be trapped in self-doubt or inflexible"
    },
    {
        number: 17,
        name: "Red Earth",
        mayanName: "Caban",
        glyph: "🌍",
        color: "red",
        action: "Evolves",
        essence: "Synchronicity",
        power: "Navigation",
        earthFamily: "Core",
        chakra: "Root",
        description: "Red Earth represents the power of synchronicity and navigation through life. It embodies our connection to the living planet and the ability to read signs. Earth people are naturally grounded and attuned to meaningful coincidences.",
        lightAspect: "One with nature, strong roots, navigates well",
        shadowAspect: "May have difficulty being present and connected"
    },
    {
        number: 18,
        name: "White Mirror",
        mayanName: "Etznab",
        glyph: "🪞",
        color: "white",
        action: "Reflects",
        essence: "Order",
        power: "Endlessness",
        earthFamily: "Signal",
        chakra: "Third Eye",
        description: "White Mirror represents the sword of truth that cuts through illusion. It embodies the power of reflection and the infinite nature of consciousness. Mirror people are naturally discerning and committed to seeing reality clearly.",
        lightAspect: "Uses discernment to keep what serves, truth-seeker",
        shadowAspect: "May live in denial or distorted reality"
    },
    {
        number: 19,
        name: "Blue Storm",
        mayanName: "Cauac",
        glyph: "⛈️",
        color: "blue",
        action: "Catalyzes",
        essence: "Energy",
        power: "Self-Generation",
        earthFamily: "Gateway",
        chakra: "Crown",
        description: "Blue Storm represents the transformative power of change and self-regeneration. It embodies the thunderbeing energy that purifies and renews. Storm people are natural catalysts who bring transformation wherever they go.",
        lightAspect: "Sees transitions as growth opportunities",
        shadowAspect: "May fear change or block transformation"
    },
    {
        number: 20,
        name: "Yellow Sun",
        mayanName: "Ahau",
        glyph: "☀️",
        color: "yellow",
        action: "Enlightens",
        essence: "Life",
        power: "Universal Fire",
        earthFamily: "Polar",
        chakra: "Crown",
        description: "Yellow Sun represents enlightenment and the full radiance of awakened consciousness. It embodies Christ/Buddha consciousness and the unlimited potential of the enlightened being. Sun people are here to fully shine their light.",
        lightAspect: "Has clarity in path, shines brightly",
        shadowAspect: "May give power away, feel disempowered"
    }
];

// ============================================
// CORE DATA: THE 13 GALACTIC TONES
// ============================================

const GALACTIC_TONES = [
    {
        number: 1,
        name: "Magnetic",
        keywords: ["Unify", "Attract", "Purpose"],
        power: "Oneness",
        question: "What is my purpose?",
        description: "The Magnetic tone represents the indivisible Unity of All that is. It magnetizes resources and beings aligned with your soul's calling. This is the tone of attraction and unified purpose.",
        affirmation: "I unify in order to nurture, attracting being. I seal the input of birth with the magnetic tone of purpose."
    },
    {
        number: 2,
        name: "Lunar",
        keywords: ["Polarize", "Stabilize", "Challenge"],
        power: "Counter-balance",
        question: "What are my challenges?",
        description: "The Lunar tone embodies the principle of polarity. It embraces life's contrasts as aspects of wholeness, using challenges as catalysts for growth and evolution.",
        affirmation: "I polarize in order to communicate, stabilizing breath. I seal the input of spirit with the lunar tone of challenge."
    },
    {
        number: 3,
        name: "Electric",
        keywords: ["Activate", "Bond", "Service"],
        power: "Connectivity",
        question: "How can I best serve?",
        description: "The Electric tone channels the mind-body-spirit circuitry to energize connections and amplify collective service capacity. It activates bonding through service.",
        affirmation: "I activate in order to dream, bonding intuition. I seal the input of abundance with the electric tone of service."
    },
    {
        number: 4,
        name: "Self-Existing",
        keywords: ["Define", "Measure", "Form"],
        power: "Structure",
        question: "What form will my service take?",
        description: "The Self-Existing tone cultivates clarity through precise observation and recognizes how mental definitions shape reality perception. It gives form to ideas.",
        affirmation: "I define in order to target, measuring awareness. I seal the input of flowering with the self-existing tone of form."
    },
    {
        number: 5,
        name: "Overtone",
        keywords: ["Empower", "Command", "Radiance"],
        power: "Center",
        question: "How can I best empower myself and others?",
        description: "The Overtone tone develops sovereign strength and allows universal energies to radiate through authentic self-expression. It commands from the center.",
        affirmation: "I empower in order to survive, commanding instinct. I seal the store of life force with the overtone tone of radiance."
    },
    {
        number: 6,
        name: "Rhythmic",
        keywords: ["Organize", "Balance", "Equality"],
        power: "Organic Balance",
        question: "How can I extend equality to others?",
        description: "The Rhythmic tone synchronizes with natural rhythms while maintaining equilibrium through discipline and authenticity. It organizes for balance.",
        affirmation: "I organize in order to equalize, balancing opportunity. I seal the store of death with the rhythmic tone of equality."
    },
    {
        number: 7,
        name: "Resonant",
        keywords: ["Channel", "Inspire", "Attunement"],
        power: "Vibration",
        question: "How can I attune my service to others?",
        description: "The Resonant tone refines frequencies expressed through thoughts and actions, becoming a conscious channel for inspiration and divine guidance.",
        affirmation: "I channel in order to know, inspiring healing. I seal the store of accomplishment with the resonant tone of attunement."
    },
    {
        number: 8,
        name: "Galactic",
        keywords: ["Harmonize", "Model", "Integrity"],
        power: "Wholeness",
        question: "Do I live what I believe?",
        description: "The Galactic tone integrates personal being with nature's intrinsic harmony while modeling core values as a galactic emissary of integrity.",
        affirmation: "I harmonize in order to beautify, modeling art. I seal the store of elegance with the galactic tone of integrity."
    },
    {
        number: 9,
        name: "Solar",
        keywords: ["Pulse", "Realize", "Intention"],
        power: "Awakened Mind",
        question: "How do I attain my purpose?",
        description: "The Solar tone wields intention as a manifestation catalyst through heart-mind-body broadcast. It pulses the realization of purpose into being.",
        affirmation: "I pulse in order to purify, realizing flow. I seal the process of universal water with the solar tone of intention."
    },
    {
        number: 10,
        name: "Planetary",
        keywords: ["Perfect", "Produce", "Manifestation"],
        power: "Attainment",
        question: "How do I perfect what I do?",
        description: "The Planetary tone merges spirit and matter to materialize visions while recognizing all contributions to planetary wholeness and perfection.",
        affirmation: "I perfect in order to love, producing loyalty. I seal the process of heart with the planetary tone of manifestation."
    },
    {
        number: 11,
        name: "Spectral",
        keywords: ["Dissolve", "Release", "Liberation"],
        power: "Freedom",
        question: "How do I release and let go?",
        description: "The Spectral tone surrenders rigid concepts to embrace spontaneous transformation and formless possibility. It dissolves what no longer serves.",
        affirmation: "I dissolve in order to play, releasing illusion. I seal the process of magic with the spectral tone of liberation."
    },
    {
        number: 12,
        name: "Crystal",
        keywords: ["Dedicate", "Universalize", "Cooperation"],
        power: "Synergy",
        question: "How can I dedicate myself to all that lives?",
        description: "The Crystal tone generates networks through community cooperation and comprehensive vision. It dedicates energy to universal purposes.",
        affirmation: "I dedicate in order to influence, universalizing wisdom. I seal the process of free will with the crystal tone of cooperation."
    },
    {
        number: 13,
        name: "Cosmic",
        keywords: ["Endure", "Transcend", "Presence"],
        power: "Omnipresence",
        question: "How can I expand my joy and love?",
        description: "The Cosmic tone cultivates present-moment awareness while transcending linear time constraints. It represents the spiral of transcendence and return.",
        affirmation: "I endure in order to explore, transcending wakefulness. I seal the output of space with the cosmic tone of presence."
    }
];

// ============================================
// ORACLE RELATIONSHIPS
// ============================================

// Analog pairs (support) - seals that work harmoniously together
// Red pairs with White, Blue pairs with Yellow
const ANALOG_PAIRS = {
    1: 18,  // Dragon - Mirror
    2: 17,  // Wind - Earth
    3: 16,  // Night - Warrior
    4: 15,  // Seed - Eagle
    5: 14,  // Serpent - Wizard
    6: 13,  // Worldbridger - Skywalker
    7: 12,  // Hand - Human
    8: 11,  // Star - Monkey
    9: 10,  // Moon - Dog
    10: 9,  // Dog - Moon
    11: 8,  // Monkey - Star
    12: 7,  // Human - Hand
    13: 6,  // Skywalker - Worldbridger
    14: 5,  // Wizard - Serpent
    15: 4,  // Eagle - Seed
    16: 3,  // Warrior - Night
    17: 2,  // Earth - Wind
    18: 1,  // Mirror - Dragon
    19: 20, // Storm - Sun
    20: 19  // Sun - Storm
};

// Antipode pairs (challenge/strengthen) - 10 seals apart
const ANTIPODE_PAIRS = {
    1: 11,  // Dragon - Monkey
    2: 12,  // Wind - Human
    3: 13,  // Night - Skywalker
    4: 14,  // Seed - Wizard
    5: 15,  // Serpent - Eagle
    6: 16,  // Worldbridger - Warrior
    7: 17,  // Hand - Earth
    8: 18,  // Star - Mirror
    9: 19,  // Moon - Storm
    10: 20, // Dog - Sun
    11: 1,  // Monkey - Dragon
    12: 2,  // Human - Wind
    13: 3,  // Skywalker - Night
    14: 4,  // Wizard - Seed
    15: 5,  // Eagle - Serpent
    16: 6,  // Warrior - Worldbridger
    17: 7,  // Earth - Hand
    18: 8,  // Mirror - Star
    19: 9,  // Storm - Moon
    20: 10  // Sun - Dog
};

// Occult pairs (hidden power) - seals that sum to 21
const OCCULT_PAIRS = {
    1: 20,  // Dragon - Sun
    2: 19,  // Wind - Storm
    3: 18,  // Night - Mirror
    4: 17,  // Seed - Earth
    5: 16,  // Serpent - Warrior
    6: 15,  // Worldbridger - Eagle
    7: 14,  // Hand - Wizard
    8: 13,  // Star - Skywalker
    9: 12,  // Moon - Human
    10: 11, // Dog - Monkey
    11: 10, // Monkey - Dog
    12: 9,  // Human - Moon
    13: 8,  // Skywalker - Star
    14: 7,  // Wizard - Hand
    15: 6,  // Eagle - Worldbridger
    16: 5,  // Warrior - Serpent
    17: 4,  // Earth - Seed
    18: 3,  // Mirror - Night
    19: 2,  // Storm - Wind
    20: 1   // Sun - Dragon
};

// Guide calculation based on tone
// Returns how many seals ahead (in same color family) the guide is
function getGuideOffset(tone) {
    const toneNum = ((tone - 1) % 13) + 1;
    if ([1, 6, 11].includes(toneNum)) return 0;      // Same seal
    if ([2, 7, 12].includes(toneNum)) return 12;     // 12 ahead (or 8 back)
    if ([3, 8, 13].includes(toneNum)) return 4;      // 4 ahead
    if ([4, 9].includes(toneNum)) return 16;         // 16 ahead (or 4 back)
    if ([5, 10].includes(toneNum)) return 8;         // 8 ahead
    return 0;
}

// ============================================
// GALACTIC ACTIVATION PORTALS (52 GAP DAYS)
// ============================================

// The 52 GAP kins form a DNA-like pattern in the Tzolkin matrix
const GAP_KINS = [
    1, 20, 22, 39, 43, 50, 51, 58, 64, 69,
    72, 77, 85, 88, 93, 96, 106, 107, 108, 109,
    110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
    130, 131, 132, 133, 134, 145, 148, 153, 156, 165,
    168, 173, 176, 184, 189, 192, 197, 210, 211, 218,
    219, 222, 239, 241, 260
].slice(0, 52); // Ensure exactly 52

// GAP Pattern - The 52 Galactic Activation Portals (Loom of Maya)
// Forms a double helix/DNA pattern in the Tzolkin matrix
const GAP_PATTERN = new Set([
    1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77,
    85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113,
    148, 149, 150, 151, 152, 153, 154, 155,
    165, 168, 173, 176, 184, 189, 192, 197,
    203, 210, 211, 218, 222, 239, 241, 260
]);

// ============================================
// KIN CALCULATION
// ============================================

/**
 * Calculate the Dreamspell Kin for a given Gregorian date
 * Reference: July 26, 1987 = Kin 34 (White Galactic Wizard)
 */
function calculateKin(year, month, day) {
    // Reference date: July 26, 1987 = Kin 34
    const refDate = new Date(1987, 6, 26); // Month is 0-indexed
    const inputDate = new Date(year, month - 1, day);

    // Calculate days between dates
    let daysDiff = Math.floor((inputDate - refDate) / (1000 * 60 * 60 * 24));

    // Count leap days to skip (Dreamspell doesn't count Feb 29)
    let leapDaysToSkip = 0;

    // Count leap days between reference and input date
    const startYear = Math.min(1987, year);
    const endYear = Math.max(1987, year);

    for (let y = startYear; y <= endYear; y++) {
        if (isLeapYear(y)) {
            const leapDay = new Date(y, 1, 29);
            if (inputDate > refDate) {
                // Forward in time
                if (leapDay > refDate && leapDay <= inputDate) {
                    leapDaysToSkip++;
                }
            } else {
                // Backward in time
                if (leapDay <= refDate && leapDay > inputDate) {
                    leapDaysToSkip--;
                }
            }
        }
    }

    // Adjust for leap days
    daysDiff -= leapDaysToSkip;

    // Calculate kin (1-260)
    // Starting from Kin 34 (reference date)
    // Formula: ((daysDiff + 33) % 260) + 1, handling negative modulo
    let kin = (((daysDiff + 33) % 260) + 260) % 260 + 1;

    return kin;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get seal number (1-20) from kin number (1-260)
 */
function getSealFromKin(kin) {
    return ((kin - 1) % 20) + 1;
}

/**
 * Get tone number (1-13) from kin number (1-260)
 */
function getToneFromKin(kin) {
    return ((kin - 1) % 13) + 1;
}

/**
 * Check if a kin is a Galactic Activation Portal day
 */
function isGAP(kin) {
    return GAP_PATTERN.has(kin);
}

/**
 * Get the complete oracle for a given kin
 */
function getOracle(kin) {
    const seal = getSealFromKin(kin);
    const tone = getToneFromKin(kin);

    // Get destiny (center)
    const destiny = SOLAR_SEALS[seal - 1];

    // Get analog (support)
    const analogSeal = ANALOG_PAIRS[seal];
    const analog = SOLAR_SEALS[analogSeal - 1];

    // Get antipode (challenge)
    const antipodeSeal = ANTIPODE_PAIRS[seal];
    const antipode = SOLAR_SEALS[antipodeSeal - 1];

    // Get occult (hidden power)
    const occultSeal = OCCULT_PAIRS[seal];
    const occultTone = 14 - tone; // Occult tone + destiny tone = 14
    const occult = SOLAR_SEALS[occultSeal - 1];

    // Get guide (same color, based on tone)
    const guideOffset = getGuideOffset(tone);
    // Guide must be same color, so we cycle through seals of same color
    // Same color seals are 4 apart: 1,5,9,13,17 (red), 2,6,10,14,18 (white), etc.
    let guideSeal = seal;
    if (guideOffset > 0) {
        // Move through same-color seals
        const colorIndex = (seal - 1) % 4; // 0=red, 1=white, 2=blue, 3=yellow
        const sealIndexInColor = Math.floor((seal - 1) / 4); // 0-4
        const newIndex = (sealIndexInColor + Math.floor(guideOffset / 4)) % 5;
        guideSeal = colorIndex + 1 + (newIndex * 4);
    }
    const guide = SOLAR_SEALS[guideSeal - 1];

    return {
        kin,
        tone: GALACTIC_TONES[tone - 1],
        destiny,
        analog,
        antipode,
        occult: { seal: occult, tone: occultTone > 0 ? occultTone : occultTone + 13 },
        guide,
        isGAP: isGAP(kin)
    };
}

/**
 * Get the wavespell (13-day cycle) information
 */
function getWavespell(kin) {
    const wavespellNumber = Math.floor((kin - 1) / 13) + 1;
    const wavespellStart = (wavespellNumber - 1) * 13 + 1;
    const dayInWavespell = ((kin - 1) % 13) + 1;
    const wavespellSeal = getSealFromKin(wavespellStart);

    return {
        number: wavespellNumber,
        startKin: wavespellStart,
        seal: SOLAR_SEALS[wavespellSeal - 1],
        currentDay: dayInWavespell
    };
}

/**
 * Get the castle (52-day cycle) information
 */
function getCastle(kin) {
    const castleNumber = Math.floor((kin - 1) / 52) + 1;
    const castleNames = ["Red Eastern", "White Northern", "Blue Western", "Yellow Southern", "Green Central"];
    const castleColors = ["red", "white", "blue", "yellow", "green"];

    return {
        number: castleNumber,
        name: castleNames[castleNumber - 1],
        color: castleColors[castleNumber - 1]
    };
}

// ============================================
// UI FUNCTIONS
// ============================================

function calculateKinFromInput() {
    const dateInput = document.getElementById('birthdate');
    if (!dateInput.value) return null;

    const [year, month, day] = dateInput.value.split('-').map(Number);
    return calculateKin(year, month, day);
}

function displayResult(kin, dateString) {
    const oracle = getOracle(kin);
    const wavespell = getWavespell(kin);
    const castle = getCastle(kin);
    const tone = oracle.tone;
    const seal = oracle.destiny;

    const fullSignature = `${seal.color.charAt(0).toUpperCase() + seal.color.slice(1)} ${tone.name} ${seal.name.split(' ')[1]}`;

    document.getElementById('noResult').style.display = 'none';
    document.getElementById('signatureResult').classList.add('visible');

    const resultHTML = `
        <div class="signature-header">
            <div class="kin-number">KIN ${kin} ${oracle.isGAP ? '• GALACTIC ACTIVATION PORTAL' : ''}</div>
            <h2 class="signature-title ${seal.color}">${fullSignature}</h2>
            <p class="signature-affirmation">"${tone.affirmation}"</p>
        </div>

        <div class="glyph-display">
            <div class="glyph-card">
                <div class="glyph-symbol ${seal.color} ${oracle.isGAP ? 'gap' : ''}">${seal.glyph}</div>
                <div class="glyph-label">Solar Seal</div>
                <div class="glyph-name">${seal.name}</div>
            </div>
            <div class="glyph-card">
                <div class="glyph-symbol yellow" style="font-size: 2rem; font-weight: bold;">${tone.number}</div>
                <div class="glyph-label">Galactic Tone</div>
                <div class="glyph-name">${tone.name}</div>
            </div>
        </div>

        ${oracle.isGAP ? '<div style="text-align: center;"><span class="gap-badge">Galactic Activation Portal Day</span></div>' : ''}

        <div class="oracle-container">
            <div class="oracle-title">Your Destiny Oracle</div>
            <div class="oracle-grid">
                <div class="oracle-position guide">
                    <div class="oracle-mini-glyph ${oracle.guide.color}">${oracle.guide.glyph}</div>
                    <div class="oracle-role">Guide</div>
                    <div class="oracle-seal-name">${oracle.guide.name}</div>
                </div>
                <div class="oracle-position analog">
                    <div class="oracle-mini-glyph ${oracle.analog.color}">${oracle.analog.glyph}</div>
                    <div class="oracle-role">Support</div>
                    <div class="oracle-seal-name">${oracle.analog.name}</div>
                </div>
                <div class="oracle-position destiny ${seal.color}">
                    <div class="oracle-mini-glyph ${seal.color}">${seal.glyph}</div>
                    <div class="oracle-role">Destiny</div>
                    <div class="oracle-seal-name">${seal.name}</div>
                </div>
                <div class="oracle-position antipode">
                    <div class="oracle-mini-glyph ${oracle.antipode.color}">${oracle.antipode.glyph}</div>
                    <div class="oracle-role">Challenge</div>
                    <div class="oracle-seal-name">${oracle.antipode.name}</div>
                </div>
                <div class="oracle-position occult">
                    <div class="oracle-mini-glyph ${oracle.occult.seal.color}">${oracle.occult.seal.glyph}</div>
                    <div class="oracle-role">Hidden Power</div>
                    <div class="oracle-seal-name">${oracle.occult.seal.name}</div>
                </div>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-card">
                <div class="info-card-title">Wavespell</div>
                <div class="info-card-value">${wavespell.seal.name}</div>
                <div class="info-card-desc">Day ${wavespell.currentDay} of 13</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Castle</div>
                <div class="info-card-value">${castle.name}</div>
                <div class="info-card-desc">Castle ${castle.number} of 5</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Earth Family</div>
                <div class="info-card-value">${seal.earthFamily}</div>
                <div class="info-card-desc">${seal.chakra} Chakra</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Mayan Name</div>
                <div class="info-card-value">${seal.mayanName}</div>
                <div class="info-card-desc">Traditional glyph</div>
            </div>
        </div>

        <div class="meanings-container">
            <h3 class="meanings-title">Understanding Your Signature</h3>

            <div class="meaning-block">
                <h4 class="${seal.color}">${seal.name} — Your Destiny Seal</h4>
                <p>${seal.description}</p>
                <div class="keywords">
                    <span class="keyword">Action: ${seal.action}</span>
                    <span class="keyword">Essence: ${seal.essence}</span>
                    <span class="keyword">Power: ${seal.power}</span>
                </div>
            </div>

            <div class="meaning-block">
                <h4 class="yellow">${tone.name} Tone — Your Cosmic Frequency</h4>
                <p>${tone.description}</p>
                <div class="keywords">
                    ${tone.keywords.map(k => `<span class="keyword">${k}</span>`).join('')}
                </div>
                <p style="margin-top: 0.75rem; font-style: italic; color: var(--text-muted);">
                    Question: ${tone.question}
                </p>
            </div>

            <div class="meaning-block">
                <h4 class="${oracle.guide.color}">${oracle.guide.name} — Your Guide</h4>
                <p>The Guide represents your higher self and the energy that leads you toward your purpose. ${oracle.guide.description.split('.')[0]}.</p>
            </div>

            <div class="meaning-block">
                <h4 class="${oracle.analog.color}">${oracle.analog.name} — Your Support</h4>
                <p>The Analog is your compatible energy, offering support and harmony. ${oracle.analog.description.split('.')[0]}.</p>
            </div>

            <div class="meaning-block">
                <h4 class="${oracle.antipode.color}">${oracle.antipode.name} — Your Challenge</h4>
                <p>The Antipode represents your challenge that ultimately strengthens you. ${oracle.antipode.description.split('.')[0]}.</p>
            </div>

            <div class="meaning-block">
                <h4 class="${oracle.occult.seal.color}">${oracle.occult.seal.name} — Your Hidden Power</h4>
                <p>The Occult is your hidden, unexpected gift that emerges mysteriously. ${oracle.occult.seal.description.split('.')[0]}.</p>
            </div>
        </div>
    `;

    document.getElementById('signatureResult').innerHTML = resultHTML;
}

window.decodeSignature = function() {
    const dateInput = document.getElementById('birthdate');
    if (!dateInput.value) {
        alert('Please enter a date');
        return;
    }

    const [year, month, day] = dateInput.value.split('-').map(Number);
    const kin = calculateKin(year, month, day);
    displayResult(kin, dateInput.value);
};

window.calculateToday = function() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    document.getElementById('birthdate').value = dateString;

    const kin = calculateKin(today.getFullYear(), today.getMonth() + 1, today.getDate());
    displayResult(kin, dateString);
};

// ============================================
// TODAY'S ENERGY SECTION
// ============================================

function displayTodaysEnergy() {
    const today = new Date();
    const kin = calculateKin(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const oracle = getOracle(kin);
    const wavespell = getWavespell(kin);
    const castle = getCastle(kin);
    const seal = oracle.destiny;
    const tone = oracle.tone;

    const fullSignature = `${seal.color.charAt(0).toUpperCase() + seal.color.slice(1)} ${tone.name} ${seal.name.split(' ')[1]}`;

    // Build wavespell days
    let wavespellDays = '';
    for (let i = 0; i < 13; i++) {
        const dayKin = wavespell.startKin + i;
        const daySeal = getSealFromKin(dayKin);
        const dayColor = SOLAR_SEALS[daySeal - 1].color;
        const isCurrentDay = i + 1 === wavespell.currentDay;
        wavespellDays += `<div class="wavespell-day ${dayColor} ${isCurrentDay ? 'current' : ''}" title="Kin ${dayKin}">${i + 1}</div>`;
    }

    document.getElementById('todayContainer').innerHTML = `
        <div class="today-header">
            <h2>Today's Galactic Energy</h2>
            <div class="today-date">${today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <div class="signature-header" style="margin-top: 2rem;">
            <div class="kin-number">KIN ${kin} ${oracle.isGAP ? '• GALACTIC ACTIVATION PORTAL' : ''}</div>
            <h2 class="signature-title ${seal.color}">${fullSignature}</h2>
            <p class="signature-affirmation">"${tone.affirmation}"</p>
        </div>

        <div class="glyph-display">
            <div class="glyph-card">
                <div class="glyph-symbol ${seal.color} ${oracle.isGAP ? 'gap' : ''}">${seal.glyph}</div>
                <div class="glyph-label">Solar Seal</div>
                <div class="glyph-name">${seal.name}</div>
            </div>
            <div class="glyph-card">
                <div class="glyph-symbol yellow" style="font-size: 2rem; font-weight: bold;">${tone.number}</div>
                <div class="glyph-label">Galactic Tone</div>
                <div class="glyph-name">${tone.name}</div>
            </div>
        </div>

        ${oracle.isGAP ? '<div style="text-align: center;"><span class="gap-badge">Galactic Activation Portal Day</span></div>' : ''}

        <div class="oracle-container">
            <div class="oracle-title">Today's Oracle</div>
            <div class="oracle-grid">
                <div class="oracle-position guide">
                    <div class="oracle-mini-glyph ${oracle.guide.color}">${oracle.guide.glyph}</div>
                    <div class="oracle-role">Guide</div>
                    <div class="oracle-seal-name">${oracle.guide.name}</div>
                </div>
                <div class="oracle-position analog">
                    <div class="oracle-mini-glyph ${oracle.analog.color}">${oracle.analog.glyph}</div>
                    <div class="oracle-role">Support</div>
                    <div class="oracle-seal-name">${oracle.analog.name}</div>
                </div>
                <div class="oracle-position destiny ${seal.color}">
                    <div class="oracle-mini-glyph ${seal.color}">${seal.glyph}</div>
                    <div class="oracle-role">Destiny</div>
                    <div class="oracle-seal-name">${seal.name}</div>
                </div>
                <div class="oracle-position antipode">
                    <div class="oracle-mini-glyph ${oracle.antipode.color}">${oracle.antipode.glyph}</div>
                    <div class="oracle-role">Challenge</div>
                    <div class="oracle-seal-name">${oracle.antipode.name}</div>
                </div>
                <div class="oracle-position occult">
                    <div class="oracle-mini-glyph ${oracle.occult.seal.color}">${oracle.occult.seal.glyph}</div>
                    <div class="oracle-role">Hidden Power</div>
                    <div class="oracle-seal-name">${oracle.occult.seal.name}</div>
                </div>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-card">
                <div class="info-card-title">Action</div>
                <div class="info-card-value">${seal.action}</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Essence</div>
                <div class="info-card-value">${seal.essence}</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Power</div>
                <div class="info-card-value">${seal.power}</div>
            </div>
            <div class="info-card">
                <div class="info-card-title">Question</div>
                <div class="info-card-value" style="font-size: 0.9rem;">${tone.question}</div>
            </div>
        </div>

        <div class="wavespell-container">
            <div class="wavespell-title">Current Wavespell: ${wavespell.seal.name} (Day ${wavespell.currentDay} of 13)</div>
            <div class="wavespell-days">
                ${wavespellDays}
            </div>
        </div>

        <div class="meaning-block" style="margin-top: 2rem; text-align: left;">
            <h4 class="${seal.color}">Today's Message</h4>
            <p>${seal.description}</p>
            <p style="margin-top: 1rem;">${tone.description}</p>
        </div>
    `;
}

// ============================================
// TZOLKIN MATRIX
// ============================================

function displayTzolkinMatrix() {
    const matrix = document.getElementById('tzolkinMatrix');
    const headers = document.getElementById('sealHeaders');

    // Create seal headers
    let headersHTML = '';
    for (let i = 0; i < 20; i++) {
        headersHTML += `<div class="seal-header" title="${SOLAR_SEALS[i].name}">${SOLAR_SEALS[i].glyph}</div>`;
    }
    headers.innerHTML = headersHTML;

    // Create matrix cells
    // The Tzolkin is a 13-row x 20-column matrix
    // Kin flows DOWN columns: 1,2,3...13 (col 1), 14,15...26 (col 2), etc.
    // For CSS grid (left-to-right), we render row by row:
    // Row 1 (tone 1): kins 1, 14, 27, 40... (tone 1 of each seal)
    // Row 2 (tone 2): kins 2, 15, 28, 41... (tone 2 of each seal)
    let matrixHTML = '';
    for (let tone = 1; tone <= 13; tone++) {
        for (let seal = 1; seal <= 20; seal++) {
            // Kin number: each column (seal) has 13 kins
            const kinNumber = (seal - 1) * 13 + tone;
            const sealData = SOLAR_SEALS[seal - 1];
            const isGapDay = isGAP(kinNumber);
            const toneData = GALACTIC_TONES[tone - 1];

            matrixHTML += `
                <div class="tzolkin-cell ${sealData.color} ${isGapDay ? 'gap' : ''}"
                     data-kin="${kinNumber}"
                     title="Kin ${kinNumber}: ${toneData.name} ${sealData.name.split(' ')[1]}"
                     onclick="selectKinFromMatrix(${kinNumber})">
                    ${kinNumber}
                </div>
            `;
        }
    }
    matrix.innerHTML = matrixHTML;
}

window.selectKinFromMatrix = function(kin) {
    // Highlight selected cell
    document.querySelectorAll('.tzolkin-cell').forEach(cell => {
        cell.classList.remove('selected');
    });
    document.querySelector(`[data-kin="${kin}"]`).classList.add('selected');

    // Show details in tooltip or navigate
    const oracle = getOracle(kin);
    const seal = oracle.destiny;
    const tone = oracle.tone;

    const tooltip = document.getElementById('tooltip');
    const cell = document.querySelector(`[data-kin="${kin}"]`);
    const rect = cell.getBoundingClientRect();

    tooltip.querySelector('.tooltip-title').innerHTML = `<span style="color: var(--${seal.color}-seal-light)">Kin ${kin}: ${seal.color.charAt(0).toUpperCase() + seal.color.slice(1)} ${tone.name} ${seal.name.split(' ')[1]}</span>`;
    tooltip.querySelector('.tooltip-content').innerHTML = `
        ${seal.glyph} ${seal.name}<br>
        Tone ${tone.number}: ${tone.name}<br>
        ${oracle.isGAP ? '⬥ Galactic Activation Portal' : ''}
    `;

    tooltip.style.left = rect.left + rect.width / 2 - 140 + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';
    tooltip.classList.add('visible');

    setTimeout(() => {
        tooltip.classList.remove('visible');
    }, 3000);
};

// ============================================
// SEALS REFERENCE
// ============================================

function displaySealsReference() {
    const grid = document.getElementById('sealsGrid');

    let html = '';
    SOLAR_SEALS.forEach(seal => {
        html += `
            <div class="seal-card ${seal.color}">
                <div class="seal-card-header">
                    <div class="seal-card-glyph ${seal.color}">${seal.glyph}</div>
                    <div class="seal-card-info">
                        <h3 class="${seal.color}">${seal.name}</h3>
                        <div class="seal-number">Seal ${seal.number} • ${seal.mayanName}</div>
                    </div>
                </div>
                <div class="seal-attributes">
                    <div class="seal-attr">
                        <div class="seal-attr-label">Action</div>
                        <div class="seal-attr-value">${seal.action}</div>
                    </div>
                    <div class="seal-attr">
                        <div class="seal-attr-label">Essence</div>
                        <div class="seal-attr-value">${seal.essence}</div>
                    </div>
                    <div class="seal-attr">
                        <div class="seal-attr-label">Power</div>
                        <div class="seal-attr-value">${seal.power}</div>
                    </div>
                </div>
                <p class="seal-description">${seal.description}</p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted);">
                    <strong>Earth Family:</strong> ${seal.earthFamily} • <strong>Chakra:</strong> ${seal.chakra}
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// ============================================
// TONES REFERENCE
// ============================================

function displayTonesReference() {
    const grid = document.getElementById('tonesGrid');

    let html = '';
    GALACTIC_TONES.forEach(tone => {
        html += `
            <div class="tone-card">
                <div class="tone-card-header">
                    <div class="tone-number">${tone.number}</div>
                    <div class="tone-name">${tone.name}</div>
                </div>
                <div class="tone-keywords">
                    ${tone.keywords.map(k => `<span class="tone-keyword">${k}</span>`).join('')}
                </div>
                <p class="tone-description">${tone.description}</p>
                <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        <strong>Power:</strong> ${tone.power}
                    </div>
                    <div style="font-size: 0.85rem; font-style: italic; color: var(--yellow-seal-light); margin-top: 0.5rem;">
                        "${tone.question}"
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// ============================================
// NAVIGATION
// ============================================

document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding section
        const sectionId = tab.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        // Initialize section content if needed
        if (sectionId === 'today') {
            displayTodaysEnergy();
        } else if (sectionId === 'tzolkin') {
            displayTzolkinMatrix();
        } else if (sectionId === 'seals') {
            displaySealsReference();
        } else if (sectionId === 'tones') {
            displayTonesReference();
        }
    });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set max date to today for birthdate input
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthdate').max = today;

    // Hide tooltip on click elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tzolkin-cell')) {
            document.getElementById('tooltip').classList.remove('visible');
        }
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateKin,
        getOracle,
        getWavespell,
        getCastle,
        SOLAR_SEALS,
        GALACTIC_TONES
    };
}
