import Link from "next/link";

export default function MyLeaningPage() {
    return (
        <div className="w-full max-w-md mx-auto">

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/qr-generate'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    QR Code Generator
                </Link>
            </div>

            {/* <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/mrz-generate'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    MRZ Code Generator
                </Link>
            </div> */}

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4 w-auto">
                <Link href={'/my-leaning/todo'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Create To Do with Neon , @tanstack/react-query and api route handler
                </Link>
            </div>

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/count-zustand'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Count with Zustand
                </Link>
            </div>

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/tic-tac-toe'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Tic-Tac-Toe with Zustand
                </Link>
            </div>

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/word-search-game'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Word Search
                </Link>
            </div>

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/memory-game'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Memory Game
                </Link>
            </div>

            <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                <Link href={'/my-leaning/sudoku-game'} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    Sudoku Game
                </Link>
            </div>

        </div>
    )
}
