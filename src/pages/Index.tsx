import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import PastTenseVerbPractice from "@/components/PastTenseVerbPractice";
import PresentTenseVerbPractice from "@/components/PresentTenseVerbPractice";
import NounAdjectivePractice from "@/components/NounAdjectivePractice";
import TextComprehensionFood from "@/components/TextComprehensionFood";
import TextComprehensionAnimalsEasy from "@/components/TextComprehensionAnimalsEasy";
import TextComprehensionFoodOrderMedium from "@/components/TextComprehensionFoodOrderMedium";
import TextComprehensionSocialMedia from "@/components/TextComprehensionSocialMedia";
import TextComprehensionCountriesLevels from "@/components/TextComprehensionCountriesLevels";
import TextComprehensionMoviesAndSeriesLevels from "@/components/TextComprehensionMoviesAndSeriesLevels";
import FutureTenseVerbPractice from "@/components/FutureTenseVerbPractice";
import TextComprehensionPlacesFoodEasy from "@/components/TextComprehensionPlacesFoodEasy";
import InterviewQuestionnaire from "@/components/InterviewQuestionnaire";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import PronounsTable from "@/components/PronounsTable";
import PossessivePronounsTable from "@/components/PossessivePronounsTable";
import LinkingWordsTable from "@/components/LinkingWordsTable";
import IndexMainMenu from "./IndexMainMenu";
import EverydayHebrewPractice from "@/components/EverydayHebrewPractice";
import EverydayHebrewCategorySelect from "@/components/EverydayHebrewCategorySelect";
import menuText from "@/i18n/menu";

// Add lazy import for food levels
const LazyTextComprehensionFoodLevels = React.lazy(() =>
  import("@/components/TextComprehensionFoodLevels")
);
const LazyTextComprehensionCountriesLevels = React.lazy(() =>
  import("@/components/TextComprehensionCountriesLevels")
);
const LazyTextComprehensionMoviesAndSeriesLevels = React.lazy(() =>
  import("@/components/TextComprehensionMoviesAndSeriesLevels")
);
import SingularPluralPractice from "@/components/SingularPluralPractice";

const tenseOptions = [
  {
    label: "עבר",
    color: "bg-blue-100 text-blue-900 border-blue-400",
    value: "past",
    emoji: "⏪",
  },
  {
    label: "הווה",
    color: "bg-green-100 text-green-900 border-green-400",
    value: "present",
    emoji: "⏺️",
  },
  {
    label: "עתיד",
    color: "bg-yellow-100 text-yellow-900 border-yellow-400",
    value: "future",
    emoji: "⏩",
  },
];

const practiceOptions = [
  {
    label: "פעלים - זמן עבר/הווה/עתיד",
    value: "verb",
    color: "bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-blue-900 border-blue-200",
    emoji: "🕰️"
  },
  {
    label: "שמות עצם + תואר",
    value: "nounAdj",
    color: "bg-pink-100 text-pink-900 border-pink-400",
    emoji: "📝"
  }
];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<null | "verb" | "nounAdj">(null);
  const [selectedTense, setSelectedTense] = useState<null | "past" | "present" | "future">(null);
  const [selectedTextComp, setSelectedTextComp] = useState<
    null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy"
  >(null);
  const [showPossessivePronouns, setShowPossessivePronouns] = useState(false);
  const [showLinkingWords, setShowLinkingWords] = useState(false);
  const nav = useNavigate();
  const [showPronounsTable, setShowPronounsTable] = useState(false);
  const [showEverydayHebrew, setShowEverydayHebrew] = useState(false);
  const [everydayHebrewCategory, setEverydayHebrewCategory] = useState<null | "restaurant" | "supermarket" | "transportation">(null);
  const [showSingularPlural, setShowSingularPlural] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) nav("/auth", { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) nav("/auth", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [nav]);

  function handleBack() {
    if (everydayHebrewCategory !== null) setEverydayHebrewCategory(null);
    else if (showEverydayHebrew) setShowEverydayHebrew(false);
    else if (selectedTextComp) setSelectedTextComp(null);
    else if (selectedTense) setSelectedTense(null);
    else setSelectedPractice(null);
  }

  // פונקציה מחזירה אובייקט שבו גם hebrew וגם english
  const t = (key: string) => ({
    he: menuText.he[key],
    en: menuText.en[key]
  });

  // Welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-900/80 px-6 py-10 max-w-md w-full flex flex-col items-center gap-7 border-2 border-blue-100">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-0" dir="ltr">
            Welcome to "Hebrew with Eli"
          </h1>
          <div className="text-xl text-slate-700 font-semibold" dir="ltr">
            Practice, learn and enjoy.<br />
            And it's all free!
          </div>
          <div className="w-full h-px bg-gradient-to-r from-blue-200 via-purple-200 to-yellow-200 my-2" />
          <div className="text-lg text-gray-700 text-center" dir="rtl">
            ברוכים הבאים לאפליקציה <span className="font-bold text-blue-800">'עברית עם עילי'</span> –<br />
            מתרגלים, לומדים ונהנים!<br />
            והכל <span className="font-bold">בחינם</span>!
          </div>
          <Button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-3"
            onClick={() => setShowWelcome(false)}
          >
            Go to main menu
          </Button>
        </div>
      </div>
    );
  }

  // Questionnaire
  if (showQuestionnaire) {
    return (
      <InterviewQuestionnaire onBack={() => setShowQuestionnaire(false)} />
    );
  }

  // Pronoun tables, etc
  if (showPronounsTable) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={() => setShowPronounsTable(false)}>⬅ Back</Button>
        </div>
        <PronounsTable />
      </div>
    );
  }

  if (showPossessivePronouns) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={() => setShowPossessivePronouns(false)}>⬅ Back</Button>
        </div>
        <PossessivePronounsTable />
      </div>
    );
  }

  if (showLinkingWords) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={() => setShowLinkingWords(false)}>
            ⬅ Back
          </Button>
        </div>
        <LinkingWordsTable />
      </div>
    );
  }

  // Everyday Hebrew – category select
  if (showEverydayHebrew && everydayHebrewCategory === null) {
    return (
      <EverydayHebrewCategorySelect
        onSelect={cat => setEverydayHebrewCategory(cat)}
        onBack={handleBack}
      />
    );
  }

  // Everyday Hebrew – practice view
  if (showEverydayHebrew && everydayHebrewCategory) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleBack}>
            ⬅ Back
          </Button>
        </div>
        <EverydayHebrewPractice
          category={everydayHebrewCategory}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Text comprehension practice screens
  if (selectedTextComp) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleBack}>⬅ Back</Button>
        </div>
        {selectedTextComp === "food" && <TextComprehensionFood />}
        {selectedTextComp === "animals-easy" && <TextComprehensionAnimalsEasy />}
        {selectedTextComp === "food-order-medium" && (
          <TextComprehensionFoodOrderMedium />
        )}
        {selectedTextComp === "social-media" && <TextComprehensionSocialMedia />}
        {selectedTextComp === "food-levels" && (
          <Suspense fallback={<div>Loading…</div>}>
            <LazyTextComprehensionFoodLevels />
          </Suspense>
        )}
        {selectedTextComp === "countries-levels" && (
          <Suspense fallback={<div>Loading…</div>}>
            <LazyTextComprehensionCountriesLevels />
          </Suspense>
        )}
        {selectedTextComp === "movies-series-levels" && (
          <Suspense fallback={<div>Loading…</div>}>
            <LazyTextComprehensionMoviesAndSeriesLevels />
          </Suspense>
        )}
        {selectedTextComp === "places-food-easy" && <TextComprehensionPlacesFoodEasy />}
      </div>
    );
  }

  // תרגול יחיד/רבים + זכר/נקבה
  if (showSingularPlural) {
    return (
      <SingularPluralPractice
        lang={lang}
        onBack={() => setShowSingularPlural(false)}
      />
    );
  }

  // דוגמה: שינוי התפריט הראשי באחת התצוגות
  if (!selectedPractice) {
    return (
      <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
          איזה תרגול תרצה לתרגל?<br />
          <span className="text-base text-slate-600 font-normal" dir="ltr">
            What would you like to practice?
          </span>
        </h1>
        <div className="grid gap-6 w-full">
          {/* יחיד/רבים + זכר/נקבה*/}
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-lime-100 text-lime-900 border-lime-300"
            onClick={() => setShowSingularPlural(true)}
          >
            <span className="text-3xl mb-2">📚</span>
            <span dir="rtl">{t("singularPlural").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("singularPlural").en}</span>
          </button>
          {/* שאר הכפתורים – תצוגה דו־לשונית */}
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
            onClick={() => setShowLinkingWords(true)}
          >
            <span className="text-3xl mb-2">🔗</span>
            <span dir="rtl">{t("linkingWords").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("linkingWords").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-indigo-100 text-indigo-900 border-indigo-300"
            onClick={() => setShowPronounsTable(true)}
          >
            <span className="text-3xl mb-2">👤</span>
            <span dir="rtl">{t("pronouns").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("pronouns").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-teal-100 text-teal-900 border-teal-300"
            onClick={() => setShowPossessivePronouns(true)}
          >
            <span className="text-3xl mb-2">🔗</span>
            <span dir="rtl">{t("possessivePronouns").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("possessivePronouns").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-100 text-orange-900 border-orange-300"
            onClick={() => setShowEverydayHebrew(true)}
          >
            <span className="text-3xl mb-2">🗣️</span>
            <span dir="rtl">{t("everydayHebrew").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("everydayHebrew").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-blue-900 border-blue-200"
            onClick={() => setSelectedPractice("verb")}
          >
            <span className="text-3xl mb-2">🕰️</span>
            <span dir="rtl">{t("verbs").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("verbs").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-pink-100 text-pink-900 border-pink-400"
            onClick={() => setSelectedPractice("nounAdj")}
          >
            <span className="text-3xl mb-2">📝</span>
            <span dir="rtl">{t("nouns").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("nouns").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-purple-100 text-purple-900 border-purple-300"
            onClick={() => setShowQuestionnaire(true)}
          >
            <span className="text-3xl mb-2">💬</span>
            <span dir="rtl">{t("questionnaire").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("questionnaire").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-yellow-100 text-yellow-900 border-yellow-300"
            onClick={() => setSelectedTextComp("food-levels")}
          >
            <span className="text-3xl mb-2">🥗</span>
            <span dir="rtl">{t("foodComp").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("foodComp").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-200 text-orange-900 border-orange-300"
            onClick={() => setSelectedTextComp("food-order-medium")}
          >
            <span className="text-3xl mb-2">🍽️</span>
            <span dir="rtl">{t("foodOrder").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("foodOrder").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-green-100 text-green-900 border-green-200"
            onClick={() => setSelectedTextComp("animals-easy")}
          >
            <span className="text-3xl mb-2">🐾</span>
            <span dir="rtl">{t("animalsEasy").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("animalsEasy").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-100 text-blue-900 border-blue-300"
            onClick={() => setSelectedTextComp("social-media")}
          >
            <span className="text-3xl mb-2">📱</span>
            <span dir="rtl">{t("socialMedia").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("socialMedia").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-cyan-100 text-cyan-900 border-cyan-300"
            onClick={() => setSelectedTextComp("countries-levels")}
          >
            <span className="text-3xl mb-2">🌏</span>
            <span dir="rtl">{t("countries").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("countries").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-50 text-blue-900 border-blue-400"
            onClick={() => setSelectedTextComp("movies-series-levels")}
          >
            <span className="text-3xl mb-2">📺</span>
            <span dir="rtl">{t("movies").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("movies").en}</span>
          </button>
          <button
            className="w-full flex flex-col items-center justify-center gap-0 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-sky-100 text-sky-900 border-sky-400"
            onClick={() => setSelectedTextComp("places-food-easy")}
          >
            <span className="text-3xl mb-2">🌊</span>
            <span dir="rtl">{t("placesFoodEasy").he}</span>
            <span className="text-base font-normal text-slate-600" dir="ltr">{t("placesFoodEasy").en}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {!selectedPractice && (
        <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
            איזה תרגול תרצה לתרגל?
          </h1>
          <div className="grid gap-6 w-full">
            {/* כפתור חדש — טבלת מילות קישור */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
              onClick={() => setShowLinkingWords(true)}
            >
              <span className="text-3xl">🔗</span>
              <span dir="rtl">טבלת מילות קישור (קטגוריות ודוגמאות)</span>
            </button>
            {/* כפתור חדש — טבלת שמות גוף */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-indigo-100 text-indigo-900 border-indigo-300"
              onClick={() => setShowPronounsTable(true)}
            >
              <span className="text-3xl">👤</span>
              <span dir="rtl">טבלת שמות גוף (עברית-אנגלית)</span>
            </button>
            {/* כפתור לטבלת מילות שייכות */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-teal-100 text-teal-900 border-teal-300"
              onClick={() => setShowPossessivePronouns(true)}
            >
              <span className="text-3xl">🔗</span>
              <span dir="rtl">טבלת מילות שייכות (עברית-אנגלית)</span>
            </button>
            {practiceOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none ${option.color}`}
                onClick={() => setSelectedPractice(option.value as any)}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span dir="rtl">{option.label}</span>
              </button>
            ))}
            {/* כפתור לשאלון היכרות */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-purple-100 text-purple-900 border-purple-300"
              onClick={() => setShowQuestionnaire(true)}
            >
              <span className="text-3xl">💬</span>
              <span dir="rtl">שאלון היכרות</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - אוכל (בשלוש רמות) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-yellow-100 text-yellow-900 border-yellow-300"
              onClick={() => setSelectedTextComp("food-levels")}
            >
              <span className="text-3xl">🥗</span>
              <span dir="rtl">הבנת הנקרא - אוכל (שלוש רמות)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - אוכל (בינוני) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-orange-200 text-orange-900 border-orange-300"
              onClick={() => setSelectedTextComp("food-order-medium")}
            >
              <span className="text-3xl">🍽️</span>
              <span dir="rtl">הבנת הנקרא - הזמנת אוכל (בינוני)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - חיות (קל) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-green-100 text-green-900 border-green-200"
              onClick={() => setSelectedTextComp("animals-easy")}
            >
              <span className="text-3xl">🐾</span>
              <span dir="rtl">הבנת הנקרא - חיות (קל)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - טלוויזיה ורשתות חברתיות */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-blue-100 text-blue-900 border-blue-300"
              onClick={() => setSelectedTextComp("social-media")}
            >
              <span className="text-3xl">📱</span>
              <span dir="rtl">הבנת הנקרא - טלוויזיה ורשתות חברתיות</span>
            </button>
            {/* כפתור חדש: מדינות (שלוש רמות) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-cyan-100 text-cyan-900 border-cyan-300"
              onClick={() => setSelectedTextComp("countries-levels")}
            >
              <span className="text-3xl">🌏</span>
              <span dir="rtl">הבנת הנקרא - מדינות (שלוש רמות)</span>
            </button>
            {/* כפתור חדש: טלוויזיה וסדרות (שלוש רמות) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-blue-50 text-blue-900 border-blue-400"
              onClick={() => setSelectedTextComp("movies-series-levels")}
            >
              <span className="text-3xl">📺</span>
              <span dir="rtl">הבנת הנקרא - טלוויזיה וסדרות (שלוש רמות)</span>
            </button>
            {/* כפתור חדש: בילוי בים ואוכל (קל) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-sky-100 text-sky-900 border-sky-400"
              onClick={() => setSelectedTextComp("places-food-easy")}
            >
              <span className="text-3xl">🌊</span>
              <span dir="rtl">הבנת הנקרא - בילוי בים ואוכל (קל)</span>
            </button>
          </div>
        </div>
      )}
      {selectedPractice === "verb" && !selectedTense && (
        <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
            איזה זמן תרצה לתרגל?
          </h1>
          <div className="grid gap-6 w-full">
            {tenseOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none ${option.color}`}
                onClick={() => setSelectedTense(option.value as any)}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span dir="rtl">{option.label}</span>
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "present" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <PresentTenseVerbPractice />
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "past" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <PastTenseVerbPractice />
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "future" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <FutureTenseVerbPractice />
        </div>
      )}
      {selectedPractice === "nounAdj" && (
        <div className="w-full">
          <NounAdjectivePractice onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default Index;
