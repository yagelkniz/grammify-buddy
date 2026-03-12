import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  coreVerbs,
  infinitiveVerbs,
  nouns,
  adjectives,
  sentenceBuilderVerbs,
  sentenceBuilderObjects,
  practiceQuestions,
} from "@/data/beginnerHebrewData";

interface Props {
  onBack: () => void;
}

export default function BeginnerHebrewPractice({ onBack }: Props) {
  const [showNikud, setShowNikud] = useState(true);
  const [selectedInfinitive, setSelectedInfinitive] = useState<number | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const w = (text: string, nikud: string) => (showNikud ? nikud : text);

  const handleAnswer = (qId: string, optIndex: number) => {
    if (checked[qId]) return;
    setAnswers((a) => ({ ...a, [qId]: optIndex }));
  };

  const checkAnswer = (qId: string) => {
    setChecked((c) => ({ ...c, [qId]: true }));
  };

  const builtSentence = () => {
    if (selectedVerb === null || selectedObject === null) return null;
    const verb = sentenceBuilderVerbs[selectedVerb];
    const obj = sentenceBuilderObjects[selectedObject];
    return {
      text: `אני ${verb.text} ${obj.text}`,
      textNikud: `אֲנִי ${verb.textNikud} ${obj.textNikud}`,
    };
  };

  const sentence = builtSentence();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowRight className="h-4 w-4 ml-1 rotate-180" />
            חזרה
          </Button>
          <Button
            variant={showNikud ? "default" : "outline"}
            size="sm"
            onClick={() => setShowNikud(!showNikud)}
            className="rounded-full px-5"
          >
            {showNikud ? "הסתר ניקוד" : "הצג ניקוד"}
          </Button>
        </div>

        {/* 1. Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            עברית למתחילים
          </h1>
          <p className="text-lg text-muted-foreground">
            לומדים מילים ומשפטים קלים שלב אחר שלב
          </p>
        </header>

        {/* 2. Core Verbs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">פעלים חשובים להתחלה</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreVerbs.map((verb, i) => (
              <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="text-3xl font-bold text-primary">
                    {w(verb.word, verb.wordNikud)}
                  </div>
                  <p className="text-sm text-muted-foreground">{verb.meaning}</p>
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    {verb.examples.map((ex, j) => (
                      <p key={j} className="text-base text-foreground leading-relaxed">
                        {w(ex.text, ex.textNikud)}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Infinitives */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">שמות פועל קלים</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {infinitiveVerbs.map((inf, i) => (
              <button
                key={i}
                onClick={() => setSelectedInfinitive(selectedInfinitive === i ? null : i)}
                className={cn(
                  "px-5 py-3 rounded-xl text-lg font-semibold border-2 transition-all",
                  selectedInfinitive === i
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow"
                )}
              >
                {w(inf.word, inf.wordNikud)}
              </button>
            ))}
          </div>
          {selectedInfinitive !== null && (
            <div className="text-center p-4 bg-accent rounded-xl animate-in fade-in-50 duration-300">
              <p className="text-xl text-accent-foreground font-medium">
                {w(
                  infinitiveVerbs[selectedInfinitive].exampleSentence,
                  infinitiveVerbs[selectedInfinitive].exampleSentenceNikud
                )}
              </p>
            </div>
          )}
        </section>

        {/* 4. Nouns & Adjectives */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">שמות עצם ותארים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-muted-foreground">שמות עצם</h3>
              <div className="flex flex-wrap gap-2">
                {nouns.map((n, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-base px-4 py-2 rounded-lg font-medium"
                  >
                    {w(n.word, n.wordNikud)}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-muted-foreground">תארים</h3>
              <div className="flex flex-wrap gap-2">
                {adjectives.map((a, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-base px-4 py-2 rounded-lg font-medium"
                  >
                    {w(a.word, a.wordNikud)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sentence Builder */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">בונים משפט</h2>

          <Card className="border-border">
            <CardContent className="p-6 space-y-5">
              {/* Subject */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">נושא:</p>
                <Badge className="text-lg px-5 py-2 rounded-lg bg-primary text-primary-foreground">
                  {w("אני", "אֲנִי")}
                </Badge>
              </div>

              {/* Verb */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">פועל:</p>
                <div className="flex flex-wrap gap-2">
                  {sentenceBuilderVerbs.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVerb(selectedVerb === i ? null : i)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-base font-semibold border-2 transition-all",
                        selectedVerb === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-card-foreground border-border hover:border-primary/40"
                      )}
                    >
                      {w(v.text, v.textNikud)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Object */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">השלמה:</p>
                <div className="flex flex-wrap gap-2">
                  {sentenceBuilderObjects.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedObject(selectedObject === i ? null : i)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all",
                        selectedObject === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-card-foreground border-border hover:border-primary/40"
                      )}
                    >
                      {w(o.text, o.textNikud)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              {sentence && (
                <div className="mt-4 p-5 bg-accent rounded-xl text-center animate-in fade-in-50 duration-300">
                  <Sparkles className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-accent-foreground">
                    {w(sentence.text, sentence.textNikud)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* 6. Practice */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">תרגול קצר</h2>
          <div className="space-y-4">
            {practiceQuestions.map((q) => {
              const answered = answers[q.id] !== undefined;
              const isChecked = checked[q.id];
              const isCorrect = answers[q.id] === q.correctIndex;

              return (
                <Card key={q.id} className="border-border">
                  <CardContent className="p-5 space-y-3">
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      {w(q.question, q.questionNikud)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = answers[q.id] === oi;
                        const showCorrect = isChecked && oi === q.correctIndex;
                        const showWrong = isChecked && isSelected && !isCorrect;

                        return (
                          <button
                            key={oi}
                            onClick={() => handleAnswer(q.id, oi)}
                            disabled={isChecked}
                            className={cn(
                              "px-4 py-2 rounded-lg text-base font-medium border-2 transition-all",
                              showCorrect
                                ? "bg-green-100 border-green-500 text-green-800"
                                : showWrong
                                ? "bg-destructive/10 border-destructive text-destructive"
                                : isSelected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-card-foreground border-border hover:border-primary/40",
                              isChecked && "cursor-default"
                            )}
                          >
                            {w(opt.text, opt.textNikud)}
                          </button>
                        );
                      })}
                    </div>
                    {answered && !isChecked && (
                      <Button size="sm" onClick={() => checkAnswer(q.id)}>
                        בדיקה
                      </Button>
                    )}
                    {isChecked && (
                      <div className={cn(
                        "flex items-center gap-2 text-sm font-medium pt-1",
                        isCorrect ? "text-green-700" : "text-destructive"
                      )}>
                        {isCorrect ? (
                          <><Check className="h-4 w-4" /> כל הכבוד! נכון מאוד!</>
                        ) : (
                          <><X className="h-4 w-4" /> נסו שוב – התשובה הנכונה מסומנת</>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
