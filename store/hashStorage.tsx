interface StateStorage {
    getItem: (key: string) => string
    setItem: (key: string, newValue: unknown) => void
    removeItem: (key: string) => void
    clear: () => void
}

export const hashStorage: StateStorage = {
    getItem: (key): string => {
        try {
            const searchParams = new URLSearchParams(location.hash.slice(1))
            const storedValue = searchParams.get(key) ?? ''
            return JSON.parse(storedValue)
        } catch (error) {
            return ''
        }
    },
    setItem: (key, newValue): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.set(key, JSON.stringify(newValue))
        location.hash = searchParams.toString()
    },
    removeItem: (key): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.delete(key)
        location.hash = searchParams.toString()
    },
    clear: () => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.forEach((_, key) => {
            searchParams.delete(key)
        })
        location.hash = searchParams.toString()
    }
}

export const hashSessionStorage: StateStorage = {
    getItem: (key): string => {
        try {
            const storedValue = sessionStorage.getItem(key) ?? ''
            return JSON.parse(storedValue)
        } catch (error) {
            return ''
        }
    },
    setItem: (key, newValue): void => {
        try {
            sessionStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
            console.error('Failed to set item in sessionStorage:', error)
        }
    },
    removeItem: (key): void => {
        try {
            sessionStorage.removeItem(key)
        } catch (error) {
            console.error('Failed to remove item from sessionStorage:', error)
        }
    },
    clear: () => {
        try {
            sessionStorage.clear()
        } catch (error) {
            console.error('Failed to clear sessionStorage:', error)
        }
    }
}
