import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { conjugationTable, hifilQuestions, HifilQuestion } from "./HifilVerbData";

interface HifilVerbPracticeProps {
  onBack: () => void;
  initialLevel?: "learn" | "easy" | "medium" | "hard";
  lang?: "he" | "en";
}

type Phase = "table" | "past" | "present" | "future" | "results";
type TenseType = "past" | "present" | "future";

export default function HifilVerbPractice({ onBack, initialLevel = "learn", lang = "he" }: HifilVerbPracticeProps) {
  // Determine initial phase based on level
  const getInitialPhase = (): Phase => {
    if (initialLevel === "learn") return "table";
    return "past"; // For easy/medium/hard, start with practice
  };
  
  const [phase, setPhase] = useState<Phase>(getInitialPhase());
  const [showNikud, setShowNikud] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ tense: TenseType; correct: number; total: number }[]>([]);
  const [currentTenseResults, setCurrentTenseResults] = useState({ correct: 0, total: 0 });

  const removeNikud = (text: string) => {
    return text.replace(/[\u0591-\u05C7]/g, "");
  };

  const displayText = (text: string) => (showNikud ? text : removeNikud(text));

  // Shuffle questions and options using Fisher-Yates algorithm
  const shuffledQuestions = useMemo(() => {
    // First shuffle all questions
    const shuffled = [...hifilQuestions].sort(() => Math.random() - 0.5);
    
    // Then shuffle options within each question
    return shuffled.map(q => {
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return { ...q, options: shuffledOptions };
    });
  }, [phase]); // Re-shuffle when phase changes (new tense)

  const getQuestionsByTense = (tense: TenseType): HifilQuestion[] => {
    return shuffledQuestions.filter((q) => q.tense === tense);
  };

  const currentQuestions = phase !== "table" && phase !== "results" ? getQuestionsByTense(phase) : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correct) {
      setCurrentTenseResults((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setCurrentTenseResults((prev) => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Save results for this tense
      setResults((prev) => [...prev, { tense: phase as TenseType, ...currentTenseResults }]);
      
      // Move to next phase
      if (phase === "past") {
        setPhase("present");
      } else if (phase === "present") {
        setPhase("future");
      } else {
        setPhase("results");
      }
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentTenseResults({ correct: 0, total: 0 });
    }
  };

  const startPractice = () => {
    setPhase("past");
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const resetPractice = () => {
    setPhase("table");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const getTenseLabel = (tense: TenseType) => {
    switch (tense) {
      case "past": return "עבר";
      case "present": return "הווה";
      case "future": return "עתיד";
    }
  };

  // Render conjugation table
  if (phase === "table") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ⬅ חזרה לתפריט הראשי
          </Button>

          <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-2 text-right">
              בניין הפעיל - הפועל "להלביש"
            </h1>
            <p className="text-center text-muted-foreground mb-4" dir="ltr">
              Hif'il Pattern - The verb "to dress (someone)"
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Checkbox
                id="nikud"
                checked={showNikud}
                onCheckedChange={(checked) => setShowNikud(checked === true)}
              />
              <label htmlFor="nikud" className="text-sm">הצג ניקוד</label>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr className="bg-secondary">
                    <th className="border border-border p-2 text-right">גוף</th>
                    <th className="border border-border p-2 bg-accent">עבר</th>
                    <th className="border border-border p-2 bg-muted">הווה</th>
                    <th className="border border-border p-2 bg-secondary">עתיד</th>
                  </tr>
                </thead>
                <tbody>
                  {conjugationTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/50">
                      <td className="border border-border p-2 font-semibold text-right">
                        {row.pronoun}
                        <span className="text-xs text-muted-foreground block" dir="ltr">({row.pronounEn})</span>
                      </td>
                      <td className="border border-border p-2 bg-accent/30 text-lg">
                        {displayText(row.past)}
                      </td>
                      <td className="border border-border p-2 bg-muted/30 text-lg">
                        {displayText(row.present)}
                      </td>
                      <td className="border border-border p-2 bg-secondary/30 text-lg">
                        {displayText(row.future)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Button onClick={startPractice} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
                התחל תרגול 🎯
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render results
  if (phase === "results") {
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl">
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">🎉 סיימת את התרגול!</h2>
          
          <div className="space-y-4 mb-6">
            {results.map((r, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-semibold">{getTenseLabel(r.tense)}</span>
                <span className={r.correct === r.total ? "text-green-600" : "text-primary"}>
                  {r.correct} / {r.total}
                </span>
              </div>
            ))}
          </div>

          <div className="text-4xl font-bold mb-2">{percentage}%</div>
          <p className="text-muted-foreground mb-6">
            {totalCorrect} מתוך {totalQuestions} תשובות נכונות
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetPractice} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              תרגול מחדש
            </Button>
            <Button variant="outline" onClick={onBack}>
              חזרה לתפריט
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render practice questions
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ⬅ חזרה לתפריט הראשי
        </Button>

        <Progress 
          value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} 
          className="mb-4 h-2"
        />

        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground`}>
              זמן {getTenseLabel(phase)}
            </span>
            <span className="text-muted-foreground">
              שאלה {currentQuestionIndex + 1} / {currentQuestions.length}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 mb-4">
            <Checkbox
              id="nikud-practice"
              checked={showNikud}
              onCheckedChange={(checked) => setShowNikud(checked === true)}
            />
            <label htmlFor="nikud-practice" className="text-sm">הצג ניקוד</label>
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-semibold mb-2 text-right">
              {displayText(currentQuestion.sentence)}
            </p>
            <p className="text-muted-foreground" dir="ltr">{currentQuestion.sentenceEn}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = option === currentQuestion.correct;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = "py-4 text-lg ";
              if (showFeedback) {
                if (isCorrect) {
                  buttonClass += "bg-green-500 hover:bg-green-500 text-white";
                } else if (isSelected) {
                  buttonClass += "bg-destructive hover:bg-destructive text-destructive-foreground";
                } else {
                  buttonClass += "bg-muted text-muted-foreground";
                }
              } else {
                buttonClass += "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
              }

              return (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  {displayText(option)}
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="text-center">
              <p className={`text-lg font-semibold mb-4 ${selectedAnswer === currentQuestion.correct ? "text-green-600" : "text-destructive"}`}>
                {selectedAnswer === currentQuestion.correct ? "✓ נכון!" : `✗ התשובה הנכונה: ${displayText(currentQuestion.correct)}`}
              </p>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {currentQuestionIndex < currentQuestions.length - 1 ? "הבא →" : 
                  phase === "future" ? "לתוצאות" : `לזמן ${getTenseLabel(phase === "past" ? "present" : "future")}`}
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-muted-foreground">
            תשובות נכונות בזמן זה: {currentTenseResults.correct} / {currentTenseResults.total}
          </div>
        </div>
      </div>
    </div>
  );
}
