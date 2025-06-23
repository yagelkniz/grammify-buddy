
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  householdItems, 
  beginnerQuestions, 
  intermediateQuestions, 
  advancedQuestions,
  categoryNames,
  type ExerciseQuestion,
  type HouseholdItem 
} from "./HebrewHouseholdData";

interface Props {
  onBack: () => void;
}

type Level = "beginner" | "intermediate" | "advanced";

export default function HebrewHouseholdItemsPractice({ onBack }: Props) {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showVocabulary, setShowVocabulary] = useState(false);

  const getQuestionsForLevel = (level: Level): ExerciseQuestion[] => {
    switch (level) {
      case "beginner": return beginnerQuestions;
      case "intermediate": return intermediateQuestions;
      case "advanced": return advancedQuestions;
      default: return [];
    }
  };

  const currentQuestions = currentLevel ? getQuestionsForLevel(currentLevel) : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore({ correct, total: currentQuestions.length });
  };

  const resetLevel = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore({ correct: 0, total: 0 });
  };

  const getLevelTitle = (level: Level) => {
    switch (level) {
      case "beginner": return { hebrew: "רמת מתחילים", english: "Beginner Level" };
      case "intermediate": return { hebrew: "רמת ביניים", english: "Intermediate Level" };
      case "advanced": return { hebrew: "רמת מתקדמים", english: "Advanced Level" };
    }
  };

  const getLevelColor = (level: Level) => {
    switch (level) {
      case "beginner": return "bg-green-500 hover:bg-green-600";
      case "intermediate": return "bg-blue-500 hover:bg-blue-600";
      case "advanced": return "bg-purple-500 hover:bg-purple-600";
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (showVocabulary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={() => setShowVocabulary(false)}>
              ⬅ חזרה לתרגילים
            </Button>
            <h1 className="text-2xl font-bold text-center">
              אוצר מילים - כלי בית
              <br />
              <span className="text-lg text-gray-600">Household Items Vocabulary</span>
            </h1>
          </div>

          <div className="space-y-6">
            {Object.entries(categoryNames).map(([categoryKey, categoryName]) => {
              const categoryItems = householdItems.filter(item => item.category === categoryKey);
              
              return (
                <Card key={categoryKey}>
                  <CardHeader>
                    <CardTitle className="text-center" dir="rtl">
                      {categoryName.hebrew}
                      <br />
                      <span className="text-sm text-gray-600">{categoryName.english}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryItems.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="text-center">
                            <div className="text-xl font-bold mb-2" dir="rtl">{item.hebrew}</div>
                            <div className="text-sm text-gray-600 mb-1">{item.transliteration}</div>
                            <div className="text-sm font-medium">{item.english}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                תוצאות התרגיל
                <br />
                <span className="text-lg text-gray-600">Exercise Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-4xl font-bold mb-4">
                <span className={getScoreColor(percentage)}>{percentage}%</span>
              </div>
              
              <div className="text-xl">
                <span className="font-bold">{score.correct}</span> מתוך <span className="font-bold">{score.total}</span> תשובות נכונות
                <br />
                <span className="text-gray-600">{score.correct} out of {score.total} correct answers</span>
              </div>

              <Progress value={percentage} className="w-full h-4" />

              <div className="space-y-4 mt-6">
                <Button onClick={resetLevel} className="w-full bg-blue-500 hover:bg-blue-600">
                  נסה שוב - Try Again
                </Button>
                <Button onClick={() => setCurrentLevel(null)} variant="outline" className="w-full">
                  בחר רמה אחרת - Choose Different Level
                </Button>
                <Button onClick={onBack} variant="ghost" className="w-full">
                  חזרה לתפריט הראשי - Back to Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentLevel && currentQuestion) {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={() => setCurrentLevel(null)}>
              ⬅ חזרה לרמות
            </Button>
            <div className="text-center">
              <div className="text-lg font-bold">
                {getLevelTitle(currentLevel).hebrew}
              </div>
              <div className="text-sm text-gray-600">
                {getLevelTitle(currentLevel).english}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {currentQuestions.length}
            </div>
          </div>

          <Progress value={progress} className="w-full h-3 mb-6" />

          <Card>
            <CardHeader>
              <CardTitle className="text-center" dir="rtl">
                {currentQuestion.question}
                {currentQuestion.questionEn && (
                  <>
                    <br />
                    <span className="text-lg text-gray-600">{currentQuestion.questionEn}</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`w-full p-4 text-lg ${
                    selectedAnswer === option ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  dir="rtl"
                >
                  {option}
                </Button>
              ))}

              {selectedAnswer && (
                <div className="mt-6 space-y-4">
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    <div className="font-bold mb-2">
                      {selectedAnswer === currentQuestion.correctAnswer ? "✅ נכון!" : "❌ לא נכון"}
                    </div>
                    <div dir="rtl">{currentQuestion.explanation}</div>
                  </div>

                  <Button onClick={handleNext} className="w-full bg-green-500 hover:bg-green-600">
                    {currentQuestionIndex < currentQuestions.length - 1 ? "השאלה הבאה - Next Question" : "סיים - Finish"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onBack}>
            ⬅ חזרה לתפריט הראשי
          </Button>
          <Button variant="outline" onClick={() => setShowVocabulary(true)}>
            📚 אוצר מילים - Vocabulary
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2" dir="rtl">
            תרגול כלי בית בעברית
          </h1>
          <p className="text-lg text-gray-600">Hebrew Household Items Practice</p>
          <p className="text-sm text-gray-500 mt-2" dir="rtl">
            בחר רמת קושי להתחלת התרגיל
          </p>
          <p className="text-sm text-gray-500">Choose difficulty level to start practicing</p>
        </div>

        <div className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentLevel("beginner")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right" dir="rtl">
                  <h3 className="text-xl font-bold text-green-600">רמת מתחילים</h3>
                  <p className="text-gray-600">Beginner Level</p>
                  <p className="text-sm text-gray-500 mt-2">זיהוי בסיסי של מילים ותרגום פשוט</p>
                  <p className="text-sm text-gray-500">Basic word recognition and simple translation</p>
                </div>
                <div className="text-3xl">🟢</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentLevel("intermediate")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right" dir="rtl">
                  <h3 className="text-xl font-bold text-blue-600">רמת ביניים</h3>
                  <p className="text-gray-600">Intermediate Level</p>
                  <p className="text-sm text-gray-500 mt-2">השלמת משפטים ותרגילי הקשר</p>
                  <p className="text-sm text-gray-500">Sentence completion and context exercises</p>
                </div>
                <div className="text-3xl">🔵</div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentLevel("advanced")}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right" dir="rtl">
                  <h3 className="text-xl font-bold text-purple-600">רמת מתקדמים</h3>
                  <p className="text-gray-600">Advanced Level</p>
                  <p className="text-sm text-gray-500 mt-2">דיאלוגים, סיווג וחשיבה ביקורתית</p>
                  <p className="text-sm text-gray-500">Dialogues, categorization and critical thinking</p>
                </div>
                <div className="text-3xl">🟣</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border">
          <h3 className="font-bold text-center mb-3" dir="rtl">קטגוריות המילים - Word Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {Object.values(categoryNames).map((category, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium" dir="rtl">{category.hebrew}</div>
                <div className="text-gray-600">{category.english}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
