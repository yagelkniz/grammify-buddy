export interface QuickQuizQuestion {
  hebrew: string;
  english: string;
  options: string[];
  answer: string;
  category: string;
}

export const quickQuizQuestions: QuickQuizQuestion[] = [
  { hebrew: "מה זה 'כלב'?", english: "What is 'כלב'?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Dog", category: "animals" },
  { hebrew: "מה זה 'ספר'?", english: "What is 'ספר'?", options: ["Book", "Door", "Window", "Chair"], answer: "Book", category: "objects" },
  { hebrew: "מה זה 'שמש'?", english: "What is 'שמש'?", options: ["Sun", "Moon", "Star", "Cloud"], answer: "Sun", category: "nature" },
  { hebrew: "מה זה 'מים'?", english: "What is 'מים'?", options: ["Water", "Milk", "Juice", "Wine"], answer: "Water", category: "food" },
  { hebrew: "מה זה 'בית'?", english: "What is 'בית'?", options: ["House", "School", "Store", "Park"], answer: "House", category: "places" },
  { hebrew: "מה זה 'ירוק'?", english: "What is 'ירוק'?", options: ["Green", "Red", "Blue", "Yellow"], answer: "Green", category: "colors" },
  { hebrew: "מה זה 'שלום'?", english: "What is 'שלום'?", options: ["Hello/Peace", "Goodbye", "Thank you", "Please"], answer: "Hello/Peace", category: "greetings" },
  { hebrew: "מה זה 'אוכל'?", english: "What is 'אוכל'?", options: ["Food", "Drink", "Sleep", "Walk"], answer: "Food", category: "food" },
  { hebrew: "מה זה 'חבר'?", english: "What is 'חבר'?", options: ["Friend", "Teacher", "Doctor", "Student"], answer: "Friend", category: "people" },
  { hebrew: "מה זה 'יום'?", english: "What is 'יום'?", options: ["Day", "Night", "Week", "Month"], answer: "Day", category: "time" },
  { hebrew: "מה זה 'לילה'?", english: "What is 'לילה'?", options: ["Night", "Day", "Morning", "Evening"], answer: "Night", category: "time" },
  { hebrew: "מה זה 'תודה'?", english: "What is 'תודה'?", options: ["Thank you", "Please", "Sorry", "Hello"], answer: "Thank you", category: "greetings" },
  { hebrew: "מה זה 'רופא'?", english: "What is 'רופא'?", options: ["Doctor", "Teacher", "Driver", "Student"], answer: "Doctor", category: "people" },
  { hebrew: "מה זה 'מכונית'?", english: "What is 'מכונית'?", options: ["Car", "Bus", "Train", "Bicycle"], answer: "Car", category: "transport" },
  { hebrew: "מה זה 'עוגה'?", english: "What is 'עוגה'?", options: ["Cake", "Bread", "Rice", "Soup"], answer: "Cake", category: "food" },
  { hebrew: "מה זה 'כסף'?", english: "What is 'כסף'?", options: ["Money", "Gold", "Silver", "Paper"], answer: "Money", category: "objects" },
  { hebrew: "מה זה 'שולחן'?", english: "What is 'שולחן'?", options: ["Table", "Chair", "Bed", "Sofa"], answer: "Table", category: "objects" },
  { hebrew: "מה זה 'ילד'?", english: "What is 'ילד'?", options: ["Boy/Child", "Girl", "Baby", "Man"], answer: "Boy/Child", category: "people" },
  { hebrew: "מה זה 'גשם'?", english: "What is 'גשם'?", options: ["Rain", "Snow", "Wind", "Sun"], answer: "Rain", category: "nature" },
  { hebrew: "מה זה 'דלת'?", english: "What is 'דלת'?", options: ["Door", "Window", "Wall", "Floor"], answer: "Door", category: "objects" },
  { hebrew: "מה זה 'אדום'?", english: "What is 'אדום'?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Red", category: "colors" },
  { hebrew: "מה זה 'חלון'?", english: "What is 'חלון'?", options: ["Window", "Door", "Mirror", "Wall"], answer: "Window", category: "objects" },
  { hebrew: "מה זה 'אוטובוס'?", english: "What is 'אוטובוס'?", options: ["Bus", "Car", "Train", "Taxi"], answer: "Bus", category: "transport" },
  { hebrew: "מה זה 'מורה'?", english: "What is 'מורה'?", options: ["Teacher", "Student", "Doctor", "Driver"], answer: "Teacher", category: "people" },
  { hebrew: "מה זה 'פרח'?", english: "What is 'פרח'?", options: ["Flower", "Tree", "Grass", "Leaf"], answer: "Flower", category: "nature" },
  { hebrew: "מה זה 'כיסא'?", english: "What is 'כיסא'?", options: ["Chair", "Table", "Bed", "Sofa"], answer: "Chair", category: "objects" },
  { hebrew: "מה זה 'חלב'?", english: "What is 'חלב'?", options: ["Milk", "Water", "Juice", "Coffee"], answer: "Milk", category: "food" },
  { hebrew: "מה זה 'עץ'?", english: "What is 'עץ'?", options: ["Tree", "Flower", "Bush", "Grass"], answer: "Tree", category: "nature" },
  { hebrew: "מה זה 'לחם'?", english: "What is 'לחם'?", options: ["Bread", "Cake", "Rice", "Soup"], answer: "Bread", category: "food" },
  { hebrew: "מה זה 'שמח'?", english: "What is 'שמח'?", options: ["Happy", "Sad", "Angry", "Tired"], answer: "Happy", category: "emotions" },
];
