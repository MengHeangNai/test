import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    highlight?: boolean;
}

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (squares: string[]) => void;
}


export function Board({ xIsNext, squares, onPlay }: BoardProps) {
    const winner = calculateWinner(squares)
    const turns = calculateTurns(squares)
    const player = xIsNext ? 'X' : 'O'
    const status = calculateStatus(winner, turns, player)

    // Get winning line if there is a winner
    const winLine = getWinningLine(squares)

    function handleClick(i: number) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        onPlay(nextSquares)
    }

    const renderSquare = (i: number) => {
        const isWinningSquare = winLine?.includes(i) || false
        return (
            <Square
                key={`square-${i}`}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                highlight={isWinningSquare}
            />
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Badge variant={winner ? "destructive" : "outline"} className="text-lg p-2">
                    {status}
                </Badge>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-max border border-border rounded-md p-1 shadow-md">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
            </div>
        </div>
    )
}

function Square({ value, onSquareClick, highlight = false }: SquareProps) {
    return (
        <Button
            variant={highlight ? "default" : "outline"}
            className={`h-16 w-16 text-2xl font-bold rounded-none ${highlight ? 'bg-green-500 hover:bg-green-600' : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </Button>
    )
}




export function calculateWinner(squares: string[]): string | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

function getWinningLine(squares: string[]): number[] | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i]
        }
    }

    return null
}

export function calculateTurns(squares: string[]): number {
    return squares.filter((square: string) => !square).length
}

function calculateStatus(winner: string | null, turns: number, player: string): string {
    if (!winner && !turns) return 'Ties!'
    if (winner) return `Winner: ${winner}`
    return `Next: ${player}`
}