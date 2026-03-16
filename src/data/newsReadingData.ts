export const newsReadingText = `משרד החינוך הודיע היום על תוכנית חדשה לעידוד הקריאה בקרב תלמידי בתי ספר יסודיים ברחבי הארץ.
במסגרת התוכנית, כל תלמיד יקבל ספר חדש בכל חודש, בחינם. הספרים ייבחרו על ידי ועדה מקצועית הכוללת
מורים, סופרים ופסיכולוגים חינוכיים.

שרת החינוך אמרה בהצהרה: "הקריאה היא הבסיס לכל למידה. אנחנו רוצים שכל ילד בישראל יגדל עם אהבה לספרים."

לפי סקר שנערך לאחרונה, רק ארבעים ושניים אחוז מהתלמידים קוראים ספר אחד לפחות בחודש, לעומת שישים אחוז
לפני עשר שנים. מומחי חינוך מייחסים את הירידה לשימוש המוגבר בטלפונים חכמים וברשתות חברתיות.

התוכנית תתחיל בספטמבר הקרוב ותכלול גם סדנאות כתיבה יצירתית ומפגשים עם סופרים ישראליים מובילים.
התקציב המוערך הוא כמאה מיליון שקלים לשנה.

ארגוני הורים בירכו על היוזמה, אך ציינו שצריך גם להשקיע בספריות בתי הספר, שרבות מהן ישנות ולא מעודכנות.`;

export const newsReadingTranslation = `The Ministry of Education announced today a new program to encourage reading among elementary school students across the country.
As part of the program, each student will receive a new book every month, free of charge. The books will be chosen by a professional
committee that includes teachers, authors, and educational psychologists.

The Education Minister said in a statement: "Reading is the foundation of all learning. We want every child in Israel to grow up with a love of books."

According to a recent survey, only forty-two percent of students read at least one book per month, compared to sixty percent
ten years ago. Education experts attribute the decline to increased use of smartphones and social media.

The program will begin next September and will also include creative writing workshops and meetings with leading Israeli authors.
The estimated budget is about one hundred million shekels per year.

Parents' organizations welcomed the initiative, but noted that school libraries, many of which are old and outdated, also need investment.`;

export interface NewsQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const newsQuestions: NewsQuestion[] = [
  { question: "מי הודיע על התוכנית החדשה?", questionEn: "Who announced the new program?", options: ["משרד החינוך", "משרד הבריאות", "ראש הממשלה", "עיריית תל אביב"], answer: "משרד החינוך" },
  { question: "מה יקבל כל תלמיד בכל חודש?", questionEn: "What will each student receive every month?", options: ["ספר חדש", "מחשב", "מלגה", "כרטיס"], answer: "ספר חדש" },
  { question: "כמה אחוז מהתלמידים קוראים ספר בחודש?", questionEn: "What percent of students read a book per month?", options: ["42%", "60%", "35%", "50%"], answer: "42%" },
  { question: "למה מומחי חינוך מייחסים את הירידה?", questionEn: "What do experts attribute the decline to?", options: ["טלפונים חכמים ורשתות חברתיות", "מחסור בספרים", "מורים לא מקצועיים", "בתי ספר סגורים"], answer: "טלפונים חכמים ורשתות חברתיות" },
  { question: "מתי התוכנית תתחיל?", questionEn: "When will the program start?", options: ["ספטמבר", "ינואר", "מרץ", "יוני"], answer: "ספטמבר" },
  { question: "מה התקציב המוערך?", questionEn: "What is the estimated budget?", options: ["כמאה מיליון שקלים", "חמישים מיליון", "מאתיים מיליון", "עשרה מיליון"], answer: "כמאה מיליון שקלים" },
  { question: "מי בירך על היוזמה?", questionEn: "Who welcomed the initiative?", options: ["ארגוני הורים", "תלמידים", "סופרים", "מורים"], answer: "ארגוני הורים" },
  { question: "מה עוד תכלול התוכנית?", questionEn: "What else will the program include?", options: ["סדנאות כתיבה ומפגשים עם סופרים", "טיולים", "מבחנים", "שיעורי מתמטיקה"], answer: "סדנאות כתיבה ומפגשים עם סופרים" },
  { question: "מה הבעיה עם ספריות בתי הספר?", questionEn: "What is the problem with school libraries?", options: ["ישנות ולא מעודכנות", "סגורות", "קטנות מדי", "אין ספרים"], answer: "ישנות ולא מעודכנות" },
  { question: "כמה אחוז קראו לפני עשר שנים?", questionEn: "What percent read ten years ago?", options: ["60%", "42%", "70%", "55%"], answer: "60%" },
];

export const newsVocab = [
  { hebrew: "משרד החינוך", english: "Ministry of Education" },
  { hebrew: "תוכנית", english: "Program" },
  { hebrew: "עידוד", english: "Encouragement" },
  { hebrew: "ועדה מקצועית", english: "Professional committee" },
  { hebrew: "הצהרה", english: "Statement" },
  { hebrew: "סקר", english: "Survey" },
  { hebrew: "ירידה", english: "Decline" },
  { hebrew: "סדנאות", english: "Workshops" },
  { hebrew: "תקציב", english: "Budget" },
  { hebrew: "יוזמה", english: "Initiative" },
];
