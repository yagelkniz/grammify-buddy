export interface RolePlayOption {
  text: string;
  naturalness: number;
  feedback: string;
}

export interface RolePlayStep {
  id: string;
  npcLine: string;
  options: RolePlayOption[];
}

export interface RolePlayScenario {
  scenarioId: string;
  title: string;
  titleEn: string;
  goal: string;
  goalEn: string;
  characterTone: string;
  characterToneEn: string;
  steps: RolePlayStep[];
}

export const rolePlayScenarios: RolePlayScenario[] = [
  {
    scenarioId: "friends_whatsapp",
    title: "קובעים יציאה בוואטסאפ",
    titleEn: "Making Plans on WhatsApp",
    goal: "לקבוע יציאה בלי להישמע רובוטי",
    goalEn: "Make plans without sounding robotic",
    characterTone: "קליל וישראלי",
    characterToneEn: "Casual & Israeli",
    steps: [
      {
        id: "f1",
        npcLine: "חבר: יאללה מה נסגר היום?",
        options: [
          { text: "הכול בסדר אצלי, מה שלומך?", naturalness: 40, feedback: "נכון דקדוקית, אבל נשמע פורמלי מדי." },
          { text: "סתם, מתלבט אם לצאת.", naturalness: 85, feedback: "מעולה. טבעי וזורם." },
          { text: "אין מצב, אני עייף.", naturalness: 60, feedback: "טבעי, אבל קצת חוסם את השיחה." },
          { text: "אני נמצא בביתי כרגע.", naturalness: 10, feedback: "נשמע רובוטי ולא ישראלי." },
        ],
      },
      {
        id: "f2",
        npcLine: "חבר: בא לך בירה ב-9?",
        options: [
          { text: "יאללה, אני על זה.", naturalness: 95, feedback: "בול ישראלי." },
          { text: "ייתכן ואגיע.", naturalness: 20, feedback: "פורמלי מדי." },
          { text: "יש מצב, נראה איך אני זורם.", naturalness: 80, feedback: "מעולה, נשמע טבעי." },
          { text: "אני אבדוק ואשוב אליך.", naturalness: 30, feedback: "יותר מתאים למייל עבודה." },
        ],
      },
    ],
  },
  {
    scenarioId: "restaurant_telaviv",
    title: "מסעדה בתל אביב",
    titleEn: "Restaurant in Tel Aviv",
    goal: "להישמע בטוח וטבעי מול מלצר",
    goalEn: "Sound confident and natural with a waiter",
    characterTone: "ישיר אבל נחמד",
    characterToneEn: "Direct but friendly",
    steps: [
      {
        id: "r1",
        npcLine: "מלצר: מה בשבילך?",
        options: [
          { text: "אפשר שניצל וצ'יפס?", naturalness: 90, feedback: "מעולה. פשוט וטבעי." },
          { text: "אני מעוניין להזמין את המנה הזו.", naturalness: 25, feedback: "פורמלי מדי למסעדה רגילה." },
          { text: "תביא לי שניצל.", naturalness: 60, feedback: "טבעי, אבל קצת חד." },
          { text: "ברצוני במזון.", naturalness: 5, feedback: "לא נשמע אנושי." },
        ],
      },
      {
        id: "r2",
        npcLine: "מלצר: משהו לשתות?",
        options: [
          { text: "יאללה, בירה קטנה.", naturalness: 85, feedback: "קליל ונכון." },
          { text: "כן, תודה רבה לך.", naturalness: 70, feedback: "בסדר גמור, קצת מנומס יותר." },
          { text: "אני צורך מים בלבד.", naturalness: 10, feedback: "רובוטי מדי." },
          { text: "אין צורך בנוזלים.", naturalness: 5, feedback: "לא טבעי." },
        ],
      },
    ],
  },
  {
    scenarioId: "boss_message",
    title: "הודעה לבוס",
    titleEn: "Message to Your Boss",
    goal: "להישמע מקצועי אבל לא נוקשה",
    goalEn: "Sound professional but not stiff",
    characterTone: "מכבד אך יומיומי",
    characterToneEn: "Respectful yet casual",
    steps: [
      {
        id: "b1",
        npcLine: "אתה צריך לעדכן שתאחר מחר.",
        options: [
          { text: "בוקר טוב, אני כנראה אאחר מחר בכ-20 דקות.", naturalness: 95, feedback: "מצוין. מקצועי וטבעי." },
          { text: "לא אגיע בזמן.", naturalness: 40, feedback: "ישיר מדי, חסר ריכוך." },
          { text: "יש מצב שאאחר קצת, סורי.", naturalness: 65, feedback: "טבעי, אולי קצת קליל מדי לעבודה." },
          { text: "איחורי יתרחש.", naturalness: 0, feedback: "לא אנושי בכלל." },
        ],
      },
      {
        id: "b2",
        npcLine: "הבוס: הכול בסדר?",
        options: [
          { text: "כן, פשוט יש לי תור לרופא.", naturalness: 90, feedback: "ענייני וברור." },
          { text: "כן כן.", naturalness: 50, feedback: "קצר מדי ולא מקצועי מספיק." },
          { text: "זה מורכב להסביר כרגע.", naturalness: 60, feedback: "אפשרי, אבל יוצר מתח." },
          { text: "אין באפשרותי לפרט.", naturalness: 15, feedback: "פורמלי ומרוחק מדי." },
        ],
      },
    ],
  },
];
