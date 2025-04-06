// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trophy, Heart, Star, Moon, Sun, Cloud, Smile, Music, Camera, Zap, Laptop, Coffee } from "lucide-react";
import { CustomSelect, CustomSelectItem } from "@/components/general/CustomSelect";

type CardType = {
    id: number;
    icon: React.ReactNode;
    iconName: string;
    isFlipped: boolean;
    isMatched: boolean;
};

type DifficultyType = "easy" | "medium" | "hard";

const MemoryGame = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<DifficultyType>("easy");
    const [isLocked, setIsLocked] = useState<boolean>(false);

    const icons = [
        { icon: <Heart className="h-8 w-8" />, name: "heart" },
        { icon: <Star className="h-8 w-8" />, name: "star" },
        { icon: <Moon className="h-8 w-8" />, name: "moon" },
        { icon: <Sun className="h-8 w-8" />, name: "sun" },
        { icon: <Cloud className="h-8 w-8" />, name: "cloud" },
        { icon: <Smile className="h-8 w-8" />, name: "smile" },
        { icon: <Music className="h-8 w-8" />, name: "music" },
        { icon: <Camera className="h-8 w-8" />, name: "camera" },
        { icon: <Zap className="h-8 w-8" />, name: "zap" },
        { icon: <Laptop className="h-8 w-8" />, name: "laptop" },
        { icon: <Coffee className="h-8 w-8" />, name: "coffee" },
        { icon: <Trophy className="h-8 w-8" />, name: "trophy" },
    ];

    const difficultySettings = {
        easy: { pairs: 6, columns: 4 },
        medium: { pairs: 8, columns: 4 },
        hard: { pairs: 12, columns: 6 },
    };

    useEffect(() => {
        if (gameStarted && !gameCompleted) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameCompleted]);

    const initializeGame = () => {
        const pairs = difficultySettings[difficulty].pairs;
        const shuffledIcons = [...icons]
            .slice(0, pairs)
            .sort(() => Math.random() - 0.5);

        // Create pairs of cards
        const initialCards: CardType[] = [];
        shuffledIcons.forEach((icon, index) => {
            // Add two cards with the same icon
            initialCards.push({
                id: index * 2,
                icon: icon.icon,
                iconName: icon.name,
                isFlipped: false,
                isMatched: false,
            });
            initialCards.push({
                id: index * 2 + 1,
                icon: icon.icon,
                iconName: icon.name,
                isFlipped: false,
                isMatched: false,
            });
        });

        // Shuffle the cards
        const shuffledCards = initialCards.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedPairs(0);
        setMoves(0);
        setTimer(0);
        setGameStarted(true);
        setGameCompleted(false);
        setIsLocked(false);
    };

    const handleCardClick = (id: number) => {
        if (isLocked) return;
        if (flippedCards.length === 2) return;

        // Prevent clicking on already matched or flipped cards
        const clickedCard = cards.find(card => card.id === id);
        if (!clickedCard || clickedCard.isMatched || flippedCards.includes(id)) return;

        // Flip the card
        const newCards = cards.map(card =>
            card.id === id ? { ...card, isFlipped: true } : card
        );

        const newFlippedCards = [...flippedCards, id];

        setCards(newCards);
        setFlippedCards(newFlippedCards);

        // Check for match if two cards are flipped
        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            const [firstId, secondId] = newFlippedCards;
            const firstCard = newCards.find(card => card.id === firstId);
            const secondCard = newCards.find(card => card.id === secondId);

            if (firstCard && secondCard && firstCard.iconName === secondCard.iconName) {
                // Match found
                setTimeout(() => {
                    const matchedCards = newCards.map(card =>
                        card.id === firstId || card.id === secondId
                            ? { ...card, isMatched: true }
                            : card
                    );

                    setCards(matchedCards);
                    setFlippedCards([]);
                    setMatchedPairs(matchedPairs + 1);

                    // Check if all pairs are matched
                    if (matchedPairs + 1 === difficultySettings[difficulty].pairs) {
                        setGameCompleted(true);
                        setGameStarted(false);
                    }
                }, 500);
            } else {
                // No match, flip cards back
                setIsLocked(true);
                setTimeout(() => {
                    const resetCards = newCards.map(card =>
                        card.id === firstId || card.id === secondId
                            ? { ...card, isFlipped: false }
                            : card
                    );

                    setCards(resetCards);
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Memory Match Game</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full mb-8 gap-4">
                        <div className="flex items-center gap-2">
                            <CustomSelect
                                value={difficulty}
                                className="w-32"
                                onValueChange={(value: any) => setDifficulty(value)}
                            >
                                <CustomSelectItem value="easy">Easy</CustomSelectItem>
                                <CustomSelectItem value="medium">Medium</CustomSelectItem>
                                <CustomSelectItem value="hard">Hard</CustomSelectItem>
                            </CustomSelect>
                            <Button onClick={initializeGame}>
                                {gameStarted ? "Restart" : "Start Game"}
                            </Button>
                        </div>

                        {gameStarted && (
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Moves</p>
                                    <p className="text-xl font-bold">{moves}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Time</p>
                                    <p className="text-xl font-bold font-mono">{formatTime(timer)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Pairs</p>
                                    <p className="text-xl font-bold">{matchedPairs}/{difficultySettings[difficulty].pairs}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {gameStarted && (
                        <div
                            className={`grid gap-4 w-full max-w-xl mx-auto`}
                            style={{
                                gridTemplateColumns: `repeat(${difficultySettings[difficulty].columns}, 1fr)`
                            }}
                        >
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className={`
                    cursor-pointer aspect-square flex items-center justify-center
                    transition-all duration-300 transform
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                    ${card.isMatched ? 'opacity-70' : ''}
                  `}
                                    onClick={() => handleCardClick(card.id)}
                                >
                                    <div className={`
                    w-full h-full relative transform-style-preserve-3d transition-transform duration-500
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                  `}>
                                        {/* Card Back */}
                                        <div className={`
                      absolute w-full h-full bg-primary-foreground rounded-lg border-2 border-primary
                      flex items-center justify-center backface-hidden
                      ${card.isFlipped || card.isMatched ? 'invisible' : ''}
                    `}>
                                            <span className="text-3xl">?</span>
                                        </div>

                                        {/* Card Front */}
                                        <div className={`
                      absolute w-full h-full  rounded-lg border-2 border-primary
                      flex items-center justify-center transform rotate-y-180 
                      ${!card.isFlipped && !card.isMatched ? 'invisible' : ''}
                    `}>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!gameStarted && !gameCompleted && (
                        <div className="text-center py-8">
                            <h2 className="text-xl mb-4">How to Play:</h2>
                            <p className="mb-2">1. Select a difficulty and click Start</p>
                            <p className="mb-2">2. Click on cards to flip them</p>
                            <p className="mb-2">3. Find all matching pairs</p>
                            <p className="mb-4">4. Try to complete with the fewest moves!</p>
                            <Button onClick={initializeGame}>Start Game</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={gameCompleted} onOpenChange={setGameCompleted}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                        <DialogDescription>
                            You completed the game!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="text-xl font-bold">{formatTime(timer)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Moves</p>
                            <p className="text-xl font-bold">{moves}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={initializeGame}>Play Again</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MemoryGame;