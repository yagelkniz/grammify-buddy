import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { sentenceBuilderExercises } from "@/data/hebrewFlow/exercises";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

interface DragItem {
  text: string;
  textWithNikud: string;
  position: number;
  id: string;
}

export default function SentenceBuilder() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [showNikud, setShowNikud] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<DragItem[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const exercises = useMemo(() => shuffleArray(sentenceBuilderExercises), []);
  const currentExercise = exercises[currentIndex];
  
  const availableWords = useMemo(() => {
    const words = currentExercise.words.map((w, i) => ({
      ...w,
      id: `word-${i}`,
    }));
    return shuffleArray(words);
  }, [currentExercise]);

  const remainingWords = availableWords.filter(
    (w) => !selectedWords.some((s) => s.id === w.id)
  );

  const progress = ((currentIndex + 1) / exercises.length) * 100;

  const handleWordClick = (word: DragItem) => {
    if (showResult) return;
    
    if (selectedWords.some((s) => s.id === word.id)) {
      // Remove from sentence
      setSelectedWords(selectedWords.filter((s) => s.id !== word.id));
    } else {
      // Add to sentence
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkAnswer = () => {
    const userOrder = selectedWords.map((w) => w.position);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentExercise.correctOrder);
    
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedWords([]);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelectedWords([]);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
  };

  const isCorrect = useMemo(() => {
    const userOrder = selectedWords.map((w) => w.position);
    return JSON.stringify(userOrder) === JSON.stringify(currentExercise.correctOrder);
  }, [selectedWords, currentExercise]);

  if (isComplete) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("Sentence Building Complete!", "בניית משפטים הושלמה!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              {score} / {exercises.length} {t("correct", "נכון")}
            </p>
            <Progress value={percentage} className="h-3" />
          </CardContent>
          <div className="p-6 pt-0">
            <Button onClick={resetPractice}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {t("Try Again", "נסה שוב")}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {t("Sentence Builder", "בונה משפטים")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "Arrange the words to form a grammatically correct Hebrew sentence",
            "סדר את המילים ליצירת משפט עברי תקין דקדוקית"
          )}
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4">
        <Progress value={progress} className="flex-1 h-2" />
        <Badge variant="secondary">
          {currentIndex + 1} / {exercises.length}
        </Badge>
      </div>

      {/* Exercise Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t("Build this sentence:", "בנה את המשפט הזה:")}
          </CardTitle>
          <CardDescription>
            <Badge variant="outline" className="capitalize">
              {currentExercise.difficulty}
            </Badge>
            <span className="ml-2">{currentExercise.translation}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sentence Building Area */}
          <div
            className={cn(
              "min-h-20 p-4 rounded-lg border-2 border-dashed transition-colors",
              selectedWords.length > 0 ? "border-primary bg-primary/5" : "border-muted"
            )}
          >
            {selectedWords.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
                {selectedWords.map((word, idx) => (
                  <Button
                    key={word.id}
                    variant="default"
                    className="text-lg cursor-pointer"
                    onClick={() => handleWordClick(word)}
                    disabled={showResult}
                  >
                    {showNikud ? word.textWithNikud : word.text}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                {t("Click words below to build your sentence", "לחץ על מילים למטה לבניית המשפט")}
              </p>
            )}
          </div>

          {/* Available Words */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              {t("Available words:", "מילים זמינות:")}
            </p>
            <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
              {remainingWords.map((word) => (
                <Button
                  key={word.id}
                  variant="outline"
                  className="text-lg"
                  onClick={() => handleWordClick(word)}
                  disabled={showResult}
                >
                  <GripVertical className="h-4 w-4 mr-1 text-muted-foreground" />
                  {showNikud ? word.textWithNikud : word.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Check / Result */}
          {!showResult ? (
            <Button
              className="w-full"
              onClick={checkAnswer}
              disabled={selectedWords.length !== currentExercise.words.length}
            >
              {t("Check Sentence", "בדוק משפט")}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className={cn(
                "p-4 rounded-lg flex items-center gap-3",
                isCorrect 
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              )}>
                {isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {isCorrect ? t("Correct!", "נכון!") : t("Not quite right", "לא בדיוק")}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm mt-1" dir="rtl">
                      {t("Correct order:", "סדר נכון:")}{" "}
                      {currentExercise.words
                        .sort((a, b) => 
                          currentExercise.correctOrder.indexOf(a.position) - 
                          currentExercise.correctOrder.indexOf(b.position)
                        )
                        .map((w) => showNikud ? w.textWithNikud : w.text)
                        .join(" ")}
                    </p>
                  )}
                </div>
              </div>
              <Button className="w-full" onClick={handleNext}>
                {currentIndex < exercises.length - 1 ? (
                  <>
                    {t("Next", "הבא")}
                    <ArrowRight className={cn("h-4 w-4", lang === "he" ? "mr-2 rotate-180" : "ml-2")} />
                  </>
                ) : (
                  t("See Results", "ראה תוצאות")
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
