export interface LinkingWord {
  word: string;
  withNikud: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
}

export interface LinkingStory {
  title: string;
  text: string;
  textWithNikud: string;
  translation: string;
}

export interface LinkingQuestion {
  id: number;
  sentence: string;
  sentenceWithNikud: string;
  options: { text: string; withNikud: string }[];
  answerIndex: number;
  explanation: string;
}

export const linkingWordsVocabulary: LinkingWord[] = [
  { word: "כי", withNikud: "כִּי", meaning: "Because", example: "אני עייף כי עבדתי הרבה", exampleTranslation: "I'm tired because I worked a lot" },
  { word: "אבל", withNikud: "אֲבָל", meaning: "But", example: "רציתי לבוא אבל לא יכולתי", exampleTranslation: "I wanted to come but I couldn't" },
  { word: "ו", withNikud: "וְ", meaning: "And", example: "אני אוכל ושותה", exampleTranslation: "I eat and drink" },
  { word: "או", withNikud: "אוֹ", meaning: "Or", example: "קפה או תה?", exampleTranslation: "Coffee or tea?" },
  { word: "לכן", withNikud: "לָכֵן", meaning: "Therefore", example: "ירד גשם, לכן נשארתי בבית", exampleTranslation: "It rained, therefore I stayed home" },
  { word: "אם", withNikud: "אִם", meaning: "If", example: "אם תבוא, אשמח", exampleTranslation: "If you come, I'll be happy" },
  { word: "כש / כאשר", withNikud: "כְּשֶׁ / כַּאֲשֶׁר", meaning: "When", example: "כשהגעתי, הוא ישן", exampleTranslation: "When I arrived, he was sleeping" },
  { word: "גם", withNikud: "גַּם", meaning: "Also", example: "גם אני רוצה", exampleTranslation: "I also want" },
  { word: "רק", withNikud: "רַק", meaning: "Only", example: "יש לי רק שקל אחד", exampleTranslation: "I only have one shekel" },
  { word: "בגלל", withNikud: "בִּגְלַל", meaning: "Because of", example: "בגלל הגשם נשארנו בבית", exampleTranslation: "Because of the rain we stayed home" },
  { word: "למרות", withNikud: "לַמְרוֹת", meaning: "Despite/Although", example: "למרות הקור, יצאתי", exampleTranslation: "Despite the cold, I went out" },
  { word: "בשביל", withNikud: "בִּשְׁבִיל", meaning: "For/In order to", example: "זה בשביל אמא", exampleTranslation: "This is for mom" },
];

// ========== EASY LEVEL ==========
export const easyStory: LinkingStory = {
  title: "הבוקר שלי",
  text: `אני קם בבוקר כי צריך ללכת לעבודה. אני שותה קפה ואוכל ארוחת בוקר. אני אוהב קפה אבל לא אוהב תה. אחרי האוכל אני לוקח את התיק ויוצא מהבית. אם יש זמן, אני גם קורא את החדשות. היום אין זמן, לכן אני יוצא מהר.`,
  textWithNikud: `אֲנִי קָם בַּבֹּקֶר כִּי צָרִיךְ לָלֶכֶת לָעֲבוֹדָה. אֲנִי שׁוֹתֶה קָפֶה וְאוֹכֵל אֲרוּחַת בֹּקֶר. אֲנִי אוֹהֵב קָפֶה אֲבָל לֹא אוֹהֵב תֵּה. אַחֲרֵי הָאֹכֶל אֲנִי לוֹקֵחַ אֶת הַתִּיק וְיוֹצֵא מֵהַבַּיִת. אִם יֵשׁ זְמַן, אֲנִי גַּם קוֹרֵא אֶת הַחֲדָשׁוֹת. הַיּוֹם אֵין זְמַן, לָכֵן אֲנִי יוֹצֵא מָהֵר.`,
  translation: `I get up in the morning because I need to go to work. I drink coffee and eat breakfast. I like coffee but I don't like tea. After eating I take my bag and leave the house. If there's time, I also read the news. Today there's no time, therefore I leave quickly.`,
};

export const easyQuestions: LinkingQuestion[] = [
  {
    id: 1,
    sentence: "אני קם בבוקר ___ צריך ללכת לעבודה.",
    sentenceWithNikud: "אֲנִי קָם בַּבֹּקֶר ___ צָרִיךְ לָלֶכֶת לָעֲבוֹדָה.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "או", withNikud: "אוֹ" },
    ],
    answerIndex: 0,
    explanation: "כי = because - מסביר את הסיבה",
  },
  {
    id: 2,
    sentence: "אני שותה קפה ___ אוכל ארוחת בוקר.",
    sentenceWithNikud: "אֲנִי שׁוֹתֶה קָפֶה ___ אוֹכֵל אֲרוּחַת בֹּקֶר.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "ו", withNikud: "וְ" },
      { text: "לכן", withNikud: "לָכֵן" },
    ],
    answerIndex: 1,
    explanation: "ו = and - מחבר שני דברים",
  },
  {
    id: 3,
    sentence: "אני אוהב קפה ___ לא אוהב תה.",
    sentenceWithNikud: "אֲנִי אוֹהֵב קָפֶה ___ לֹא אוֹהֵב תֵּה.",
    options: [
      { text: "גם", withNikud: "גַּם" },
      { text: "כי", withNikud: "כִּי" },
      { text: "אבל", withNikud: "אֲבָל" },
    ],
    answerIndex: 2,
    explanation: "אבל = but - מראה ניגוד",
  },
  {
    id: 4,
    sentence: "___ יש זמן, אני קורא את החדשות.",
    sentenceWithNikud: "___ יֵשׁ זְמַן, אֲנִי קוֹרֵא אֶת הַחֲדָשׁוֹת.",
    options: [
      { text: "לכן", withNikud: "לָכֵן" },
      { text: "אם", withNikud: "אִם" },
      { text: "כי", withNikud: "כִּי" },
    ],
    answerIndex: 1,
    explanation: "אם = if - תנאי",
  },
  {
    id: 5,
    sentence: "אין זמן, ___ אני יוצא מהר.",
    sentenceWithNikud: "אֵין זְמַן, ___ אֲנִי יוֹצֵא מָהֵר.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "גם", withNikud: "גַּם" },
      { text: "לכן", withNikud: "לָכֵן" },
    ],
    answerIndex: 2,
    explanation: "לכן = therefore - מראה תוצאה",
  },
  {
    id: 6,
    sentence: "אני ___ קורא את החדשות בבוקר.",
    sentenceWithNikud: "אֲנִי ___ קוֹרֵא אֶת הַחֲדָשׁוֹת בַּבֹּקֶר.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "גם", withNikud: "גַּם" },
      { text: "לכן", withNikud: "לָכֵן" },
    ],
    answerIndex: 1,
    explanation: "גם = also - מוסיף פעולה נוספת",
  },
];

// ========== MEDIUM LEVEL ==========
export const mediumStory: LinkingStory = {
  title: "הטיול",
  text: `רצינו לטייל בשבת, אבל ירד גשם כל היום. לכן נשארנו בבית וראינו סרט. למרות שרצינו לצאת, היה לנו כיף גם בבית. 

כשהגשם פסק, יצאנו לטיול קצר ליד הבית. הלכנו לפארק כי רצינו לראות את הפרחים. בפארק פגשנו חברים ודיברנו איתם. אם לא היה גשם, לא היינו פוגשים אותם. לפעמים דברים קורים בגלל סיבה טובה.`,
  textWithNikud: `רָצִינוּ לְטַיֵּל בְּשַׁבָּת, אֲבָל יָרַד גֶּשֶׁם כָּל הַיּוֹם. לָכֵן נִשְׁאַרְנוּ בַּבַּיִת וְרָאִינוּ סֶרֶט. לַמְרוֹת שֶׁרָצִינוּ לָצֵאת, הָיָה לָנוּ כֵּיף גַּם בַּבַּיִת.

כְּשֶׁהַגֶּשֶׁם פָּסַק, יָצָאנוּ לְטִיּוּל קָצָר לְיַד הַבַּיִת. הָלַכְנוּ לַפַּארְק כִּי רָצִינוּ לִרְאוֹת אֶת הַפְּרָחִים. בַּפַּארְק פָּגַשְׁנוּ חֲבֵרִים וְדִיבַּרְנוּ אִיתָּם. אִם לֹא הָיָה גֶּשֶׁם, לֹא הָיִינוּ פּוֹגְשִׁים אוֹתָם. לִפְעָמִים דְּבָרִים קוֹרִים בִּגְלַל סִיבָּה טוֹבָה.`,
  translation: `We wanted to hike on Saturday, but it rained all day. Therefore we stayed home and watched a movie. Although we wanted to go out, we also had fun at home.

When the rain stopped, we went for a short walk near the house. We went to the park because we wanted to see the flowers. At the park we met friends and talked with them. If it hadn't rained, we wouldn't have met them. Sometimes things happen because of a good reason.`,
};

export const mediumQuestions: LinkingQuestion[] = [
  {
    id: 1,
    sentence: "רצינו לטייל בשבת, ___ ירד גשם.",
    sentenceWithNikud: "רָצִינוּ לְטַיֵּל בְּשַׁבָּת, ___ יָרַד גֶּשֶׁם.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "גם", withNikud: "גַּם" },
    ],
    answerIndex: 1,
    explanation: "אבל = but - ניגוד בין הרצון למציאות",
  },
  {
    id: 2,
    sentence: "ירד גשם, ___ נשארנו בבית.",
    sentenceWithNikud: "יָרַד גֶּשֶׁם, ___ נִשְׁאַרְנוּ בַּבַּיִת.",
    options: [
      { text: "לכן", withNikud: "לָכֵן" },
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "או", withNikud: "אוֹ" },
    ],
    answerIndex: 0,
    explanation: "לכן = therefore - הגשם גרם להישארות בבית",
  },
  {
    id: 3,
    sentence: "___ שרצינו לצאת, היה לנו כיף בבית.",
    sentenceWithNikud: "___ שֶׁרָצִינוּ לָצֵאת, הָיָה לָנוּ כֵּיף בַּבַּיִת.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "בגלל", withNikud: "בִּגְלַל" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 2,
    explanation: "למרות = although/despite - למרות הרצון לצאת",
  },
  {
    id: 4,
    sentence: "___ הגשם פסק, יצאנו לטיול.",
    sentenceWithNikud: "___ הַגֶּשֶׁם פָּסַק, יָצָאנוּ לְטִיּוּל.",
    options: [
      { text: "כש", withNikud: "כְּשֶׁ" },
      { text: "אם", withNikud: "אִם" },
      { text: "כי", withNikud: "כִּי" },
    ],
    answerIndex: 0,
    explanation: "כש = when - מתאר מתי יצאו",
  },
  {
    id: 5,
    sentence: "הלכנו לפארק ___ רצינו לראות פרחים.",
    sentenceWithNikud: "הָלַכְנוּ לַפַּארְק ___ רָצִינוּ לִרְאוֹת פְּרָחִים.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "כי", withNikud: "כִּי" },
      { text: "לכן", withNikud: "לָכֵן" },
    ],
    answerIndex: 1,
    explanation: "כי = because - הסיבה להליכה לפארק",
  },
  {
    id: 6,
    sentence: "___ לא היה גשם, לא היינו פוגשים אותם.",
    sentenceWithNikud: "___ לֹא הָיָה גֶּשֶׁם, לֹא הָיִינוּ פּוֹגְשִׁים אוֹתָם.",
    options: [
      { text: "כש", withNikud: "כְּשֶׁ" },
      { text: "אם", withNikud: "אִם" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 1,
    explanation: "אם = if - משפט תנאי",
  },
  {
    id: 7,
    sentence: "דברים קורים ___ סיבה טובה.",
    sentenceWithNikud: "דְּבָרִים קוֹרִים ___ סִיבָּה טוֹבָה.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "בגלל", withNikud: "בִּגְלַל" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 1,
    explanation: "בגלל = because of - אחרי בגלל בא שם עצם",
  },
  {
    id: 8,
    sentence: "היה כיף ___ בבית.",
    sentenceWithNikud: "הָיָה כֵּיף ___ בַּבַּיִת.",
    options: [
      { text: "רק", withNikud: "רַק" },
      { text: "גם", withNikud: "גַּם" },
      { text: "אבל", withNikud: "אֲבָל" },
    ],
    answerIndex: 1,
    explanation: "גם = also - גם בבית וגם בחוץ יכול להיות כיף",
  },
];

// ========== HARD LEVEL ==========
export const hardStory: LinkingStory = {
  title: "ההחלטה",
  text: `דנה קיבלה שתי הצעות עבודה. ההצעה הראשונה הייתה בתל אביב, אבל המשכורת הייתה נמוכה. ההצעה השנייה הייתה בחיפה, והמשכורת הייתה גבוהה יותר. למרות שחיפה רחוקה מהמשפחה, דנה שקלה את ההצעה ברצינות.

היא התייעצה עם ההורים. הם אמרו שאם היא תבחר בחיפה, הם יבואו לבקר אותה. בגלל התמיכה שלהם, היא הרגישה יותר בטוחה. כשחשבה על העתיד, היא הבינה שהקריירה חשובה, אבל גם המשפחה.

לבסוף היא החליטה לקחת את העבודה בחיפה, כי רצתה להתפתח מקצועית. היא ידעה שלמרות המרחק, המשפחה תמיד תהיה שם בשבילה. לפעמים צריך לקחת סיכונים בשביל להצליח.`,
  textWithNikud: `דָּנָה קִיבְּלָה שְׁתֵּי הַצָּעוֹת עֲבוֹדָה. הַהַצָּעָה הָרִאשׁוֹנָה הָיְתָה בְּתֵל אָבִיב, אֲבָל הַמַּשְׂכֹּרֶת הָיְתָה נְמוּכָה. הַהַצָּעָה הַשְּׁנִיָּה הָיְתָה בְּחֵיפָה, וְהַמַּשְׂכֹּרֶת הָיְתָה גְּבוֹהָה יוֹתֵר. לַמְרוֹת שֶׁחֵיפָה רְחוֹקָה מֵהַמִּשְׁפָּחָה, דָּנָה שָׁקְלָה אֶת הַהַצָּעָה בִּרְצִינוּת.

הִיא הִתְיַעֲצָה עִם הַהוֹרִים. הֵם אָמְרוּ שֶׁאִם הִיא תִּבְחַר בְּחֵיפָה, הֵם יָבוֹאוּ לְבַקֵּר אוֹתָהּ. בִּגְלַל הַתְּמִיכָה שֶׁלָּהֶם, הִיא הִרְגִּישָׁה יוֹתֵר בְּטוּחָה. כְּשֶׁחָשְׁבָה עַל הֶעָתִיד, הִיא הֵבִינָה שֶׁהַקַּרְיֶרָה חֲשׁוּבָה, אֲבָל גַּם הַמִּשְׁפָּחָה.

לְבַסּוֹף הִיא הֶחְלִיטָה לָקַחַת אֶת הָעֲבוֹדָה בְּחֵיפָה, כִּי רָצְתָה לְהִתְפַּתֵּחַ מִקְצוֹעִית. הִיא יָדְעָה שֶׁלַּמְרוֹת הַמֶּרְחָק, הַמִּשְׁפָּחָה תָּמִיד תִּהְיֶה שָׁם בִּשְׁבִילָהּ. לִפְעָמִים צָרִיךְ לָקַחַת סִיכּוּנִים בִּשְׁבִיל לְהַצְלִיחַ.`,
  translation: `Dana received two job offers. The first offer was in Tel Aviv, but the salary was low. The second offer was in Haifa, and the salary was higher. Although Haifa is far from family, Dana considered the offer seriously.

She consulted with her parents. They said that if she chooses Haifa, they would come visit her. Because of their support, she felt more confident. When she thought about the future, she understood that career is important, but also family.

Finally she decided to take the job in Haifa, because she wanted to develop professionally. She knew that despite the distance, family would always be there for her. Sometimes you need to take risks in order to succeed.`,
};

export const hardQuestions: LinkingQuestion[] = [
  {
    id: 1,
    sentence: "ההצעה הראשונה הייתה בתל אביב, ___ המשכורת הייתה נמוכה.",
    sentenceWithNikud: "הַהַצָּעָה הָרִאשׁוֹנָה הָיְתָה בְּתֵל אָבִיב, ___ הַמַּשְׂכֹּרֶת הָיְתָה נְמוּכָה.",
    options: [
      { text: "ו", withNikud: "וְ" },
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "כי", withNikud: "כִּי" },
    ],
    answerIndex: 1,
    explanation: "אבל = but - ניגוד בין המיקום הטוב למשכורת הנמוכה",
  },
  {
    id: 2,
    sentence: "ההצעה השנייה בחיפה, ___ המשכורת הייתה גבוהה יותר.",
    sentenceWithNikud: "הַהַצָּעָה הַשְּׁנִיָּה בְּחֵיפָה, ___ הַמַּשְׂכֹּרֶת הָיְתָה גְּבוֹהָה יוֹתֵר.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "ו", withNikud: "וְ" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 1,
    explanation: "ו = and - מוסיף מידע חיובי נוסף",
  },
  {
    id: 3,
    sentence: "___ שחיפה רחוקה מהמשפחה, דנה שקלה את ההצעה.",
    sentenceWithNikud: "___ שֶׁחֵיפָה רְחוֹקָה מֵהַמִּשְׁפָּחָה, דָּנָה שָׁקְלָה אֶת הַהַצָּעָה.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "בגלל", withNikud: "בִּגְלַל" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 2,
    explanation: "למרות = although - למרות החיסרון, היא עדיין שקלה",
  },
  {
    id: 4,
    sentence: "___ היא תבחר בחיפה, ההורים יבואו לבקר.",
    sentenceWithNikud: "___ הִיא תִּבְחַר בְּחֵיפָה, הֵם יָבוֹאוּ לְבַקֵּר.",
    options: [
      { text: "כש", withNikud: "כְּשֶׁ" },
      { text: "אם", withNikud: "אִם" },
      { text: "כי", withNikud: "כִּי" },
    ],
    answerIndex: 1,
    explanation: "אם = if - תנאי לביקור",
  },
  {
    id: 5,
    sentence: "___ התמיכה שלהם, היא הרגישה יותר בטוחה.",
    sentenceWithNikud: "___ הַתְּמִיכָה שֶׁלָּהֶם, הִיא הִרְגִּישָׁה יוֹתֵר בְּטוּחָה.",
    options: [
      { text: "למרות", withNikud: "לַמְרוֹת" },
      { text: "כי", withNikud: "כִּי" },
      { text: "בגלל", withNikud: "בִּגְלַל" },
    ],
    answerIndex: 2,
    explanation: "בגלל = because of - הסיבה לביטחון",
  },
  {
    id: 6,
    sentence: "___ חשבה על העתיד, היא הבינה שהקריירה חשובה.",
    sentenceWithNikud: "___ חָשְׁבָה עַל הֶעָתִיד, הִיא הֵבִינָה שֶׁהַקַּרְיֶרָה חֲשׁוּבָה.",
    options: [
      { text: "אם", withNikud: "אִם" },
      { text: "כש", withNikud: "כְּשֶׁ" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
    ],
    answerIndex: 1,
    explanation: "כש = when - בזמן שחשבה",
  },
  {
    id: 7,
    sentence: "הקריירה חשובה, ___ גם המשפחה.",
    sentenceWithNikud: "הַקַּרְיֶרָה חֲשׁוּבָה, ___ גַּם הַמִּשְׁפָּחָה.",
    options: [
      { text: "או", withNikud: "אוֹ" },
      { text: "לכן", withNikud: "לָכֵן" },
      { text: "אבל", withNikud: "אֲבָל" },
    ],
    answerIndex: 2,
    explanation: "אבל = but - מראה שני דברים חשובים",
  },
  {
    id: 8,
    sentence: "היא החליטה לקחת את העבודה ___ רצתה להתפתח.",
    sentenceWithNikud: "הִיא הֶחְלִיטָה לָקַחַת אֶת הָעֲבוֹדָה ___ רָצְתָה לְהִתְפַּתֵּחַ.",
    options: [
      { text: "אבל", withNikud: "אֲבָל" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
      { text: "כי", withNikud: "כִּי" },
    ],
    answerIndex: 2,
    explanation: "כי = because - הסיבה להחלטה",
  },
  {
    id: 9,
    sentence: "___ המרחק, המשפחה תמיד תהיה שם.",
    sentenceWithNikud: "___ הַמֶּרְחָק, הַמִּשְׁפָּחָה תָּמִיד תִּהְיֶה שָׁם.",
    options: [
      { text: "בגלל", withNikud: "בִּגְלַל" },
      { text: "למרות", withNikud: "לַמְרוֹת" },
      { text: "כש", withNikud: "כְּשֶׁ" },
    ],
    answerIndex: 1,
    explanation: "למרות = despite - למרות המרחק, המשפחה שם",
  },
  {
    id: 10,
    sentence: "צריך לקחת סיכונים ___ להצליח.",
    sentenceWithNikud: "צָרִיךְ לָקַחַת סִיכּוּנִים ___ לְהַצְלִיחַ.",
    options: [
      { text: "כי", withNikud: "כִּי" },
      { text: "בשביל", withNikud: "בִּשְׁבִיל" },
      { text: "בגלל", withNikud: "בִּגְלַל" },
    ],
    answerIndex: 1,
    explanation: "בשביל = in order to - המטרה של הסיכונים",
  },
];
