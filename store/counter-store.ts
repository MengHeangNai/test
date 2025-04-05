import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { hashStorage } from './hashStorage'

export const useCounterStore = create(
    persist(
        (set, get) => ({
            count: 0,
            increase: () => set((state: any) => ({ count: state.count + 1 })),
            decrease: () => set((state: any) => ({ count: state.count - 1 })),
            reset: () => set(() => ({ count: 0 })),
            setCount: (count: number) => set(() => ({ count })),
        }),
        {
            name: 'counter-storage', // unique name
            storage: createJSONStorage(() => hashStorage),
        },
    ),
)

export const useBoundStore = create(
    persist(
        (set, get) => ({
            fishes: 0,
            addAFish: () => set((state: any) => ({ fishes: state.fishes + 1 })),
        }),
        {
            name: 'food-storage', // unique name
            storage: createJSONStorage(() => hashStorage),
        },
    ),
)
