export interface GenderFlipQuestion {
  sentence: string;
  sentenceEn: string;
  flipped: string;
  flippedEn: string;
  options: string[];
  direction: "male-to-female" | "female-to-male";
}

export const genderFlipQuestions: GenderFlipQuestion[] = [
  {
    sentence: "הוא הולך לבית הספר",
    sentenceEn: "He goes to school",
    flipped: "היא הולכת לבית הספר",
    flippedEn: "She goes to school",
    options: ["היא הולכת לבית הספר", "היא הולך לבית הספר", "הוא הולכת לבית הספר", "היא הלכה לבית הספר"],
    direction: "male-to-female",
  },
  {
    sentence: "היא אוכלת תפוח",
    sentenceEn: "She eats an apple",
    flipped: "הוא אוכל תפוח",
    flippedEn: "He eats an apple",
    options: ["הוא אוכל תפוח", "הוא אוכלת תפוח", "היא אוכל תפוח", "הוא אכל תפוח"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא קורא ספר",
    sentenceEn: "He reads a book",
    flipped: "היא קוראת ספר",
    flippedEn: "She reads a book",
    options: ["היא קוראת ספר", "היא קורא ספר", "הוא קוראת ספר", "היא קראה ספר"],
    direction: "male-to-female",
  },
  {
    sentence: "היא שותה מים",
    sentenceEn: "She drinks water",
    flipped: "הוא שותה מים",
    flippedEn: "He drinks water",
    options: ["הוא שותה מים", "הוא שותית מים", "היא שותה מים", "הוא שתה מים"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא כותב מכתב",
    sentenceEn: "He writes a letter",
    flipped: "היא כותבת מכתב",
    flippedEn: "She writes a letter",
    options: ["היא כותבת מכתב", "היא כותב מכתב", "הוא כותבת מכתב", "היא כתבה מכתב"],
    direction: "male-to-female",
  },
  {
    sentence: "היא רצה בפארק",
    sentenceEn: "She runs in the park",
    flipped: "הוא רץ בפארק",
    flippedEn: "He runs in the park",
    options: ["הוא רץ בפארק", "הוא רצה בפארק", "היא רץ בפארק", "הוא רצתה בפארק"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא לומד עברית",
    sentenceEn: "He studies Hebrew",
    flipped: "היא לומדת עברית",
    flippedEn: "She studies Hebrew",
    options: ["היא לומדת עברית", "היא לומד עברית", "הוא לומדת עברית", "היא למדה עברית"],
    direction: "male-to-female",
  },
  {
    sentence: "היא ישנה בלילה",
    sentenceEn: "She sleeps at night",
    flipped: "הוא ישן בלילה",
    flippedEn: "He sleeps at night",
    options: ["הוא ישן בלילה", "הוא ישנה בלילה", "היא ישן בלילה", "הוא נרדם בלילה"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא מדבר בטלפון",
    sentenceEn: "He talks on the phone",
    flipped: "היא מדברת בטלפון",
    flippedEn: "She talks on the phone",
    options: ["היא מדברת בטלפון", "היא מדבר בטלפון", "הוא מדברת בטלפון", "היא דיברה בטלפון"],
    direction: "male-to-female",
  },
  {
    sentence: "היא שרה שיר",
    sentenceEn: "She sings a song",
    flipped: "הוא שר שיר",
    flippedEn: "He sings a song",
    options: ["הוא שר שיר", "הוא שרה שיר", "היא שר שיר", "הוא שרת שיר"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא בישל ארוחת ערב",
    sentenceEn: "He cooked dinner",
    flipped: "היא בישלה ארוחת ערב",
    flippedEn: "She cooked dinner",
    options: ["היא בישלה ארוחת ערב", "היא בישל ארוחת ערב", "הוא בישלה ארוחת ערב", "היא מבשלת ארוחת ערב"],
    direction: "male-to-female",
  },
  {
    sentence: "היא צוחקת בקול",
    sentenceEn: "She laughs out loud",
    flipped: "הוא צוחק בקול",
    flippedEn: "He laughs out loud",
    options: ["הוא צוחק בקול", "הוא צוחקת בקול", "היא צוחק בקול", "הוא צחק בקול"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא נוסע לעבודה",
    sentenceEn: "He drives to work",
    flipped: "היא נוסעת לעבודה",
    flippedEn: "She drives to work",
    options: ["היא נוסעת לעבודה", "היא נוסע לעבודה", "הוא נוסעת לעבודה", "היא נסעה לעבודה"],
    direction: "male-to-female",
  },
  {
    sentence: "היא עובדת במשרד",
    sentenceEn: "She works in an office",
    flipped: "הוא עובד במשרד",
    flippedEn: "He works in an office",
    options: ["הוא עובד במשרד", "הוא עובדת במשרד", "היא עובד במשרד", "הוא עבד במשרד"],
    direction: "female-to-male",
  },
  {
    sentence: "הוא רוקד במסיבה",
    sentenceEn: "He dances at a party",
    flipped: "היא רוקדת במסיבה",
    flippedEn: "She dances at a party",
    options: ["היא רוקדת במסיבה", "היא רוקד במסיבה", "הוא רוקדת במסיבה", "היא רקדה במסיבה"],
    direction: "male-to-female",
  },
];
