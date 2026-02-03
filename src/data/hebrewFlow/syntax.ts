// Syntax and Grammar Data

export interface GrammarConcept {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  examples: {
    text: string;
    textWithNikud: string;
    translation: string;
    explanation: string;
    explanationHe: string;
  }[];
}

// Prepositions (אותיות השימוש)
export const prepositions: GrammarConcept = {
  id: "prepositions",
  name: "Prepositions",
  nameHe: "מילות יחס",
  description: "Hebrew has inseparable prepositions that attach directly to words: ב (in/at), ל (to/for), מ (from), כ (like/as).",
  descriptionHe: "בעברית יש אותיות שימוש שמתחברות ישירות למילים: ב (בתוך/ב), ל (אל/בשביל), מ (מ-), כ (כמו).",
  examples: [
    {
      text: "בבית",
      textWithNikud: "בַּבַּיִת",
      translation: "in the house / at home",
      explanation: "ב (in) + בית (house) = בבית",
      explanationHe: "ב (בתוך) + בית = בבית",
    },
    {
      text: "לילד",
      textWithNikud: "לַיֶּלֶד",
      translation: "to the child / for the child",
      explanation: "ל (to) + ילד (child) = לילד",
      explanationHe: "ל (אל) + ילד = לילד",
    },
    {
      text: "מהעיר",
      textWithNikud: "מֵהָעִיר",
      translation: "from the city",
      explanation: "מ (from) + ה (the) + עיר (city) = מהעיר",
      explanationHe: "מ (מ-) + ה (ה-הידיעה) + עיר = מהעיר",
    },
    {
      text: "כמלך",
      textWithNikud: "כְּמֶלֶךְ",
      translation: "like a king",
      explanation: "כ (like) + מלך (king) = כמלך",
      explanationHe: "כ (כמו) + מלך = כמלך",
    },
  ],
};

// Definite Article (ה הידיעה)
export const definiteArticle: GrammarConcept = {
  id: "definite-article",
  name: "The Definite Article",
  nameHe: "ה הידיעה",
  description: "Hebrew uses ה- as a prefix to indicate 'the'. The vowel underneath changes based on the following letter.",
  descriptionHe: "עברית משתמשת ב-ה- כתחילית לציון 'ה-הידיעה'. הניקוד משתנה לפי האות הבאה.",
  examples: [
    {
      text: "הספר",
      textWithNikud: "הַסֵּפֶר",
      translation: "the book",
      explanation: "Standard ה with patach (הַ) before most consonants",
      explanationHe: "ה רגילה עם פתח (הַ) לפני רוב העיצורים",
    },
    {
      text: "הילד",
      textWithNikud: "הַיֶּלֶד",
      translation: "the child",
      explanation: "Before י the ה takes patach",
      explanationHe: "לפני י ה-ה מקבלת פתח",
    },
    {
      text: "האיש",
      textWithNikud: "הָאִישׁ",
      translation: "the man",
      explanation: "Before gutturals (א,ה,ח,ע) the ה often takes kamatz",
      explanationHe: "לפני אותיות גרוניות (א,ה,ח,ע) ה-ה מקבלת קמץ",
    },
    {
      text: "ההר",
      textWithNikud: "הָהָר",
      translation: "the mountain",
      explanation: "Before ה the article doubles (הָהָ)",
      explanationHe: "לפני ה האות מוכפלת (הָהָ)",
    },
  ],
};

// Construct State (סמיכות)
export const constructState: GrammarConcept = {
  id: "smichut",
  name: "Construct State (Smichut)",
  nameHe: "סמיכות",
  description: "A grammatical structure where two nouns combine to show possession or relationship. The first noun (סומך) changes form.",
  descriptionHe: "מבנה דקדוקי שבו שני שמות עצם מתחברים להראות שייכות או קשר. השם הראשון (סומך) משתנה.",
  examples: [
    {
      text: "בית ספר",
      textWithNikud: "בֵּית סֵפֶר",
      translation: "school (lit: house of book)",
      explanation: "בית (house) + ספר (book) - בית changes from בַּיִת to בֵּית",
      explanationHe: "בית + ספר - בית משתנה מבַּיִת לבֵּית",
    },
    {
      text: "שולחן כתיבה",
      textWithNikud: "שֻׁלְחַן כְּתִיבָה",
      translation: "desk (lit: table of writing)",
      explanation: "שולחן (table) + כתיבה (writing)",
      explanationHe: "שולחן + כתיבה",
    },
    {
      text: "חדר שינה",
      textWithNikud: "חֲדַר שֵׁינָה",
      translation: "bedroom (lit: room of sleep)",
      explanation: "חדר (room) + שינה (sleep) - חדר changes from חֶדֶר to חֲדַר",
      explanationHe: "חדר + שינה - חדר משתנה מחֶדֶר לחֲדַר",
    },
    {
      text: "בת הדודה",
      textWithNikud: "בַּת הַדּוֹדָה",
      translation: "the aunt's daughter / cousin (f)",
      explanation: "בת (daughter) + הדודה (the aunt) - definite article on second noun",
      explanationHe: "בת + הדודה - ה-הידיעה על השם השני",
    },
  ],
};

// Gender and Number Agreement
export const genderNumber: GrammarConcept = {
  id: "gender-number",
  name: "Gender & Number Agreement",
  nameHe: "התאמה במין ומספר",
  description: "Verbs, adjectives, and pronouns must agree with nouns in gender (masculine/feminine) and number (singular/plural).",
  descriptionHe: "פעלים, תארים וכינויים חייבים להתאים לשמות במין (זכר/נקבה) ובמספר (יחיד/רבים).",
  examples: [
    {
      text: "הילד הגדול לומד",
      textWithNikud: "הַיֶּלֶד הַגָּדוֹל לוֹמֵד",
      translation: "The big boy learns",
      explanation: "All masculine singular: ילד, גדול, לומד",
      explanationHe: "הכל זכר יחיד: ילד, גדול, לומד",
    },
    {
      text: "הילדה הגדולה לומדת",
      textWithNikud: "הַיַּלְדָּה הַגְּדוֹלָה לוֹמֶדֶת",
      translation: "The big girl learns",
      explanation: "All feminine singular: ילדה, גדולה, לומדת",
      explanationHe: "הכל נקבה יחיד: ילדה, גדולה, לומדת",
    },
    {
      text: "הילדים הגדולים לומדים",
      textWithNikud: "הַיְּלָדִים הַגְּדוֹלִים לוֹמְדִים",
      translation: "The big children (m) learn",
      explanation: "All masculine plural: ילדים, גדולים, לומדים",
      explanationHe: "הכל זכר רבים: ילדים, גדולים, לומדים",
    },
    {
      text: "הילדות הגדולות לומדות",
      textWithNikud: "הַיְּלָדוֹת הַגְּדוֹלוֹת לוֹמְדוֹת",
      translation: "The big girls learn",
      explanation: "All feminine plural: ילדות, גדולות, לומדות",
      explanationHe: "הכל נקבה רבים: ילדות, גדולות, לומדות",
    },
  ],
};

// Noun Patterns
export interface NounPattern {
  pattern: string;
  patternWithNikud: string;
  gender: "masculine" | "feminine" | "both";
  description: string;
  descriptionHe: string;
  examples: { word: string; wordWithNikud: string; meaning: string }[];
}

export const nounPatterns: NounPattern[] = [
  {
    pattern: "קטל",
    patternWithNikud: "קֶטֶל",
    gender: "masculine",
    description: "Common masculine noun pattern",
    descriptionHe: "משקל שם עצם זכר נפוץ",
    examples: [
      { word: "ספר", wordWithNikud: "סֵפֶר", meaning: "book" },
      { word: "ילד", wordWithNikud: "יֶלֶד", meaning: "child" },
      { word: "דלת", wordWithNikud: "דֶּלֶת", meaning: "door" },
    ],
  },
  {
    pattern: "קטלה",
    patternWithNikud: "קְטָלָה",
    gender: "feminine",
    description: "Common feminine noun pattern ending in ה-",
    descriptionHe: "משקל שם עצם נקבה נפוץ המסתיים ב-ה",
    examples: [
      { word: "ילדה", wordWithNikud: "יַלְדָּה", meaning: "girl" },
      { word: "מורה", wordWithNikud: "מוֹרָה", meaning: "teacher (f)" },
      { word: "שנה", wordWithNikud: "שָׁנָה", meaning: "year" },
    ],
  },
  {
    pattern: "מקטל",
    patternWithNikud: "מִקְטָל",
    gender: "masculine",
    description: "Noun pattern often indicating place or instrument",
    descriptionHe: "משקל המציין מקום או כלי",
    examples: [
      { word: "מכתב", wordWithNikud: "מִכְתָּב", meaning: "letter" },
      { word: "מפתח", wordWithNikud: "מַפְתֵּחַ", meaning: "key" },
      { word: "מסעדה", wordWithNikud: "מִסְעָדָה", meaning: "restaurant" },
    ],
  },
];

export const allGrammarConcepts = [
  prepositions,
  definiteArticle,
  constructState,
  genderNumber,
];
