
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PastTenseVerbPractice from "@/components/PastTenseVerbPractice";
import PresentTenseVerbPractice from "@/components/PresentTenseVerbPractice";

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

const Index = () => {
  const [selectedTense, setSelectedTense] = useState<null | "past" | "present" | "future">(null);

  function handleBack() {
    setSelectedTense(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {!selectedTense && (
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
        </div>
      )}
      {selectedTense === "present" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה לבחירת זמן</Button>
          </div>
          <PresentTenseVerbPractice />
        </div>
      )}
      {selectedTense === "past" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה לבחירת זמן</Button>
          </div>
          <PastTenseVerbPractice />
        </div>
      )}
      {selectedTense === "future" && (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex justify-end w-full mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה לבחירת זמן</Button>
          </div>
          <span className="text-3xl mt-10 mb-4">⏩</span>
          <div className="font-bold text-xl text-yellow-700" dir="rtl">
            תרגול עתיד יתווסף בקרוב!
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

