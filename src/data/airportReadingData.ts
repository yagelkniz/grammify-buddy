export const airportReadingText = `מיכל ויוסי נוסעים לחופשה ביוון. הם מגיעים לנמל התעופה בן גוריון שעתיים לפני הטיסה.
קודם כל הם הולכים לדלפק הצ'ק-אין. הפקידה שואלת: "יש לכם דרכון?" מיכל נותנת את שני הדרכונים.
הם שמים את המזוודות על המסוע. המזוודה של יוסי שוקלת עשרים ושלושה קילו — בדיוק בגבול המותר.
אחרי הצ'ק-אין הם עוברים ביקורת ביטחונית. השומר מבקש לפתוח את התיק. הכל בסדר.
הם ממתינים באולם הנוסעים ומסתכלים על לוח הטיסות. הטיסה שלהם יוצאת משער 12.
"הטיסה ליוון מוכנה לעלייה," מכריזה הכרזה. מיכל ויוסי עולים על המטוס ומתיישבים במקומות שלהם.
"חופשה, סוף סוף!" אומר יוסי בחיוך.`;

export const airportReadingTranslation = `Michal and Yossi are traveling on vacation to Greece. They arrive at Ben Gurion Airport two hours before the flight.
First, they go to the check-in counter. The clerk asks: "Do you have a passport?" Michal gives both passports.
They put the suitcases on the conveyor. Yossi's suitcase weighs twenty-three kilos — exactly at the allowed limit.
After check-in, they go through security. The guard asks to open the bag. Everything is fine.
They wait in the passenger hall and look at the flights board. Their flight departs from gate 12.
"The flight to Greece is ready for boarding," the announcement says. Michal and Yossi board the plane and sit in their seats.
"Vacation, finally!" says Yossi with a smile.`;

export interface AirportQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const airportQuestions: AirportQuestion[] = [
  { question: "לאן מיכל ויוסי נוסעים?", questionEn: "Where are Michal and Yossi traveling?", options: ["יוון", "צרפת", "איטליה", "ספרד"], answer: "יוון" },
  { question: "כמה זמן לפני הטיסה הם מגיעים?", questionEn: "How long before the flight do they arrive?", options: ["שעתיים", "שעה", "שלוש שעות", "חצי שעה"], answer: "שעתיים" },
  { question: "מה הפקידה שואלת?", questionEn: "What does the clerk ask?", options: ["יש לכם דרכון?", "לאן אתם טסים?", "כמה מזוודות?", "מתי הטיסה?"], answer: "יש לכם דרכון?" },
  { question: "כמה שוקלת המזוודה של יוסי?", questionEn: "How much does Yossi's suitcase weigh?", options: ["23 קילו", "20 קילו", "25 קילו", "30 קילו"], answer: "23 קילו" },
  { question: "מה קורה בביקורת הביטחונית?", questionEn: "What happens at security?", options: ["השומר מבקש לפתוח את התיק", "הם מאחרים", "המזוודה אבדה", "הדרכון חסר"], answer: "השומר מבקש לפתוח את התיק" },
  { question: "מאיזה שער הטיסה יוצאת?", questionEn: "From which gate does the flight depart?", options: ["שער 12", "שער 5", "שער 8", "שער 15"], answer: "שער 12" },
  { question: "מה אומר יוסי בסוף?", questionEn: "What does Yossi say at the end?", options: ["חופשה, סוף סוף!", "בוא נלך!", "אני עייף", "מתי נוחתים?"], answer: "חופשה, סוף סוף!" },
  { question: "לאיזה נמל תעופה הם מגיעים?", questionEn: "Which airport do they arrive at?", options: ["בן גוריון", "רמון", "סדה דב", "חיפה"], answer: "בן גוריון" },
];

export const airportVocab = [
  { hebrew: "נמל תעופה", english: "Airport" },
  { hebrew: "טיסה", english: "Flight" },
  { hebrew: "דרכון", english: "Passport" },
  { hebrew: "מזוודה", english: "Suitcase" },
  { hebrew: "דלפק צ'ק-אין", english: "Check-in counter" },
  { hebrew: "ביקורת ביטחונית", english: "Security check" },
  { hebrew: "שער", english: "Gate" },
  { hebrew: "לוח טיסות", english: "Flights board" },
  { hebrew: "עלייה למטוס", english: "Boarding" },
  { hebrew: "נוסע", english: "Passenger" },
  { hebrew: "מטוס", english: "Airplane" },
];
