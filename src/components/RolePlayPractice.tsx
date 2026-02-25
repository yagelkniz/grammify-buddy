import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, ArrowLeft, MessageCircle, User, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { rolePlayScenarios, RolePlayScenario, RolePlayOption, GlossaryScreen, PracticeBlock, PracticeQuestion } from "@/data/rolePlayData";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function RolePlayPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [scenarioScores, setScenarioScores] = useState<Record<string, number>>({});

  if (activeScenario === null) {
    return (
      <ScenarioSelect
        scenarios={rolePlayScenarios}
        scores={scenarioScores}
        onSelect={setActiveScenario}
        onBack={onBack}
        t={t}
        lang={lang}
      />
    );
  }

  return (
    <ScenarioPlay
      scenario={rolePlayScenarios[activeScenario]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setScenarioScores((prev) => ({
          ...prev,
          [rolePlayScenarios[activeScenario].scenarioId]: score,
        }));
        setActiveScenario(null);
      }}
      onBack={() => setActiveScenario(null)}
    />
  );
}

/* ─── Scenario Select ─── */
function ScenarioSelect({
  scenarios, scores, onSelect, onBack, t, lang,
}: {
  scenarios: RolePlayScenario[];
  scores: Record<string, number>;
  onSelect: (i: number) => void;
  onBack: () => void;
  t: (he: string, en: string) => string;
  lang: string;
}) {
  const icons = ["📱", "🍽️", "💼"];
  const colors = [
    "border-sky-300 bg-sky-50",
    "border-amber-300 bg-amber-50",
    "border-violet-300 bg-violet-50",
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
        </Button>

        <h1 className="text-2xl font-bold text-primary text-center">
          {t("🎭 סימולציית שיחה", "🎭 Conversation Role-Play")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t(
            "בחרו תרחיש ותגיבו בצורה הכי טבעית וישראלית!",
            "Choose a scenario and respond as naturally as possible!"
          )}
        </p>

        <div className="space-y-4">
          {scenarios.map((scenario, i) => {
            const score = scores[scenario.scenarioId];
            return (
              <button
                key={scenario.scenarioId}
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-right transition-all",
                  `${colors[i]} hover:scale-[1.02] cursor-pointer shadow-sm`
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {score !== undefined && (
                      <Badge variant={score >= 70 ? "default" : "secondary"}>
                        {score}%
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                      <span>{icons[i]}</span>
                      <span>{lang === "he" ? scenario.title : scenario.titleEn}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      🎯 {lang === "he" ? scenario.goal : scenario.goalEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      🎭 {lang === "he" ? scenario.characterTone : scenario.characterToneEn} • {scenario.steps.length} {t("שלבים", "steps")}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Scenario Play ─── */
function ScenarioPlay({
  scenario, lang, t, onFinish, onBack,
}: {
  scenario: RolePlayScenario;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const [showGlossary, setShowGlossary] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<RolePlayOption | null>(null);
  const [totalNaturalness, setTotalNaturalness] = useState(0);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [choices, setChoices] = useState<{ step: string; option: RolePlayOption }[]>([]);

  const step = scenario.steps[stepIndex];
  const progress = ((stepIndex + 1) / scenario.steps.length) * 100;

  const handleSelect = (option: RolePlayOption) => {
    if (selected) return;
    setSelected(option);
    setTotalNaturalness((prev) => prev + option.naturalness);
    setChoices((prev) => [...prev, { step: step.id, option }]);
  };

  const handleNext = () => {
    if (stepIndex < scenario.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setSelected(null);
    } else {
      setDialogueComplete(true);
    }
  };

  const getNaturalnessColor = (n: number) => {
    if (n >= 80) return "text-green-700 bg-green-50 border-green-200";
    if (n >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const getNaturalnessLabel = (n: number) => {
    if (n >= 80) return t("טבעי מאוד 🔥", "Very Natural 🔥");
    if (n >= 50) return t("סביר 🤔", "Decent 🤔");
    return t("לא טבעי ❌", "Unnatural ❌");
  };

  if (showGlossary) {
    return (
      <GlossaryView
        glossary={scenario.glossaryScreen}
        scenarioTitle={lang === "he" ? scenario.title : scenario.titleEn}
        lang={lang}
        t={t}
        onStart={() => setShowGlossary(false)}
        onBack={onBack}
      />
    );
  }

  // Show practice block after dialogue
  if (dialogueComplete && !practiceComplete) {
    const avgNaturalness = Math.round(totalNaturalness / scenario.steps.length);
    return (
      <PracticeBlockView
        practiceBlock={scenario.practiceBlock}
        lang={lang}
        t={t}
        onComplete={(score) => {
          setPracticeScore(score);
          setPracticeComplete(true);
        }}
        onBack={onBack}
        scenarioTitle={lang === "he" ? scenario.title : scenario.titleEn}
      />
    );
  }

  // Show final results after practice
  if (practiceComplete) {
    const avgNaturalness = Math.round(totalNaturalness / scenario.steps.length);
    const combinedScore = Math.round((avgNaturalness + practiceScore) / 2);
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("סיום תרחיש!", "Scenario Complete!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{combinedScore}%</div>
            <p className="text-muted-foreground">
              {t("ציון כולל", "Overall Score")}
            </p>
            <Progress value={combinedScore} className="h-3" />

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg border bg-muted/50">
                <div className="font-bold text-lg text-primary">{avgNaturalness}%</div>
                <p className="text-muted-foreground">{t("טבעיות שיחה", "Dialogue Naturalness")}</p>
              </div>
              <div className="p-3 rounded-lg border bg-muted/50">
                <div className="font-bold text-lg text-primary">{practiceScore}%</div>
                <p className="text-muted-foreground">{t("תרגול", "Practice Quiz")}</p>
              </div>
            </div>

            {/* Summary of dialogue choices */}
            <div className="space-y-2 text-right">
              {choices.map((c, i) => (
                <div key={i} className={cn("p-2 rounded border text-sm", getNaturalnessColor(c.option.naturalness))}>
                  <span className="font-medium">{c.option.text}</span>
                  <span className="mr-2 text-xs">({c.option.naturalness}%)</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStepIndex(0);
                  setSelected(null);
                  setTotalNaturalness(0);
                  setDialogueComplete(false);
                  setPracticeComplete(false);
                  setPracticeScore(0);
                  setChoices([]);
                }}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button onClick={() => onFinish(combinedScore)}>
                {t("חזרה לתרחישים", "Back to Scenarios")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">
            {lang === "he" ? scenario.title : scenario.titleEn}
          </Badge>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {stepIndex + 1} / {scenario.steps.length}
          </Badge>
        </div>

        {/* Goal reminder */}
        <div className="text-center text-sm text-muted-foreground">
          🎯 {lang === "he" ? scenario.goal : scenario.goalEn}
        </div>

        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* NPC message bubble */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tr-none p-4 text-base font-medium whitespace-pre-line flex-1">
                {step.npcLine}
              </div>
            </div>

            {/* Player options */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                {t("מה תגיד/י?", "What would you say?")}
              </p>
              {step.options.map((option, idx) => {
                const isThis = selected === option;
                const isBest = selected && option.naturalness >= Math.max(...step.options.map(o => o.naturalness));

                let extraClass = "text-base py-4 font-medium text-right justify-start w-full";

                if (selected) {
                  if (isBest) {
                    extraClass += " bg-green-100 border-green-400 text-green-800";
                  } else if (isThis && !isBest) {
                    const color = option.naturalness >= 50 ? " bg-amber-100 border-amber-400 text-amber-800" : " bg-red-100 border-red-400 text-red-800";
                    extraClass += color;
                  } else {
                    extraClass += " opacity-40";
                  }
                } else {
                  extraClass += " hover:bg-primary/10 hover:border-primary";
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={extraClass}
                    onClick={() => handleSelect(option)}
                    disabled={!!selected}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{option.text}</span>
                      {selected && (
                        <Badge variant="outline" className={cn("text-xs shrink-0", getNaturalnessColor(option.naturalness))}>
                          {option.naturalness}%
                        </Badge>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected && (
              <div className="space-y-3">
                <div className={cn("p-4 rounded-lg border text-center", getNaturalnessColor(selected.naturalness))}>
                  <div className="font-bold text-lg mb-1">
                    {getNaturalnessLabel(selected.naturalness)}
                  </div>
                  <p className="text-sm">{selected.feedback}</p>
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {stepIndex < scenario.steps.length - 1
                    ? t("המשך שיחה", "Continue Conversation")
                    : t("עבור לתרגול", "Continue to Practice")}
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

/* ─── Practice Block View ─── */
function PracticeBlockView({
  practiceBlock, lang, t, onComplete, onBack, scenarioTitle,
}: {
  practiceBlock: PracticeBlock;
  lang: string;
  t: (he: string, en: string) => string;
  onComplete: (score: number) => void;
  onBack: () => void;
  scenarioTitle: string;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const shuffledQuestions = useMemo(() => {
    return practiceBlock.questions.map((q) => {
      const indices = q.optionsHe.map((_, i) => i);
      const shuffled = shuffleArray(indices);
      return {
        ...q,
        shuffledIndices: shuffled,
        shuffledOptions: shuffled.map((i) => q.optionsHe[i]),
        correctShuffledIdx: shuffled.indexOf(q.correctIndex),
      };
    });
  }, [practiceBlock]);

  const current = shuffledQuestions[qIndex];
  const progress = ((qIndex + 1) / shuffledQuestions.length) * 100;
  const isCorrect = selectedIdx === current.correctShuffledIdx;

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    if (idx === current.correctShuffledIdx) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (qIndex < shuffledQuestions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedIdx(null);
    } else {
      const score = Math.round((correctCount / shuffledQuestions.length) * 100);
      onComplete(score);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{scenarioTitle}</Badge>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">
            📝 {lang === "he" ? practiceBlock.titleHe : practiceBlock.titleEn}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "he" ? practiceBlock.instructionsHe : practiceBlock.instructionsEn}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {qIndex + 1} / {shuffledQuestions.length}
          </Badge>
        </div>

        <Card>
          <CardContent className="space-y-5 pt-6">
            <p className="text-lg font-semibold text-center">
              {lang === "he" ? current.questionHe : current.questionEn}
            </p>

            <div className="space-y-3">
              {current.shuffledOptions.map((option, idx) => {
                let cls = "text-base py-4 font-medium text-right justify-start w-full";

                if (selectedIdx !== null) {
                  if (idx === current.correctShuffledIdx) {
                    cls += " bg-green-100 border-green-400 text-green-800";
                  } else if (idx === selectedIdx) {
                    cls += " bg-red-100 border-red-400 text-red-800";
                  } else {
                    cls += " opacity-40";
                  }
                } else {
                  cls += " hover:bg-primary/10 hover:border-primary";
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cls}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedIdx !== null}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {selectedIdx !== null && idx === current.correctShuffledIdx && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                      )}
                      {selectedIdx !== null && idx === selectedIdx && idx !== current.correctShuffledIdx && (
                        <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                      )}
                      <span className="flex-1">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {selectedIdx !== null && (
              <div className="space-y-3">
                <div className={cn(
                  "p-3 rounded-lg border text-center font-medium",
                  isCorrect ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                )}>
                  {isCorrect ? t("נכון! 🎉", "Correct! 🎉") : t("לא נכון ❌", "Incorrect ❌")}
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {qIndex < shuffledQuestions.length - 1
                    ? t("שאלה הבאה", "Next Question")
                    : t("ראה תוצאות", "See Results")}
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

/* ─── Glossary View ─── */
function GlossaryView({
  glossary, scenarioTitle, lang, t, onStart, onBack,
}: {
  glossary: GlossaryScreen;
  scenarioTitle: string;
  lang: string;
  t: (he: string, en: string) => string;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{scenarioTitle}</Badge>
        </div>

        <Card>
          <CardHeader className="text-center pb-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl">
              {lang === "he" ? glossary.titleHe : glossary.titleEn}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("כדאי לקרוא לפני שמתחילים 👇", "Read before you start 👇")}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
            {glossary.items.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-baseline gap-2 justify-between">
                  <span className="font-bold text-base text-primary">{item.termHe}</span>
                  <span className="text-xs text-muted-foreground">{item.termEn}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1" dir="ltr">
                  {item.meaningEn}
                </p>
                <div className="mt-2 text-sm bg-muted/50 rounded p-2">
                  <p className="font-medium">{item.exampleHe}</p>
                  <p className="text-muted-foreground text-xs mt-0.5" dir="ltr">{item.exampleEn}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full text-lg py-6 font-bold" onClick={onStart}>
          {lang === "he" ? glossary.ctaHe : glossary.ctaEn}
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
      </div>
    </div>
  );
}
