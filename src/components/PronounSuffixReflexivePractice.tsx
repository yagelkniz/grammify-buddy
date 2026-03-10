import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft, Eye, EyeOff, BookOpen, PenLine, Languages, MessageCircle, GraduationCap, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { allLevels, finalQuizQuestions, homeworkSections } from "@/data/pronounSuffixReflexive";
import type { Level, FillInQuestion, FlashcardQuestion, FinalQuizQuestion, HomeworkSection } from "@/data/pronounSuffixReflexive";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

type View = "select" | "level" | "finalQuiz" | "homework";

export default function PronounSuffixReflexivePractice({ onBack, lang: parentLang = "he" }: Props) {
  const [lang, setLang] = useState<"he" | "en">(parentLang);
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [view, setView] = useState<View>("select");
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});

  if (view === "select") {
    return (
      <LevelSelect
        levels={allLevels}
        levelScores={levelScores}
        lang={lang}
        setLang={setLang}
        t={t}
        onBack={onBack}
        onSelectLevel={(i) => { setActiveLevelIndex(i); setView("level"); }}
        onFinalQuiz={() => setView("finalQuiz")}
        onHomework={() => setView("homework")}
      />
    );
  }

  if (view === "level") {
    return (
      <LevelDetail
        level={allLevels[activeLevelIndex]}
        lang={lang}
        t={t}
        onBack={() => setView("select")}
        onFinish={(score) => {
          setLevelScores(prev => ({ ...prev, [allLevels[activeLevelIndex].id]: score }));
          setView("select");
        }}
      />
    );
  }

  if (view === "finalQuiz") {
    return (
      <FinalQuiz
        questions={finalQuizQuestions}
        lang={lang}
        t={t}
        onBack={() => setView("select")}
      />
    );
  }

  if (view === "homework") {
    return (
      <HomeworkView
        sections={homeworkSections}
        lang={lang}
        t={t}
        onBack={() => setView("select")}
      />
    );
  }

  return null;
}

/* ─── Level Select ─── */
function LevelSelect({ levels, levelScores, lang, setLang, t, onBack, onSelectLevel, onFinalQuiz, onHomework }: {
  levels: Level[];
  levelScores: Record<string, number>;
  lang: "he" | "en";
  setLang: (l: "he" | "en") => void;
  t: (he: string, en: string) => string;
  onBack: () => void;
  onSelectLevel: (i: number) => void;
  onFinalQuiz: () => void;
  onHomework: () => void;
}) {
  const colors = [
    "border-emerald-300 bg-emerald-50",
    "border-sky-300 bg-sky-50",
    "border-amber-300 bg-amber-50",
    "border-rose-300 bg-rose-50",
  ];

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "he" ? "en" : "he")}>
            {lang === "he" ? "English" : "עברית"}
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">
            {t("🔤 כינויי מילת יחס + רפלקסיב", "🔤 Prepositional Pronouns + Reflexive")}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t(
              "לי, בך, אצלה, כמוהו, בעצמי – כל הצורות ב-4 רמות.",
              "לי, בך, אצלה, כמוהו, בעצמי – all forms in 4 levels."
            )}
          </p>
        </div>

        <div className="space-y-3">
          {levels.map((level, i) => {
            const score = levelScores[level.id];
            return (
              <button
                key={level.id}
                onClick={() => onSelectLevel(i)}
                className={cn(
                  "w-full p-5 rounded-xl border-2 transition-all hover:scale-[1.02] cursor-pointer shadow-sm",
                  colors[i]
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {score !== undefined && (
                      <Badge variant={score >= 80 ? "default" : "secondary"}>{score}%</Badge>
                    )}
                  </div>
                  <div className={lang === "he" ? "text-right" : "text-left"}>
                    <h3 className="font-bold text-lg">
                      {lang === "he" ? level.title : level.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "he" ? level.goal : level.goalEn}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Final quiz & homework */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onFinalQuiz}
            className="p-4 rounded-xl border-2 border-purple-300 bg-purple-50 hover:scale-[1.02] transition-all shadow-sm"
          >
            <GraduationCap className="h-6 w-6 mx-auto mb-2 text-purple-700" />
            <p className="font-bold text-purple-900">{t("בדיקת ידע", "Knowledge Check")}</p>
            <p className="text-xs text-muted-foreground">{t("10 שאלות מעורבות", "10 mixed questions")}</p>
          </button>
          <button
            onClick={onHomework}
            className="p-4 rounded-xl border-2 border-indigo-300 bg-indigo-50 hover:scale-[1.02] transition-all shadow-sm"
          >
            <ClipboardList className="h-6 w-6 mx-auto mb-2 text-indigo-700" />
            <p className="font-bold text-indigo-900">{t("שיעורי בית", "Homework")}</p>
            <p className="text-xs text-muted-foreground">{t("3 רמות קושי", "3 difficulty levels")}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Level Detail (Tabs) ─── */
function LevelDetail({ level, lang, t, onBack, onFinish }: {
  level: Level;
  lang: string;
  t: (he: string, en: string) => string;
  onBack: () => void;
  onFinish: (score: number) => void;
}) {
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה לרמות", "Back to Levels")}
          </Button>
          <Badge variant="outline" className="text-sm">
            {lang === "he" ? level.title : level.titleEn}
          </Badge>
        </div>

        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="w-full grid grid-cols-5 h-auto">
            <TabsTrigger value="learn" className="text-xs py-2 flex flex-col gap-1">
              <BookOpen className="h-4 w-4" />
              {t("לימוד", "Learn")}
            </TabsTrigger>
            <TabsTrigger value="fillin" className="text-xs py-2 flex flex-col gap-1">
              <PenLine className="h-4 w-4" />
              {t("השלמה", "Fill-in")}
            </TabsTrigger>
            <TabsTrigger value="en-he" className="text-xs py-2 flex flex-col gap-1">
              <Languages className="h-4 w-4" />
              EN→HE
            </TabsTrigger>
            <TabsTrigger value="he-en" className="text-xs py-2 flex flex-col gap-1">
              <Languages className="h-4 w-4" />
              HE→EN
            </TabsTrigger>
            <TabsTrigger value="conversation" className="text-xs py-2 flex flex-col gap-1">
              <MessageCircle className="h-4 w-4" />
              {t("שיחה", "Talk")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <LearnTab level={level} lang={lang} t={t} />
          </TabsContent>
          <TabsContent value="fillin">
            <FillInTab questions={level.fillIn} lang={lang} t={t} onFinish={onFinish} />
          </TabsContent>
          <TabsContent value="en-he">
            <FlashcardTab questions={level.translateEnHe} lang={lang} t={t} direction="en-he" />
          </TabsContent>
          <TabsContent value="he-en">
            <FlashcardTab questions={level.translateHeEn} lang={lang} t={t} direction="he-en" />
          </TabsContent>
          <TabsContent value="conversation">
            <ConversationTab questions={level.conversation} lang={lang} t={t} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ─── Learn Tab ─── */
function LearnTab({ level, lang, t }: { level: Level; lang: string; t: (he: string, en: string) => string }) {
  return (
    <div className="space-y-6">
      {/* Goal */}
      <Card>
        <CardContent className="pt-4">
          <p className="text-sm font-medium text-muted-foreground">
            🎯 {lang === "he" ? level.goal : level.goalEn}
          </p>
        </CardContent>
      </Card>

      {/* Tables */}
      {level.tables.map((table, ti) => (
        <Card key={ti}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {table.preposition} – {table.prepositionEn}
            </CardTitle>
            {table.note && (
              <p className="text-xs text-muted-foreground">
                💡 {lang === "he" ? table.note : table.noteEn}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-right">{t("כינוי", "Pronoun")}</th>
                    <th className="p-2 text-right">{t("צורה", "Form")}</th>
                    <th className="p-2 text-left">{t("תרגום", "Translation")}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.forms.map((form, fi) => (
                    <tr key={fi} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-2 font-medium">{form.pronoun} <span className="text-xs text-muted-foreground">({form.pronounEn})</span></td>
                      <td className="p-2 font-bold text-primary text-lg">{form.form}</td>
                      <td className="p-2 text-muted-foreground" dir="ltr">{form.formEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Examples */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t("📝 משפטי דוגמה", "📝 Example Sentences")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {level.examples.map((ex, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border">
                <p className="font-semibold text-base" dir="rtl">{ex.he}</p>
                <p className="text-sm text-muted-foreground mt-1" dir="ltr">{ex.en}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Fill-in Tab ─── */
function FillInTab({ questions, lang, t, onFinish }: {
  questions: FillInQuestion[];
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
}) {
  const shuffled = useMemo(() => shuffleArray([...questions]), [questions]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showTrans, setShowTrans] = useState(false);

  const current = shuffled[idx];
  const opts = useMemo(() => shuffleArray([...current.options]), [current]);
  const isCorrect = selected === current.correct;

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx < shuffled.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setShowTrans(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>{t("סיום!", "Complete!")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-primary">{pct}%</div>
          <p className="text-muted-foreground">{score}/{shuffled.length} {t("נכון", "correct")}</p>
          <Progress value={pct} className="h-3" />
          <div className="flex gap-3 justify-center pt-2">
            <Button variant="outline" onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); setShowTrans(false); }}>
              <RotateCcw className="h-4 w-4 ml-2" />{t("נסה שוב", "Try Again")}
            </Button>
            <Button onClick={() => onFinish(pct)}>{t("חזרה", "Back")}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const parts = current.sentence.split("___");

  return (
    <Card>
      <CardContent className="pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <Progress value={((idx + 1) / shuffled.length) * 100} className="flex-1 h-2" />
          <Badge variant="secondary">{idx + 1}/{shuffled.length}</Badge>
        </div>

        <div className="text-2xl font-bold text-center leading-relaxed p-4 bg-muted/50 rounded-lg" dir="rtl">
          {parts[0]}
          <span className={cn(
            "inline-block min-w-16 px-2 mx-1 border-b-2 text-center transition-colors",
            selected ? (isCorrect ? "border-green-500 text-green-700" : "border-red-500 text-red-700") : "border-primary text-primary"
          )}>
            {selected || "___"}
          </span>
          {parts[1]}
        </div>

        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={() => setShowTrans(!showTrans)}>
            {showTrans ? <EyeOff className="h-4 w-4 ml-1" /> : <Eye className="h-4 w-4 ml-1" />}
            {t("תרגום", "Translation")}
          </Button>
          {showTrans && <p className="text-sm text-muted-foreground mt-1" dir="ltr">{current.translation}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {opts.map(opt => {
            const isThis = selected === opt;
            const isRight = opt === current.correct;
            let cls = "text-lg py-5 font-semibold";
            if (selected) {
              if (isRight) cls += " bg-green-100 border-green-400 text-green-800";
              else if (isThis) cls += " bg-red-100 border-red-400 text-red-800";
              else cls += " opacity-50";
            } else {
              cls += " hover:bg-primary/10 hover:border-primary";
            }
            return (
              <Button key={opt} variant="outline" className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
                {selected && isRight && <CheckCircle2 className="h-5 w-5 ml-2 shrink-0" />}
                {selected && isThis && !isRight && <XCircle className="h-5 w-5 ml-2 shrink-0" />}
                {opt}
              </Button>
            );
          })}
        </div>

        {selected && (
          <div className="space-y-3">
            <div className={cn(
              "p-3 rounded-lg text-center font-medium",
              isCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
            )}>
              {isCorrect ? t("נכון! 🎉", "Correct! 🎉") : `${t("התשובה:", "Answer:")} ${current.correct}`}
            </div>
            <Button className="w-full" onClick={handleNext}>
              {idx < shuffled.length - 1 ? t("הבא", "Next") : t("ראה תוצאות", "See Results")}
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Flashcard Tab (Translation) ─── */
function FlashcardTab({ questions, lang, t, direction }: {
  questions: FlashcardQuestion[];
  lang: string;
  t: (he: string, en: string) => string;
  direction: "en-he" | "he-en";
}) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selfScores, setSelfScores] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  const handleScore = (correct: boolean) => {
    setSelfScores(prev => [...prev, correct]);
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setRevealed(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const correct = selfScores.filter(Boolean).length;
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>{t("סיום!", "Complete!")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-primary">{pct}%</div>
          <p className="text-muted-foreground">{correct}/{questions.length} {t("נכון", "correct")}</p>
          <Button variant="outline" onClick={() => { setIdx(0); setRevealed(false); setSelfScores([]); setDone(false); }}>
            <RotateCcw className="h-4 w-4 ml-2" />{t("נסה שוב", "Try Again")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <Progress value={((idx + 1) / questions.length) * 100} className="flex-1 h-2" />
          <Badge variant="secondary">{idx + 1}/{questions.length}</Badge>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          {direction === "en-he"
            ? t("תרגם/י לעברית:", "Translate to Hebrew:")
            : t("תרגם/י לאנגלית:", "Translate to English:")
          }
        </p>

        <div className="text-xl font-bold text-center p-6 bg-muted/50 rounded-lg" dir={direction === "en-he" ? "ltr" : "rtl"}>
          {current.source}
        </div>

        {!revealed ? (
          <Button className="w-full" variant="outline" onClick={() => setRevealed(true)}>
            <Eye className="h-4 w-4 ml-2" />
            {t("הצג תשובה", "Show Answer")}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-xl font-bold text-center p-4 bg-primary/5 border-2 border-primary/20 rounded-lg" dir={direction === "en-he" ? "rtl" : "ltr"}>
              {current.answer}
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {t("האם ענית נכון?", "Did you answer correctly?")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-red-50 border-red-300 text-red-800 hover:bg-red-100" onClick={() => handleScore(false)}>
                <XCircle className="h-5 w-5 ml-2" />
                {t("לא נכון", "Incorrect")}
              </Button>
              <Button variant="outline" className="bg-green-50 border-green-300 text-green-800 hover:bg-green-100" onClick={() => handleScore(true)}>
                <CheckCircle2 className="h-5 w-5 ml-2" />
                {t("נכון", "Correct")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Conversation Tab ─── */
function ConversationTab({ questions, lang, t }: {
  questions: { he: string; en: string }[];
  lang: string;
  t: (he: string, en: string) => string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("💬 שאלות לשיחה", "💬 Conversation Questions")}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("ענו בזוגות או בכיתה. דברו בעברית!", "Answer in pairs or in class. Speak in Hebrew!")}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/30 border">
            <p className="font-semibold text-lg" dir="rtl">{i + 1}. {q.he}</p>
            <p className="text-sm text-muted-foreground mt-1" dir="ltr">{q.en}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ─── Final Quiz ─── */
function FinalQuiz({ questions, lang, t, onBack }: {
  questions: FinalQuizQuestion[];
  lang: string;
  t: (he: string, en: string) => string;
  onBack: () => void;
}) {
  const shuffled = useMemo(() => shuffleArray([...questions]), [questions]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = shuffled[idx];
  const opts = useMemo(() => shuffleArray([...current.options]), [current]);
  const isCorrect = selected === current.correct;

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx < shuffled.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("סיום בדיקת ידע!", "Knowledge Check Complete!")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{pct}%</div>
            <p className="text-muted-foreground">{score}/{shuffled.length} {t("נכון", "correct")}</p>
            <Progress value={pct} className="h-3" />
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); }}>
                <RotateCcw className="h-4 w-4 ml-2" />{t("נסה שוב", "Try Again")}
              </Button>
              <Button onClick={onBack}>{t("חזרה", "Back")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const parts = current.sentence.split("___");

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{t("בדיקת ידע", "Knowledge Check")}</Badge>
        </div>

        <div className="flex items-center gap-3">
          <Progress value={((idx + 1) / shuffled.length) * 100} className="flex-1 h-2" />
          <Badge variant="secondary">{idx + 1}/{shuffled.length}</Badge>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-5">
            <div className="text-2xl font-bold text-center leading-relaxed p-4 bg-muted/50 rounded-lg" dir="rtl">
              {parts[0]}
              <span className={cn(
                "inline-block min-w-16 px-2 mx-1 border-b-2 text-center transition-colors",
                selected ? (isCorrect ? "border-green-500 text-green-700" : "border-red-500 text-red-700") : "border-primary text-primary"
              )}>
                {selected || "___"}
              </span>
              {parts[1]}
            </div>

            <p className="text-sm text-center text-muted-foreground" dir="ltr">{current.translation}</p>

            <div className="grid grid-cols-2 gap-3">
              {opts.map(opt => {
                const isThis = selected === opt;
                const isRight = opt === current.correct;
                let cls = "text-lg py-5 font-semibold";
                if (selected) {
                  if (isRight) cls += " bg-green-100 border-green-400 text-green-800";
                  else if (isThis) cls += " bg-red-100 border-red-400 text-red-800";
                  else cls += " opacity-50";
                } else {
                  cls += " hover:bg-primary/10 hover:border-primary";
                }
                return (
                  <Button key={opt} variant="outline" className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
                    {selected && isRight && <CheckCircle2 className="h-5 w-5 ml-2 shrink-0" />}
                    {selected && isThis && !isRight && <XCircle className="h-5 w-5 ml-2 shrink-0" />}
                    {opt}
                  </Button>
                );
              })}
            </div>

            {selected && (
              <div className="space-y-3">
                <div className={cn(
                  "p-3 rounded-lg text-center font-medium",
                  isCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
                )}>
                  {isCorrect ? t("נכון! 🎉", "Correct! 🎉") : `${t("התשובה:", "Answer:")} ${current.correct}`}
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {idx < shuffled.length - 1 ? t("הבא", "Next") : t("ראה תוצאות", "See Results")}
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── Homework View ─── */
function HomeworkView({ sections, lang, t, onBack }: {
  sections: HomeworkSection[];
  lang: string;
  t: (he: string, en: string) => string;
  onBack: () => void;
}) {
  const icons = ["✏️", "💪", "🎤"];
  const colors = [
    "border-emerald-300 bg-emerald-50",
    "border-amber-300 bg-amber-50",
    "border-rose-300 bg-rose-50",
  ];

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>

        <h1 className="text-2xl font-bold text-primary text-center">
          {t("📋 שיעורי בית", "📋 Homework")}
        </h1>

        {sections.map((section, i) => (
          <Card key={i} className={cn("border-2", colors[i])}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {icons[i]} {lang === "he" ? section.title : section.titleEn}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {lang === "he" ? section.description : section.descriptionEn}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, j) => (
                  <div key={j} className="p-3 rounded-lg bg-background/80 border">
                    <p className="font-medium" dir="rtl">{item.he}</p>
                    <p className="text-sm text-muted-foreground mt-1" dir="ltr">{item.en}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
