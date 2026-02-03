import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HebrewFlowSidebar from "./HebrewFlowSidebar";
import { Button } from "@/components/ui/button";
import { Languages, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HebrewFlowLayout() {
  const [lang, setLang] = useState<"he" | "en">("en");
  const [isDark, setIsDark] = useState(false);

  const toggleLang = () => setLang((prev) => (prev === "he" ? "en" : "he"));
  const t = (en: string, he: string) => (lang === "he" ? he : en);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className={cn("min-h-screen flex w-full", isDark ? "dark" : "")}>
        <HebrewFlowSidebar lang={lang} />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {t("Hebrew Flow - Grammar Mastery", "Hebrew Flow - שליטה בדקדוק")}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLang}
                className="flex items-center gap-1"
              >
                <Languages className="h-4 w-4" />
                <span className="font-medium">{lang === "he" ? "EN" : "עב"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main 
            className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
            dir={lang === "he" ? "rtl" : "ltr"}
          >
            <Outlet context={{ lang, t }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Hook to access layout context
export function useHebrewFlowContext() {
  const context = React.useContext(React.createContext<{
    lang: "he" | "en";
    t: (en: string, he: string) => string;
  } | null>(null));
  
  // Fallback if context not available
  return context || { lang: "en" as const, t: (en: string) => en };
}
