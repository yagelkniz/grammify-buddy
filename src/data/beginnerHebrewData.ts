export interface CoreVerb {
  word: string;
  wordNikud: string;
  meaning: string;
  examples: { text: string; textNikud: string }[];
}

export const coreVerbs: CoreVerb[] = [
  {
    word: "רוצה",
    wordNikud: "רוֹצֶה",
    meaning: "כשאנחנו רוצים משהו",
    examples: [
      { text: "אני רוצה מים", textNikud: "אֲנִי רוֹצֶה מַיִם" },
      { text: "אני רוצה לאכול", textNikud: "אֲנִי רוֹצֶה לֶאֱכוֹל" },
    ],
  },
  {
    word: "צריך",
    wordNikud: "צָרִיךְ",
    meaning: "כשיש צורך או חובה",
    examples: [
      { text: "אני צריך ללמוד", textNikud: "אֲנִי צָרִיךְ לִלְמוֹד" },
      { text: "אני צריך לחם", textNikud: "אֲנִי צָרִיךְ לֶחֶם" },
    ],
  },
  {
    word: "יכול",
    wordNikud: "יָכוֹל",
    meaning: "כשאפשר לעשות משהו",
    examples: [
      { text: "אני יכול לקרוא", textNikud: "אֲנִי יָכוֹל לִקְרוֹא" },
      { text: "אני יכול ללכת", textNikud: "אֲנִי יָכוֹל לָלֶכֶת" },
    ],
  },
  {
    word: "אוהב",
    wordNikud: "אוֹהֵב",
    meaning: "כשמשהו נעים לנו",
    examples: [
      { text: "אני אוהב לשחק", textNikud: "אֲנִי אוֹהֵב לְשַׂחֵק" },
      { text: "אני אוהב ספרים", textNikud: "אֲנִי אוֹהֵב סְפָרִים" },
    ],
  },
];

export interface InfinitiveVerb {
  word: string;
  wordNikud: string;
  exampleSentence: string;
  exampleSentenceNikud: string;
}

export const infinitiveVerbs: InfinitiveVerb[] = [
  { word: "לאכול", wordNikud: "לֶאֱכוֹל", exampleSentence: "אני רוצה לאכול", exampleSentenceNikud: "אֲנִי רוֹצֶה לֶאֱכוֹל" },
  { word: "לשתות", wordNikud: "לִשְׁתּוֹת", exampleSentence: "אני רוצה לשתות", exampleSentenceNikud: "אֲנִי רוֹצֶה לִשְׁתּוֹת" },
  { word: "ללכת", wordNikud: "לָלֶכֶת", exampleSentence: "אני יכול ללכת", exampleSentenceNikud: "אֲנִי יָכוֹל לָלֶכֶת" },
  { word: "ללמוד", wordNikud: "לִלְמוֹד", exampleSentence: "אני צריך ללמוד", exampleSentenceNikud: "אֲנִי צָרִיךְ לִלְמוֹד" },
  { word: "לכתוב", wordNikud: "לִכְתּוֹב", exampleSentence: "אני יכול לכתוב", exampleSentenceNikud: "אֲנִי יָכוֹל לִכְתּוֹב" },
  { word: "לקרוא", wordNikud: "לִקְרוֹא", exampleSentence: "אני אוהב לקרוא", exampleSentenceNikud: "אֲנִי אוֹהֵב לִקְרוֹא" },
  { word: "לישון", wordNikud: "לִישׁוֹן", exampleSentence: "אני רוצה לישון", exampleSentenceNikud: "אֲנִי רוֹצֶה לִישׁוֹן" },
  { word: "לשחק", wordNikud: "לְשַׂחֵק", exampleSentence: "אני אוהב לשחק", exampleSentenceNikud: "אֲנִי אוֹהֵב לְשַׂחֵק" },
];

export interface VocabWord {
  word: string;
  wordNikud: string;
}

export const nouns: VocabWord[] = [
  { word: "מים", wordNikud: "מַיִם" },
  { word: "לחם", wordNikud: "לֶחֶם" },
  { word: "בית", wordNikud: "בַּיִת" },
  { word: "ספר", wordNikud: "סֵפֶר" },
  { word: "ילד", wordNikud: "יֶלֶד" },
  { word: "ילדה", wordNikud: "יַלְדָּה" },
  { word: "אוכל", wordNikud: "אוֹכֶל" },
  { word: "חדר", wordNikud: "חֶדֶר" },
];

export const adjectives: VocabWord[] = [
  { word: "גדול", wordNikud: "גָּדוֹל" },
  { word: "קטן", wordNikud: "קָטָן" },
  { word: "טוב", wordNikud: "טוֹב" },
  { word: "יפה", wordNikud: "יָפֶה" },
  { word: "חדש", wordNikud: "חָדָשׁ" },
  { word: "חם", wordNikud: "חַם" },
  { word: "קר", wordNikud: "קַר" },
  { word: "נעים", wordNikud: "נָעִים" },
];

export interface SentenceOption {
  text: string;
  textNikud: string;
}

export const sentenceBuilderVerbs: SentenceOption[] = [
  { text: "רוצה", textNikud: "רוֹצֶה" },
  { text: "צריך", textNikud: "צָרִיךְ" },
  { text: "יכול", textNikud: "יָכוֹל" },
  { text: "אוהב", textNikud: "אוֹהֵב" },
];

export const sentenceBuilderObjects: SentenceOption[] = [
  { text: "לאכול", textNikud: "לֶאֱכוֹל" },
  { text: "לשתות", textNikud: "לִשְׁתּוֹת" },
  { text: "ללכת", textNikud: "לָלֶכֶת" },
  { text: "ללמוד", textNikud: "לִלְמוֹד" },
  { text: "לקרוא", textNikud: "לִקְרוֹא" },
  { text: "לישון", textNikud: "לִישׁוֹן" },
  { text: "לשחק", textNikud: "לְשַׂחֵק" },
  { text: "מים", textNikud: "מַיִם" },
  { text: "לחם", textNikud: "לֶחֶם" },
  { text: "ספרים", textNikud: "סְפָרִים" },
  { text: "בית גדול", textNikud: "בַּיִת גָּדוֹל" },
  { text: "אוכל טוב", textNikud: "אוֹכֶל טוֹב" },
];

export interface PracticeQuestion {
  id: string;
  type: "match" | "multiple-choice";
  question: string;
  questionNikud: string;
  options: { text: string; textNikud: string }[];
  correctIndex: number;
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "pq-1",
    type: "multiple-choice",
    question: 'אני ___ לאכול. (כשאני רעב)',
    questionNikud: 'אֲנִי ___ לֶאֱכוֹל. (כְּשֶׁאֲנִי רָעֵב)',
    options: [
      { text: "רוצה", textNikud: "רוֹצֶה" },
      { text: "יכול", textNikud: "יָכוֹל" },
      { text: "אוהב", textNikud: "אוֹהֵב" },
    ],
    correctIndex: 0,
  },
  {
    id: "pq-2",
    type: "multiple-choice",
    question: 'אני ___ לקרוא עברית. (יש לי את היכולת)',
    questionNikud: 'אֲנִי ___ לִקְרוֹא עִבְרִית. (יֵשׁ לִי אֶת הַיְּכוֹלֶת)',
    options: [
      { text: "צריך", textNikud: "צָרִיךְ" },
      { text: "יכול", textNikud: "יָכוֹל" },
      { text: "רוצה", textNikud: "רוֹצֶה" },
    ],
    correctIndex: 1,
  },
  {
    id: "pq-3",
    type: "multiple-choice",
    question: 'אני ___ ללמוד למבחן. (חובה)',
    questionNikud: 'אֲנִי ___ לִלְמוֹד לַמִּבְחָן. (חוֹבָה)',
    options: [
      { text: "אוהב", textNikud: "אוֹהֵב" },
      { text: "רוצה", textNikud: "רוֹצֶה" },
      { text: "צריך", textNikud: "צָרִיךְ" },
    ],
    correctIndex: 2,
  },
  {
    id: "pq-4",
    type: "multiple-choice",
    question: 'אני ___ לשחק כדורגל. (נהנה מזה)',
    questionNikud: 'אֲנִי ___ לְשַׂחֵק כַּדּוּרֶגֶל. (נֶהֱנֶה מִזֶּה)',
    options: [
      { text: "צריך", textNikud: "צָרִיךְ" },
      { text: "אוהב", textNikud: "אוֹהֵב" },
      { text: "יכול", textNikud: "יָכוֹל" },
    ],
    correctIndex: 1,
  },
  {
    id: "pq-5",
    type: "match",
    question: 'מה המילה ההפוכה ל"גדול"?',
    questionNikud: 'מָה הַמִּלָּה הַהֲפוּכָה ל"גָּדוֹל"?',
    options: [
      { text: "יפה", textNikud: "יָפֶה" },
      { text: "קטן", textNikud: "קָטָן" },
      { text: "חם", textNikud: "חַם" },
    ],
    correctIndex: 1,
  },
];
