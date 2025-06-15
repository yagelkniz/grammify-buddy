
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PronounsTable from "./PronounsTable";
import PronounsPractice from "./PronounsPractice";

export default function PronounsMenu({ onBack }: { onBack?: () => void }) {
  const [showPractice, setShowPractice] = useState(false);
  const [lang] = useState<"he" | "en">("he"); // ניתן בהמשך להוסיף בחירה בשפה

  if (showPractice) {
    return (
      <PronounsPractice
        lang={lang}
        onBack={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-6 bg-background rounded-2xl shadow border">
      <div className="flex justify-end w-full">
        <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
      </div>
      <h2 className="text-2xl font-bold mb-1 text-indigo-900" dir="rtl">
        טבלת שמות גוף (עברית-אנגלית)
      </h2>
      <div className="flex flex-col gap-4 w-full">
        <Button
          className="w-full text-lg py-4 bg-indigo-100 text-indigo-900 border-indigo-300"
          variant="outline"
          onClick={() => setShowPractice(false)}
        >
          צפיה בטבלה (Table)
        </Button>
        <Button
          className="w-full text-lg py-4 bg-violet-100 text-violet-900 border-violet-300"
          variant="outline"
          onClick={() => setShowPractice(true)}
        >
          תרגול (Practice)
        </Button>
      </div>
      {!showPractice && (
        <div className="w-full flex justify-center">
          <PronounsTable />
        </div>
      )}
    </div>
  );
}
