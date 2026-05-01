export interface OrdinalEntry {
  number: number;
  digit: string;
  masculineHe: string;
  masculineNikud: string;
  masculineTrans: string;
  feminineHe: string;
  feminineNikud: string;
  feminineTrans: string;
  english: string;
}

export const ordinalNumbers: OrdinalEntry[] = [
  { number: 1, digit: "1°", masculineHe: "ראשון", masculineNikud: "רִאשׁוֹן", masculineTrans: "rishon", feminineHe: "ראשונה", feminineNikud: "רִאשׁוֹנָה", feminineTrans: "rishona", english: "first" },
  { number: 2, digit: "2°", masculineHe: "שני", masculineNikud: "שֵׁנִי", masculineTrans: "sheni", feminineHe: "שנייה", feminineNikud: "שְׁנִיָּה", feminineTrans: "shniya", english: "second" },
  { number: 3, digit: "3°", masculineHe: "שלישי", masculineNikud: "שְׁלִישִׁי", masculineTrans: "shlishi", feminineHe: "שלישית", feminineNikud: "שְׁלִישִׁית", feminineTrans: "shlishit", english: "third" },
  { number: 4, digit: "4°", masculineHe: "רביעי", masculineNikud: "רְבִיעִי", masculineTrans: "revi'i", feminineHe: "רביעית", feminineNikud: "רְבִיעִית", feminineTrans: "revi'it", english: "fourth" },
  { number: 5, digit: "5°", masculineHe: "חמישי", masculineNikud: "חֲמִישִׁי", masculineTrans: "chamishi", feminineHe: "חמישית", feminineNikud: "חֲמִישִׁית", feminineTrans: "chamishit", english: "fifth" },
  { number: 6, digit: "6°", masculineHe: "שישי", masculineNikud: "שִׁשִּׁי", masculineTrans: "shishi", feminineHe: "שישית", feminineNikud: "שִׁשִּׁית", feminineTrans: "shishit", english: "sixth" },
  { number: 7, digit: "7°", masculineHe: "שביעי", masculineNikud: "שְׁבִיעִי", masculineTrans: "shvi'i", feminineHe: "שביעית", feminineNikud: "שְׁבִיעִית", feminineTrans: "shvi'it", english: "seventh" },
  { number: 8, digit: "8°", masculineHe: "שמיני", masculineNikud: "שְׁמִינִי", masculineTrans: "shmini", feminineHe: "שמינית", feminineNikud: "שְׁמִינִית", feminineTrans: "shminit", english: "eighth" },
  { number: 9, digit: "9°", masculineHe: "תשיעי", masculineNikud: "תְּשִׁיעִי", masculineTrans: "tshi'i", feminineHe: "תשיעית", feminineNikud: "תְּשִׁיעִית", feminineTrans: "tshi'it", english: "ninth" },
  { number: 10, digit: "10°", masculineHe: "עשירי", masculineNikud: "עֲשִׂירִי", masculineTrans: "asiri", feminineHe: "עשירית", feminineNikud: "עֲשִׂירִית", feminineTrans: "asirit", english: "tenth" },
];

export interface OrdinalQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  options: string[];
  correct: string;
  hint?: string;
}

export const ordinalQuestions: OrdinalQuestion[] = [
  { id: 1, sentence: "אני גר בקומה הַ___ (3, נקבה)", sentenceEn: "I live on the ___ floor (3, fem.)", options: ["שלישית", "שלישי", "שלושה", "שלוש"], correct: "שלישית", hint: "קומה היא נקבה" },
  { id: 2, sentence: "זאת הפעם הַ___ שאני מבקר כאן (2, נקבה)", sentenceEn: "This is the ___ time I'm visiting (2, fem.)", options: ["שנייה", "שני", "שתיים", "שניים"], correct: "שנייה" },
  { id: 3, sentence: "הוא היה הילד הַ___ בכיתה (1, זכר)", sentenceEn: "He was the ___ child in class (1, masc.)", options: ["ראשון", "ראשונה", "אחד", "אחת"], correct: "ראשון" },
  { id: 4, sentence: "השיעור הַ___ מתחיל בשעה תשע (4, זכר)", sentenceEn: "The ___ lesson starts at 9 (4, masc.)", options: ["רביעי", "רביעית", "ארבעה", "ארבע"], correct: "רביעי" },
  { id: 5, sentence: "יום שישי הוא היום הַ___ בשבוע (6, זכר)", sentenceEn: "Friday is the ___ day of the week (6, masc.)", options: ["שישי", "שישית", "שש", "ששה"], correct: "שישי" },
  { id: 6, sentence: "היא סיימה במקום הַ___ (5, זכר - מקום)", sentenceEn: "She finished in ___ place (5, masc.)", options: ["חמישי", "חמישית", "חמש", "חמישה"], correct: "חמישי", hint: "מקום הוא זכר" },
  { id: 7, sentence: "זה היום הַ___ שלי בעבודה החדשה (1, זכר)", sentenceEn: "It's my ___ day at the new job (1, masc.)", options: ["ראשון", "ראשונה", "אחד", "אחת"], correct: "ראשון" },
  { id: 8, sentence: "הקומה הַ___ היא הגבוהה ביותר (10, נקבה)", sentenceEn: "The ___ floor is the highest (10, fem.)", options: ["עשירית", "עשירי", "עשר", "עשרה"], correct: "עשירית" },
  { id: 9, sentence: "השאלה הַ___ הייתה הקשה ביותר (7, נקבה)", sentenceEn: "The ___ question was the hardest (7, fem.)", options: ["שביעית", "שביעי", "שבע", "שבעה"], correct: "שביעית" },
  { id: 10, sentence: "החודש הַ___ הוא אוגוסט (8, זכר)", sentenceEn: "The ___ month is August (8, masc.)", options: ["שמיני", "שמינית", "שמונה", "שמונה"], correct: "שמיני" },
];
