import create from "zustand"

export const useSearch = create((set, get) => ({
    searchParams: "",
    searchResults: [],
    setSearchParams: (searchText) => set((state) => ({searchParams: searchText})),
    getSearchParams: () => get(() => ({searchParams})),
    setResults: (results) => set(() => ({searchResults: [...results]})),
    getResults: () => get(() => ({searchResults}))
}))