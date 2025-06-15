
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Level = "קל" | "בינוני" | "קשה";

type Question = {
  noun: string;
  adjective: string;
  textBefore: string;
  blank: string;
  textAfter: string;
  options: string[];
  correct: string;
};

// שאלות לדוגמה לכל רמה
const questionsByLevel: Record<Level, Question[]> = {
  "קל": [
    {
      noun: "כלב",
      adjective: "שחור",
      textBefore: "זה",
      blank: "______",
      textAfter: ".",
      options: ["כלב שחור", "כלב שחורה", "כלבה שחור"],
      correct: "כלב שחור",
    },
    {
      noun: "חתולה",
      adjective: "לבנה",
      textBefore: "זו",
      blank: "______",
      textAfter: ".",
      options: ["חתול לבן", "חתולה לבנה", "חתולה לבן"],
      correct: "חתולה לבנה",
    }
  ],
  "בינוני": [
    {
      noun: "ספרים",
      adjective: "ישנים",
      textBefore: "אלה",
      blank: "______",
      textAfter: "מעניינים.",
      options: ["ספר ישן", "ספרים ישנים", "ספרים ישנה", "ספרים ישן"],
      correct: "ספרים ישנים",
    },
    {
      noun: "שאלה",
      adjective: "קשה",
      textBefore: "זו",
      blank: "______",
      textAfter: "מאוד.",
      options: ["שאלה קשה", "שאלה קשהים", "שאלה קשים", "שאלה קל"],
      correct: "שאלה קשה",
    }
  ],
  "קשה": [
    {
      noun: "תלמידות",
      adjective: "חכמות",
      textBefore: "הן",
      blank: "______",
      textAfter: ".",
      options: ["תלמידה חכמה", "תלמידות חכמות", "תלמידות חכם", "תלמידים חכמות"],
      correct: "תלמידות חכמות",
    },
    {
      noun: "תפוחים",
      adjective: "אדומים",
      textBefore: "אלה",
      blank: "______",
      textAfter: "וטריים.",
      options: ["תפוח אדום", "תפוחים אדומים", "תפוחים אדום", "תפוחה אדומה"],
      correct: "תפוחים אדומים",
    }
  ],
};

export default function NounAdjectivePractice({
  onBack,
}: {
  onBack?: () => void;
}) {
  const [level, setLevel] = useState<Level | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const questions = level ? questionsByLevel[level] : [];

  function handleSelectLevel(lvl: Level) {
    setLevel(lvl);
    setCurrent(0);
    setSelected(null);
    setFeedback(null);
  }

  function checkAnswer(opt: string) {
    setSelected(opt);
    if (opt === questions[current].correct) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  }

  function handleNext() {
    setSelected(null);
    setFeedback(null);
    setCurrent((c) => c + 1);
  }

  function handleRestart() {
    setLevel(null);
    setCurrent(0);
    setSelected(null);
    setFeedback(null);
  }

  if (!level) {
    return (
      <div className="flex flex-col items-center gap-7 p-8 bg-background rounded-2xl shadow-md border max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-2" dir="rtl">בחר/י רמת קושי</h2>
        <div className="flex flex-col gap-4 w-full">
          {(["קל", "בינוני", "קשה"] as Level[]).map((lvl) => (
            <Button key={lvl} className="w-full text-lg" onClick={() => handleSelectLevel(lvl)}>{lvl}</Button>
          ))}
        </div>
        {onBack && (
          <Button variant="outline" className="mt-8" onClick={onBack}>⬅ חזרה</Button>
        )}
      </div>
    );
  }

  if (current >= questions.length) {
    return (
      <div className="flex flex-col items-center gap-5 p-8 bg-background rounded-2xl shadow-md border max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-2" dir="rtl">סיימת את התרגול!</h2>
        <Button onClick={handleRestart}>נסה שוב</Button>
        <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 min-h-[55vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto rtl">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-base text-gray-600" dir="rtl">רמה: <strong>{level}</strong></span>
        {onBack && (
          <Button variant="outline" size="sm" onClick={handleRestart}>רמות</Button>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2" dir="rtl">בחר/י את הצירוף הנכון</h2>
      <p className="text-lg mb-4 flex flex-wrap items-center justify-center" dir="rtl">
        {q.textBefore} <span className="mx-1 font-bold">{q.blank}</span> {q.textAfter}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xs">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => checkAnswer(opt)}
            className={`rounded-xl px-4 py-2 text-lg font-medium hover:scale-105 transition whitespace-nowrap
              ${selected === opt
                ? (opt === q.correct ? "bg-green-300" : "bg-red-200")
                : "bg-white hover:bg-gray-200"}
            `}
            dir="rtl"
            disabled={!!selected}
            aria-disabled={!!selected}
            style={{ border: selected === opt ? "2px solid #a3a3a3" : "" }}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback === "correct" && (
        <div className="text-md font-semibold mt-2 text-green-600" dir="rtl">
          ✅ תשובה נכונה!
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-md font-semibold mt-2 text-red-500" dir="rtl">
          ❌ נסה שוב
        </div>
      )}
      {selected && feedback === "correct" && current < questions.length - 1 && (
        <Button className="mt-2" onClick={handleNext}>לשאלה הבאה</Button>
      )}
      {selected && feedback === "correct" && current === questions.length - 1 && (
        <Button className="mt-2" onClick={handleNext}>לסיום</Button>
      )}
    </div>
  );
}
