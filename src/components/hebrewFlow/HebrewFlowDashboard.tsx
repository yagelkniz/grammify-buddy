import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  TreeDeciduous,
  Brain,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

export default function HebrewFlowDashboard() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };

  const quickStartModules = [
    {
      icon: TreeDeciduous,
      title: t("The Shoresh", "השורש"),
      description: t("Understand the root system", "הבן את מערכת השורשים"),
      href: "/hebrew-flow/roots",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Building2,
      title: t("7 Binyanim", "שבעת הבניינים"),
      description: t("Master verb patterns", "שליטה בבניינים"),
      href: "/hebrew-flow/binyanim",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Sparkles,
      title: t("Verb Visualizer", "ממחיש הפועל"),
      description: t("See roots transform", "צפה בשינויי שורשים"),
      href: "/hebrew-flow/visualizer",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Brain,
      title: t("Practice Arena", "אזור תרגול"),
      description: t("Test your knowledge", "בחן את הידע שלך"),
      href: "/hebrew-flow/practice/roots",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  const featuredConcepts = [
    {
      title: t("Pa'al - פָּעַל", "פָּעַל - Pa'al"),
      desc: t("The most common verb pattern", "הבניין הנפוץ ביותר"),
      example: "כותב (writes)",
    },
    {
      title: t("Pi'el - פִּעֵל", "פִּעֵל - Pi'el"),
      desc: t("Intensive/causative actions", "פעולות אינטנסיביות"),
      example: "מדבר (speaks)",
    },
    {
      title: t("Hitpa'el - הִתְפַּעֵל", "הִתְפַּעֵל - Hitpa'el"),
      desc: t("Reflexive actions", "פעולות רפלקסיביות"),
      example: "מתלבש (gets dressed)",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <Badge variant="secondary" className="text-sm">
          {t("Professional Hebrew Grammar", "דקדוק עברי מקצועי")}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          {t("Welcome to Hebrew Flow", "ברוכים הבאים ל-Hebrew Flow")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t(
            "Master Hebrew grammar through deep understanding of morphology and syntax. Focus on the verb system, roots, and grammatical structures.",
            "שלוט בדקדוק העברי דרך הבנה מעמיקה של מורפולוגיה ותחביר. התמקד במערכת הפועל, שורשים ומבנים דקדוקיים."
          )}
        </p>
      </div>

      {/* Quick Start Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStartModules.map((module) => (
          <Link key={module.href} to={module.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", module.bgColor)}>
                  <module.icon className={cn("h-6 w-6", module.color)} />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Concepts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("Featured: The Binyanim", "נבחר: הבניינים")}
            </CardTitle>
            <CardDescription>
              {t(
                "Hebrew verbs follow 7 patterns called Binyanim. Each pattern adds specific meaning.",
                "פעלים בעברית עוקבים אחר 7 דפוסים הנקראים בניינים. כל בניין מוסיף משמעות ספציפית."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredConcepts.map((concept, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{concept.title}</h4>
                    <p className="text-sm text-muted-foreground">{concept.desc}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-lg" dir="rtl">
                    {concept.example}
                  </Badge>
                </div>
              ))}
              <Link to="/hebrew-flow/binyanim">
                <Button className="w-full mt-2" variant="outline">
                  {t("Explore All 7 Binyanim", "חקור את כל 7 הבניינים")}
                  <ArrowRight className={cn("h-4 w-4", lang === "he" ? "mr-2 rotate-180" : "ml-2")} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Learning Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t("Learning Tips", "טיפים ללימוד")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                {t("Start with Roots", "התחל עם שורשים")}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t(
                  "Understanding 3-letter roots is key to Hebrew vocabulary.",
                  "הבנת שורשים תלת-עיצוריים היא המפתח לאוצר המילים העברי."
                )}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                {t("Practice Daily", "תרגל יומי")}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {t(
                  "Consistent practice with conjugation builds muscle memory.",
                  "תרגול עקבי עם הטיות בונה זיכרון שרירים."
                )}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                {t("Use Niqqud", "השתמש בניקוד")}
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t(
                  "Vowel points help pronunciation and pattern recognition.",
                  "סימני הניקוד עוזרים בהגייה וזיהוי דפוסים."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {t("Ready to Start?", "מוכן להתחיל?")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "Begin with the Verb Visualizer to see Hebrew patterns in action.",
                    "התחל עם ממחיש הפועל כדי לראות דפוסים עבריים בפעולה."
                  )}
                </p>
              </div>
            </div>
            <Link to="/hebrew-flow/visualizer">
              <Button size="lg">
                {t("Open Verb Visualizer", "פתח ממחיש פועל")}
                <Sparkles className={cn("h-4 w-4", lang === "he" ? "mr-2" : "ml-2")} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
