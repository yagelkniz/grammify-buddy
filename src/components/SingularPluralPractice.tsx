
import React, { useState } from "react";
import questions from "./singularPluralQuestions.json";
import { Button } from "@/components/ui/button";

interface SingularPluralQuestion {
  id: number;
  he: {
    question: string;
    options: string[];
    hint: string;
  };
  en: {
    question: string;
    options: string[];
    hint: string;
  };
  answer: string;
}

type Lang = "he" | "en";

function buildDistractors(word: string, answer: string): string[] {
  // פתרון פשוט: מייצרים שלושה סוגי תשובות - יחיד, רבים בוות, רבים ב-ים
  // אם התשובה ב-ים -> המחולל ייתן וריאציה ב-ות ולהיפך, תמיד מציג גם את היחיד.
  const base = word.replace(/ים$|ות$/, "");
  let pluralYim = base + "ים";
  let pluralVot = base + "ות";

  // מניעת כפילויות ואי התאמות 
  // אם ה"ות" או "ים" כבר מופיע במקור, נשתמש בו, אחרת נייצר משורש המילה
  if (answer.endsWith("ים")) pluralYim = answer;
  if (answer.endsWith("ות")) pluralVot = answer;

  // תמיד יש יחיד, שתי וריאציות רבים (ים, ות)
  const options: string[] = [base, pluralYim, pluralVot];

  // remove duplicates and put the answer where it should be
  const filteredOptions = Array.from(new Set(options));
  // ודא שהתשובה האמיתית אכן קיימת באפשרויות
  if (!filteredOptions.includes(answer)) filteredOptions.push(answer);
  return filteredOptions;
}

export default function SingularPluralPractice({
  lang = "he",
  onBack,
}: {
  lang?: Lang;
  onBack?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const q: SingularPluralQuestion = (questions as SingularPluralQuestion[])[step];

  // חילוץ המילה המקורית מתוך השאלה
  // בהנחה שהמילה בין גרשיים ראשונה
  const match = q.he.question.match(/'([^']+)'/);
  const baseWord = match ? match[1] : "";

  // בונה אופציות בצורה דינמית, תמיד: יחיד, רבים-ים, רבים-ות — תשובה שגויה אחת לפחות תמיד (הסחה).
  const heOptions = buildDistractors(baseWord, q.answer);

  // מחלץ מקבילי אנגלית
  // משתמשים באותו האינדקס מתוך אופציות באנגלית לפי סדר החדש
  const enRawOptions = q.en.options.map(opt => opt.replace(/.*\(([^)]+)\).*/, "$1"));
  // במקביל לבניית אפשרות חדשה, נשתדל למפות לאנגלית לפי סדר השאלה המקורי,
  // ואם אין התאמה, פשוט נחזור על האופציה הקיימת באנגלית.
  function findEnglishForHebrew(opt: string): string {
    const idx = q.he.options.indexOf(opt);
    if (idx !== -1 && q.en.options[idx]) {
      return q.en.options[idx].replace(/.*\(([^)]+)\).*/, "$1");
    }
    // לא נמצא: נסה להתאים "ים" -> "(boys)" וכו'
    if (opt.endsWith("ים") && enRawOptions.find(x => x.endsWith("s"))) return enRawOptions.find(x => x.endsWith("s")) as string;
    if (opt.endsWith("ות") && enRawOptions.find(x => x.endsWith("s"))) return enRawOptions.find(x => x.endsWith("s")) as string;
    if (!opt.endsWith("ים") && !opt.endsWith("ות") && enRawOptions.find(x => !x.endsWith("s"))) return enRawOptions.find(x => !x.endsWith("s")) as string;
    // אחרת נחזיר תרגום גולמי של המילה
    return opt;
  }
  const joinedOptions = heOptions.map((heOpt) => `${heOpt} (${findEnglishForHebrew(heOpt)})`);

  function handleOption(idx: number) {
    setSelected(idx);
    setShowFeedback(true);
  }

  function next() {
    setSelected(null);
    setShowFeedback(false);
    setShowTranslation(false);
    setStep((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  }

  const t = (h: string, e: string) => (lang === "he" ? h : e);

  function getCorrectOptionIdx() {
    // מחפש איזה אינדקס באופציות החדשות שווה לתשובה הנכונה
    return heOptions.findIndex(opt => opt === q.answer);
  }

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 gap-6 min-h-[60vh]">
      <div className="self-end">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {t("יחיד/רבים + זכר/נקבה", "Singular/Plural + Gender")}
      </h2>
      <div className="mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {showTranslation ? (
          <span>{q.en.question}</span>
        ) : (
          <span>{q.he.question}</span>
        )}
        <Button
          variant="link"
          size="sm"
          className="ml-2"
          onClick={() => setShowTranslation((b) => !b)}
        >
          {showTranslation
            ? t("הסתר אנגלית", "Hide English")
            : t("הצג אנגלית", "Show English")}
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {joinedOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant={selected === idx ? "default" : "outline"}
            onClick={() => !showFeedback && handleOption(idx)}
            className="w-full text-xl py-4"
            disabled={showFeedback}
          >
            {opt}
          </Button>
        ))}
      </div>
      {showFeedback && (
        <div
          className={`rounded-xl p-4 w-full text-lg font-bold ${
            selected === getCorrectOptionIdx()
              ? "bg-green-100 text-green-900"
              : "bg-red-100 text-red-900"
          }`}
        >
          {selected === getCorrectOptionIdx()
            ? t("נכון! מעולה!", "Correct! Well done!")
            : t(
                `לא נכון. התשובה: ${joinedOptions[getCorrectOptionIdx()]} (${q.he.hint})`,
                `Incorrect. The answer: ${joinedOptions[getCorrectOptionIdx()]} (${q.en.hint})`
              )}
        </div>
      )}
      <div className="flex justify-between w-full mt-4">
        <span className="text-gray-500 text-sm">
          {t(`שאלה ${step + 1} מתוך ${questions.length}`, `Question ${step + 1} of ${questions.length}`)}
        </span>
        {showFeedback && (
          <Button variant="secondary" onClick={next}>
            {t("המשך", "Next")}
          </Button>
        )}
      </div>
    </div>
  );
}
