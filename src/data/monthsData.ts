export interface MonthItem {
  hebrew: string;
  english: string;
  hebrewTraditional: string;
  monthNumber: number;
}

export const months: MonthItem[] = [
  { monthNumber: 1, hebrew: "ינואר", hebrewTraditional: "טבת / שבט", english: "January" },
  { monthNumber: 2, hebrew: "פברואר", hebrewTraditional: "שבט / אדר", english: "February" },
  { monthNumber: 3, hebrew: "מרץ", hebrewTraditional: "אדר / ניסן", english: "March" },
  { monthNumber: 4, hebrew: "אפריל", hebrewTraditional: "ניסן / אייר", english: "April" },
  { monthNumber: 5, hebrew: "מאי", hebrewTraditional: "אייר / סיוון", english: "May" },
  { monthNumber: 6, hebrew: "יוני", hebrewTraditional: "סיוון / תמוז", english: "June" },
  { monthNumber: 7, hebrew: "יולי", hebrewTraditional: "תמוז / אב", english: "July" },
  { monthNumber: 8, hebrew: "אוגוסט", hebrewTraditional: "אב / אלול", english: "August" },
  { monthNumber: 9, hebrew: "ספטמבר", hebrewTraditional: "אלול / תשרי", english: "September" },
  { monthNumber: 10, hebrew: "אוקטובר", hebrewTraditional: "תשרי / חשוון", english: "October" },
  { monthNumber: 11, hebrew: "נובמבר", hebrewTraditional: "חשוון / כסלו", english: "November" },
  { monthNumber: 12, hebrew: "דצמבר", hebrewTraditional: "כסלו / טבת", english: "December" },
];

export interface MonthQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const monthQuestions: MonthQuestion[] = [
  { question: "איזה חודש מספר 1?", questionEn: "Which is month number 1?", options: ["ינואר", "פברואר", "מרץ", "דצמבר"], answer: "ינואר" },
  { question: "איזה חודש מספר 7?", questionEn: "Which is month number 7?", options: ["יולי", "יוני", "אוגוסט", "מאי"], answer: "יולי" },
  { question: "איזה חודש בא אחרי מרץ?", questionEn: "Which month comes after March?", options: ["אפריל", "מאי", "פברואר", "יוני"], answer: "אפריל" },
  { question: "איזה חודש בא לפני דצמבר?", questionEn: "Which month comes before December?", options: ["נובמבר", "אוקטובר", "ספטמבר", "ינואר"], answer: "נובמבר" },
  { question: "באיזה חודש חוגגים ראש השנה?", questionEn: "In which month is Rosh Hashana?", options: ["ספטמבר", "אוקטובר", "אוגוסט", "נובמבר"], answer: "ספטמבר" },
  { question: "איזה חודש מספר 5?", questionEn: "Which is month number 5?", options: ["מאי", "יוני", "אפריל", "מרץ"], answer: "מאי" },
  { question: "מה החודש האחרון בשנה?", questionEn: "What is the last month of the year?", options: ["דצמבר", "נובמבר", "ינואר", "אוקטובר"], answer: "דצמבר" },
  { question: "איזה חודש מספר 3?", questionEn: "Which is month number 3?", options: ["מרץ", "אפריל", "פברואר", "מאי"], answer: "מרץ" },
  { question: "איזה חודש הכי חם בישראל?", questionEn: "Which is the hottest month in Israel?", options: ["אוגוסט", "יולי", "יוני", "ספטמבר"], answer: "אוגוסט" },
  { question: "איזה חודש מספר 10?", questionEn: "Which is month number 10?", options: ["אוקטובר", "נובמבר", "ספטמבר", "דצמבר"], answer: "אוקטובר" },
];
