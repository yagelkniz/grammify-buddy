import React, { useState } from "react";
import { Palette, Apple } from "lucide-react";
import {
  colorsVocabulary,
  fruitsVocabulary,
  stories,
  questions,
  VocabWord,
  Question
} from "./colorsAndFruitsData";

const levels = [
  { key: "easy", label: "קל" },
  { key: "medium", label: "בינוני" },
  { key: "hard", label: "קשה" }
] as const;

type LevelKey = typeof levels[number]["key"];

interface ColorsAndFruitsPracticeProps {
  onBack: () => void;
}

export default function ColorsAndFruitsPractice({ onBack }: ColorsAndFruitsPracticeProps) {
  const [level, setLevel] = useState<LevelKey | null>(null);
  const [phase, setPhase] = useState<"vocab" | "story" | "questions">("vocab");
  const [showNikud, setShowNikud] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedback, setFeedback] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});

  const getQuestions = (): Question[] => (level ? questions[level] : []);
  const getStory = () => (level ? stories[level] : null);

  function handleAnswer(qIdx: number, option: string) {
    if (answers[qIdx]) return;
    const qs = getQuestions();
    setAnswers(prev => ({ ...prev, [qIdx]: option }));
    setFeedback(prev => ({
      ...prev,
      [qIdx]: option === qs[qIdx].answer ? "correct" : "incorrect"
    }));
  }

  function resetPractice() {
    setLevel(null);
    setPhase("vocab");
    setAnswers({});
    setFeedback({});
  }

  const correctCount = Object.values(feedback).filter(f => f === "correct").length;
  const totalQuestions = getQuestions().length;
  const finished = Object.keys(answers).length === totalQuestions && totalQuestions > 0;

  // Level selection
  if (!level) {
    return (
      <div className="flex flex-col items-center py-10 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-lg mx-auto mt-8">
        <button
          onClick={onBack}
          className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
        >
          ⬅ חזרה לתפריט הראשי
        </button>
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2 mb-3" dir="rtl">
          <Palette className="text-pink-500" />
          <Apple className="text-green-500" />
          צבעים ופירות
        </h2>
        <div className="text-lg font-medium text-gray-700 mb-2" dir="rtl">
          בחר רמת קושי:
        </div>
        <div className="flex gap-4 w-full flex-wrap justify-center">
          {levels.map(({ key, label }) => (
            <button
              key={key}
              className="bg-pink-200 hover:bg-pink-300 transition-all px-7 py-3 rounded-xl border-2 border-pink-400 text-xl font-bold text-pink-900 shadow"
              onClick={() => setLevel(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex gap-2 items-center text-base cursor-pointer mt-4" dir="rtl">
          <input
            type="checkbox"
            checked={showNikud}
            onChange={() => setShowNikud(v => !v)}
            className="accent-pink-500 w-4 h-4"
          />
          הצג ניקוד
        </label>
      </div>
    );
  }

  // Vocabulary phase
  if (phase === "vocab") {
    return (
      <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
        <div className="self-start flex gap-4">
          <button onClick={onBack} className="text-sm text-blue-800 underline underline-offset-2">
            ⬅ חזרה לתפריט הראשי
          </button>
          <button onClick={resetPractice} className="text-sm text-blue-800 underline underline-offset-2">
            ← לרמות
          </button>
        </div>
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
          <Palette className="text-pink-500" /> אוצר מילים: צבעים
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {colorsVocabulary.map((word, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-pink-200 shadow text-center">
              <div className="text-xl font-bold text-pink-700" dir="rtl">
                {showNikud ? word.hebrewWithNikud : word.hebrew}
              </div>
              <div className="text-sm text-gray-600">{word.english}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mt-4" dir="rtl">
          <Apple className="text-green-500" /> אוצר מילים: פירות
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {fruitsVocabulary.map((word, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-green-200 shadow text-center">
              <div className="text-xl font-bold text-green-700" dir="rtl">
                {showNikud ? word.hebrewWithNikud : word.hebrew}
              </div>
              <div className="text-sm text-gray-600">{word.english}</div>
            </div>
          ))}
        </div>
        <label className="flex gap-2 items-center text-base cursor-pointer mt-2" dir="rtl">
          <input
            type="checkbox"
            checked={showNikud}
            onChange={() => setShowNikud(v => !v)}
            className="accent-pink-500 w-4 h-4"
          />
          הצג ניקוד
        </label>
        <button
          onClick={() => setPhase("story")}
          className="mt-4 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow transition-all"
        >
          המשך לסיפור ←
        </button>
      </div>
    );
  }

  // Story phase
  if (phase === "story") {
    const story = getStory();
    return (
      <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
        <div className="self-start flex gap-4">
          <button onClick={onBack} className="text-sm text-blue-800 underline underline-offset-2">
            ⬅ חזרה לתפריט הראשי
          </button>
          <button onClick={() => setPhase("vocab")} className="text-sm text-blue-800 underline underline-offset-2">
            ← לאוצר מילים
          </button>
        </div>
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
          📖 סיפור - רמת {levels.find(l => l.key === level)?.label}
        </h2>
        <div className="rounded-xl border px-5 py-4 bg-white text-lg leading-8 shadow-sm w-full" dir="rtl">
          {showNikud ? story?.textWithNikud : story?.text}
        </div>
        {showTranslation && (
          <div className="rounded-xl border px-5 py-3 bg-gray-100 text-base text-gray-700 w-full" dir="ltr">
            {story?.translation}
          </div>
        )}
        <div className="flex gap-4 flex-wrap justify-center">
          <label className="flex gap-2 items-center text-base cursor-pointer" dir="rtl">
            <input
              type="checkbox"
              checked={showNikud}
              onChange={() => setShowNikud(v => !v)}
              className="accent-pink-500 w-4 h-4"
            />
            ניקוד
          </label>
          <label className="flex gap-2 items-center text-base cursor-pointer" dir="rtl">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={() => setShowTranslation(v => !v)}
              className="accent-blue-500 w-4 h-4"
            />
            תרגום
          </label>
        </div>
        <button
          onClick={() => setPhase("questions")}
          className="mt-4 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow transition-all"
        >
          המשך לשאלות ←
        </button>
      </div>
    );
  }

  // Questions phase
  const qs = getQuestions();
  return (
    <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
      <div className="self-start flex gap-4">
        <button onClick={onBack} className="text-sm text-blue-800 underline underline-offset-2">
          ⬅ חזרה לתפריט הראשי
        </button>
        <button onClick={() => setPhase("story")} className="text-sm text-blue-800 underline underline-offset-2">
          ← לסיפור
        </button>
      </div>
      <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
        ❓ שאלות הבנה - רמת {levels.find(l => l.key === level)?.label}
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {qs.map((q, i) => (
          <div key={i} className="w-full bg-white border border-pink-200 rounded-xl p-4 shadow">
            <div className="font-semibold text-md mb-2" dir="rtl">
              {i + 1}. {q.question}
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i, opt)}
                  className={`px-3 py-1.5 rounded-xl text-base font-medium border transition-all duration-200
                    ${answers[i] === opt
                      ? feedback[i] === "correct"
                        ? "bg-green-200 border-green-500 scale-105"
                        : "bg-red-200 border-red-500 scale-95"
                      : "bg-white border-gray-300 hover:bg-pink-100"
                    }`}
                  disabled={!!answers[i]}
                  dir="rtl"
                >
                  {opt}
                </button>
              ))}
            </div>
            {answers[i] && (
              <div className="mt-2">
                {feedback[i] === "correct" ? (
                  <span className="text-green-700 font-bold">✅ תשובה נכונה!</span>
                ) : (
                  <span className="text-red-700 font-bold">❌ טעות - התשובה הנכונה: {q.answer}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 w-full">
        <div className="font-bold text-lg text-pink-900 bg-pink-100 px-5 py-2 rounded shadow" dir="rtl">
          סטטיסטיקה: {correctCount} תשובות נכונות מתוך {totalQuestions}
        </div>
        {finished && (
          <>
            <div className="text-xl font-bold text-pink-700" dir="rtl">
              כל הכבוד! סיימת את התרגול 🎉
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAnswers({});
                  setFeedback({});
                  setPhase("vocab");
                }}
                className="px-4 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 text-pink-900 font-semibold"
              >
                🔄 נסה שוב
              </button>
              <button
                onClick={resetPractice}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
              >
                בחר רמה אחרת
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
