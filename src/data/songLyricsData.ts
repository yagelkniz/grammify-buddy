export interface SongLyricsQuestion {
  songTitle: string;
  songTitleEn: string;
  lyricWithBlank: string;
  fullLyric: string;
  translation: string;
  options: string[];
  answer: string;
}

export const songLyricsQuestions: SongLyricsQuestion[] = [
  {
    songTitle: "ירושלים של זהב",
    songTitleEn: "Jerusalem of Gold",
    lyricWithBlank: "ירושלים של _____ ושל נחושת ושל אור",
    fullLyric: "ירושלים של זהב ושל נחושת ושל אור",
    translation: "Jerusalem of gold, and of copper, and of light",
    options: ["זהב", "כסף", "שמש", "פרח"],
    answer: "זהב",
  },
  {
    songTitle: "הלוואי",
    songTitleEn: "If Only (Halevai)",
    lyricWithBlank: "הלוואי שתדע _____ אני מרגיש",
    fullLyric: "הלוואי שתדע מה אני מרגיש",
    translation: "If only you knew what I feel",
    options: ["מה", "איך", "למה", "מתי"],
    answer: "מה",
  },
  {
    songTitle: "שיר לשלום",
    songTitleEn: "Song for Peace",
    lyricWithBlank: "תנו ל_____ לעלות",
    fullLyric: "תנו לשמש לעלות",
    translation: "Let the sun rise",
    options: ["שמש", "ירח", "כוכב", "גשם"],
    answer: "שמש",
  },
  {
    songTitle: "אני ואתה",
    songTitleEn: "Me and You",
    lyricWithBlank: "אני ואתה נשנה את _____",
    fullLyric: "אני ואתה נשנה את העולם",
    translation: "Me and you will change the world",
    options: ["העולם", "השיר", "הלילה", "החיים"],
    answer: "העולם",
  },
  {
    songTitle: "בלדה לחובש",
    songTitleEn: "Ballad for the Medic",
    lyricWithBlank: "_____ הוא ים של דמעות",
    fullLyric: "העולם הוא ים של דמעות",
    translation: "The world is a sea of tears",
    options: ["העולם", "הלילה", "האור", "השמיים"],
    answer: "העולם",
  },
  {
    songTitle: "לו יהי",
    songTitleEn: "Let It Be (Lu Yehi)",
    lyricWithBlank: "כל שאני מתפלל, _____ יהי",
    fullLyric: "כל שאני מתפלל, לו יהי",
    translation: "All that I pray for, let it be",
    options: ["לו", "כי", "אם", "גם"],
    answer: "לו",
  },
  {
    songTitle: "עוד לא אהבתי דיי",
    songTitleEn: "I Haven't Loved Enough",
    lyricWithBlank: "עוד לא _____ דיי, עוד לא אמרתי דיי",
    fullLyric: "עוד לא אהבתי דיי, עוד לא אמרתי דיי",
    translation: "I haven't loved enough, I haven't said enough",
    options: ["אהבתי", "שמעתי", "ראיתי", "ידעתי"],
    answer: "אהבתי",
  },
  {
    songTitle: "יש לי סיבה חדשה לחייך",
    songTitleEn: "I Have a New Reason to Smile",
    lyricWithBlank: "יש לי סיבה חדשה _____",
    fullLyric: "יש לי סיבה חדשה לחייך",
    translation: "I have a new reason to smile",
    options: ["לחייך", "לבכות", "לשיר", "לרקוד"],
    answer: "לחייך",
  },
  {
    songTitle: "כמו צפור",
    songTitleEn: "Like a Bird",
    lyricWithBlank: "כמו _____ על חוט חשמל",
    fullLyric: "כמו צפור על חוט חשמל",
    translation: "Like a bird on a power line",
    options: ["צפור", "חתול", "ילד", "פרפר"],
    answer: "צפור",
  },
  {
    songTitle: "תן לי יד",
    songTitleEn: "Give Me Your Hand",
    lyricWithBlank: "תן לי _____ ונלך יחד",
    fullLyric: "תן לי יד ונלך יחד",
    translation: "Give me your hand and we'll walk together",
    options: ["יד", "לב", "כוח", "זמן"],
    answer: "יד",
  },
];
