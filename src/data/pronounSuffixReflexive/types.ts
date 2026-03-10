export interface FormEntry {
  pronoun: string;
  pronounEn: string;
  form: string;
  formEn: string;
}

export interface ExampleSentence {
  he: string;
  en: string;
}

export interface FillInQuestion {
  id: string;
  sentence: string;
  translation: string;
  options: string[];
  correct: string;
}

export interface FlashcardQuestion {
  id: string;
  source: string;
  answer: string;
  direction: "en-he" | "he-en";
}

export interface ConversationQuestion {
  he: string;
  en: string;
}

export interface FormsTable {
  preposition: string;
  prepositionEn: string;
  note?: string;
  noteEn?: string;
  forms: FormEntry[];
}

export interface Level {
  id: string;
  title: string;
  titleEn: string;
  goal: string;
  goalEn: string;
  tables: FormsTable[];
  examples: ExampleSentence[];
  fillIn: FillInQuestion[];
  translateEnHe: FlashcardQuestion[];
  translateHeEn: FlashcardQuestion[];
  conversation: ConversationQuestion[];
}

export interface FinalQuizQuestion {
  id: string;
  sentence: string;
  translation: string;
  options: string[];
  correct: string;
}

export interface HomeworkSection {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  items: { he: string; en: string }[];
}
