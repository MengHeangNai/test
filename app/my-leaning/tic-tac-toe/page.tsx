'use client'

import React from 'react'
import { useTicTacToeStore } from '@/store/tictactoe-store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Board, calculateTurns, calculateWinner } from './components/Board'
import { Separator } from '@/components/ui/separator'


function TicTacToePage() {

    const history = useTicTacToeStore((state: any) => state.history)
    const setHistory = useTicTacToeStore((state: any) => state.setHistory)
    const currentMove = useTicTacToeStore((state: any) => state.currentMove)
    const setCurrentMove = useTicTacToeStore((state: any) => state.setCurrentMove)
    const scores = useTicTacToeStore((state: any) => state.scores)
    const setScores = useTicTacToeStore((state: any) => state.setScores)
    const resetScores = useTicTacToeStore((state: any) => state.resetScores)

    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: any) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)

        // Check for winner and update scores
        const winner = calculateWinner(nextSquares)
        if (winner) {
            const newScores = { ...scores }
            if (winner === 'X') {
                newScores.x += 1
            } else if (winner === 'O') {
                newScores.o += 1
            }
            console.log('newScores :>> ', newScores);
            setScores(newScores)
        } else if (calculateTurns(nextSquares) === 0) {
            // It's a draw
            const newScores = { ...scores }
            newScores.ties += 1
            setScores(newScores)
        }
    }

    function jumpTo(nextMove: any) {
        setCurrentMove(nextMove)
    }

    function handleReset() {
        setHistory([Array(9).fill(null)])
        setCurrentMove(0)
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 flex-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Tic Tac Toe</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Scoreboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="text-center flex-1">
                                <div className="text-3xl font-bold">{scores.x}</div>
                                <div className="text-sm font-medium">Player X</div>
                            </div>
                            <Separator orientation="vertical" className="h-12" />
                            <div className="text-center flex-1">
                                <div className="text-3xl font-bold">{scores.ties}</div>
                                <div className="text-sm font-medium">Ties</div>
                            </div>
                            <Separator orientation="vertical" className="h-12" />
                            <div className="text-center flex-1">
                                <div className="text-3xl font-bold">{scores.o}</div>
                                <div className="text-sm font-medium">Player O</div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={resetScores}
                        >
                            Reset Scores
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="w-full md:w-64">
                <CardHeader>
                    <CardTitle className="text-sm">Game History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="outline"
                        className="w-full mb-4"
                        onClick={handleReset}
                    >
                        New Game
                    </Button>

                    <ScrollArea className="h-auto max-h-96">
                        <div className="space-y-2">
                            {history.map((_: any, historyIndex: number) => {
                                const description = historyIndex > 0
                                    ? `Move #${historyIndex}`
                                    : 'Game start'

                                return (
                                    <Button
                                        key={historyIndex}
                                        variant={currentMove === historyIndex ? "default" : "ghost"}
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => jumpTo(historyIndex)}
                                    >
                                        {description}
                                    </Button>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default TicTacToePage