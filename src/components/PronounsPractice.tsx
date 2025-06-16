
import React, { useState } from "react";
import questions from "./pronounsQuestions.json";
import { Button } from "@/components/ui/button";

interface PronounQuestion {
  question: string;
  options: string[];
  answer: string;
  translation: string;
}

type Lang = "he" | "en";

export default function PronounsPractice({
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

  const q: PronounQuestion = (questions as PronounQuestion[])[step];

  // Add safety check
  if (!q) {
    return <div>טוען שאלות...</div>;
  }

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
    return q.options.findIndex(opt => opt === q.answer);
  }

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 gap-6 min-h-[60vh]">
      <div className="self-end">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {t("תרגול שמות גוף", "Hebrew Pronouns Practice")}
      </h2>
      <div className="mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {showTranslation ? (
          <span>{q.translation}</span>
        ) : (
          <span>{q.question}</span>
        )}
        <Button
          variant="link"
          size="sm"
          className="ml-2"
          onClick={() => setShowTranslation((b) => !b)}
        >
          {showTranslation
            ? t("הסתר תרגום", "Hide translation")
            : t("הצג תרגום", "Show translation")}
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {q.options.map((opt, idx) => (
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
                `לא נכון. התשובה: ${q.options[getCorrectOptionIdx()]}`,
                `Incorrect. The answer: ${q.options[getCorrectOptionIdx()]}`
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
