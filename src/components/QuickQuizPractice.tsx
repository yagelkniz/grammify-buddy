import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quickQuizQuestions } from "@/data/quickQuizData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function QuickQuizPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"start" | "playing" | "done">("start");
  const [timeLeft, setTimeLeft] = useState(60);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const t = (he: string, en: string) => lang === "he" ? he : en;

  const questions = useMemo(() => shuffleArray(quickQuizQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { setPhase("done"); return; }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase]);

  const handleAnswer = useCallback((opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === questions[current]?.answer) setScore(s => s + 1);
    setTimeout(() => {
      setSelected(null);
      if (current < questions.length - 1) setCurrent(c => c + 1);
      else setPhase("done");
    }, 400);
  }, [selected, current, questions]);

  if (phase === "start") {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-5xl mb-4">⚡</div>
            <h1 className="text-2xl font-bold mb-2">{t("מבחן מהיר!", "Quick Quiz!")}</h1>
            <p className="text-muted-foreground mb-6">{t("60 שניות — כמה שיותר תשובות נכונות!", "60 seconds — as many correct answers as possible!")}</p>
            <Button onClick={() => setPhase("playing")} size="lg" className="w-full text-lg">
              🚀 {t("התחל!", "Start!")}
            </Button>
            <Button variant="ghost" onClick={onBack} className="mt-4">{t("חזרה", "Back")}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">{t("זמן!", "Time's Up!")}</h2>
            <p className="text-4xl font-bold text-primary mb-2">{score}</p>
            <p className="text-muted-foreground mb-4">{t("תשובות נכונות", "correct answers")}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => { setPhase("start"); setCurrent(0); setScore(0); setTimeLeft(60); }}>{t("נסה שוב", "Try Again")}</Button>
              <Button variant="outline" onClick={onBack}>{t("חזרה", "Back")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className={`text-2xl font-bold ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-primary"}`}>⏱️ {timeLeft}</span>
          <span className="text-lg font-bold text-primary">🎯 {score}</span>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="mb-4" />
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{q.hebrew}</h2>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => (
                <Button key={opt} variant={selected ? (opt === q.answer ? "default" : opt === selected ? "destructive" : "outline") : "outline"}
                  className={`h-auto py-3 text-base ${selected && opt === q.answer ? "bg-green-600 hover:bg-green-600" : ""}`}
                  onClick={() => handleAnswer(opt)} disabled={!!selected}>{opt}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
