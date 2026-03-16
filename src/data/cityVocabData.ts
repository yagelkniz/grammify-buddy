export interface VocabItem {
  hebrew: string;
  english: string;
  example: string;
  exampleEn: string;
}

export const cityVocab: VocabItem[] = [
  { hebrew: "רחוב", english: "Street", example: "אני גר ברחוב הרצל", exampleEn: "I live on Herzl Street" },
  { hebrew: "כביש", english: "Road", example: "הכביש סגור היום", exampleEn: "The road is closed today" },
  { hebrew: "מדרכה", english: "Sidewalk", example: "תלכו על המדרכה", exampleEn: "Walk on the sidewalk" },
  { hebrew: "צומת", english: "Intersection", example: "פנה ימינה בצומת", exampleEn: "Turn right at the intersection" },
  { hebrew: "רמזור", english: "Traffic light", example: "עצור ברמזור האדום", exampleEn: "Stop at the red light" },
  { hebrew: "תחנת אוטובוס", english: "Bus stop", example: "התחנה נמצאת פה", exampleEn: "The stop is here" },
  { hebrew: "חנות", english: "Store", example: "החנות סגורה בשבת", exampleEn: "The store is closed on Saturday" },
  { hebrew: "בניין", english: "Building", example: "הבניין גבוה מאוד", exampleEn: "The building is very tall" },
  { hebrew: "גן ציבורי", english: "Public park", example: "הילדים משחקים בגן", exampleEn: "The children play in the park" },
  { hebrew: "בית קפה", english: "Café", example: "נפגש בבית קפה", exampleEn: "Let's meet at a café" },
  { hebrew: "סופרמרקט", english: "Supermarket", example: "אני הולך לסופרמרקט", exampleEn: "I'm going to the supermarket" },
  { hebrew: "בנק", english: "Bank", example: "הבנק נפתח בשמונה", exampleEn: "The bank opens at eight" },
  { hebrew: "דואר", english: "Post office", example: "שלחתי מכתב בדואר", exampleEn: "I sent a letter by mail" },
  { hebrew: "בית חולים", english: "Hospital", example: "בית החולים קרוב", exampleEn: "The hospital is nearby" },
  { hebrew: "תחנת רכבת", english: "Train station", example: "הרכבת יוצאת בעוד 5 דקות", exampleEn: "The train leaves in 5 minutes" },
  { hebrew: "מוזיאון", english: "Museum", example: "ביקרנו במוזיאון אתמול", exampleEn: "We visited the museum yesterday" },
];

export interface CityQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const cityQuestions: CityQuestion[] = [
  { question: "איפה ממתינים לאוטובוס?", questionEn: "Where do you wait for the bus?", options: ["תחנת אוטובוס", "רמזור", "צומת", "מדרכה"], answer: "תחנת אוטובוס" },
  { question: "איפה שותים קפה?", questionEn: "Where do you drink coffee?", options: ["בית קפה", "בנק", "דואר", "מוזיאון"], answer: "בית קפה" },
  { question: "מה עוצר מכוניות ברחוב?", questionEn: "What stops cars on the street?", options: ["רמזור", "מדרכה", "בניין", "גן ציבורי"], answer: "רמזור" },
  { question: "איפה קונים אוכל?", questionEn: "Where do you buy food?", options: ["סופרמרקט", "בנק", "דואר", "מוזיאון"], answer: "סופרמרקט" },
  { question: "איפה שומרים כסף?", questionEn: "Where do you keep money?", options: ["בנק", "דואר", "חנות", "גן ציבורי"], answer: "בנק" },
  { question: "איפה שולחים מכתבים?", questionEn: "Where do you send letters?", options: ["דואר", "בנק", "חנות", "בית קפה"], answer: "דואר" },
  { question: "איפה ילדים משחקים?", questionEn: "Where do children play?", options: ["גן ציבורי", "בנק", "בניין", "צומת"], answer: "גן ציבורי" },
  { question: "מה זה 'רחוב' באנגלית?", questionEn: "What is 'רחוב' in English?", options: ["Street", "Road", "Sidewalk", "Building"], answer: "Street" },
  { question: "איפה הולכים כשחולים?", questionEn: "Where do you go when sick?", options: ["בית חולים", "בית קפה", "מוזיאון", "דואר"], answer: "בית חולים" },
  { question: "איפה עולים על רכבת?", questionEn: "Where do you board a train?", options: ["תחנת רכבת", "תחנת אוטובוס", "צומת", "כביש"], answer: "תחנת רכבת" },
  { question: "איפה רואים אומנות?", questionEn: "Where do you see art?", options: ["מוזיאון", "סופרמרקט", "בנק", "חנות"], answer: "מוזיאון" },
  { question: "על מה הולכים רגלי?", questionEn: "What do pedestrians walk on?", options: ["מדרכה", "כביש", "רמזור", "צומת"], answer: "מדרכה" },
];
