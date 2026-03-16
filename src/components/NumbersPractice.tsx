import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { numbers1to20, tens, numberQuestions } from "@/data/numbersData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function NumbersPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => lang === "he" ? he : en;

  const questions = useMemo(() => shuffleArray(numberQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);

  if (phase === "learn") {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
          <h1 className="text-2xl font-bold text-primary mb-6">🔢 {t("מספרים בעברית", "Numbers in Hebrew")}</h1>
          
          <Card className="mb-6">
            <CardHeader><CardTitle>{t("מספרים 0-20", "Numbers 0-20")}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {numbers1to20.map(n => (
                  <div key={n.number} className="bg-secondary rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-primary">{n.number}</div>
                    <div className="text-sm font-semibold">{n.hebrew}</div>
                    <div className="text-xs text-muted-foreground">{n.english}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle>{t("עשרות", "Tens")}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {tens.map(n => (
                  <div key={n.number} className="bg-accent rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-primary">{n.number}</div>
                    <div className="text-sm font-semibold">{n.hebrew}</div>
                    <div className="text-xs text-muted-foreground">{n.english}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => setPhase("quiz")} className="w-full">
            🎯 {t("התחל תרגול", "Start Practice")}
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const total = questions.length;
  const progress = ((current) / total) * 100;

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    setSelected(null);
    if (current < total - 1) setCurrent(c => c + 1);
  };

  if (current >= total || (current === total - 1 && selected)) {
    const isLast = current === total - 1 && selected;
    if (isLast && current === total - 1) {
      const finalScore = selected === q.answer ? score : score;
      return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">{t("כל הכבוד!", "Great Job!")}</h2>
              <p className="text-lg mb-4">{t(`${score} מתוך ${total} תשובות נכונות`, `${score} out of ${total} correct`)}</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => { setCurrent(0); setSelected(null); setScore(0); }}>{t("נסה שוב", "Try Again")}</Button>
                <Button variant="outline" onClick={onBack}>{t("חזרה", "Back")}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-muted-foreground mb-4">{t(`שאלה ${current + 1} מתוך ${total}`, `Question ${current + 1} of ${total}`)}</p>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{lang === "he" ? q.question : q.questionEn}</h2>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => (
                <Button
                  key={opt}
                  variant={selected ? (opt === q.answer ? "default" : opt === selected ? "destructive" : "outline") : "outline"}
                  className={`h-auto py-3 text-base ${selected && opt === q.answer ? "bg-green-600 hover:bg-green-600" : ""}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {selected && (
              <Button onClick={next} className="w-full mt-4">
                {current < total - 1 ? t("הבא", "Next") : t("סיום", "Finish")}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
