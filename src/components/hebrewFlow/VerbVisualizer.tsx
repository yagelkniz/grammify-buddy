import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Sparkles, Info, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { binyanim, commonRoots, getRootForms, type Binyan } from "@/data/hebrewFlow/binyanim";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

export default function VerbVisualizer() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [searchRoot, setSearchRoot] = useState("");
  const [showNikud, setShowNikud] = useState(true);
  const [selectedTense, setSelectedTense] = useState<"present" | "past" | "future" | "imperative">("present");
  const [selectedBinyan, setSelectedBinyan] = useState<string | null>(null);

  // Find matching root
  const matchedRoot = useMemo(() => {
    if (!searchRoot) return null;
    const normalized = searchRoot.replace(/-/g, "").trim();
    return commonRoots.find(
      (r) => r.letters === normalized || r.lettersSpaced.replace(/-/g, "") === normalized
    );
  }, [searchRoot]);

  // Suggested roots for quick access
  const suggestedRoots = ["כתב", "דבר", "לבש", "למד"];

  const speakHebrew = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          {t("Verb Visualizer", "ממחיש הפועל")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "Enter a root (Shoresh) to see how it transforms across all 7 Binyanim",
            "הזן שורש כדי לראות איך הוא משתנה בכל 7 הבניינים"
          )}
        </p>
      </div>

      {/* Search & Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={cn("absolute top-3 h-4 w-4 text-muted-foreground", lang === "he" ? "right-3" : "left-3")} />
                <Input
                  placeholder={t("Enter root (e.g., כתב or כ-ת-ב)", "הזן שורש (למשל, כתב או כ-ת-ב)")}
                  value={searchRoot}
                  onChange={(e) => setSearchRoot(e.target.value)}
                  className={cn("text-xl font-mono", lang === "he" ? "pr-10 text-right" : "pl-10")}
                  dir="rtl"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-muted-foreground">
                  {t("Try:", "נסה:")}
                </span>
                {suggestedRoots.map((root) => (
                  <Button
                    key={root}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchRoot(root)}
                    className="font-mono"
                    dir="rtl"
                  >
                    {root}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="nikud"
                  checked={showNikud}
                  onCheckedChange={setShowNikud}
                />
                <Label htmlFor="nikud">{t("Show Niqqud", "הצג ניקוד")}</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Root Info Card */}
      {matchedRoot && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3" dir="rtl">
              <span className="text-3xl font-bold text-primary">{matchedRoot.lettersSpaced}</span>
              <Badge variant="secondary" className="text-lg">
                {matchedRoot.meaning}
              </Badge>
            </CardTitle>
            <CardDescription dir="rtl">
              {matchedRoot.meaningHe}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Binyanim Overview Grid */}
      {matchedRoot ? (
        <div className="space-y-6">
          {/* Tense Tabs */}
          <Tabs value={selectedTense} onValueChange={(v) => setSelectedTense(v as typeof selectedTense)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="present">{t("Present", "הווה")}</TabsTrigger>
              <TabsTrigger value="past">{t("Past", "עבר")}</TabsTrigger>
              <TabsTrigger value="future">{t("Future", "עתיד")}</TabsTrigger>
              <TabsTrigger value="imperative">{t("Imperative", "ציווי")}</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTense} className="mt-6">
              {/* Binyanim Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {binyanim.map((binyan) => {
                  const form = matchedRoot.binyanForms.find((f) => f.binyanId === binyan.id);
                  const hasForm = !!form;
                  
                  return (
                    <Card
                      key={binyan.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        binyan.color,
                        selectedBinyan === binyan.id && "ring-2 ring-primary",
                        !hasForm && "opacity-50"
                      )}
                      onClick={() => hasForm && setSelectedBinyan(selectedBinyan === binyan.id ? null : binyan.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between">
                          <span dir="rtl">{showNikud ? binyan.nameWithNikud : binyan.nameHe}</span>
                          <Badge variant="outline" className="text-xs">{binyan.name}</Badge>
                        </CardTitle>
                        <CardDescription className={lang === "he" ? "text-right" : ""}>
                          {lang === "he" ? binyan.meaningHe : binyan.meaning}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {hasForm ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {t("Infinitive:", "שם הפועל:")}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg" dir="rtl">
                                  {showNikud ? form.infinitiveWithNikud : form.infinitive}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakHebrew(form.infinitive);
                                  }}
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm">
                              {lang === "he" ? form.meaningHe : form.meaning}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            {t("Not commonly used", "לא בשימוש נפוץ")}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Conjugation Table for Selected Binyan */}
              {selectedBinyan && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>
                      {t(`${selectedTense.charAt(0).toUpperCase() + selectedTense.slice(1)} Tense Conjugation`,
                        `הטיות ${selectedTense === "present" ? "הווה" : selectedTense === "past" ? "עבר" : selectedTense === "future" ? "עתיד" : "ציווי"}`)}
                    </CardTitle>
                    <CardDescription>
                      {binyanim.find((b) => b.id === selectedBinyan)?.name} - {matchedRoot.lettersSpaced}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ConjugationTable
                      root={matchedRoot}
                      binyanId={selectedBinyan}
                      tense={selectedTense}
                      showNikud={showNikud}
                      lang={lang}
                      onSpeak={speakHebrew}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        /* Empty State */
        <Card className="border-dashed">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {t("Enter a Root to Begin", "הזן שורש כדי להתחיל")}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {t(
                    "Type a 3-letter Hebrew root above to see how it transforms across all verb patterns.",
                    "הקלד שורש תלת-עיצורי למעלה כדי לראות איך הוא משתנה בכל הבניינים."
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Binyanim Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            {t("Quick Reference: The 7 Binyanim", "עיון מהיר: שבעת הבניינים")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Binyan", "בניין")}</TableHead>
                  <TableHead>{t("Type", "סוג")}</TableHead>
                  <TableHead>{t("Pattern", "דפוס")}</TableHead>
                  <TableHead>{t("Example", "דוגמה")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {binyanim.map((binyan) => (
                  <TableRow key={binyan.id}>
                    <TableCell className="font-medium" dir="rtl">
                      {showNikud ? binyan.nameWithNikud : binyan.nameHe}
                      <span className="text-muted-foreground text-sm ml-2">({binyan.name})</span>
                    </TableCell>
                    <TableCell>{lang === "he" ? binyan.meaningHe : binyan.meaning}</TableCell>
                    <TableCell className="font-mono" dir="rtl">
                      {showNikud ? binyan.pattern.present : binyan.pattern.present.replace(/[\u0591-\u05C7]/g, "")}
                    </TableCell>
                    <TableCell dir="rtl">
                      {binyan.examples[0] && (
                        <span>
                          {showNikud ? binyan.examples[0].verbWithNikud : binyan.examples[0].verb}
                          <span className="text-muted-foreground text-sm mr-2">
                            ({binyan.examples[0].meaning})
                          </span>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Conjugation Table Component
interface ConjugationTableProps {
  root: (typeof commonRoots)[0];
  binyanId: string;
  tense: "present" | "past" | "future" | "imperative";
  showNikud: boolean;
  lang: "he" | "en";
  onSpeak: (text: string) => void;
}

function ConjugationTable({ root, binyanId, tense, showNikud, lang, onSpeak }: ConjugationTableProps) {
  const form = root.binyanForms.find((f) => f.binyanId === binyanId);
  const conjugation = form?.conjugations.find((c) => c.tense === tense);

  if (!conjugation) {
    return (
      <p className="text-center text-muted-foreground py-4">
        {lang === "he" ? "אין נתונים לזמן זה" : "No data available for this tense"}
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={lang === "he" ? "text-right" : ""}>{lang === "he" ? "גוף" : "Pronoun"}</TableHead>
          <TableHead className={lang === "he" ? "text-right" : ""}>{lang === "he" ? "צורה" : "Form"}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conjugation.forms.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium" dir="rtl">{item.pronoun}</TableCell>
            <TableCell className="text-lg font-bold" dir="rtl">
              {showNikud ? item.formWithNikud : item.form}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onSpeak(item.form)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
