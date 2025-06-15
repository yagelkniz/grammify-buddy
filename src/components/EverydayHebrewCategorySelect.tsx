
import React from "react";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ShoppingBasket, Bus } from "lucide-react";

interface Props {
  onSelect: (category: "restaurant" | "supermarket" | "transportation") => void;
  onBack?: () => void;
}

export default function EverydayHebrewCategorySelect({ onSelect, onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 min-h-[60vh] max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800" dir="rtl">
        עברית יומיומית – בחירת קטגוריה
      </h1>
      <div className="grid grid-cols-1 gap-6 w-full">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-4 py-6 text-2xl font-bold rounded-xl border-2 bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300 shadow hover:scale-105"
          onClick={() => onSelect("restaurant")}
        >
          <UtensilsCrossed size={32} />
          <span dir="rtl">מסעדה</span>
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-4 py-6 text-2xl font-bold rounded-xl border-2 bg-emerald-100 text-emerald-900 border-emerald-300 shadow hover:scale-105"
          onClick={() => onSelect("supermarket")}
        >
          <ShoppingBasket size={32} />
          <span dir="rtl">סופר</span>
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-4 py-6 text-2xl font-bold rounded-xl border-2 bg-yellow-100 text-yellow-900 border-yellow-300 shadow hover:scale-105"
          onClick={() => onSelect("transportation")}
        >
          <Bus size={32} />
          <span dir="rtl">תחבורה</span>
        </Button>
      </div>
      {onBack && (
        <Button variant="outline" onClick={onBack} className="mt-10">⬅ חזרה</Button>
      )}
    </div>
  );
}
