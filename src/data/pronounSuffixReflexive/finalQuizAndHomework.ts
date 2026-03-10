import type { FinalQuizQuestion, HomeworkSection } from "./types";

export const finalQuizQuestions: FinalQuizQuestion[] = [
  { id: "fq1", sentence: "יש ___ שאלה חשובה.", translation: "I have an important question.", options: ["לי", "בי", "אצלי", "כמוני"], correct: "לי" },
  { id: "fq2", sentence: "הוא עשה הכול ___.", translation: "He did everything by himself.", options: ["בעצמו", "בעצמי", "בעצמך", "בעצמם"], correct: "בעצמו" },
  { id: "fq3", sentence: "המסיבה תהיה ___.", translation: "The party will be at our place.", options: ["אצלנו", "בנו", "לנו", "כמונו"], correct: "אצלנו" },
  { id: "fq4", sentence: "אני מאמין ___.", translation: "I believe in you.", options: ["בך", "לך", "אצלך", "כמוך"], correct: "בך" },
  { id: "fq5", sentence: "אין ___ בעולם.", translation: "There's no one like her in the world.", options: ["כמוה", "בה", "אצלה", "לה"], correct: "כמוה" },
  { id: "fq6", sentence: "תגיד ___ לבוא מוקדם.", translation: "Tell them to come early.", options: ["להם", "בהם", "אצלם", "כמוהם"], correct: "להם" },
  { id: "fq7", sentence: "אני גאה ___.", translation: "I'm proud of myself.", options: ["בעצמי", "לעצמי", "כמוני", "אצלי"], correct: "בעצמי" },
  { id: "fq8", sentence: "הילדים ישנים ___.", translation: "The kids are sleeping at your place.", options: ["אצלך", "בך", "לך", "כמוך"], correct: "אצלך" },
  { id: "fq9", sentence: "הוא רוצה להיות ___.", translation: "He wants to be like me.", options: ["כמוני", "בי", "אצלי", "לי"], correct: "כמוני" },
  { id: "fq10", sentence: "אנחנו פתרנו את זה ___.", translation: "We solved it ourselves.", options: ["בעצמנו", "אצלנו", "לנו", "כמונו"], correct: "בעצמנו" },
];

export const homeworkSections: HomeworkSection[] = [
  {
    title: "בסיסי – כתיבה + תרגום",
    titleEn: "Basic – Writing + Translation",
    description: "תרגם/י את המשפטים הבאים לעברית:",
    descriptionEn: "Translate the following sentences into Hebrew:",
    items: [
      { en: "I have a new friend.", he: "יש לי חבר חדש." },
      { en: "She did it by herself.", he: "היא עשתה את זה בעצמה." },
      { en: "Come to our place tonight.", he: "בוא אצלנו הערב." },
      { en: "There's no one like him.", he: "אין כמוהו." },
      { en: "Everything depends on you.", he: "הכול תלוי בך." },
    ],
  },
  {
    title: "מאתגר – פסקה / דיאלוג",
    titleEn: "Challenging – Paragraph / Dialogue",
    description: "כתוב/י דיאלוג קצר (6–8 משפטים) בין שני חברים. השתמש/י לפחות ב-6 צורות שונות (לי, בך, אצלנו, כמוהו, בעצמי...).",
    descriptionEn: "Write a short dialogue (6–8 sentences) between two friends. Use at least 6 different pronoun suffix forms (לי, בך, אצלנו, כמוהו, בעצמי...).",
    items: [
      { he: "דוגמה לפתיחה:", en: "Example opening:" },
      { he: "– היי, מה קורה אצלך?", en: "– Hey, what's going on at your place?" },
      { he: "– הכול בסדר. יש לי חדשות. עשיתי את המבחן בעצמי!", en: "– Everything's fine. I have news. I did the exam by myself!" },
      { he: "– וואו, אין כמוך! אני מאמין בך.", en: "– Wow, there's no one like you! I believe in you." },
    ],
  },
  {
    title: "משימת דיבור – הכנה לשיעור הבא",
    titleEn: "Speaking Task – Preparation for Next Class",
    description: "הכן/י תשובות ל-5 השאלות הבאות. דבר/י בקול רם בבית:",
    descriptionEn: "Prepare answers to the following 5 questions. Speak aloud at home:",
    items: [
      { he: "1. מה הדבר הכי חשוב לך בחיים?", en: "1. What's the most important thing to you in life?" },
      { he: "2. יש מישהו שאת/ה רוצה להיות כמוהו? מי ולמה?", en: "2. Is there someone you want to be like? Who and why?" },
      { he: "3. מה עשית בעצמך לאחרונה ואת/ה גאה בזה?", en: "3. What have you done by yourself recently that you're proud of?" },
      { he: "4. אצל מי את/ה הכי אוהב/ת לבלות? למה?", en: "4. At whose place do you most like to spend time? Why?" },
      { he: "5. מה אתה מאמין בו? (ערך, רעיון, או אדם)", en: "5. What do you believe in? (a value, idea, or person)" },
    ],
  },
];
