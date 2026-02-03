import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { prepositions, definiteArticle, constructState, genderNumber, allGrammarConcepts } from "@/data/hebrewFlow/syntax";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

export default function SyntaxModules() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [showNikud, setShowNikud] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState(allGrammarConcepts[0].id);

  const currentConcept = allGrammarConcepts.find((c) => c.id === selectedConcept) || allGrammarConcepts[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-primary" />
            {t("Hebrew Syntax", "תחביר עברי")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "Master prepositions, articles, and grammatical structures",
              "שלוט במילות יחס, אותיות הידיעה ומבנים דקדוקיים"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="nikud" checked={showNikud} onCheckedChange={setShowNikud} />
          <Label htmlFor="nikud">{t("Niqqud", "ניקוד")}</Label>
        </div>
      </div>

      {/* Concept Tabs */}
      <Tabs value={selectedConcept} onValueChange={setSelectedConcept}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
          {allGrammarConcepts.map((concept) => (
            <TabsTrigger key={concept.id} value={concept.id} className="text-xs md:text-sm">
              {lang === "he" ? concept.nameHe : concept.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {allGrammarConcepts.map((concept) => (
          <TabsContent key={concept.id} value={concept.id} className="mt-6 space-y-6">
            {/* Concept Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {lang === "he" ? concept.nameHe : concept.name}
                </CardTitle>
                <CardDescription className={lang === "he" ? "text-right" : ""}>
                  {lang === "he" ? concept.descriptionHe : concept.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {concept.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border bg-muted/30 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold" dir="rtl">
                          {showNikud ? example.textWithNikud : example.text}
                        </span>
                        <Badge variant="secondary">{example.translation}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground" dir={lang === "he" ? "rtl" : "ltr"}>
                        {lang === "he" ? example.explanationHe : example.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Prepositions Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Preposition Quick Reference", "מילות יחס - התייחסות מהירה")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Letter", "אות")}</TableHead>
                <TableHead>{t("Meaning", "משמעות")}</TableHead>
                <TableHead>{t("Example", "דוגמה")}</TableHead>
                <TableHead>{t("Translation", "תרגום")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-lg" dir="rtl">בְּ</TableCell>
                <TableCell>in, at, with</TableCell>
                <TableCell dir="rtl">{showNikud ? "בַּבַּיִת" : "בבית"}</TableCell>
                <TableCell>at home</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg" dir="rtl">לְ</TableCell>
                <TableCell>to, for</TableCell>
                <TableCell dir="rtl">{showNikud ? "לַיֶּלֶד" : "לילד"}</TableCell>
                <TableCell>to/for the child</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg" dir="rtl">מִ / מֵ</TableCell>
                <TableCell>from</TableCell>
                <TableCell dir="rtl">{showNikud ? "מֵהָעִיר" : "מהעיר"}</TableCell>
                <TableCell>from the city</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg" dir="rtl">כְּ</TableCell>
                <TableCell>like, as</TableCell>
                <TableCell dir="rtl">{showNikud ? "כְּמֶלֶךְ" : "כמלך"}</TableCell>
                <TableCell>like a king</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gender Agreement Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Gender & Number Agreement", "התאמה במין ומספר")}</CardTitle>
          <CardDescription>
            {t("Verbs and adjectives must match the noun in gender and number", 
              "פעלים ותארים חייבים להתאים לשם במין ומספר")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>{t("Singular", "יחיד")}</TableHead>
                <TableHead>{t("Plural", "רבים")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{t("Masculine", "זכר")}</TableCell>
                <TableCell dir="rtl">
                  <div>
                    <span className="font-bold">{showNikud ? "הַיֶּלֶד הַגָּדוֹל" : "הילד הגדול"}</span>
                    <p className="text-xs text-muted-foreground">the big boy</p>
                  </div>
                </TableCell>
                <TableCell dir="rtl">
                  <div>
                    <span className="font-bold">{showNikud ? "הַיְּלָדִים הַגְּדוֹלִים" : "הילדים הגדולים"}</span>
                    <p className="text-xs text-muted-foreground">the big boys</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">{t("Feminine", "נקבה")}</TableCell>
                <TableCell dir="rtl">
                  <div>
                    <span className="font-bold">{showNikud ? "הַיַּלְדָּה הַגְּדוֹלָה" : "הילדה הגדולה"}</span>
                    <p className="text-xs text-muted-foreground">the big girl</p>
                  </div>
                </TableCell>
                <TableCell dir="rtl">
                  <div>
                    <span className="font-bold">{showNikud ? "הַיְּלָדוֹת הַגְּדוֹלוֹת" : "הילדות הגדולות"}</span>
                    <p className="text-xs text-muted-foreground">the big girls</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
