import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { shoppingVocab, shoppingQuestions } from "@/data/shoppingData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function ShoppingPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => lang === "he" ? he : en;
  const questions = useMemo(() => shuffleArray(shoppingQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);

  if (phase === "learn") {
    const categories = [...new Set(shoppingVocab.map(v => v.category))];
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
          <h1 className="text-2xl font-bold text-primary mb-6">🛒 {t("קניות — אוצר מילים", "Shopping — Vocabulary")}</h1>
          {categories.map(cat => (
            <div key={cat} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">{cat}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {shoppingVocab.filter(v => v.category === cat).map(v => (
                  <div key={v.hebrew} className="bg-card rounded-lg p-3 border shadow-sm">
                    <div className="font-bold">{v.hebrew}</div>
                    <div className="text-sm text-muted-foreground">{v.english}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={() => setPhase("quiz")} className="w-full mt-4">🎯 {t("התחל תרגול", "Start Practice")}</Button>
        </div>
      </div>
    );
  }

  const q = questions[current]; const total = questions.length;
  const handleAnswer = (opt: string) => { if (selected) return; setSelected(opt); if (opt === q.answer) setScore(s => s + 1); };
  const next = () => { setSelected(null); setCurrent(c => c + 1); };

  if (current >= total) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center"><CardContent className="p-8">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">{t("כל הכבוד!", "Great Job!")}</h2>
          <p className="text-lg mb-4">{t(`${score} מתוך ${total}`, `${score} out of ${total}`)}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => { setCurrent(0); setSelected(null); setScore(0); }}>{t("נסה שוב", "Try Again")}</Button>
            <Button variant="outline" onClick={onBack}>{t("חזרה", "Back")}</Button>
          </div>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
        <Progress value={(current / total) * 100} className="mb-4" />
        <Card><CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">{lang === "he" ? q.question : q.questionEn}</h2>
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(opt => (
              <Button key={opt} variant={selected ? (opt === q.answer ? "default" : opt === selected ? "destructive" : "outline") : "outline"}
                className={`h-auto py-3 text-base ${selected && opt === q.answer ? "bg-green-600 hover:bg-green-600" : ""}`}
                onClick={() => handleAnswer(opt)} disabled={!!selected}>{opt}</Button>
            ))}
          </div>
          {selected && <Button onClick={current < total - 1 ? next : () => setCurrent(total)} className="w-full mt-4">{current < total - 1 ? t("הבא", "Next") : t("סיום", "Finish")}</Button>}
        </CardContent></Card>
      </div>
    </div>
  );
}
