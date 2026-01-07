export interface VocabWord {
  hebrew: string;
  hebrewWithNikud: string;
  english: string;
}

export const colorsVocabulary: VocabWord[] = [
  { hebrew: "אדום", hebrewWithNikud: "אָדֹם", english: "Red" },
  { hebrew: "כתום", hebrewWithNikud: "כָּתֹם", english: "Orange" },
  { hebrew: "צהוב", hebrewWithNikud: "צָהֹב", english: "Yellow" },
  { hebrew: "ירוק", hebrewWithNikud: "יָרֹק", english: "Green" },
  { hebrew: "כחול", hebrewWithNikud: "כָּחֹל", english: "Blue" },
  { hebrew: "סגול", hebrewWithNikud: "סָגֹל", english: "Purple" },
  { hebrew: "ורוד", hebrewWithNikud: "וָרֹד", english: "Pink" },
  { hebrew: "לבן", hebrewWithNikud: "לָבָן", english: "White" },
  { hebrew: "שחור", hebrewWithNikud: "שָׁחֹר", english: "Black" },
  { hebrew: "חום", hebrewWithNikud: "חוּם", english: "Brown" },
];

export const fruitsVocabulary: VocabWord[] = [
  { hebrew: "תפוח", hebrewWithNikud: "תַּפּוּחַ", english: "Apple" },
  { hebrew: "בננה", hebrewWithNikud: "בַּנָנָה", english: "Banana" },
  { hebrew: "תפוז", hebrewWithNikud: "תַּפּוּז", english: "Orange (fruit)" },
  { hebrew: "ענבים", hebrewWithNikud: "עֲנָבִים", english: "Grapes" },
  { hebrew: "תות", hebrewWithNikud: "תּוּת", english: "Strawberry" },
  { hebrew: "אבטיח", hebrewWithNikud: "אֲבַטִּיחַ", english: "Watermelon" },
  { hebrew: "לימון", hebrewWithNikud: "לִימוֹן", english: "Lemon" },
  { hebrew: "אגס", hebrewWithNikud: "אַגָּס", english: "Pear" },
  { hebrew: "מנגו", hebrewWithNikud: "מַנְגוֹ", english: "Mango" },
  { hebrew: "אננס", hebrewWithNikud: "אֲנָנָס", english: "Pineapple" },
];

export interface StoryData {
  text: string;
  textWithNikud: string;
  translation: string;
}

export const stories: Record<"easy" | "medium" | "hard", StoryData> = {
  easy: {
    text: "דני הולך לשוק. הוא קונה תפוח אדום ובננה צהובה. אמא שלו אוהבת תפוזים כתומים. דני אוכל את הפירות בבית.",
    textWithNikud: "דָּנִי הוֹלֵךְ לַשּׁוּק. הוּא קוֹנֶה תַּפּוּחַ אָדֹם וּבַנָנָה צְהֻבָּה. אִמָּא שֶׁלּוֹ אוֹהֶבֶת תַּפּוּזִים כְּתֻמִּים. דָּנִי אוֹכֵל אֶת הַפֵּרוֹת בַּבַּיִת.",
    translation: "Danny goes to the market. He buys a red apple and a yellow banana. His mom likes orange oranges. Danny eats the fruits at home."
  },
  medium: {
    text: "בחנות הירקות יש הרבה פירות צבעוניים. מיכל בוחרת ענבים סגולים ותותים אדומים לסלט פירות. היא גם לוקחת אבטיח ירוק מבחוץ ואדום מבפנים. הסלט יהיה טעים מאוד!",
    textWithNikud: "בַּחֲנוּת הַיְּרָקוֹת יֵשׁ הַרְבֵּה פֵּרוֹת צִבְעוֹנִיִּים. מִיכַל בּוֹחֶרֶת עֲנָבִים סְגֻלִּים וְתוּתִים אֲדֻמִּים לְסָלָט פֵּרוֹת. הִיא גַּם לוֹקַחַת אֲבַטִּיחַ יָרֹק מִבַּחוּץ וְאָדֹם מִבִּפְנִים. הַסָּלָט יִהְיֶה טָעִים מְאֹד!",
    translation: "In the vegetable store there are many colorful fruits. Michal chooses purple grapes and red strawberries for a fruit salad. She also takes a watermelon that is green outside and red inside. The salad will be very tasty!"
  },
  hard: {
    text: "בקיץ, המשפחה נוסעת לכרם לקטוף פירות. הילדים אוספים ענבים ירוקים וסגולים לסלים גדולים. אבא מוצא עץ לימון עם פירות צהובים בהירים. סבתא מכינה מיץ לימון קר עם קרח. בערב, כולם יושבים בחצר ואוכלים אבטיח מתוק. הצבעים של הפירות - אדום, ירוק, צהוב וסגול - נראים יפים על השולחן הלבן.",
    textWithNikud: "בַּקַּיִץ, הַמִּשְׁפָּחָה נוֹסַעַת לַכֶּרֶם לִקְטֹף פֵּרוֹת. הַיְּלָדִים אוֹסְפִים עֲנָבִים יְרֻקִּים וּסְגֻלִּים לַסַּלִּים הַגְּדוֹלִים. אַבָּא מוֹצֵא עֵץ לִימוֹן עִם פֵּרוֹת צְהֻבִּים בְּהִירִים. סָבְתָא מְכִינָה מִיץ לִימוֹן קַר עִם קֶרַח. בָּעֶרֶב, כֻּלָּם יוֹשְׁבִים בֶּחָצֵר וְאוֹכְלִים אֲבַטִּיחַ מָתוֹק. הַצְּבָעִים שֶׁל הַפֵּרוֹת - אָדֹם, יָרֹק, צָהֹב וְסָגֹל - נִרְאִים יָפִים עַל הַשֻּׁלְחָן הַלָּבָן.",
    translation: "In summer, the family travels to the vineyard to pick fruits. The children collect green and purple grapes into large baskets. Dad finds a lemon tree with bright yellow fruits. Grandma prepares cold lemonade with ice. In the evening, everyone sits in the yard and eats sweet watermelon. The colors of the fruits - red, green, yellow and purple - look beautiful on the white table."
  }
};

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export const questions: Record<"easy" | "medium" | "hard", Question[]> = {
  easy: [
    {
      question: "איזה צבע התפוח שדני קנה?",
      options: ["ירוק", "אדום", "צהוב", "כתום"],
      answer: "אדום"
    },
    {
      question: "מה אמא של דני אוהבת?",
      options: ["בננות", "תפוחים", "תפוזים", "ענבים"],
      answer: "תפוזים"
    },
    {
      question: "איזה צבע הבננה?",
      options: ["כתום", "ירוק", "צהוב", "לבן"],
      answer: "צהוב"
    }
  ],
  medium: [
    {
      question: "מה מיכל מכינה?",
      options: ["מרק", "סלט ירקות", "סלט פירות", "עוגה"],
      answer: "סלט פירות"
    },
    {
      question: "איזה צבע הענבים שמיכל בחרה?",
      options: ["ירוקים", "סגולים", "אדומים", "כחולים"],
      answer: "סגולים"
    },
    {
      question: "מה הצבע של האבטיח מבפנים?",
      options: ["ירוק", "צהוב", "אדום", "לבן"],
      answer: "אדום"
    },
    {
      question: "איזה פירות אדומים מיכל לקחה?",
      options: ["תפוחים", "תותים", "ענבים", "תפוזים"],
      answer: "תותים"
    }
  ],
  hard: [
    {
      question: "לאן המשפחה נוסעת בקיץ?",
      options: ["לים", "לכרם", "להר", "לחנות"],
      answer: "לכרם"
    },
    {
      question: "מה הילדים אוספים?",
      options: ["תפוחים", "לימונים", "ענבים", "תותים"],
      answer: "ענבים"
    },
    {
      question: "מה סבתא מכינה?",
      options: ["עוגה", "סלט", "מיץ לימון", "גלידה"],
      answer: "מיץ לימון"
    },
    {
      question: "איזה צבע השולחן?",
      options: ["חום", "שחור", "לבן", "ירוק"],
      answer: "לבן"
    },
    {
      question: "כמה צבעים של פירות מוזכרים בסוף הסיפור?",
      options: ["שניים", "שלושה", "ארבעה", "חמישה"],
      answer: "ארבעה"
    }
  ]
};
