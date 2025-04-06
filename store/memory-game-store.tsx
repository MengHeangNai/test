import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { hashStorage } from './hashStorage';

type CardType = {
    id: number;
    icon: React.ReactNode;
    iconName: string;
    isFlipped: boolean;
    isMatched: boolean;
};

export const useMemoryGameStore = create(
    persist<any>(
        (set, get) => ({
            cards: [],
            flippedCards: [],
            matchedCards: [],
            matchedPairs: 0,
            moves: 0,
            difficulty: 'easy',
            isLocked: false,
            gameStarted: false,
            gameCompleted: false,

            setCards: (cards: any) => set({ cards }),
            setFlippedCards: (flippedCards: any) => set({ flippedCards }),
            setMatchedPairs: (matchedPairs: any) => set({ matchedPairs }),
            setGameStarted: (gameStarted: any) => set({ gameStarted }),
            setGameCompleted: (gameCompleted: any) => set({ gameCompleted }),
            setMoves: (moves: any) => set({ moves }),
            setDifficulty: (difficulty: any) => set({ difficulty }),
            setIsLocked: (isLocked: any) => set({ isLocked }),

        }), {
        name: 'memory-game-storage', // unique name
        storage: createJSONStorage(() => hashStorage),
        partialize: (state) => ({
            ...state,
            cards: state.cards.map(({ id, iconName, isFlipped, isMatched }: any) => ({
                id,
                iconName,
                isFlipped,
                isMatched,
            })),
        }),
    },
    ));