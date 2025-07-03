import { create } from "zustand";
import type { ProductModel } from "@/models/ProductModel";

export type sort = 'highlight' | 'priceMin' | 'priceMax' | 'az' | 'za'; // Opciones de ordenamiento

interface productStore {
    products: ProductModel[];
    search: string;
    priceRange: number;
    models: string[];
    orderFor: sort; // Ordenar Por

    setProducts: (productos: ProductModel[]) => void;       // Lista de productos
    setOrderFor: (option: sort) => void;                    // Ordenar Por
    setSearch: (search: string) => void;
    setPriceRange: (priceRange: number) => void;
    setModels: (models: string[]) => void;
}

export const useProductStore = create<productStore>((set) => ({
    // Inicializacion de variables
    products: [],
    search: '',
    priceRange: Infinity,
    models: [],
    orderFor: 'highlight', // Predeterminado
    setProducts: (products: ProductModel[]) => {
        set({ products }); // Actualizar la lista de productos
    },
    setOrderFor: (option: sort) => {
        set({ orderFor: option});
    },
    setSearch: (search: string) => {
        set({ search });
    },
    setPriceRange: (priceRange: number) => {
        set({ priceRange });
    },
    setModels: (models: string[]) => {
        set({ models });
        console.log(models);
    }
}))