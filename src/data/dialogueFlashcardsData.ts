export interface DialogueCard {
  id: number;
  category: string;
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  context: string;
  contextEn: string;
}

export const dialogueFlashcards: DialogueCard[] = [
  // Greetings
  { id: 1, category: "ברכות", hebrew: "שלום, מה שלומך?", hebrewNikud: "שָׁלוֹם, מַה שְׁלוֹמְךָ?", english: "Hello, how are you?", transliteration: "shalom, ma shlomcha?", context: "פגישה ראשונה ביום", contextEn: "First meeting of the day" },
  { id: 2, category: "ברכות", hebrew: "בוקר טוב!", hebrewNikud: "בֹּקֶר טוֹב!", english: "Good morning!", transliteration: "boker tov", context: "ברכת בוקר", contextEn: "Morning greeting" },
  { id: 3, category: "ברכות", hebrew: "ערב טוב!", hebrewNikud: "עֶרֶב טוֹב!", english: "Good evening!", transliteration: "erev tov", context: "ברכת ערב", contextEn: "Evening greeting" },
  { id: 4, category: "ברכות", hebrew: "להתראות!", hebrewNikud: "לְהִתְרָאוֹת!", english: "Goodbye!", transliteration: "lehitra'ot", context: "פרידה", contextEn: "Farewell" },
  { id: 5, category: "ברכות", hebrew: "נעים מאוד!", hebrewNikud: "נָעִים מְאוֹד!", english: "Nice to meet you!", transliteration: "na'im me'od", context: "היכרות ראשונה", contextEn: "First introduction" },
  // Restaurant
  { id: 6, category: "מסעדה", hebrew: "אפשר לקבל את התפריט?", hebrewNikud: "אֶפְשָׁר לְקַבֵּל אֶת הַתַּפְרִיט?", english: "May I have the menu?", transliteration: "efshar lekabel et ha-tafrit?", context: "כשיושבים במסעדה", contextEn: "When seated at a restaurant" },
  { id: 7, category: "מסעדה", hebrew: "אני רוצה להזמין", hebrewNikud: "אֲנִי רוֹצֶה לְהַזְמִין", english: "I'd like to order", transliteration: "ani rotzeh lehazmin", context: "מוכנים להזמין", contextEn: "Ready to order" },
  { id: 8, category: "מסעדה", hebrew: "החשבון, בבקשה", hebrewNikud: "הַחֶשְׁבּוֹן, בְּבַקָּשָׁה", english: "The bill, please", transliteration: "ha-cheshbon, bevakasha", context: "סוף הארוחה", contextEn: "End of the meal" },
  { id: 9, category: "מסעדה", hebrew: "זה היה טעים מאוד", hebrewNikud: "זֶה הָיָה טָעִים מְאוֹד", english: "It was very tasty", transliteration: "ze haya ta'im me'od", context: "מחמאה לטבח", contextEn: "Compliment to the chef" },
  // Directions
  { id: 10, category: "כיוונים", hebrew: "סליחה, איפה התחנה?", hebrewNikud: "סְלִיחָה, אֵיפֹה הַתַּחֲנָה?", english: "Excuse me, where is the station?", transliteration: "slicha, eifo ha-tachana?", context: "שואלים עובר אורח", contextEn: "Asking a passerby" },
  { id: 11, category: "כיוונים", hebrew: "ימינה או שמאלה?", hebrewNikud: "יָמִינָה אוֹ שְׂמֹאלָה?", english: "Right or left?", transliteration: "yamina o smola?", context: "מחפשים כיוון", contextEn: "Looking for direction" },
  { id: 12, category: "כיוונים", hebrew: "זה רחוק מכאן?", hebrewNikud: "זֶה רָחוֹק מִכָּאן?", english: "Is it far from here?", transliteration: "ze rachok mikan?", context: "בודקים מרחק", contextEn: "Checking distance" },
  // Shopping
  { id: 13, category: "קניות", hebrew: "כמה זה עולה?", hebrewNikud: "כַּמָּה זֶה עוֹלֶה?", english: "How much does it cost?", transliteration: "kama ze oleh?", context: "בחנות", contextEn: "In a store" },
  { id: 14, category: "קניות", hebrew: "זה יקר מדי", hebrewNikud: "זֶה יָקָר מִדַּי", english: "It's too expensive", transliteration: "ze yakar miday", context: "התמקחות", contextEn: "Bargaining" },
  { id: 15, category: "קניות", hebrew: "אני רק מסתכל", hebrewNikud: "אֲנִי רַק מִסְתַּכֵּל", english: "I'm just looking", transliteration: "ani rak mistakel", context: "עוברים בחנות", contextEn: "Browsing" },
  // Polite
  { id: 16, category: "נימוס", hebrew: "תודה רבה!", hebrewNikud: "תּוֹדָה רַבָּה!", english: "Thank you very much!", transliteration: "toda raba", context: "אחרי עזרה", contextEn: "After receiving help" },
  { id: 17, category: "נימוס", hebrew: "בבקשה / על לא דבר", hebrewNikud: "בְּבַקָּשָׁה / עַל לֹא דָּבָר", english: "You're welcome", transliteration: "bevakasha / al lo davar", context: "תגובה לתודה", contextEn: "Response to thanks" },
  { id: 18, category: "נימוס", hebrew: "סליחה, לא הבנתי", hebrewNikud: "סְלִיחָה, לֹא הֵבַנְתִּי", english: "Sorry, I didn't understand", transliteration: "slicha, lo hevanti", context: "מבקשים הבהרה", contextEn: "Asking for clarification" },
  { id: 19, category: "נימוס", hebrew: "אתה יכול לחזור על זה?", hebrewNikud: "אַתָּה יָכוֹל לַחֲזֹר עַל זֶה?", english: "Can you repeat that?", transliteration: "ata yachol lachazor al ze?", context: "לא שמעו טוב", contextEn: "Didn't hear well" },
  { id: 20, category: "נימוס", hebrew: "אתה מדבר אנגלית?", hebrewNikud: "אַתָּה מְדַבֵּר אַנְגְּלִית?", english: "Do you speak English?", transliteration: "ata medaber anglit?", context: "כשצריך עזרה בשפה", contextEn: "When needing language help" },
];
