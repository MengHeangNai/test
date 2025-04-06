// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Timer } from "lucide-react";
import { CustomSelect, CustomSelectItem } from "@/components/general/CustomSelect";

const GRID_SIZE = 10;
const WORD_DIRECTIONS = ["horizontal", "vertical", "diagonal"];
const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];

type Position = {
    row: number;
    col: number;
};

type SelectedCell = Position & {
    letter: string;
};

const WordSearchGame = () => {
    const [grid, setGrid] = useState<string[][]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
    const [startPos, setStartPos] = useState<Position | null>(null);
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [timer, setTimer] = useState<number>(0);
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false);

    // Sample word lists by difficulty
    const wordLists = {
        easy: ["CAT", "DOG", "SUN", "FUN", "HAT", "RUN"],
        medium: ["APPLE", "BEACH", "CLOUD", "DREAM", "EARTH", "FRUIT"],
        hard: ["PROGRAM", "NEXTJS", "PUZZLE", "TYPESCRIPT", "SHADOW", "COMPONENT"]
    };

    useEffect(() => {
        if (gameActive && !gameWon) {
            const interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameActive, gameWon]);

    // Initialize new game
    const initializeGame = () => {
        const currentWords = wordLists[difficulty as keyof typeof wordLists].slice(0, 5);
        const newGrid = createGrid(currentWords);

        setGrid(newGrid);
        setWords(currentWords);
        setFoundWords([]);
        setSelectedCells([]);
        setStartPos(null);
        setTimer(0);
        setGameActive(true);
        setGameWon(false);
    };

    // Create grid with placed words
    const createGrid = (wordsToPlace: string[]): string[][] => {
        // Initialize empty grid
        const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() =>
            Array(GRID_SIZE).fill(""));

        // Place words
        wordsToPlace.forEach(word => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 100) {
                attempts++;
                const direction = WORD_DIRECTIONS[Math.floor(Math.random() * WORD_DIRECTIONS.length)];

                // Random starting position
                const row = Math.floor(Math.random() * GRID_SIZE);
                const col = Math.floor(Math.random() * GRID_SIZE);

                if (canPlaceWord(newGrid, word, row, col, direction)) {
                    placeWord(newGrid, word, row, col, direction);
                    placed = true;
                }
            }
        });

        // Fill in remaining cells with random letters
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (newGrid[i][j] === "") {
                    newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }

        return newGrid;
    };

    // Check if word can be placed
    const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: string): boolean => {
        const wordLength = word.length;

        if (direction === "horizontal") {
            if (col + wordLength > GRID_SIZE) return false;

            for (let i = 0; i < wordLength; i++) {
                if (grid[row][col + i] !== "" && grid[row][col + i] !== word[i]) {
                    return false;
                }
            }
        } else if (direction === "vertical") {
            if (row + wordLength > GRID_SIZE) return false;

            for (let i = 0; i < wordLength; i++) {
                if (grid[row + i][col] !== "" && grid[row + i][col] !== word[i]) {
                    return false;
                }
            }
        } else if (direction === "diagonal") {
            if (row + wordLength > GRID_SIZE || col + wordLength > GRID_SIZE) return false;

            for (let i = 0; i < wordLength; i++) {
                if (grid[row + i][col + i] !== "" && grid[row + i][col + i] !== word[i]) {
                    return false;
                }
            }
        }

        return true;
    };

    // Place word in grid
    const placeWord = (grid: string[][], word: string, row: number, col: number, direction: string): void => {
        const wordLength = word.length;

        if (direction === "horizontal") {
            for (let i = 0; i < wordLength; i++) {
                grid[row][col + i] = word[i];
            }
        } else if (direction === "vertical") {
            for (let i = 0; i < wordLength; i++) {
                grid[row + i][col] = word[i];
            }
        } else if (direction === "diagonal") {
            for (let i = 0; i < wordLength; i++) {
                grid[row + i][col + i] = word[i];
            }
        }
    };

    // Handle cell selection
    const handleCellClick = (row: number, col: number) => {
        if (!gameActive || gameWon) return;

        if (!startPos) {
            // First cell selection
            setStartPos({ row, col });
            setSelectedCells([{ row, col, letter: grid[row][col] }]);
        } else {
            // Line selection logic
            const linePositions = getLinePositions(startPos, { row, col });
            const selectedWordCells = linePositions.map(pos => ({
                row: pos.row,
                col: pos.col,
                letter: grid[pos.row][pos.col]
            }));

            setSelectedCells(selectedWordCells);

            // Check if a word is formed
            const selectedWord = selectedWordCells.map(cell => cell.letter).join("");
            const reversedWord = selectedWord.split("").reverse().join("");

            if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
                const newFoundWords = [...foundWords, selectedWord];
                setFoundWords(newFoundWords);
                if (newFoundWords.length === words.length) {
                    setGameWon(true);
                    setGameActive(false);
                }
            } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
                const newFoundWords = [...foundWords, reversedWord];
                setFoundWords(newFoundWords);
                if (newFoundWords.length === words.length) {
                    setGameWon(true);
                    setGameActive(false);
                }
            }

            // Reset selection
            setStartPos(null);
            setSelectedCells([]);
        }
    };

    // Get positions between two cells in a straight line
    const getLinePositions = (start: Position, end: Position): Position[] => {
        const positions: Position[] = [];

        // Horizontal
        if (start.row === end.row) {
            const startCol = Math.min(start.col, end.col);
            const endCol = Math.max(start.col, end.col);

            for (let col = startCol; col <= endCol; col++) {
                positions.push({ row: start.row, col });
            }
        }
        // Vertical
        else if (start.col === end.col) {
            const startRow = Math.min(start.row, end.row);
            const endRow = Math.max(start.row, end.row);

            for (let row = startRow; row <= endRow; row++) {
                positions.push({ row, col: start.col });
            }
        }
        // Diagonal
        else if (Math.abs(end.row - start.row) === Math.abs(end.col - start.col)) {
            const rowStep = end.row > start.row ? 1 : -1;
            const colStep = end.col > start.col ? 1 : -1;
            const steps = Math.abs(end.row - start.row);

            for (let i = 0; i <= steps; i++) {
                positions.push({
                    row: start.row + i * rowStep,
                    col: start.col + i * colStep
                });
            }
        }

        return positions;
    };

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Check if a cell is currently selected
    const isCellSelected = (row: number, col: number): boolean => {
        return selectedCells.some(cell => cell.row === row && cell.col === col);
    };

    // Check if a cell is part of a found word
    const isCellInFoundWord = (row: number, col: number): boolean => {
        for (const word of foundWords) {
            // Check horizontal
            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c <= GRID_SIZE - word.length; c++) {
                    let found = true;
                    for (let i = 0; i < word.length; i++) {
                        if (grid[r][c + i] !== word[i]) {
                            found = false;
                            break;
                        }
                    }
                    if (found && r === row && c <= col && col < c + word.length) {
                        return true;
                    }
                }
            }

            // Check vertical
            for (let r = 0; r <= GRID_SIZE - word.length; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    let found = true;
                    for (let i = 0; i < word.length; i++) {
                        if (grid[r + i][c] !== word[i]) {
                            found = false;
                            break;
                        }
                    }
                    if (found && c === col && r <= row && row < r + word.length) {
                        return true;
                    }
                }
            }

            // Check diagonal
            for (let r = 0; r <= GRID_SIZE - word.length; r++) {
                for (let c = 0; c <= GRID_SIZE - word.length; c++) {
                    let found = true;
                    for (let i = 0; i < word.length; i++) {
                        if (grid[r + i][c + i] !== word[i]) {
                            found = false;
                            break;
                        }
                    }
                    if (found && r <= row && row < r + word.length && c <= col && col < c + word.length && row - r === col - c) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    return (
        <div className="container max-w-4xl mx-auto py-8">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Word Search Puzzle</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center gap-2">
                            <CustomSelect
                                className="w-32"
                                value={difficulty}
                                onValueChange={(value) => setDifficulty(value)}
                            >
                                {DIFFICULTY_LEVELS.map((level) => (
                                    <CustomSelectItem key={level} value={level}>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </CustomSelectItem>
                                ))}
                            </CustomSelect>
                            <Button onClick={initializeGame} disabled={gameActive && !gameWon}>
                                {gameActive ? "Restart" : "Start Game"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Timer className="h-5 w-5" />
                            <span className="text-lg font-mono">{formatTime(timer)}</span>
                        </div>
                    </div>

                    {gameActive && (
                        <>
                            <div className="grid grid-cols-10 gap-1 mb-6 max-w-md mx-auto">
                                {grid.map((row, rowIndex) =>
                                    row.map((letter, colIndex) => (
                                        <Button
                                            key={`${rowIndex}-${colIndex}`}
                                            variant={
                                                isCellSelected(rowIndex, colIndex)
                                                    ? "default"
                                                    : isCellInFoundWord(rowIndex, colIndex)
                                                        ? "secondary"
                                                        : "outline"
                                            }
                                            className="w-8 h-8 p-0 font-bold"
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                        >
                                            {letter}
                                        </Button>
                                    ))
                                )}
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Words to Find:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {words.map((word) => (
                                        <Badge
                                            key={word}
                                            variant={foundWords.includes(word) ? "default" : "outline"}
                                        >
                                            {word}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {gameWon && (
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-bold text-green-600 mb-2">
                                Congratulations!
                            </h2>
                            <p className="mb-4">
                                You found all the words in {formatTime(timer)}!
                            </p>
                            <Button onClick={initializeGame}>Play Again</Button>
                        </div>
                    )}

                    {!gameActive && !gameWon && (
                        <div className="text-center py-8">
                            <h2 className="text-xl mb-4">How to Play:</h2>
                            <p className="mb-2">
                                1. Select a difficulty and click Start Game
                            </p>
                            <p className="mb-2">
                                2. Find the hidden words in the grid by selecting start and end cells
                            </p>
                            <p className="mb-4">
                                3. Words can be placed horizontally, vertically, or diagonally
                            </p>
                            <Button onClick={initializeGame}>Start Game</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default WordSearchGame;