
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "./ui/switch";
import questionsRaw from "./everydayHebrewQuestions.json";

interface EverydayHebrewPracticeProps {
  category: "restaurant" | "supermarket" | "transportation";
  onBack?: () => void;
}

export default function EverydayHebrewPractice({ category, onBack }: EverydayHebrewPracticeProps) {
  // סינון השאלות לפי קטגוריה
  const questions = (questionsRaw as any[]).filter(q => q.category === category);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const q = questions[current];

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    setShowFeedback(true);
  }

  function handleNext() {
    setSelected(null);
    setShowFeedback(false);
    setCurrent(c => (c + 1 < questions.length ? c + 1 : c));
  }

  function handlePrev() {
    setSelected(null);
    setShowFeedback(false);
    setCurrent(c => (c > 0 ? c - 1 : c));
  }

  // אם אין שאלות, נציג הודעה
  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-8 min-h-[40vh]">
        <h2 className="text-2xl text-red-800 font-bold">לא נמצאו שאלות לקטגוריה זו</h2>
        {onBack && <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-8 min-h-[65vh] max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border rtl">
      <div className="flex justify-between w-full">
        {onBack && (
          <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
        )}
        <span className="text-gray-600 text-sm">{current + 1} / {questions.length}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-1" dir="rtl">
        {category === "restaurant"
          ? "עברית יומיומית – מסעדה"
          : category === "supermarket"
          ? "עברית יומיומית – סופר"
          : "עברית יומיומית – תחבורה"}
      </h1>
      <div className="flex items-center gap-4 my-2 self-end">
        <span className="text-sm text-gray-600" dir="rtl">
          הצג תרגום לשאלה באנגלית
        </span>
        <Switch
          checked={showTranslation}
          onCheckedChange={setShowTranslation}
          id="toggle-translation"
        />
      </div>
      <div className="bg-blue-50 p-5 rounded-xl border w-full text-xl font-semibold flex flex-col items-center" dir="rtl">
        <span dangerouslySetInnerHTML={{ __html: q.question.replace("___", "<span class='underline decoration-blue-400'>_____</span>") }} />
        {showTranslation && (
          <span className="mt-2 block text-base text-gray-700 font-normal" dir="ltr">
            {q.translation}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mt-2">
        {q.options.map((opt) => {
          let btnColor = "bg-gray-100";
          if (selected) {
            if (opt === q.correctAnswer && selected === opt) btnColor = "bg-green-200 border border-green-500 font-bold";
            else if (selected === opt) btnColor = "bg-red-200 border border-red-500 font-bold";
            else btnColor = "bg-gray-100 opacity-70";
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`rounded-xl px-6 py-3 text-lg transition ${btnColor} hover:bg-blue-100`}
              dir="rtl"
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="text-xl font-semibold mt-4 flex flex-col items-center gap-1">
          {selected === q.correctAnswer
            ? <span className="text-green-700">✅ תשובה נכונה!</span>
            : <>
                <span className="text-red-600">❌ לא נכון</span>
                <span className="text-green-800">התשובה הנכונה: <b>{q.correctAnswer}</b></span>
              </>
          }
          <span className="text-gray-800 text-base mt-2">אנגלית: {q.translation}</span>
        </div>
      )}
      <div className="flex gap-4 justify-center mt-6 w-full">
        <Button variant="outline" disabled={current === 0} onClick={handlePrev}>⬅ קודם</Button>
        <Button className="bg-blue-600 text-white" onClick={handleNext} disabled={current === questions.length - 1}>
          {current === questions.length - 1 ? "סיום" : "הבא ➡"}
        </Button>
      </div>
    </div>
  );
}
