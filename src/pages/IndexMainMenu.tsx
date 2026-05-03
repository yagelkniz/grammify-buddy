import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Search, Flame, BookOpen, Gamepad2, BookMarked, GraduationCap, LayoutGrid } from "lucide-react";
import type { SetStateAction, Dispatch } from "react";
import menuText from "@/i18n/menu";

const heeboStyle = `@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');`;

function updateStreak(): number {
  try {
    const stored = localStorage.getItem("grammify_streak");
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!stored) {
      localStorage.setItem("grammify_streak", JSON.stringify({ count: 1, lastDate: today }));
      return 1;
    }
    const { count, lastDate } = JSON.parse(stored);
    if (lastDate === today) return count;
    if (lastDate === yesterday) {
      localStorage.setItem("grammify_streak", JSON.stringify({ count: count + 1, lastDate: today }));
      return count + 1;
    }
    localStorage.setItem("grammify_streak", JSON.stringify({ count: 1, lastDate: today }));
    return 1;
  } catch { return 0; }
}

interface IndexMainMenuProps {
  lang: "he" | "en";
  setLang: (lang: "he" | "en") => void;
  setShowLinkingWords: (b: boolean) => void;
  setShowPronounsMenu: (b: boolean) => void;
  setShowPossessivePronouns: (b: boolean) => void;
  setShowQuestionnaire: (b: boolean) => void;
  setSelectedPractice: (val: null | "verb" | "sentence") => void;
  setSelectedTextComp: Dispatch<SetStateAction<string | null>>;
  setShowEverydayHebrew: (b: boolean) => void;
  setShowVerbToBePresentation: (b: boolean) => void;
  setShowDaysAndPlacesVocab: (b: boolean) => void;
  setShowQuestionWords: (b: boolean) => void;
  setShowOddOneOut: (b: boolean) => void;
  setShowEmotions: (b: boolean) => void;
  setShowLinkingWordsLevel2: (b: boolean) => void;
  setShowLinkingWordsLevel3?: (b: boolean) => void;
  setShowBodyParts?: (b: boolean) => void;
  setShowColors?: (b: boolean) => void;
  setShowNumbers?: (b: boolean) => void;
  setShowFamily?: (b: boolean) => void;
  setShowFood?: (b: boolean) => void;
  setShowAnimals?: (b: boolean) => void;
  setShowSocial?: (b: boolean) => void;
  setShowCountries?: (b: boolean) => void;
  setShowMovies?: (b: boolean) => void;
  setShowPlaces?: (b: boolean) => void;
}

type Category = "all" | "learn" | "vocab" | "games" | "reading";

interface MenuItem {
  emoji: string;
  label: string;
  category: Category[];
  level?: "beginner" | "intermediate" | "advanced";
  action: () => void;
}

function MenuItemCard({ emoji, label, onClick, index, visible }: { emoji: string; label: string; onClick: () => void; index: number; visible: boolean }) {
  return (
    <button onClick={onClick}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms`, fontFamily: "'Heebo', sans-serif" }}
      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50 active:scale-95 transition-all cursor-pointer w-full text-center">
      <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
      <span className="text-sm font-medium text-gray-700 leading-tight">{label}</span>
    </button>
  );
}

export default function IndexMainMenu({
  lang, setLang, setShowLinkingWords, setShowPronounsMenu, setShowPossessivePronouns,
  setShowQuestionnaire, setSelectedPractice, setSelectedTextComp,
  setShowEverydayHebrew, setShowVerbToBePresentation, setShowDaysAndPlacesVocab,
  setShowQuestionWords, setShowOddOneOut, setShowEmotions, setShowLinkingWordsLevel2,
  setShowLinkingWordsLevel3, setShowBodyParts, setShowColors, setShowNumbers,
  setShowFamily, setShowFood, setShowAnimals, setShowSocial, setShowCountries,
  setShowMovies, setShowPlaces,
}: IndexMainMenuProps) {
  const t = menuText[lang];
  const isHe = lang === "he";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [streak, setStreak] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setStreak(updateStreak());
    const timer = setTimeout(() => setCardsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const allItems: MenuItem[] = useMemo(() => [
    { emoji: "🔤", label: t.linkingWords || "Linking Words", category: ["learn"], level: "beginner", action: () => setShowLinkingWords(true) },
    { emoji: "🧑‍🏫", label: t.pronouns || "Pronouns", category: ["learn"], level: "beginner", action: () => setShowPronounsMenu(true) },
    { emoji: "👤", label: t.possessivePronouns || "Possessive Pronouns", category: ["learn"], level: "beginner", action: () => setShowPossessivePronouns(true) },
    { emoji: "📝", label: t.questionnaire || "Questionnaire", category: ["learn"], level: "beginner", action: () => setShowQuestionnaire(true) },
    { emoji: "💬", label: t.everydayHebrew || "Everyday Hebrew", category: ["learn"], level: "beginner", action: () => setShowEverydayHebrew(true) },
    { emoji: "🧠", label: t.verbToBe || "Verb To Be", category: ["learn"], level: "beginner", action: () => setShowVerbToBePresentation(true) },
    { emoji: "❓", label: t.questionWords || "Question Words", category: ["learn"], level: "beginner", action: () => setShowQuestionWords(true) },
    { emoji: "🔗", label: t.linkingWordsLevel2 || "Linking Words L2", category: ["learn"], level: "intermediate", action: () => setShowLinkingWordsLevel2(true) },
    { emoji: "🔗", label: t.linkingWordsLevel3 || "Linking Words L3", category: ["learn"], level: "advanced", action: () => setShowLinkingWordsLevel3?.(true) },
    { emoji: "📅", label: t.daysAndPlaces || "Days & Places", category: ["vocab"], level: "beginner", action: () => setShowDaysAndPlacesVocab(true) },
    { emoji: "😊", label: t.emotions || "Emotions", category: ["vocab"], level: "beginner", action: () => setShowEmotions(true) },
    { emoji: "💪", label: t.bodyParts || "Body Parts", category: ["vocab"], level: "beginner", action: () => setShowBodyParts?.(true) },
    { emoji: "🎨", label: t.colors || "Colors", category: ["vocab"], level: "beginner", action: () => setShowColors?.(true) },
    { emoji: "🔢", label: t.numbers || "Numbers", category: ["vocab"], level: "beginner", action: () => setShowNumbers?.(true) },
    { emoji: "👨‍👩‍👧", label: t.family || "Family", category: ["vocab"], level: "beginner", action: () => setShowFamily?.(true) },
    { emoji: "🍎", label: t.food || "Food", category: ["vocab"], level: "beginner", action: () => setShowFood?.(true) },
    { emoji: "🐶", label: t.animals || "Animals", category: ["vocab"], level: "beginner", action: () => setShowAnimals?.(true) },
    { emoji: "🤝", label: t.social || "Social", category: ["vocab"], level: "beginner", action: () => setShowSocial?.(true) },
    { emoji: "🌍", label: t.countries || "Countries", category: ["vocab"], level: "intermediate", action: () => setShowCountries?.(true) },
    { emoji: "🎮", label: t.oddOneOut || "Odd One Out", category: ["games"], level: "beginner", action: () => setShowOddOneOut(true) },
    { emoji: "✏️", label: t.verbPractice || "Verb Practice", category: ["learn", "games"], level: "intermediate", action: () => setSelectedPractice("verb") },
    { emoji: "📜", label: t.sentencePractice || "Sentence Practice", category: ["learn", "games"], level: "intermediate", action: () => setSelectedPractice("sentence") },
    { emoji: "🎬", label: t.movies || "Movies", category: ["reading"], level: "intermediate", action: () => setShowMovies?.(true) },
    { emoji: "✈️", label: t.places || "Places", category: ["reading"], level: "intermediate", action: () => setShowPlaces?.(true) },
  ], [t]);

  const filteredItems = useMemo(() =>
    allItems.filter(item => {
      const matchCat = activeCategory === "all" || item.category.includes(activeCategory);
      const matchSearch = searchQuery === "" || item.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }), [allItems, activeCategory, searchQuery]);

  const tabs: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: isHe ? "הכל" : "All", icon: <LayoutGrid size={14} /> },
    { key: "learn", label: isHe ? "לימוד" : "Learn", icon: <GraduationCap size={14} /> },
    { key: "vocab", label: isHe ? "מילים" : "Vocab", icon: <BookMarked size={14} /> },
    { key: "games", label: isHe ? "משחקים" : "Games", icon: <Gamepad2 size={14} /> },
    { key: "reading", label: isHe ? "קריאה" : "Reading", icon: <BookOpen size={14} /> },
  ];

  return (
    <div dir={isHe ? "rtl" : "ltr"} style={{ fontFamily: "'Heebo', sans-serif" }} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <style>{heeboStyle}</style>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇱</span>
              <h1 className="text-lg font-bold text-purple-700" style={{ fontFamily: "'Heebo', sans-serif" }}>
                {isHe ? "גרמיפיי באדי" : "Grammify Buddy"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                <Flame size={16} className="text-orange-500" />
                <span className="text-sm font-bold text-orange-600">{streak}</span>
                <span className="text-xs text-orange-400">{isHe ? "ימים" : "days"}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setLang(lang === "he" ? "en" : "he")} className="flex items-center gap-1 rounded-full text-xs px-3">
                <Globe size={14} />{lang === "he" ? "EN" : "עב"}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isHe ? "right-3" : "left-3"}`} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder={isHe ? "חפש תרגיל..." : "Search exercises..."}
              style={{ fontFamily: "'Heebo', sans-serif" }}
              className={`w-full bg-gray-50 border border-gray-200 rounded-full py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 ${isHe ? "pr-9 pl-4" : "pl-9 pr-4"}`} />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-2">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveCategory(tab.key)}
                style={{ fontFamily: "'Heebo', sans-serif" }}
                className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === tab.key ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {([
            { label: isHe ? "תרגילים" : "Total", value: allItems.length, color: "purple" },
            { label: isHe ? "מתחילים" : "Beginner", value: allItems.filter(i => i.level === "beginner").length, color: "green" },
            { label: isHe ? "רצף" : "Streak", value: streak, color: "orange" },
          ] as const).map((stat, i) => (
            <div key={i} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms` }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-40" />
            <p>{isHe ? "לא נמצאו תרגילים" : "No exercises found"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 pb-8">
            {filteredItems.map((item, i) => (
              <MenuItemCard key={item.label + i} emoji={item.emoji} label={item.label} onClick={item.action} index={i} visible={cardsVisible} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}