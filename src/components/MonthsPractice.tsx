import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { months, monthQuestions } from "@/data/monthsData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function MonthsPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"cards" | "quiz">("cards");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => lang === "he" ? he : en;

  const questions = useMemo(() => shuffleArray(monthQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);

  if (phase === "cards") {
    const m = months[cardIndex];
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
          <h1 className="text-2xl font-bold text-primary mb-6">🗓️ {t("חודשי השנה", "Months of the Year")}</h1>
          
          <Card className="cursor-pointer mb-4" onClick={() => setFlipped(!flipped)}>
            <CardContent className="p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
              {!flipped ? (
                <>
                  <div className="text-4xl font-bold text-primary mb-2">{m.hebrew}</div>
                  <div className="text-lg text-muted-foreground">{t("לחץ לגלות", "Tap to reveal")}</div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-primary mb-2">{m.hebrew}</div>
                  <div className="text-xl mb-1">{m.english}</div>
                  <div className="text-sm text-muted-foreground">{t("חודש עברי:", "Hebrew month:")} {m.hebrewTraditional}</div>
                  <div className="text-sm text-muted-foreground">{t("חודש מספר", "Month #")} {m.monthNumber}</div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-center mb-4">
            <Button variant="outline" disabled={cardIndex === 0} onClick={() => { setCardIndex(i => i - 1); setFlipped(false); }}>
              {t("הקודם", "Previous")}
            </Button>
            <span className="flex items-center text-sm text-muted-foreground">{cardIndex + 1} / {months.length}</span>
            <Button variant="outline" disabled={cardIndex === months.length - 1} onClick={() => { setCardIndex(i => i + 1); setFlipped(false); }}>
              {t("הבא", "Next")}
            </Button>
          </div>

          <Button onClick={() => setPhase("quiz")} className="w-full">
            🎯 {t("התחל תרגול", "Start Practice")}
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const total = questions.length;

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore(s => s + 1);
  };

  const next = () => { setSelected(null); setCurrent(c => c + 1); };

  if (current >= total) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">{t("כל הכבוד!", "Great Job!")}</h2>
            <p className="text-lg mb-4">{t(`${score} מתוך ${total}`, `${score} out of ${total}`)}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => { setCurrent(0); setSelected(null); setScore(0); }}>{t("נסה שוב", "Try Again")}</Button>
              <Button variant="outline" onClick={onBack}>{t("חזרה", "Back")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
        <Progress value={(current / total) * 100} className="mb-4" />
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
            {selected && current < total - 1 && (
              <Button onClick={next} className="w-full mt-4">{t("הבא", "Next")}</Button>
            )}
            {selected && current === total - 1 && (
              <Button onClick={() => setCurrent(total)} className="w-full mt-4">{t("סיום", "Finish")}</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
