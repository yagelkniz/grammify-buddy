
export interface VerbConjugation {
  pronoun: string;
  pronounEn: string;
  form: string;
}

export interface ExampleSentence {
  hebrew: string;
  english: string;
}

export interface PracticeQuestion {
  id: number;
  type: "fill" | "translate" | "multiple";
  question: string;
  options?: string[];
  answer: string;
  hebrew?: string;
}

export const verbToBeConjugations = {
  past: [
    { pronoun: "אני", pronounEn: "I", form: "הייתי" },
    { pronoun: "אתה", pronounEn: "You (m.)", form: "היית" },
    { pronoun: "את", pronounEn: "You (f.)", form: "היית" },
    { pronoun: "הוא", pronounEn: "He", form: "היה" },
    { pronoun: "היא", pronounEn: "She", form: "הייתה" },
    { pronoun: "אנחנו", pronounEn: "We", form: "היינו" },
    { pronoun: "אתם", pronounEn: "You (pl.)", form: "הייתם" },
    { pronoun: "הם", pronounEn: "They", form: "היו" }
  ],
  present: [
    { pronoun: "אני", pronounEn: "I", form: "אני" },
    { pronoun: "אתה", pronounEn: "You (m.)", form: "אתה" },
    { pronoun: "את", pronounEn: "You (f.)", form: "את" },
    { pronoun: "הוא", pronounEn: "He", form: "הוא" },
    { pronoun: "היא", pronounEn: "She", form: "היא" },
    { pronoun: "אנחנו", pronounEn: "We", form: "אנחנו" },
    { pronoun: "אתם", pronounEn: "You (pl.)", form: "אתם" },
    { pronoun: "הם", pronounEn: "They", form: "הם" }
  ],
  future: [
    { pronoun: "אני", pronounEn: "I", form: "אהיה" },
    { pronoun: "אתה", pronounEn: "You (m.)", form: "תהיה" },
    { pronoun: "את", pronounEn: "You (f.)", form: "תהיי" },
    { pronoun: "הוא", pronounEn: "He", form: "יהיה" },
    { pronoun: "היא", pronounEn: "She", form: "תהיה" },
    { pronoun: "אנחנו", pronounEn: "We", form: "נהיה" },
    { pronoun: "אתם", pronounEn: "You (pl.)", form: "תהיו" },
    { pronoun: "הם", pronounEn: "They", form: "יהיו" }
  ]
};

export const exampleSentences = {
  past: [
    { hebrew: "אני הייתי במסעדה אתמול", english: "I was at the restaurant yesterday" },
    { hebrew: "הם היו חברים טובים", english: "They were good friends" }
  ],
  present: [
    { hebrew: "אני סטודנט באוניברסיטה", english: "I am a student at the university" },
    { hebrew: "היא מורה טובה", english: "She is a good teacher" }
  ],
  future: [
    { hebrew: "אני אהיה רופא בעתיד", english: "I will be a doctor in the future" },
    { hebrew: "הם יהיו שמחים לראות אותך", english: "They will be happy to see you" }
  ]
};

export const practiceQuestions: PracticeQuestion[] = [
  // Fill-in-the-blanks
  {
    id: 1,
    type: "fill",
    question: "אני ___ סטודנט (I am a student)",
    answer: "אני",
    hebrew: "אני אני סטודנט"
  },
  {
    id: 2,
    type: "fill",
    question: "הוא ___ רופא אתמול (He was a doctor yesterday)",
    answer: "היה",
    hebrew: "הוא היה רופא אתמול"
  },
  {
    id: 3,
    type: "fill",
    question: "היא ___ מורה מחר (She will be a teacher tomorrow)",
    answer: "תהיה",
    hebrew: "היא תהיה מורה מחר"
  },
  {
    id: 4,
    type: "fill",
    question: "אנחנו ___ בבית (We are at home)",
    answer: "אנחנו",
    hebrew: "אנחנו אנחנו בבית"
  },
  {
    id: 5,
    type: "fill",
    question: "הם ___ עייפים אתמול (They were tired yesterday)",
    answer: "היו",
    hebrew: "הם היו עייפים אתמול"
  },
  
  // Translation Practice
  {
    id: 6,
    type: "translate",
    question: "I will be happy",
    answer: "אני אהיה שמח",
    hebrew: "אני אהיה שמח"
  },
  {
    id: 7,
    type: "translate",
    question: "She was beautiful",
    answer: "היא הייתה יפה",
    hebrew: "היא הייתה יפה"
  },
  {
    id: 8,
    type: "translate",
    question: "We are friends",
    answer: "אנחנו חברים",
    hebrew: "אנחנו חברים"
  },
  {
    id: 9,
    type: "translate",
    question: "You will be successful",
    answer: "אתה תהיה מצליח",
    hebrew: "אתה תהיה מצליח"
  },
  {
    id: 10,
    type: "translate",
    question: "They were here",
    answer: "הם היו כאן",
    hebrew: "הם היו כאן"
  },
  
  // Multiple Choice
  {
    id: 11,
    type: "multiple",
    question: "אני ___ באוניברסיטה מחר (I will be at the university tomorrow)",
    options: ["אהיה", "הייתי", "אני"],
    answer: "אהיה",
    hebrew: "אני אהיה באוניברסיטה מחר"
  },
  {
    id: 12,
    type: "multiple",
    question: "הם ___ כאן (They are here)",
    options: ["היו", "יהיו", "הם"],
    answer: "הם",
    hebrew: "הם הם כאן"
  },
  {
    id: 13,
    type: "multiple",
    question: "היא ___ מורה בעבר (She was a teacher in the past)",
    options: ["תהיה", "הייתה", "היא"],
    answer: "הייתה",
    hebrew: "היא הייתה מורה בעבר"
  },
  {
    id: 14,
    type: "multiple",
    question: "אתה ___ חכם (You are smart)",
    options: ["תהיה", "היית", "אתה"],
    answer: "אתה",
    hebrew: "אתה אתה חכם"
  },
  {
    id: 15,
    type: "multiple",
    question: "אנחנו ___ שמחים מחר (We will be happy tomorrow)",
    options: ["היינו", "נהיה", "אנחנו"],
    answer: "נהיה",
    hebrew: "אנחנו נהיה שמחים מחר"
  }
];
