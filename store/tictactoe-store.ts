import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { hashStorage } from './hashStorage'

export const useTicTacToeStore = create(
    persist(
        (set, get) => ({
            history: [Array(9).fill(null)],
            currentMove: 0,
            squares: Array(9).fill(null),
            setHistory: (history: any) => set({ history }),
            setCurrentMove: (currentMove: any) => set({ currentMove }),
            scores: { x: 0, o: 0, ties: 0 },
            setScores: (scores: any) => set({ scores }),
            resetScores: () => set({ scores: { x: 0, o: 0, ties: 0 } }),
        }),
        {
            name: 'tictactoe-storage', // unique name
            storage: createJSONStorage(() => hashStorage),
        },
    ),
)