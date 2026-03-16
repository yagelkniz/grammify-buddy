import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { newsReadingText, newsReadingTranslation, newsQuestions, newsVocab } from "@/data/newsReadingData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function NewsReadingPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"read" | "quiz">("read");
  const [showTranslation, setShowTranslation] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => lang === "he" ? he : en;
  const questions = useMemo(() => shuffleArray(newsQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);

  if (phase === "read") {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
          <h1 className="text-2xl font-bold text-primary mb-4">📰 {t("כתבה עכשווית", "Current Events Article")} <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">{t("קשה", "Hard")}</span></h1>
          
          <Card className="mb-4">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed whitespace-pre-wrap" style={{ lineHeight: 1.8 }}>{newsReadingText}</p>
              <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)} className="mt-4">
                {showTranslation ? t("הסתר תרגום", "Hide Translation") : t("הצג תרגום", "Show Translation")}
              </Button>
              {showTranslation && <p className="mt-3 text-muted-foreground whitespace-pre-wrap" dir="ltr">{newsReadingTranslation}</p>}
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader><CardTitle>{t("מילים חשובות", "Key Vocabulary")}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {newsVocab.map(v => (
                  <div key={v.hebrew} className="flex justify-between bg-secondary p-2 rounded">
                    <span className="font-semibold">{v.hebrew}</span>
                    <span className="text-muted-foreground text-sm">{v.english}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => setPhase("quiz")} className="w-full">📝 {t("עבור לשאלות", "Go to Questions")}</Button>
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
            <Button onClick={() => { setPhase("read"); setCurrent(0); setSelected(null); setScore(0); }}>{t("קרא שוב", "Read Again")}</Button>
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
