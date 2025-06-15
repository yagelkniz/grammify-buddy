
import React, { useState } from "react";
import questions from "./possessivePronounsQuestions.json";
import { Button } from "@/components/ui/button";

interface Props {
  lang?: "he" | "en";
  onBack: () => void;
}

const PossessivePronounsPractice: React.FC<Props> = ({ lang = "he", onBack }) => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];

  const handleCheck = () => {
    const answer = lang === "he" ? q.answerHe : q.answerEn;
    if (input.trim().toLowerCase() === answer.trim().toLowerCase()) {
      setScore((s) => s + 1);
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    setInput("");
    setShowAnswer(false);
    setCurrent((c) => c + 1);
  };

  if (current >= questions.length) {
    return (
      <div className="flex flex-col items-center gap-6 p-4">
        <h2 className="text-xl font-bold text-violet-900" dir="rtl">סיימת!</h2>
        <div className="text-lg" dir="rtl">
          צברת {score} מתוך {questions.length} נקודות.
        </div>
        <Button className="mt-4" onClick={onBack}>⬅ חזרה</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 p-6 bg-background rounded-2xl shadow border">
      <div className="flex justify-end w-full">
        <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
      </div>
      <h2 className="text-2xl font-bold text-teal-900 mb-1" dir="rtl">
        תרגול מילות שייכות<br />
        <span className="text-base text-slate-700 font-normal" dir="ltr">Possessive Pronouns Practice</span>
      </h2>
      <div className="w-full bg-slate-50 rounded-xl shadow p-6 mb-2">
        <div className="mb-4" dir={lang === "he" ? "rtl" : "ltr"}>
          <span className="font-bold">{lang === "he" ? q.hebrewExample : q.englishExample}</span>
        </div>
        <input
          className="border rounded px-4 py-2 w-full text-lg mb-2"
          type="text"
          dir={lang === "he" ? "rtl" : "ltr"}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={lang === "he" ? "הקלד תשובה בעברית" : "Type your answer in English"}
          disabled={showAnswer}
        />
        {!showAnswer ? (
          <Button className="w-full" onClick={handleCheck}>
            בדוק / Check
          </Button>
        ) : (
          <div className="mt-2 space-y-2">
            <div className="text-lg" dir={lang === "he" ? "rtl" : "ltr"}>
              תשובה נכונה:{" "}
              <span className="font-bold text-green-700">
                {lang === "he" ? q.answerHe : q.answerEn}
              </span>
            </div>
            <Button className="w-full bg-teal-600 text-white" onClick={handleNext}>
              שאלה הבאה / Next Question
            </Button>
          </div>
        )}
      </div>
      <div className="text-base text-gray-500">שאלה {current + 1} מתוך {questions.length}</div>
    </div>
  );
};

export default PossessivePronounsPractice;
