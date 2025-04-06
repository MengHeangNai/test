// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import {
    Timer,
    CheckCircle,
    Undo,
    Lightbulb,
    Pencil,
    Check,
    AlertTriangle
} from "lucide-react";
import { CustomSelect, CustomSelectItem } from "@/components/general/CustomSelect";

type Cell = {
    value: number | null;
    isGiven: boolean;
    notes: number[];
    isValid: boolean;
    isHighlighted: boolean;
};

type Difficulty = "easy" | "medium" | "hard";

const SudokuGame = () => {
    // Game state
    const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid());
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [noteMode, setNoteMode] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [timer, setTimer] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [hintsUsed, setHintsUsed] = useState<number>(0);
    const [gameCompletedDialog, setGameCompletedDialog] = useState<boolean>(false);
    const [moveHistory, setMoveHistory] = useState<{ row: number, col: number, prevValue: number | null, prevNotes: number[] }[]>([]);
    const [errorCheck, setErrorCheck] = useState<boolean>(false);

    // Initialize empty 9x9 grid
    function createEmptyGrid(): Cell[][] {
        return Array(9).fill(null).map(() =>
            Array(9).fill(null).map(() => ({
                value: null,
                isGiven: false,
                notes: [],
                isValid: true,
                isHighlighted: false
            }))
        );
    }

    // Timer effect
    useEffect(() => {
        if (gameStarted && !gameCompleted) {
            const interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameCompleted]);

    // Generate a new Sudoku puzzle
    const generateSudoku = () => {
        // Reset game state
        setGrid(createEmptyGrid());
        setSelectedCell(null);
        setTimer(0);
        setHintsUsed(0);
        setMoveHistory([]);
        setGameWon(false);
        setGameCompleted(false);

        // Create a solution grid
        const solution = createSolution();

        // Create puzzle by removing cells based on difficulty
        const removeCounts = {
            easy: 35,
            medium: 45,
            hard: 55
        };

        const puzzle = createPuzzleFromSolution(solution, removeCounts[difficulty]);
        setGrid(puzzle);
        setGameStarted(true);
    };

    // Create a valid Sudoku solution
    const createSolution = (): number[][] => {
        // Define a completely empty grid
        const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));

        // Fill the grid using backtracking
        if (solveSudoku(grid)) {
            return grid;
        }

        // Fallback to a predefined valid grid if solving fails
        return [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];
    };

    // Solve Sudoku using backtracking algorithm
    const solveSudoku = (grid: number[][]): boolean => {
        // Find an empty cell
        let emptyCell: [number, number] | null = null;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    emptyCell = [row, col];
                    break;
                }
            }
            if (emptyCell) break;
        }

        // If no empty cell found, the puzzle is solved
        if (!emptyCell) return true;

        const [row, col] = emptyCell;

        // Try placing digits 1-9
        // Shuffle the digits for randomness
        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

        for (const digit of digits) {
            // Check if placing digit is valid
            if (isValidPlacement(grid, row, col, digit)) {
                grid[row][col] = digit;

                // Recursively try to solve the rest
                if (solveSudoku(grid)) {
                    return true;
                }

                // If not successful, backtrack
                grid[row][col] = 0;
            }
        }

        return false;
    };

    // Check if placing a digit at (row, col) is valid
    const isValidPlacement = (grid: number[][], row: number, col: number, digit: number): boolean => {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (grid[row][c] === digit) return false;
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (grid[r][col] === digit) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[boxRow + r][boxCol + c] === digit) return false;
            }
        }

        return true;
    };

    // Create puzzle by removing cells from solution
    const createPuzzleFromSolution = (solution: number[][], cellsToRemove: number): Cell[][] => {
        // Create a deep copy of the solution
        const puzzle: Cell[][] = solution.map(row =>
            row.map(val => ({
                value: val,
                isGiven: true,
                notes: [],
                isValid: true,
                isHighlighted: false
            }))
        );

        // Generate list of all positions
        const positions: [number, number][] = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                positions.push([r, c]);
            }
        }

        // Shuffle positions
        positions.sort(() => Math.random() - 0.5);

        // Remove cells
        let removed = 0;
        for (const [row, col] of positions) {
            if (removed >= cellsToRemove) break;

            const temp = puzzle[row][col].value;
            puzzle[row][col].value = null;
            puzzle[row][col].isGiven = false;

            // Ensure puzzle still has a unique solution
            // For simplicity, we'll just make sure it's solvable
            // In a real implementation, you would check for uniqueness

            removed++;
        }

        return puzzle;
    };

    // Handle cell selection
    const handleCellSelect = (row: number, col: number) => {
        if (!gameStarted || gameCompleted) return;

        // Deselect if already selected
        if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
            setSelectedCell(null);
            return;
        }

        setSelectedCell([row, col]);

        // Highlight related cells (same row, column, and 3x3 box)
        const newGrid = [...grid];

        // Clear previous highlights
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                newGrid[r][c].isHighlighted = false;
            }
        }

        // Set new highlights
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                // Same row, column, or box
                if (r === row || c === col ||
                    (r >= boxRow && r < boxRow + 3 && c >= boxCol && c < boxCol + 3)) {
                    newGrid[r][c].isHighlighted = true;
                }

                // Same value (if not empty)
                if (newGrid[row][col].value && newGrid[r][c].value === newGrid[row][col].value) {
                    newGrid[r][c].isHighlighted = true;
                }
            }
        }

        setGrid(newGrid);
    };

    // Handle number input
    const handleNumberInput = (num: number) => {
        if (!selectedCell || !gameStarted || gameCompleted) return;

        const [row, col] = selectedCell;
        if (grid[row][col].isGiven) return;

        const newGrid = [...grid];

        // Save for undo
        setMoveHistory([...moveHistory, {
            row,
            col,
            prevValue: newGrid[row][col].value,
            prevNotes: [...newGrid[row][col].notes]
        }]);

        if (noteMode) {
            // Toggle note
            const notes = [...newGrid[row][col].notes];
            const noteIndex = notes.indexOf(num);

            if (noteIndex >= 0) {
                notes.splice(noteIndex, 1);
            } else {
                notes.push(num);
            }

            newGrid[row][col].notes = notes;
        } else {
            // Set cell value
            newGrid[row][col].value = num;
            newGrid[row][col].notes = [];

            // Check validity if error checking is enabled
            if (errorCheck) {
                updateGridValidity(newGrid);
            }
        }

        setGrid(newGrid);

        // Check if puzzle is completed
        checkCompletion(newGrid);
    };

    // Handle cell clearing
    const handleClear = () => {
        if (!selectedCell || !gameStarted || gameCompleted) return;

        const [row, col] = selectedCell;
        if (grid[row][col].isGiven) return;

        const newGrid = [...grid];

        // Save for undo
        setMoveHistory([...moveHistory, {
            row,
            col,
            prevValue: newGrid[row][col].value,
            prevNotes: [...newGrid[row][col].notes]
        }]);

        newGrid[row][col].value = null;
        newGrid[row][col].notes = [];

        if (errorCheck) {
            updateGridValidity(newGrid);
        }

        setGrid(newGrid);
    };

    // Handle undo
    const handleUndo = () => {
        if (moveHistory.length === 0 || !gameStarted || gameCompleted) return;

        const lastMove = moveHistory[moveHistory.length - 1];
        const newGrid = [...grid];

        newGrid[lastMove.row][lastMove.col].value = lastMove.prevValue;
        newGrid[lastMove.row][lastMove.col].notes = lastMove.prevNotes;

        if (errorCheck) {
            updateGridValidity(newGrid);
        }

        setGrid(newGrid);
        setMoveHistory(moveHistory.slice(0, -1));
    };

    // Handle hint
    const handleHint = () => {
        if (!selectedCell || !gameStarted || gameCompleted) return;

        const [row, col] = selectedCell;
        if (grid[row][col].isGiven || grid[row][col].value !== null) return;

        // Find the correct value for this cell
        // In a real implementation, you'd have the solution grid saved
        const solution = getSolution(grid);
        if (!solution) return;

        const correctValue = solution[row][col];

        const newGrid = [...grid];
        newGrid[row][col].value = correctValue;
        newGrid[row][col].notes = [];
        newGrid[row][col].isGiven = true;

        setGrid(newGrid);
        setHintsUsed(hintsUsed + 1);

        checkCompletion(newGrid);
    };

    // Get solution for current grid state
    const getSolution = (currentGrid: Cell[][]): number[][] | null => {
        // Convert Cell[][] to number[][] for solving
        const numGrid: number[][] = currentGrid.map(row =>
            row.map(cell => cell.value || 0)
        );

        // Create a copy to solve
        const solutionGrid = numGrid.map(row => [...row]);

        // Solve the grid
        if (solveSudoku(solutionGrid)) {
            return solutionGrid;
        }

        return null;
    };

    // Update grid validity
    const updateGridValidity = (grid: Cell[][]) => {
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen: Record<number, boolean> = {};
            for (let col = 0; col < 9; col++) {
                const value = grid[row][col].value;
                if (value) {
                    if (seen[value]) {
                        // Mark both as invalid
                        for (let c = 0; c < 9; c++) {
                            if (grid[row][c].value === value) {
                                grid[row][c].isValid = false;
                            }
                        }
                    }
                    seen[value] = true;
                }
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen: Record<number, boolean> = {};
            for (let row = 0; row < 9; row++) {
                const value = grid[row][col].value;
                if (value) {
                    if (seen[value]) {
                        // Mark both as invalid
                        for (let r = 0; r < 9; r++) {
                            if (grid[r][col].value === value) {
                                grid[r][col].isValid = false;
                            }
                        }
                    }
                    seen[value] = true;
                }
            }
        }

        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen: Record<number, boolean> = {};
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        const row = boxRow * 3 + r;
                        const col = boxCol * 3 + c;
                        const value = grid[row][col].value;
                        if (value) {
                            if (seen[value]) {
                                // Mark as invalid
                                for (let r2 = 0; r2 < 3; r2++) {
                                    for (let c2 = 0; c2 < 3; c2++) {
                                        const row2 = boxRow * 3 + r2;
                                        const col2 = boxCol * 3 + c2;
                                        if (grid[row2][col2].value === value) {
                                            grid[row2][col2].isValid = false;
                                        }
                                    }
                                }
                            }
                            seen[value] = true;
                        }
                    }
                }
            }
        }
    };

    // Check if the puzzle is completed
    const checkCompletion = (currentGrid: Cell[][]) => {
        // Check if all cells are filled
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (currentGrid[row][col].value === null) {
                    return;
                }
            }
        }

        // Check if solution is valid
        const isValid = validateSolution(currentGrid);

        setGameCompleted(true);
        setGameWon(isValid);
        setGameCompletedDialog(true);
    };

    // Validate the completed solution
    const validateSolution = (currentGrid: Cell[][]): boolean => {
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen = new Set<number>();
            for (let col = 0; col < 9; col++) {
                const value = currentGrid[row][col].value;
                if (!value || seen.has(value)) return false;
                seen.add(value);
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen = new Set<number>();
            for (let row = 0; row < 9; row++) {
                const value = currentGrid[row][col].value;
                if (!value || seen.has(value)) return false;
                seen.add(value);
            }
        }

        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen = new Set<number>();
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        const row = boxRow * 3 + r;
                        const col = boxCol * 3 + c;
                        const value = currentGrid[row][col].value;
                        if (!value || seen.has(value)) return false;
                        seen.add(value);
                    }
                }
            }
        }

        return true;
    };

    // Toggle error checking
    const toggleErrorCheck = () => {
        const newValue = !errorCheck;
        setErrorCheck(newValue);

        if (newValue) {
            const newGrid = [...grid];
            // Reset validity
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    newGrid[row][col].isValid = true;
                }
            }
            updateGridValidity(newGrid);
            setGrid(newGrid);
        } else {
            // Reset all cells to valid
            const newGrid = [...grid];
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    newGrid[row][col].isValid = true;
                }
            }
            setGrid(newGrid);
        }
    };

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Get cell color based on state
    const getCellColor = (cell: Cell, isSelected: boolean): string => {
        if (!cell.isValid && errorCheck) return "bg-red-100";
        if (isSelected) return "bg-blue-200";
        if (cell.isHighlighted) return "bg-blue-50";
        if (cell.isGiven) return "bg-gray-100";
        return "bg-white";
    };

    return (
        <div className="container max-w-4xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Sudoku</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
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
                            <Button onClick={generateSudoku}>
                                {gameStarted ? "New Game" : "Start Game"}
                            </Button>
                        </div>

                        {gameStarted && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Timer className="h-5 w-5" />
                                    <span className="text-lg font-mono">{formatTime(timer)}</span>
                                </div>
                                <Toggle
                                    pressed={noteMode}
                                    onPressedChange={setNoteMode}
                                    aria-label="Toggle note mode"
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Notes
                                </Toggle>
                                <Toggle
                                    pressed={errorCheck}
                                    onPressedChange={toggleErrorCheck}
                                    aria-label="Toggle error checking"
                                >
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Check
                                </Toggle>
                            </div>
                        )}
                    </div>

                    {gameStarted && (
                        <>
                            {/* Sudoku Grid */}
                            <div className="mx-auto mb-6" style={{ width: 'fit-content' }}>
                                <div className="grid grid-cols-9 gap-px bg-gray-300 border-2 border-gray-800">
                                    {grid.map((row, rowIndex) => (
                                        row.map((cell, colIndex) => {
                                            const isSelected = selectedCell &&
                                                selectedCell[0] === rowIndex &&
                                                selectedCell[1] === colIndex;

                                            // Add border styles to separate 3x3 boxes
                                            const borderStyles = [];
                                            if (rowIndex % 3 === 0) borderStyles.push('border-t-2 border-gray-800');
                                            if (colIndex % 3 === 0) borderStyles.push('border-l-2 border-gray-800');
                                            if (rowIndex === 8) borderStyles.push('border-b-2 border-gray-800');
                                            if (colIndex === 8) borderStyles.push('border-r-2 border-gray-800');

                                            return (
                                                <div
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className={`
                            w-10 h-10 flex items-center justify-center relative
                            ${getCellColor(cell, isSelected ?? false)}
                            ${borderStyles.join(' ')}
                            cursor-pointer transition-colors
                          `}
                                                    onClick={() => handleCellSelect(rowIndex, colIndex)}
                                                >
                                                    {cell.value ? (
                                                        <span className={`
                              text-lg font-bold
                              ${cell.isGiven ? 'text-gray-700' : 'text-blue-600'}
                            `}>
                                                            {cell.value}
                                                        </span>
                                                    ) : (
                                                        <div className="grid grid-cols-3 gap-px w-full h-full p-px">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                                                <div key={num} className="flex items-center justify-center">
                                                                    {cell.notes.includes(num) && (
                                                                        <span className="text-xs text-gray-500">{num}</span>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ))}
                                </div>
                            </div>

                            {/* Number Input Buttons */}
                            <div className="flex justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                    <Button
                                        key={num}
                                        variant="outline"
                                        className="w-10 h-10 p-0"
                                        onClick={() => handleNumberInput(num)}
                                    >
                                        {num}
                                    </Button>
                                ))}
                            </div>

                            {/* Control Buttons */}
                            <div className="flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleUndo}
                                    disabled={moveHistory.length === 0}
                                >
                                    <Undo className="h-4 w-4 mr-1" />
                                    Undo
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleHint}
                                >
                                    <Lightbulb className="h-4 w-4 mr-1" />
                                    Hint
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const newGrid = [...grid];
                                        updateGridValidity(newGrid);
                                        setGrid(newGrid);
                                    }}
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Validate
                                </Button>
                            </div>
                        </>
                    )}

                    {!gameStarted && (
                        <div className="text-center py-8">
                            <h2 className="text-xl mb-4">How to Play Sudoku:</h2>
                            <p className="mb-2">1. Fill in the grid so every row, column, and 3x3 box contains digits 1-9</p>
                            <p className="mb-2">2. Each digit can only appear once in each row, column, and box</p>
                            <p className="mb-2">3. Use "Notes" mode to jot possible numbers in each cell</p>
                            <p className="mb-4">4. Use the "Check" toggle to highlight errors as you play</p>
                            <Button onClick={generateSudoku}>Start Game</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Game Completed Dialog */}
            <Dialog open={gameCompletedDialog} onOpenChange={setGameCompletedDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {gameWon ? "Congratulations!" : "Puzzle Completed"}
                        </DialogTitle>
                        <DialogDescription>
                            {gameWon
                                ? "You've successfully completed the Sudoku puzzle!"
                                : "There are some errors in your solution. Would you like to continue?"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="text-xl font-bold">{formatTime(timer)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Hints Used</p>
                            <p className="text-xl font-bold">{hintsUsed}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={generateSudoku}>New Game</Button>
                        {!gameWon && (
                            <Button variant="outline" onClick={() => setGameCompletedDialog(false)}>
                                Continue
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SudokuGame;