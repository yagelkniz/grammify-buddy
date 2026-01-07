import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { easyVerbs, mediumVerbs, hardVerbs, type VerbPair } from "./verbMemoryGameData";

type Level = "easy" | "medium" | "hard";

interface Card {
  id: number;
  content: string;
  type: "hebrew" | "english";
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface VerbMemoryGameProps {
  onBack: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function VerbMemoryGame({ onBack }: VerbMemoryGameProps) {
  const [level, setLevel] = useState<Level | null>(null);
  const [showNikud, setShowNikud] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const getVerbs = (lvl: Level): VerbPair[] => {
    switch (lvl) {
      case "easy": return easyVerbs.slice(0, 6);
      case "medium": return mediumVerbs.slice(0, 8);
      case "hard": return hardVerbs.slice(0, 10);
      default: return [];
    }
  };

  const initializeGame = (lvl: Level) => {
    const verbs = getVerbs(lvl);
    const gameCards: Card[] = [];
    
    verbs.forEach((verb, index) => {
      gameCards.push({
        id: index * 2,
        content: showNikud ? verb.hebrewWithNikud : verb.hebrew,
        type: "hebrew",
        pairId: index,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        content: verb.english,
        type: "english",
        pairId: index,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
  };

  useEffect(() => {
    if (level) {
      initializeGame(level);
    }
  }, [level, showNikud]);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
          ));
          setMatches(m => m + 1);
          setFlippedCards([]);
          setIsChecking(false);
          
          const totalPairs = getVerbs(level!).length;
          if (matches + 1 === totalPairs) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    if (level) {
      initializeGame(level);
    }
  };

  const getLevelName = () => {
    switch (level) {
      case "easy": return "קל";
      case "medium": return "בינוני";
      case "hard": return "קשה";
      default: return "";
    }
  };

  const getTotalPairs = () => {
    if (!level) return 0;
    return getVerbs(level).length;
  };

  // Level selection
  if (!level) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה
          </Button>
          <h1 className="text-2xl font-bold text-primary">משחק זיכרון - שמות פועל</h1>
        </div>

        <div className="mb-8 p-6 bg-muted rounded-xl text-center">
          <p className="text-lg mb-2">🧠 איך משחקים?</p>
          <p className="text-muted-foreground">
            מצא את הזוגות! התאם כל פועל בעברית לתרגום באנגלית.<br />
            לחץ על שני כרטיסים כדי להפוך אותם.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>
            עם ניקוד
          </Button>
          <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>
            בלי ניקוד
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">בחר רמה</h2>
        <div className="grid gap-4">
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-green-100 text-green-900 border-green-300 hover:bg-green-200" onClick={() => setLevel("easy")}>
            🟢 קל (6 זוגות)
          </button>
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200" onClick={() => setLevel("medium")}>
            🟡 בינוני (8 זוגות)
          </button>
          <button className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-red-100 text-red-900 border-red-300 hover:bg-red-200" onClick={() => setLevel("hard")}>
            🔴 קשה (10 זוגות)
          </button>
        </div>
      </div>
    );
  }

  // Game complete screen
  if (gameComplete) {
    const stars = moves <= getTotalPairs() * 2 ? 3 : moves <= getTotalPairs() * 3 ? 2 : 1;
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="p-8 bg-muted rounded-xl text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4">כל הכבוד!</h2>
          <div className="text-4xl mb-4">
            {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
          </div>
          <p className="text-xl mb-2">סיימת את המשחק!</p>
          <p className="text-lg text-muted-foreground mb-6">
            מצאת {getTotalPairs()} זוגות ב-{moves} מהלכים
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetGame} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              שחק שוב
            </Button>
            <Button variant="outline" onClick={() => setLevel(null)}>
              בחר רמה אחרת
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Game board
  const gridCols = level === "easy" ? "grid-cols-3" : level === "medium" ? "grid-cols-4" : "grid-cols-4";

  return (
    <div className="w-full max-w-3xl mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={() => setLevel(null)} className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4" />
          חזרה לרמות
        </Button>
        <h1 className="text-xl font-bold text-primary">
          משחק זיכרון - {getLevelName()}
        </h1>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button variant={showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(true)}>עם</Button>
          <Button variant={!showNikud ? "default" : "outline"} size="sm" onClick={() => setShowNikud(false)}>בלי</Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">מהלכים: {moves}</span>
          <span className="text-sm">זוגות: {matches}/{getTotalPairs()}</span>
          <Button variant="outline" size="sm" onClick={resetGame} className="gap-1">
            <RotateCcw className="h-3 w-3" />
            אפס
          </Button>
        </div>
      </div>

      <div className={`grid ${gridCols} gap-3`}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || isChecking}
            className={`
              aspect-square p-2 rounded-xl border-2 font-bold text-center transition-all duration-300
              flex items-center justify-center
              ${card.isMatched 
                ? "bg-green-100 border-green-400 text-green-800" 
                : card.isFlipped 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted border-border hover:border-primary/50 hover:bg-accent cursor-pointer"
              }
              ${card.type === "hebrew" ? "text-xl" : "text-sm"}
            `}
          >
            {card.isFlipped || card.isMatched ? (
              <span className={card.type === "hebrew" ? "text-lg md:text-xl" : "text-xs md:text-sm"}>
                {card.content}
              </span>
            ) : (
              <span className="text-3xl">❓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
