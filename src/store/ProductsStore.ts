import { create } from "zustand";
import type { ProductModel } from "@/models/ProductModel";

export type sort = 'highlight' | 'priceMin' | 'priceMax' | 'az' | 'za'; // Opciones de ordenamiento
//type filters = {
//    search: string;
//    priceRange: number;
//    color: string[];
//    model: string[];
//}; // Opciones de filtros

interface productStore {
    products: ProductModel[];
    //filters: filters; // Filtros
    orderFor: sort; // Ordenar Por

    setProducts: (productos: ProductModel[]) => void;       // Lista de productos
    setOrderFor: (option: sort) => void;                    // Ordenar Por
}

export const useProductStore = create<productStore>((set) => ({
    // Inicializacion de variables
    products: [],
    filters: {
        search: '',
        priceRange: Infinity,
        color: [],
        model: []
    },
    orderFor: 'highlight', // Predeterminado
    setProducts: (products: ProductModel[]) => {
        set({ products }); // Actualizar la lista de productos
    },
    setOrderFor: (option: sort) => {
        set({ orderFor: option})
    }
}))