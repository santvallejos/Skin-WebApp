import { create } from "zustand";
import type { CaseModel } from "@/models/ProductModel";

export type sort = 'highlight' | 'priceMin' | 'priceMax' | 'az' | 'za'; // Types of order

interface filterStore {
    cases: CaseModel[];
    //search: string;
    minPrice: number;
    maxPrice: number;
    models: string[];
    orderFor: sort;
    isLoading: boolean;

    setProducts: (cases: CaseModel[]) => void;              // List products
    setOrderFor: (option: sort) => void;                    // for order
    //setSearch: (search: string) => void;                  // Search for product by name
    setMinPrice: (minPrice: number) => void;                // Range of min price
    setMaxPrice: (maxPrice: number) => void;                // Range of max price
    setModels: (models: string[]) => void;                  // Models
    clearFilters: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useFilterStore = create<filterStore>((set) => ({
    /* Inicializar las variables */
    cases: [],
    //search: '',
    minPrice: 1,
    maxPrice: 20000,
    models: [],
    orderFor: 'highlight', // Default filter
    isLoading: false,
    setProducts: (cases: CaseModel[]) => {
        set({ cases }); // Actualizar la lista de productos
    },
    setOrderFor: (option: sort) => {
        set({ orderFor: option});
    },
/*     setSearch: (search: string) => {
        set({ search });
    }, */
    setMinPrice: (minPrice: number) => {
        set({ minPrice });
    },
    setMaxPrice: (maxPrice: number) => {
        set({ maxPrice });
    },
    setModels: (models: string[]) => {
        set({ models });
    },
    clearFilters: () => {
        set({ minPrice: 0, maxPrice: 20000, models: [], orderFor: 'highlight' });
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
    }
}))