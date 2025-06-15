
export type FutureTenseQuestion = {
  number: number;
  sentence: string;
  options: string[];
  answer: string;
  translation: string;
};

// 100 שאלות מתבנית חוזרת כל 10 שאלות (ע"פ הנתונים מהודעתך)
const baseQuestions = [
  {
    sentence: "אני ___ פיצה לארוחת ערב.",
    options: ["אוכל", "אכלתי", "אוכל"],
    answer: "אוכל",
    translation: "I will ___ pizza for dinner. (eat)"
  },
  {
    sentence: "אתה ___ מים אחרי האימון.",
    options: ["תשתה", "שתית", "שותה"],
    answer: "תשתה",
    translation: "You will ___ water after the workout. (drink)"
  },
  {
    sentence: "היא ___ לבית הספר מחר.",
    options: ["תלך", "הולכת", "הלכה"],
    answer: "תלך",
    translation: "She will ___ to school tomorrow. (go)"
  },
  {
    sentence: "אנחנו ___ יחד לקולנוע.",
    options: ["נלך", "הלכנו", "הולכים"],
    answer: "נלך",
    translation: "We will ___ to the cinema together. (go)"
  },
  {
    sentence: "הם ___ סרט בערב.",
    options: ["יראו", "ראו", "רואים"],
    answer: "יראו",
    translation: "They will ___ a movie in the evening. (watch)"
  },
  {
    sentence: "אתן ___ את כל השיעורים בזמן.",
    options: ["תכינו", "הכנתן", "מכינות"],
    answer: "תכינו",
    translation: "You (f. pl.) will ___ all the homework on time. (prepare)"
  },
  {
    sentence: "הוא ___ עם המורה על הפרויקט מחר.",
    options: ["ידבר", "דיבר", "מדבר"],
    answer: "ידבר",
    translation: "He will ___ with the teacher about the project tomorrow. (talk)"
  },
  {
    sentence: "אני ___ להם את האמת כשנפגש.",
    options: ["אגיד", "אמרתי", "אומר"],
    answer: "אגיד",
    translation: "I will ___ them the truth when we meet. (say)"
  },
  {
    sentence: "היא ___ מוקדם כי יש לה מבחן.",
    options: ["תישן", "ישנה", "נרדמה"],
    answer: "תישן",
    translation: "She will ___ early because she has a test. (sleep)"
  },
  {
    sentence: "הם ___ בשש כדי להגיע בזמן לבית הספר.",
    options: ["יקומו", "קמו", "קמים"],
    answer: "יקומו",
    translation: "They will ___ at six to arrive at school on time. (wake up)"
  },
];

export const futureTenseQuestions: FutureTenseQuestion[] = [];
for (let i = 0; i < 100; i++) {
  const baseQ = baseQuestions[i % 10];
  futureTenseQuestions.push({
    number: i + 1,
    ...baseQ,
  });
}
