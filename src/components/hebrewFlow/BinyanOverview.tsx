import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Building2, Volume2, BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { binyanim } from "@/data/hebrewFlow/binyanim";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

export default function BinyanOverview() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [showNikud, setShowNikud] = useState(true);
  const [selectedBinyan, setSelectedBinyan] = useState(binyanim[0]);

  const speakHebrew = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-7 w-7 text-primary" />
            {t("The 7 Binyanim", "שבעת הבניינים")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "Hebrew verbs are built on patterns called Binyanim. Master these to understand verb meaning and conjugation.",
              "פעלים בעברית בנויים על דפוסים הנקראים בניינים. שלוט בהם כדי להבין משמעות והטיית פעלים."
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="nikud" checked={showNikud} onCheckedChange={setShowNikud} />
          <Label htmlFor="nikud">{t("Show Niqqud", "הצג ניקוד")}</Label>
        </div>
      </div>

      {/* Binyan Selection Tabs */}
      <Tabs
        value={selectedBinyan.id}
        onValueChange={(id) => {
          const binyan = binyanim.find((b) => b.id === id);
          if (binyan) setSelectedBinyan(binyan);
        }}
      >
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
          {binyanim.map((binyan) => (
            <TabsTrigger
              key={binyan.id}
              value={binyan.id}
              className={cn(
                "data-[state=active]:shadow-md border-2 rounded-lg px-4 py-2",
                binyan.color,
                "data-[state=active]:ring-2 data-[state=active]:ring-primary"
              )}
            >
              <span dir="rtl" className="font-bold">
                {showNikud ? binyan.nameWithNikud : binyan.nameHe}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {binyanim.map((binyan) => (
          <TabsContent key={binyan.id} value={binyan.id} className="mt-6 space-y-6">
            {/* Main Info Card */}
            <Card className={cn("border-2", binyan.color)}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl flex items-center gap-3" dir="rtl">
                      {showNikud ? binyan.nameWithNikud : binyan.nameHe}
                      <Badge variant="outline" className="text-base">{binyan.name}</Badge>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {lang === "he" ? binyan.descriptionHe : binyan.description}
                    </CardDescription>
                  </div>
                  <Badge className="text-sm" variant="secondary">
                    {lang === "he" ? binyan.meaningHe : binyan.meaning}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Pattern Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {(["present", "past", "future", "imperative"] as const).map((tense) => (
                    <div key={tense} className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-xs text-muted-foreground uppercase mb-1">
                        {t(tense.charAt(0).toUpperCase() + tense.slice(1),
                          tense === "present" ? "הווה" : tense === "past" ? "עבר" : tense === "future" ? "עתיד" : "ציווי"
                        )}
                      </p>
                      <p className="text-xl font-bold font-mono" dir="rtl">
                        {binyan.pattern[tense]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {t("Examples", "דוגמאות")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {binyan.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => speakHebrew(example.verb)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <div>
                            <p className="font-bold text-lg" dir="rtl">
                              {showNikud ? example.verbWithNikud : example.verb}
                            </p>
                            <p className="text-sm text-muted-foreground">{example.meaning}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="font-mono text-sm" dir="rtl">
                          {example.root}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active vs Passive Relationships */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("Related Patterns", "בניינים קשורים")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BinyanRelationships binyanId={binyan.id} lang={lang} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/hebrew-flow/visualizer" className="flex-1">
          <Button className="w-full" size="lg">
            {t("Try Verb Visualizer", "נסה ממחיש פועל")}
            <ArrowRight className={cn("h-4 w-4", lang === "he" ? "mr-2 rotate-180" : "ml-2")} />
          </Button>
        </Link>
        <Link to="/hebrew-flow/practice/conjugation" className="flex-1">
          <Button className="w-full" size="lg" variant="outline">
            <GraduationCap className={cn("h-4 w-4", lang === "he" ? "ml-2" : "mr-2")} />
            {t("Practice Conjugation", "תרגל הטיות")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Component showing relationships between binyanim
function BinyanRelationships({ binyanId, lang }: { binyanId: string; lang: "he" | "en" }) {
  const relationships: Record<string, { active?: string; passive?: string; reflexive?: string }> = {
    paal: { passive: "nifal" },
    nifal: { active: "paal" },
    piel: { passive: "pual" },
    pual: { active: "piel" },
    hifil: { passive: "hufal" },
    hufal: { active: "hifil" },
    hitpael: {},
  };

  const rel = relationships[binyanId];
  const t = (en: string, he: string) => (lang === "he" ? he : en);

  if (!rel.active && !rel.passive && !rel.reflexive) {
    return (
      <p className="text-muted-foreground italic">
        {t("Hitpa'el is primarily reflexive/reciprocal - no direct active/passive pair.",
          "התפעל הוא בעיקר רפלקסיבי/הדדי - אין לו זוג אקטיבי/סביל ישיר.")}
      </p>
    );
  }

  const related = rel.active || rel.passive;
  const relatedBinyan = binyanim.find((b) => b.id === related);

  if (!relatedBinyan) return null;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
      <div className="flex-1 text-center">
        <Badge className="mb-2">{rel.active ? t("Passive", "סביל") : t("Active", "אקטיבי")}</Badge>
        <p className="font-bold text-xl" dir="rtl">
          {binyanim.find((b) => b.id === binyanId)?.nameWithNikud}
        </p>
      </div>
      <ArrowRight className="h-6 w-6 text-muted-foreground" />
      <div className="flex-1 text-center">
        <Badge variant="outline" className="mb-2">
          {rel.active ? t("Active", "אקטיבי") : t("Passive", "סביל")}
        </Badge>
        <p className="font-bold text-xl" dir="rtl">{relatedBinyan.nameWithNikud}</p>
      </div>
    </div>
  );
}
