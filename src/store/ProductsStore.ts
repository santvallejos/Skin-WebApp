import { create } from "zustand";
//import type { ProductModel } from "@/models/ProductModel";
import type { CaseModel } from "@/models/ProductModel";

export type sort = 'highlight' | 'priceMin' | 'priceMax' | 'az' | 'za'; // Opciones de ordenamiento

interface productStore {
    cases: CaseModel[];
    //search: string;
    minPrice: number;
    maxPrice: number;
    models: string[];
    orderFor: sort; // Ordenar Por
    isLoading: boolean;

    setProducts: (cases: CaseModel[]) => void;       // Lista de productos
    setOrderFor: (option: sort) => void;                    // Ordenar Por
    //setSearch: (search: string) => void;                  // Buscar por nombre
    setMinPrice: (minPrice: number) => void;                // Rango de precio minimo
    setMaxPrice: (maxPrice: number) => void;                // Rango de precio maximo
    setModels: (models: string[]) => void;                  // Modelos
    clearFilters: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useProductStore = create<productStore>((set) => ({
    /* Inicializar las variables */
    cases: [],
    //search: '',
    minPrice: 1,
    maxPrice: 20000,
    models: [],
    orderFor: 'highlight', // Predeterminado
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