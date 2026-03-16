export interface ShoppingItem {
  hebrew: string;
  english: string;
  category: string;
}

export const shoppingVocab: ShoppingItem[] = [
  { hebrew: "עגלת קניות", english: "Shopping cart", category: "כללי" },
  { hebrew: "קופה", english: "Cash register", category: "כללי" },
  { hebrew: "שקית", english: "Bag", category: "כללי" },
  { hebrew: "מחיר", english: "Price", category: "כללי" },
  { hebrew: "הנחה", english: "Discount", category: "כללי" },
  { hebrew: "מבצע", english: "Sale/Deal", category: "כללי" },
  { hebrew: "כרטיס אשראי", english: "Credit card", category: "תשלום" },
  { hebrew: "מזומן", english: "Cash", category: "תשלום" },
  { hebrew: "קבלה", english: "Receipt", category: "תשלום" },
  { hebrew: "לשלם", english: "To pay", category: "פעלים" },
  { hebrew: "לקנות", english: "To buy", category: "פעלים" },
  { hebrew: "למדוד", english: "To try on", category: "פעלים" },
  { hebrew: "להחזיר", english: "To return", category: "פעלים" },
  { hebrew: "לבחור", english: "To choose", category: "פעלים" },
  { hebrew: "מידה", english: "Size", category: "בגדים" },
  { hebrew: "חולצה", english: "Shirt", category: "בגדים" },
  { hebrew: "מכנסיים", english: "Pants", category: "בגדים" },
  { hebrew: "נעליים", english: "Shoes", category: "בגדים" },
];

export interface ShoppingQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const shoppingQuestions: ShoppingQuestion[] = [
  { question: "איך אומרים 'discount' בעברית?", questionEn: "How do you say 'discount' in Hebrew?", options: ["הנחה", "מבצע", "מחיר", "קבלה"], answer: "הנחה" },
  { question: "מה משתמשים כדי לשים קניות?", questionEn: "What do you use to put purchases in?", options: ["עגלת קניות", "שקית", "קופה", "מידה"], answer: "עגלת קניות" },
  { question: "מה מקבלים אחרי שמשלמים?", questionEn: "What do you get after paying?", options: ["קבלה", "הנחה", "מבצע", "שקית"], answer: "קבלה" },
  { question: "איך אומרים 'to pay' בעברית?", questionEn: "How do you say 'to pay' in Hebrew?", options: ["לשלם", "לקנות", "לבחור", "למדוד"], answer: "לשלם" },
  { question: "מה צריכים לדעת כשקונים בגדים?", questionEn: "What do you need to know when buying clothes?", options: ["מידה", "מחיר", "קבלה", "שקית"], answer: "מידה" },
  { question: "איך אומרים 'shoes' בעברית?", questionEn: "How do you say 'shoes' in Hebrew?", options: ["נעליים", "מכנסיים", "חולצה", "שקית"], answer: "נעליים" },
  { question: "מה עושים כשפריט לא מתאים?", questionEn: "What do you do when an item doesn't fit?", options: ["להחזיר", "לשלם", "לקנות", "לבחור"], answer: "להחזיר" },
  { question: "איפה משלמים בחנות?", questionEn: "Where do you pay in a store?", options: ["קופה", "עגלת קניות", "שקית", "מידה"], answer: "קופה" },
  { question: "איך אומרים 'shirt' בעברית?", questionEn: "How do you say 'shirt' in Hebrew?", options: ["חולצה", "מכנסיים", "נעליים", "מידה"], answer: "חולצה" },
  { question: "מה זה 'מבצע'?", questionEn: "What is 'מבצע'?", options: ["Sale/Deal", "Price", "Receipt", "Cash"], answer: "Sale/Deal" },
  { question: "איך אומרים 'cash' בעברית?", questionEn: "How do you say 'cash' in Hebrew?", options: ["מזומן", "כרטיס אשראי", "קבלה", "מחיר"], answer: "מזומן" },
  { question: "מה עושים לפני שקונים בגדים?", questionEn: "What do you do before buying clothes?", options: ["למדוד", "לשלם", "להחזיר", "לבחור"], answer: "למדוד" },
];
