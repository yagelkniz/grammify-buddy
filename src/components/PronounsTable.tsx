
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const pronouns = [
  {
    hebrew: "אני",
    english: "I",
    translit: "ani",
    hebrewExample: "אני גר בתל אביב.",
    englishExample: "I live in Tel Aviv.",
  },
  {
    hebrew: "אתה",
    english: "You (m. sg.)",
    translit: "ata",
    hebrewExample: "אתה שותה קפה כל בוקר.",
    englishExample: "You drink coffee every morning.",
  },
  {
    hebrew: "את",
    english: "You (f. sg.)",
    translit: "at",
    hebrewExample: "את מדברת עברית יפה.",
    englishExample: "You speak Hebrew beautifully.",
  },
  {
    hebrew: "הוא",
    english: "He",
    translit: "hu",
    hebrewExample: "הוא לומד באוניברסיטה.",
    englishExample: "He studies at the university.",
  },
  {
    hebrew: "היא",
    english: "She",
    translit: "hi",
    hebrewExample: "היא עובדת בבית חולים.",
    englishExample: "She works at a hospital.",
  },
  {
    hebrew: "אנחנו",
    english: "We",
    translit: "anachnu",
    hebrewExample: "אנחנו מטיילים בסוף השבוע.",
    englishExample: "We travel on the weekends.",
  },
  {
    hebrew: "אתם",
    english: "You (m. pl.)",
    translit: "atem",
    hebrewExample: "אתם משחקים כדורגל כל יום שישי.",
    englishExample: "You (m. pl.) play soccer every Friday.",
  },
  {
    hebrew: "אתן",
    english: "You (f. pl.)",
    translit: "aten",
    hebrewExample: "אתן מבשלות ארוחת ערב טעימה.",
    englishExample: "You (f. pl.) cook a delicious dinner.",
  },
  {
    hebrew: "הם",
    english: "They (m.)",
    translit: "hem",
    hebrewExample: "הם נוסעים לחיפה מחר.",
    englishExample: "They (m.) are going to Haifa tomorrow.",
  },
  {
    hebrew: "הן",
    english: "They (f.)",
    translit: "hen",
    hebrewExample: "הן קונות בגדים חדשים.",
    englishExample: "They (f.) are buying new clothes.",
  },
];

const PronounsTable = () => (
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border p-4 md:p-8 mt-6">
    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center" dir="rtl">
      שמות גוף בעברית עם תרגום ודוגמאות
    </h2>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-right" dir="rtl">עברית</TableHead>
            <TableHead className="text-lg text-left">English</TableHead>
            <TableHead className="text-lg text-left">Transliteration</TableHead>
            <TableHead className="text-lg text-right" dir="rtl">דוגמה בעברית</TableHead>
            <TableHead className="text-lg text-left">English Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pronouns.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-bold text-lg text-blue-900" dir="rtl">{row.hebrew}</TableCell>
              <TableCell>{row.english}</TableCell>
              <TableCell className="font-mono">{row.translit}</TableCell>
              <TableCell dir="rtl">{row.hebrewExample}</TableCell>
              <TableCell>{row.englishExample}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default PronounsTable;
