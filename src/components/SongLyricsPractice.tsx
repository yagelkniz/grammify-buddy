import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { songLyricsQuestions } from "@/data/songLyricsData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function SongLyricsPractice({ onBack, lang }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => lang === "he" ? he : en;

  const questions = useMemo(() => shuffleArray(songLyricsQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })), []);
  const total = questions.length;

  const handleAnswer = (opt: string) => { if (selected) return; setSelected(opt); if (opt === questions[current].answer) setScore(s => s + 1); };
  const next = () => { setSelected(null); setCurrent(c => c + 1); };

  if (current >= total) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center"><CardContent className="p-8">
          <div className="text-4xl mb-4">🎶</div>
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

  const q = questions[current];
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
        <Progress value={(current / total) * 100} className="mb-4" />
        
        <Card>
          <CardContent className="p-6">
            <Badge className="mb-3">🎵 {q.songTitle}</Badge>
            <p className="text-xs text-muted-foreground mb-3" dir="ltr">{q.songTitleEn}</p>
            
            <h2 className="text-lg font-bold mb-1">{t("השלם את המילה החסרה:", "Fill in the missing word:")}</h2>
            <p className="text-xl bg-secondary p-4 rounded-lg mb-4 leading-relaxed">{q.lyricWithBlank}</p>
            
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => (
                <Button key={opt} variant={selected ? (opt === q.answer ? "default" : opt === selected ? "destructive" : "outline") : "outline"}
                  className={`h-auto py-3 text-base ${selected && opt === q.answer ? "bg-green-600 hover:bg-green-600" : ""}`}
                  onClick={() => handleAnswer(opt)} disabled={!!selected}>{opt}</Button>
              ))}
            </div>
            
            {selected && (
              <>
                <div className="mt-3 p-3 bg-accent rounded-lg">
                  <p className="font-semibold">{q.fullLyric}</p>
                  <p className="text-sm text-muted-foreground" dir="ltr">{q.translation}</p>
                </div>
                <Button onClick={current < total - 1 ? next : () => setCurrent(total)} className="w-full mt-3">
                  {current < total - 1 ? t("הבא", "Next") : t("סיום", "Finish")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
