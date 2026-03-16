export interface NumberItem {
  number: number;
  hebrew: string;
  hebrewFemale?: string;
  english: string;
}

export const numbers1to20: NumberItem[] = [
  { number: 0, hebrew: "אפס", english: "Zero" },
  { number: 1, hebrew: "אחד", hebrewFemale: "אחת", english: "One" },
  { number: 2, hebrew: "שניים", hebrewFemale: "שתיים", english: "Two" },
  { number: 3, hebrew: "שלושה", hebrewFemale: "שלוש", english: "Three" },
  { number: 4, hebrew: "ארבעה", hebrewFemale: "ארבע", english: "Four" },
  { number: 5, hebrew: "חמישה", hebrewFemale: "חמש", english: "Five" },
  { number: 6, hebrew: "שישה", hebrewFemale: "שש", english: "Six" },
  { number: 7, hebrew: "שבעה", hebrewFemale: "שבע", english: "Seven" },
  { number: 8, hebrew: "שמונה", hebrewFemale: "שמונה", english: "Eight" },
  { number: 9, hebrew: "תשעה", hebrewFemale: "תשע", english: "Nine" },
  { number: 10, hebrew: "עשרה", hebrewFemale: "עשר", english: "Ten" },
  { number: 11, hebrew: "אחד עשר", hebrewFemale: "אחת עשרה", english: "Eleven" },
  { number: 12, hebrew: "שנים עשר", hebrewFemale: "שתים עשרה", english: "Twelve" },
  { number: 13, hebrew: "שלושה עשר", hebrewFemale: "שלוש עשרה", english: "Thirteen" },
  { number: 14, hebrew: "ארבעה עשר", hebrewFemale: "ארבע עשרה", english: "Fourteen" },
  { number: 15, hebrew: "חמישה עשר", hebrewFemale: "חמש עשרה", english: "Fifteen" },
  { number: 16, hebrew: "שישה עשר", hebrewFemale: "שש עשרה", english: "Sixteen" },
  { number: 17, hebrew: "שבעה עשר", hebrewFemale: "שבע עשרה", english: "Seventeen" },
  { number: 18, hebrew: "שמונה עשר", hebrewFemale: "שמונה עשרה", english: "Eighteen" },
  { number: 19, hebrew: "תשעה עשר", hebrewFemale: "תשע עשרה", english: "Nineteen" },
  { number: 20, hebrew: "עשרים", english: "Twenty" },
];

export const tens: NumberItem[] = [
  { number: 10, hebrew: "עשר", english: "Ten" },
  { number: 20, hebrew: "עשרים", english: "Twenty" },
  { number: 30, hebrew: "שלושים", english: "Thirty" },
  { number: 40, hebrew: "ארבעים", english: "Forty" },
  { number: 50, hebrew: "חמישים", english: "Fifty" },
  { number: 60, hebrew: "שישים", english: "Sixty" },
  { number: 70, hebrew: "שבעים", english: "Seventy" },
  { number: 80, hebrew: "שמונים", english: "Eighty" },
  { number: 90, hebrew: "תשעים", english: "Ninety" },
  { number: 100, hebrew: "מאה", english: "Hundred" },
];

export interface NumberQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const numberQuestions: NumberQuestion[] = [
  { question: "מה המספר 7 בעברית?", questionEn: "What is 7 in Hebrew?", options: ["שבעה", "שישה", "שמונה", "תשעה"], answer: "שבעה" },
  { question: "מה המספר 15 בעברית?", questionEn: "What is 15 in Hebrew?", options: ["חמישה עשר", "שישה עשר", "ארבעה עשר", "שלושה עשר"], answer: "חמישה עשר" },
  { question: "מה המספר 40 בעברית?", questionEn: "What is 40 in Hebrew?", options: ["ארבעים", "חמישים", "שלושים", "שישים"], answer: "ארבעים" },
  { question: "מה המספר 3 בעברית?", questionEn: "What is 3 in Hebrew?", options: ["שלושה", "שניים", "ארבעה", "חמישה"], answer: "שלושה" },
  { question: "מה המספר 100 בעברית?", questionEn: "What is 100 in Hebrew?", options: ["מאה", "תשעים", "שמונים", "שבעים"], answer: "מאה" },
  { question: "מה המספר 12 בעברית?", questionEn: "What is 12 in Hebrew?", options: ["שנים עשר", "אחד עשר", "שלושה עשר", "ארבעה עשר"], answer: "שנים עשר" },
  { question: "מה המספר 60 בעברית?", questionEn: "What is 60 in Hebrew?", options: ["שישים", "שבעים", "חמישים", "ארבעים"], answer: "שישים" },
  { question: "מה המספר 9 בעברית?", questionEn: "What is 9 in Hebrew?", options: ["תשעה", "שמונה", "עשרה", "שבעה"], answer: "תשעה" },
  { question: "מה המספר 50 בעברית?", questionEn: "What is 50 in Hebrew?", options: ["חמישים", "שישים", "ארבעים", "שלושים"], answer: "חמישים" },
  { question: "מה המספר 18 בעברית?", questionEn: "What is 18 in Hebrew?", options: ["שמונה עשר", "תשעה עשר", "שבעה עשר", "שישה עשר"], answer: "שמונה עשר" },
  { question: "מה המספר 2 בעברית?", questionEn: "What is 2 in Hebrew?", options: ["שניים", "שלושה", "אחד", "ארבעה"], answer: "שניים" },
  { question: "מה המספר 70 בעברית?", questionEn: "What is 70 in Hebrew?", options: ["שבעים", "שמונים", "שישים", "תשעים"], answer: "שבעים" },
  { question: "מה המספר 30 בעברית?", questionEn: "What is 30 in Hebrew?", options: ["שלושים", "עשרים", "ארבעים", "חמישים"], answer: "שלושים" },
  { question: "מה המספר 5 בעברית?", questionEn: "What is 5 in Hebrew?", options: ["חמישה", "שישה", "ארבעה", "שבעה"], answer: "חמישה" },
  { question: "מה המספר 90 בעברית?", questionEn: "What is 90 in Hebrew?", options: ["תשעים", "שמונים", "שבעים", "מאה"], answer: "תשעים" },
];
