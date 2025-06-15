
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const questions = [
  "איך קוראים לך? ומה אתה הכי אוהב בשמך?",
  "איפה אתה גר היום? איך זה לגור שם?",
  "איך נראה היום שלך עד עכשיו?",
  "מה הדבר הראשון שעשית כשקמת הבוקר?",
  "מה אתה הכי אוהב לאכול, ולמה דווקא את זה?",
  "איזו ארוחה מזכירה לך את הבית?",
  "מה אתה עושה ביומיום (לימודים / עבודה)?",
  "מה מביא אותך ללמוד עברית?",
  "מה מושך אותך בשפה העברית או בישראל?",
  "ספר על רגע שבו הרגשת גאווה בעצמך.",
  "האם היה רגע מביך שאתה זוכר במיוחד?",
  "מה התחביבים שלך? מתי התחלת לעסוק בהם?",
  "מה המקום האהוב עליך בעולם ולמה?",
  "אם היית יכול לטוס מחר לכל מקום – לאן היית נוסע?",
  "מה אתה הכי אוהב לעשות כשיש לך זמן לעצמך?",
  "איזו סדרה או סרט השפיעו עליך במיוחד?",
  "מי האדם שהכי השפיע עליך בחיים ולמה?",
  "יש מורה או מדריך שאתה זוכר לטובה?",
  "מה אתה מעריך אצל חברים שלך?",
  "מה אתה חושב שהחברים שלך הכי אוהבים אצלך?",
  "אם היית צריך לבחור תכונה אחת שמגדירה אותך – איזו זו תהיה?",
  "מתי בפעם האחרונה עזרת למישהו?",
  "מה הרגע הכי קשה שעברת בשנה האחרונה?",
  "מה אתה עושה כשאתה מרגיש עצב או מתח?",
  "איזה שיר או מוזיקה אתה שומע כשאתה רוצה להירגע?",
  "מה הספר האחרון שקראת, אם בכלל?",
  "מה למדת על עצמך בשנה האחרונה?",
  "מה היית רוצה ללמוד או לנסות בעתיד?",
  "מהו החלום הגדול שלך?",
  "יש משהו שאתה מתחרט עליו? מה למדת מזה?",
  "איך אתה מתמודד עם אתגרים חדשים?",
  "איזו תקופה בחיים היית רוצה לחוות שוב ולמה?",
  "מה חשוב לך שיהיה בסביבה שבה אתה חי?",
  "איך אתה שומר על קשר עם אנשים שחשובים לך?",
  "מה אתה הכי אוהב בעצמך?",
  "מה היית רוצה לשפר בעצמך?",
  "יש הרגל קטן שאתה גאה שפיתחת?",
  "ספר על חוויה משנה חיים שעברת.",
  "מה אתה הכי אוהב בתרבות שלך?",
  "איך אתה חוגג חגים, אם בכלל?",
  "מה מצחיק אותך?",
  "אם היית כותב ספר, על מה הוא היה?",
  "מה גורם לך להרגיש שייך?",
  "מתי אתה מרגיש הכי חופשי?",
  "יש לך מסר שאתה מנסה להעביר לאחרים בחיים שלך?",
  "מהו זיכרון ילדות משמעותי עבורך?",
  "מה אתה חושב על העתיד שלך?",
  "מה אתה עושה כשאתה מרגיש השראה?",
  "איך אתה מרגיש כשאתה מדבר בעברית?",
  "מה היית רוצה שאני אדע עליך לפני שניפרד?",
];

const InterviewQuestionnaire = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string) => {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 mt-8 shadow border">
        <h2 className="text-2xl font-bold mb-4 text-blue-700" dir="rtl">
          תודה שענית על השאלון!
        </h2>
        <div className="mb-6 text-gray-700" dir="rtl">
          להלן התשובות שמילאת:
        </div>
        <div className="space-y-5">
          {questions.map((q, idx) => (
            <div key={idx} className="border-b pb-2">
              <div className="font-semibold text-blue-800">{idx + 1}. {q}</div>
              <div className="text-gray-900">{answers[idx] || <span className="italic text-gray-500">לא נענה</span>}</div>
            </div>
          ))}
        </div>
        <Button className="mt-8 w-full" variant="outline" onClick={onBack}>
          חזרה לתפריט הראשי
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 mt-8 shadow border flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
        <div className="text-blue-800 font-bold">שאלה {step + 1} מתוך {questions.length}</div>
      </div>
      <div className="text-xl font-semibold text-blue-900 mb-3" dir="rtl">
        {questions[step]}
      </div>
      <Textarea
        placeholder="הקלד/י את התשובה שלך כאן..."
        value={answers[step]}
        onChange={e => handleChange(e.target.value)}
        className="min-h-[90px] text-lg"
        autoFocus
        dir="rtl"
      />
      <div className="flex justify-between items-center mt-2 gap-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={step === 0}
          className="flex-1"
        >
          הקודם
        </Button>
        {step < questions.length - 1 ? (
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            disabled={answers[step].trim() === ""}
          >
            הבא
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white flex-1"
            disabled={answers[step].trim() === ""}
          >
            שלח תשובות
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestionnaire;

