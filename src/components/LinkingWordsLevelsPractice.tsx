import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X, BookOpen, HelpCircle } from "lucide-react";
import {
  linkingWordsVocabulary,
  easyStory,
  easyQuestions,
  mediumStory,
  mediumQuestions,
  hardStory,
  hardQuestions,
  type LinkingStory,
  type LinkingQuestion,
} from "./linkingWordsLevelsData";

type Level = "easy" | "medium" | "hard";
type Phase = "vocabulary" | "story" | "questions";

interface LinkingWordsLevelsPracticeProps {
  onBack: () => void;
}

export default function LinkingWordsLevelsPractice({ onBack }: LinkingWordsLevelsPracticeProps) {
  const [level, setLevel] = useState<Level | null>(null);
  const [phase, setPhase] = useState<Phase>("vocabulary");
  const [showNikud, setShowNikud] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<{ [id: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [id: number]: "correct" | "incorrect" }>({});

  const getStory = (): LinkingStory => {
    switch (level) {
      case "easy": return easyStory;
      case "medium": return mediumStory;
      case "hard": return hardStory;
      default: return easyStory;
    }
  };

  const getQuestions = (): LinkingQuestion[] => {
    switch (level) {
      case "easy": return easyQuestions;
      case "medium": return mediumQuestions;
      case "hard": return hardQuestions;
      default: return [];
    }
  };

  const story = getStory();
  const questions = getQuestions();

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setFeedback((prev) => ({
        ...prev,
        [questionId]: answerIndex === question.answerIndex ? "correct" : "incorrect",
      }));
    }
  };

  const correctCount = Object.values(feedback).filter((f) => f === "correct").length;
  const totalAnswered = Object.keys(feedback).length;

  const resetPractice = () => {
    setPhase("vocabulary");
    setAnswers({});
    setFeedback({});
    setShowTranslation(false);
  };

  const getLevelName = () => {
    switch (level) {
      case "easy": return "קל";
      case "medium": return "בינוני";
      case "hard": return "קשה";
      default: return "";
    }
  };

  // Level selection
  if (!level) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה
          </Button>
          <h1 className="text-2xl font-bold text-primary">מילות קישור</h1>
        </div>

        <div className="mb-8 p-6 bg-muted rounded-xl text-center">
          <p className="text-lg mb-2">🔗 איך זה עובד?</p>
          <p className="text-muted-foreground">
            1. קודם תראה מילון מילות קישור<br />
            2. אחר כך תקרא סיפור קצר<br />
            3. בסוף תשלים משפטים עם מילת הקישור הנכונה
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>
            עם ניקוד
          </Button>
          <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>
            בלי ניקוד
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">בחר רמה</h2>
        <div className="grid gap-4">
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-green-100 text-green-900 border-green-300 hover:bg-green-200" onClick={() => setLevel("easy")}>
            🟢 קל ({easyQuestions.length} שאלות)
          </button>
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200" onClick={() => setLevel("medium")}>
            🟡 בינוני ({mediumQuestions.length} שאלות)
          </button>
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-red-100 text-red-900 border-red-300 hover:bg-red-200" onClick={() => setLevel("hard")}>
            🔴 קשה ({hardQuestions.length} שאלות)
          </button>
        </div>
      </div>
    );
  }

  // Vocabulary phase
  if (phase === "vocabulary") {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => { setLevel(null); resetPractice(); }} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה לרמות
          </Button>
          <h1 className="text-2xl font-bold text-primary">מילון מילות קישור</h1>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>עם ניקוד</Button>
          <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>בלי ניקוד</Button>
        </div>

        <div className="grid gap-3 mb-6">
          {linkingWordsVocabulary.map((word, idx) => (
            <div key={idx} className="p-4 bg-muted rounded-xl border">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-2xl font-bold text-primary">{showNikud ? word.withNikud : word.word}</span>
                  <span className="text-lg text-muted-foreground mr-3">{word.meaning}</span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-foreground">{word.example}</span>
                <span className="text-muted-foreground mr-2">({word.exampleTranslation})</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setPhase("story")} size="lg" className="gap-2">
            <BookOpen className="h-5 w-5" />
            המשך לסיפור
          </Button>
        </div>
      </div>
    );
  }

  // Story phase
  if (phase === "story") {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setPhase("vocabulary")} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה למילון
          </Button>
          <h1 className="text-2xl font-bold text-primary">{story.title} ({getLevelName()})</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">ניקוד:</span>
            <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>עם ניקוד</Button>
            <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>בלי ניקוד</Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
            {showTranslation ? "הסתר תרגום" : "הצג תרגום"}
          </Button>
        </div>

        <div className="p-6 bg-muted rounded-xl mb-6">
          <p className="text-xl leading-relaxed whitespace-pre-line">
            {showNikud ? story.textWithNikud : story.text}
          </p>
          {showTranslation && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{story.translation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setPhase("questions")} size="lg" className="gap-2">
            <HelpCircle className="h-5 w-5" />
            המשך לתרגול
          </Button>
        </div>
      </div>
    );
  }

  // Questions phase
  return (
    <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => setPhase("story")} className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4" />
          חזרה לסיפור
        </Button>
        <h1 className="text-2xl font-bold text-primary">השלם את המשפט - {getLevelName()}</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>עם ניקוד</Button>
          <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>בלי ניקוד</Button>
        </div>
        <div className="text-lg font-semibold">{correctCount}/{questions.length} נכון</div>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className={`p-4 rounded-xl border-2 ${
            feedback[q.id] === "correct" ? "bg-green-50 border-green-300" :
            feedback[q.id] === "incorrect" ? "bg-red-50 border-red-300" : "bg-background border-border"
          }`}>
            <div className="text-lg font-semibold mb-4">
              {q.id}. {showNikud ? q.sentenceWithNikud : q.sentence}
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option, idx) => {
                const isSelected = answers[q.id] === idx;
                const isCorrect = idx === q.answerIndex;
                return (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    disabled={!!feedback[q.id]}
                    variant={feedback[q.id] ? (isCorrect ? "default" : isSelected ? "destructive" : "outline") : isSelected ? "default" : "outline"}
                    className="text-lg"
                  >
                    {showNikud ? option.withNikud : option.text}
                    {feedback[q.id] && isCorrect && <Check className="h-4 w-4 mr-1" />}
                    {feedback[q.id] && isSelected && !isCorrect && <X className="h-4 w-4 mr-1" />}
                  </Button>
                );
              })}
            </div>
            {feedback[q.id] && (
              <div className={`mt-3 p-2 rounded text-sm ${feedback[q.id] === "correct" ? "text-green-700" : "text-red-700"}`}>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {totalAnswered === questions.length && (
        <div className="mt-8 p-6 bg-muted rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">סיימת!</h2>
          <p className="text-lg mb-4">התוצאה: {correctCount}/{questions.length} ({Math.round((correctCount / questions.length) * 100)}%)</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetPractice}>נסה שוב</Button>
            <Button variant="outline" onClick={() => { setLevel(null); resetPractice(); }}>בחר רמה אחרת</Button>
          </div>
        </div>
      )}
    </div>
  );
}
