// Complete Binyanim (Verb Patterns) Data Structure
// Each binyan includes conjugation templates for all tenses and pronouns

export interface Conjugation {
  pronoun: string;
  pronounHe: string;
  form: string;
  formWithNikud: string;
}

export interface VerbTense {
  name: string;
  nameHe: string;
  conjugations: Conjugation[];
}

export interface Binyan {
  id: string;
  name: string;
  nameHe: string;
  nameWithNikud: string;
  description: string;
  descriptionHe: string;
  meaning: string;
  meaningHe: string;
  examples: { root: string; verb: string; verbWithNikud: string; meaning: string }[];
  pattern: {
    past: string;
    present: string;
    future: string;
    imperative: string;
  };
  color: string;
}

export const pronouns = [
  { id: "ani", he: "אֲנִי", en: "I" },
  { id: "ata", he: "אַתָּה", en: "You (m.s.)" },
  { id: "at", he: "אַתְּ", en: "You (f.s.)" },
  { id: "hu", he: "הוּא", en: "He" },
  { id: "hi", he: "הִיא", en: "She" },
  { id: "anachnu", he: "אֲנַחְנוּ", en: "We" },
  { id: "atem", he: "אַתֶּם", en: "You (m.pl.)" },
  { id: "aten", he: "אַתֶּן", en: "You (f.pl.)" },
  { id: "hem", he: "הֵם", en: "They (m.)" },
  { id: "hen", he: "הֵן", en: "They (f.)" },
];

export const binyanim: Binyan[] = [
  {
    id: "paal",
    name: "Pa'al",
    nameHe: "פָּעַל",
    nameWithNikud: "פָּעַל",
    description: "The most basic and common pattern. Expresses simple, active actions.",
    descriptionHe: "הבניין הבסיסי והנפוץ ביותר. מבטא פעולות פשוטות ואקטיביות.",
    meaning: "Simple active verbs",
    meaningHe: "פעלים אקטיביים פשוטים",
    examples: [
      { root: "כ-ת-ב", verb: "כותב", verbWithNikud: "כּוֹתֵב", meaning: "writes" },
      { root: "ל-מ-ד", verb: "לומד", verbWithNikud: "לוֹמֵד", meaning: "learns" },
      { root: "ש-מ-ע", verb: "שומע", verbWithNikud: "שׁוֹמֵעַ", meaning: "hears" },
      { root: "א-כ-ל", verb: "אוכל", verbWithNikud: "אוֹכֵל", meaning: "eats" },
    ],
    pattern: {
      past: "פָּעַל",
      present: "פּוֹעֵל",
      future: "יִפְעֹל",
      imperative: "פְּעֹל",
    },
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: "nifal",
    name: "Nif'al",
    nameHe: "נִפְעַל",
    nameWithNikud: "נִפְעַל",
    description: "Passive of Pa'al or reflexive. Something happens to the subject.",
    descriptionHe: "הבניין הסביל של פעל, או רפלקסיבי. משהו קורה לנושא.",
    meaning: "Passive / Reflexive",
    meaningHe: "סביל / רפלקסיבי",
    examples: [
      { root: "כ-ת-ב", verb: "נכתב", verbWithNikud: "נִכְתַּב", meaning: "was written" },
      { root: "ש-מ-ע", verb: "נשמע", verbWithNikud: "נִשְׁמַע", meaning: "was heard" },
      { root: "פ-ת-ח", verb: "נפתח", verbWithNikud: "נִפְתַּח", meaning: "was opened" },
      { root: "ס-ג-ר", verb: "נסגר", verbWithNikud: "נִסְגַּר", meaning: "was closed" },
    ],
    pattern: {
      past: "נִפְעַל",
      present: "נִפְעָל",
      future: "יִפָּעֵל",
      imperative: "הִפָּעֵל",
    },
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: "piel",
    name: "Pi'el",
    nameHe: "פִּעֵל",
    nameWithNikud: "פִּעֵל",
    description: "Intensive or causative actions. Often communication or repeated actions.",
    descriptionHe: "פעולות אינטנסיביות או גורמות. לעתים קרובות תקשורת או פעולות חוזרות.",
    meaning: "Intensive / Causative",
    meaningHe: "אינטנסיבי / גורם",
    examples: [
      { root: "ד-ב-ר", verb: "מדבר", verbWithNikud: "מְדַבֵּר", meaning: "speaks" },
      { root: "ס-פ-ר", verb: "מספר", verbWithNikud: "מְסַפֵּר", meaning: "tells" },
      { root: "ב-ק-ש", verb: "מבקש", verbWithNikud: "מְבַקֵּשׁ", meaning: "asks/requests" },
      { root: "ל-מ-ד", verb: "מלמד", verbWithNikud: "מְלַמֵּד", meaning: "teaches" },
    ],
    pattern: {
      past: "פִּעֵל",
      present: "מְפַעֵל",
      future: "יְפַעֵל",
      imperative: "פַּעֵל",
    },
    color: "bg-green-100 border-green-300",
  },
  {
    id: "pual",
    name: "Pu'al",
    nameHe: "פֻּעַל",
    nameWithNikud: "פֻּעַל",
    description: "Passive of Pi'el. The intensive action is done to the subject.",
    descriptionHe: "הבניין הסביל של פיעל. הפעולה האינטנסיבית נעשית לנושא.",
    meaning: "Passive of Intensive",
    meaningHe: "סביל של אינטנסיבי",
    examples: [
      { root: "ס-פ-ר", verb: "סופר", verbWithNikud: "סֻפַּר", meaning: "was told" },
      { root: "ב-ש-ל", verb: "בושל", verbWithNikud: "בֻּשַּׁל", meaning: "was cooked" },
      { root: "ת-ק-ן", verb: "תוקן", verbWithNikud: "תֻּקַּן", meaning: "was fixed" },
      { root: "כ-ב-ד", verb: "כובד", verbWithNikud: "כֻּבַּד", meaning: "was honored" },
    ],
    pattern: {
      past: "פֻּעַל",
      present: "מְפֻעָל",
      future: "יְפֻעַל",
      imperative: "—",
    },
    color: "bg-teal-100 border-teal-300",
  },
  {
    id: "hifil",
    name: "Hif'il",
    nameHe: "הִפְעִיל",
    nameWithNikud: "הִפְעִיל",
    description: "Causative pattern. Making someone/something do an action.",
    descriptionHe: "בניין גורם. לגרום למישהו/למשהו לעשות פעולה.",
    meaning: "Causative",
    meaningHe: "גורם",
    examples: [
      { root: "ל-ב-ש", verb: "מלביש", verbWithNikud: "מַלְבִּישׁ", meaning: "dresses (someone)" },
      { root: "ש-מ-ע", verb: "משמיע", verbWithNikud: "מַשְׁמִיעַ", meaning: "plays (sound)" },
      { root: "ר-א-ה", verb: "מראה", verbWithNikud: "מַרְאֶה", meaning: "shows" },
      { root: "ז-מ-ן", verb: "מזמין", verbWithNikud: "מַזְמִין", meaning: "invites/orders" },
    ],
    pattern: {
      past: "הִפְעִיל",
      present: "מַפְעִיל",
      future: "יַפְעִיל",
      imperative: "הַפְעֵל",
    },
    color: "bg-amber-100 border-amber-300",
  },
  {
    id: "hufal",
    name: "Huf'al",
    nameHe: "הֻפְעַל",
    nameWithNikud: "הֻפְעַל",
    description: "Passive of Hif'il. The causative action is done to the subject.",
    descriptionHe: "הבניין הסביל של הפעיל. הפעולה הגורמת נעשית לנושא.",
    meaning: "Passive of Causative",
    meaningHe: "סביל של גורם",
    examples: [
      { root: "ל-ב-ש", verb: "הולבש", verbWithNikud: "הֻלְבַּשׁ", meaning: "was dressed" },
      { root: "ש-מ-ע", verb: "הושמע", verbWithNikud: "הֻשְׁמַע", meaning: "was played" },
      { root: "ז-מ-ן", verb: "הוזמן", verbWithNikud: "הֻזְמַן", meaning: "was invited" },
      { root: "כ-נ-ס", verb: "הוכנס", verbWithNikud: "הֻכְנַס", meaning: "was inserted" },
    ],
    pattern: {
      past: "הֻפְעַל",
      present: "מֻפְעָל",
      future: "יֻפְעַל",
      imperative: "—",
    },
    color: "bg-orange-100 border-orange-300",
  },
  {
    id: "hitpael",
    name: "Hitpa'el",
    nameHe: "הִתְפַּעֵל",
    nameWithNikud: "הִתְפַּעֵל",
    description: "Reflexive pattern. Doing an action to oneself or reciprocal actions.",
    descriptionHe: "בניין רפלקסיבי. לעשות פעולה לעצמך או פעולות הדדיות.",
    meaning: "Reflexive / Reciprocal",
    meaningHe: "רפלקסיבי / הדדי",
    examples: [
      { root: "ל-ב-ש", verb: "מתלבש", verbWithNikud: "מִתְלַבֵּשׁ", meaning: "gets dressed" },
      { root: "ר-ח-ץ", verb: "מתרחץ", verbWithNikud: "מִתְרַחֵץ", meaning: "washes oneself" },
      { root: "א-ר-ג-ן", verb: "מתארגן", verbWithNikud: "מִתְאַרְגֵּן", meaning: "gets organized" },
      { root: "פ-ג-ש", verb: "מתפגש", verbWithNikud: "מִתְפַּגֵּשׁ", meaning: "meets (each other)" },
    ],
    pattern: {
      past: "הִתְפַּעֵל",
      present: "מִתְפַּעֵל",
      future: "יִתְפַּעֵל",
      imperative: "הִתְפַּעֵל",
    },
    color: "bg-rose-100 border-rose-300",
  },
];

// Common roots database with their meanings across binyanim
export interface Root {
  letters: string;
  lettersSpaced: string;
  meaning: string;
  meaningHe: string;
  binyanForms: {
    binyanId: string;
    infinitive: string;
    infinitiveWithNikud: string;
    meaning: string;
    meaningHe: string;
    conjugations: {
      tense: "past" | "present" | "future" | "imperative";
      forms: { pronoun: string; form: string; formWithNikud: string }[];
    }[];
  }[];
}

export const commonRoots: Root[] = [
  {
    letters: "כתב",
    lettersSpaced: "כ-ת-ב",
    meaning: "write",
    meaningHe: "כתיבה",
    binyanForms: [
      {
        binyanId: "paal",
        infinitive: "לכתוב",
        infinitiveWithNikud: "לִכְתֹּב",
        meaning: "to write",
        meaningHe: "לכתוב",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "כותב", formWithNikud: "כּוֹתֵב" },
              { pronoun: "אני/היא", form: "כותבת", formWithNikud: "כּוֹתֶבֶת" },
              { pronoun: "אנחנו/הם", form: "כותבים", formWithNikud: "כּוֹתְבִים" },
              { pronoun: "אנחנו/הן", form: "כותבות", formWithNikud: "כּוֹתְבוֹת" },
            ],
          },
          {
            tense: "past",
            forms: [
              { pronoun: "אני", form: "כתבתי", formWithNikud: "כָּתַבְתִּי" },
              { pronoun: "אתה", form: "כתבת", formWithNikud: "כָּתַבְתָּ" },
              { pronoun: "את", form: "כתבת", formWithNikud: "כָּתַבְתְּ" },
              { pronoun: "הוא", form: "כתב", formWithNikud: "כָּתַב" },
              { pronoun: "היא", form: "כתבה", formWithNikud: "כָּתְבָה" },
              { pronoun: "אנחנו", form: "כתבנו", formWithNikud: "כָּתַבְנוּ" },
              { pronoun: "אתם", form: "כתבתם", formWithNikud: "כְּתַבְתֶּם" },
              { pronoun: "אתן", form: "כתבתן", formWithNikud: "כְּתַבְתֶּן" },
              { pronoun: "הם", form: "כתבו", formWithNikud: "כָּתְבוּ" },
              { pronoun: "הן", form: "כתבו", formWithNikud: "כָּתְבוּ" },
            ],
          },
          {
            tense: "future",
            forms: [
              { pronoun: "אני", form: "אכתוב", formWithNikud: "אֶכְתֹּב" },
              { pronoun: "אתה", form: "תכתוב", formWithNikud: "תִּכְתֹּב" },
              { pronoun: "את", form: "תכתבי", formWithNikud: "תִּכְתְּבִי" },
              { pronoun: "הוא", form: "יכתוב", formWithNikud: "יִכְתֹּב" },
              { pronoun: "היא", form: "תכתוב", formWithNikud: "תִּכְתֹּב" },
              { pronoun: "אנחנו", form: "נכתוב", formWithNikud: "נִכְתֹּב" },
              { pronoun: "אתם", form: "תכתבו", formWithNikud: "תִּכְתְּבוּ" },
              { pronoun: "אתן", form: "תכתבו", formWithNikud: "תִּכְתְּבוּ" },
              { pronoun: "הם", form: "יכתבו", formWithNikud: "יִכְתְּבוּ" },
              { pronoun: "הן", form: "יכתבו", formWithNikud: "יִכְתְּבוּ" },
            ],
          },
        ],
      },
      {
        binyanId: "nifal",
        infinitive: "להיכתב",
        infinitiveWithNikud: "לְהִכָּתֵב",
        meaning: "to be written",
        meaningHe: "להיכתב",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "נכתב", formWithNikud: "נִכְתָּב" },
              { pronoun: "אני/היא", form: "נכתבת", formWithNikud: "נִכְתֶּבֶת" },
              { pronoun: "אנחנו/הם", form: "נכתבים", formWithNikud: "נִכְתָּבִים" },
              { pronoun: "אנחנו/הן", form: "נכתבות", formWithNikud: "נִכְתָּבוֹת" },
            ],
          },
        ],
      },
    ],
  },
  {
    letters: "דבר",
    lettersSpaced: "ד-ב-ר",
    meaning: "speak/word",
    meaningHe: "דיבור/מילה",
    binyanForms: [
      {
        binyanId: "piel",
        infinitive: "לדבר",
        infinitiveWithNikud: "לְדַבֵּר",
        meaning: "to speak",
        meaningHe: "לדבר",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "מדבר", formWithNikud: "מְדַבֵּר" },
              { pronoun: "אני/היא", form: "מדברת", formWithNikud: "מְדַבֶּרֶת" },
              { pronoun: "אנחנו/הם", form: "מדברים", formWithNikud: "מְדַבְּרִים" },
              { pronoun: "אנחנו/הן", form: "מדברות", formWithNikud: "מְדַבְּרוֹת" },
            ],
          },
          {
            tense: "past",
            forms: [
              { pronoun: "אני", form: "דיברתי", formWithNikud: "דִּבַּרְתִּי" },
              { pronoun: "אתה", form: "דיברת", formWithNikud: "דִּבַּרְתָּ" },
              { pronoun: "את", form: "דיברת", formWithNikud: "דִּבַּרְתְּ" },
              { pronoun: "הוא", form: "דיבר", formWithNikud: "דִּבֵּר" },
              { pronoun: "היא", form: "דיברה", formWithNikud: "דִּבְּרָה" },
              { pronoun: "אנחנו", form: "דיברנו", formWithNikud: "דִּבַּרְנוּ" },
              { pronoun: "אתם", form: "דיברתם", formWithNikud: "דִּבַּרְתֶּם" },
              { pronoun: "אתן", form: "דיברתן", formWithNikud: "דִּבַּרְתֶּן" },
              { pronoun: "הם", form: "דיברו", formWithNikud: "דִּבְּרוּ" },
              { pronoun: "הן", form: "דיברו", formWithNikud: "דִּבְּרוּ" },
            ],
          },
          {
            tense: "future",
            forms: [
              { pronoun: "אני", form: "אדבר", formWithNikud: "אֲדַבֵּר" },
              { pronoun: "אתה", form: "תדבר", formWithNikud: "תְּדַבֵּר" },
              { pronoun: "את", form: "תדברי", formWithNikud: "תְּדַבְּרִי" },
              { pronoun: "הוא", form: "ידבר", formWithNikud: "יְדַבֵּר" },
              { pronoun: "היא", form: "תדבר", formWithNikud: "תְּדַבֵּר" },
              { pronoun: "אנחנו", form: "נדבר", formWithNikud: "נְדַבֵּר" },
              { pronoun: "אתם", form: "תדברו", formWithNikud: "תְּדַבְּרוּ" },
              { pronoun: "אתן", form: "תדברו", formWithNikud: "תְּדַבְּרוּ" },
              { pronoun: "הם", form: "ידברו", formWithNikud: "יְדַבְּרוּ" },
              { pronoun: "הן", form: "ידברו", formWithNikud: "יְדַבְּרוּ" },
            ],
          },
        ],
      },
    ],
  },
  {
    letters: "לבש",
    lettersSpaced: "ל-ב-ש",
    meaning: "dress/wear",
    meaningHe: "לבוש",
    binyanForms: [
      {
        binyanId: "paal",
        infinitive: "ללבוש",
        infinitiveWithNikud: "לִלְבֹּשׁ",
        meaning: "to wear",
        meaningHe: "ללבוש",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "לובש", formWithNikud: "לוֹבֵשׁ" },
              { pronoun: "אני/היא", form: "לובשת", formWithNikud: "לוֹבֶשֶׁת" },
              { pronoun: "אנחנו/הם", form: "לובשים", formWithNikud: "לוֹבְשִׁים" },
              { pronoun: "אנחנו/הן", form: "לובשות", formWithNikud: "לוֹבְשׁוֹת" },
            ],
          },
        ],
      },
      {
        binyanId: "hifil",
        infinitive: "להלביש",
        infinitiveWithNikud: "לְהַלְבִּישׁ",
        meaning: "to dress (someone)",
        meaningHe: "להלביש מישהו",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "מלביש", formWithNikud: "מַלְבִּישׁ" },
              { pronoun: "אני/היא", form: "מלבישה", formWithNikud: "מַלְבִּישָׁה" },
              { pronoun: "אנחנו/הם", form: "מלבישים", formWithNikud: "מַלְבִּישִׁים" },
              { pronoun: "אנחנו/הן", form: "מלבישות", formWithNikud: "מַלְבִּישׁוֹת" },
            ],
          },
        ],
      },
      {
        binyanId: "hitpael",
        infinitive: "להתלבש",
        infinitiveWithNikud: "לְהִתְלַבֵּשׁ",
        meaning: "to get dressed",
        meaningHe: "להתלבש",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "מתלבש", formWithNikud: "מִתְלַבֵּשׁ" },
              { pronoun: "אני/היא", form: "מתלבשת", formWithNikud: "מִתְלַבֶּשֶׁת" },
              { pronoun: "אנחנו/הם", form: "מתלבשים", formWithNikud: "מִתְלַבְּשִׁים" },
              { pronoun: "אנחנו/הן", form: "מתלבשות", formWithNikud: "מִתְלַבְּשׁוֹת" },
            ],
          },
        ],
      },
    ],
  },
  {
    letters: "למד",
    lettersSpaced: "ל-מ-ד",
    meaning: "learn/teach",
    meaningHe: "לימוד",
    binyanForms: [
      {
        binyanId: "paal",
        infinitive: "ללמוד",
        infinitiveWithNikud: "לִלְמֹד",
        meaning: "to learn",
        meaningHe: "ללמוד",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "לומד", formWithNikud: "לוֹמֵד" },
              { pronoun: "אני/היא", form: "לומדת", formWithNikud: "לוֹמֶדֶת" },
              { pronoun: "אנחנו/הם", form: "לומדים", formWithNikud: "לוֹמְדִים" },
              { pronoun: "אנחנו/הן", form: "לומדות", formWithNikud: "לוֹמְדוֹת" },
            ],
          },
          {
            tense: "past",
            forms: [
              { pronoun: "אני", form: "למדתי", formWithNikud: "לָמַדְתִּי" },
              { pronoun: "אתה", form: "למדת", formWithNikud: "לָמַדְתָּ" },
              { pronoun: "את", form: "למדת", formWithNikud: "לָמַדְתְּ" },
              { pronoun: "הוא", form: "למד", formWithNikud: "לָמַד" },
              { pronoun: "היא", form: "למדה", formWithNikud: "לָמְדָה" },
              { pronoun: "אנחנו", form: "למדנו", formWithNikud: "לָמַדְנוּ" },
              { pronoun: "אתם", form: "למדתם", formWithNikud: "לְמַדְתֶּם" },
              { pronoun: "אתן", form: "למדתן", formWithNikud: "לְמַדְתֶּן" },
              { pronoun: "הם", form: "למדו", formWithNikud: "לָמְדוּ" },
              { pronoun: "הן", form: "למדו", formWithNikud: "לָמְדוּ" },
            ],
          },
          {
            tense: "future",
            forms: [
              { pronoun: "אני", form: "אלמד", formWithNikud: "אֶלְמַד" },
              { pronoun: "אתה", form: "תלמד", formWithNikud: "תִּלְמַד" },
              { pronoun: "את", form: "תלמדי", formWithNikud: "תִּלְמְדִי" },
              { pronoun: "הוא", form: "ילמד", formWithNikud: "יִלְמַד" },
              { pronoun: "היא", form: "תלמד", formWithNikud: "תִּלְמַד" },
              { pronoun: "אנחנו", form: "נלמד", formWithNikud: "נִלְמַד" },
              { pronoun: "אתם", form: "תלמדו", formWithNikud: "תִּלְמְדוּ" },
              { pronoun: "אתן", form: "תלמדו", formWithNikud: "תִּלְמְדוּ" },
              { pronoun: "הם", form: "ילמדו", formWithNikud: "יִלְמְדוּ" },
              { pronoun: "הן", form: "ילמדו", formWithNikud: "יִלְמְדוּ" },
            ],
          },
        ],
      },
      {
        binyanId: "piel",
        infinitive: "ללמד",
        infinitiveWithNikud: "לְלַמֵּד",
        meaning: "to teach",
        meaningHe: "ללמד",
        conjugations: [
          {
            tense: "present",
            forms: [
              { pronoun: "אני/הוא", form: "מלמד", formWithNikud: "מְלַמֵּד" },
              { pronoun: "אני/היא", form: "מלמדת", formWithNikud: "מְלַמֶּדֶת" },
              { pronoun: "אנחנו/הם", form: "מלמדים", formWithNikud: "מְלַמְּדִים" },
              { pronoun: "אנחנו/הן", form: "מלמדות", formWithNikud: "מְלַמְּדוֹת" },
            ],
          },
        ],
      },
    ],
  },
];

// Get all forms of a root across binyanim
export function getRootForms(rootLetters: string) {
  return commonRoots.find((r) => r.letters === rootLetters || r.lettersSpaced === rootLetters);
}

// Get binyan by ID
export function getBinyan(binyanId: string) {
  return binyanim.find((b) => b.id === binyanId);
}
