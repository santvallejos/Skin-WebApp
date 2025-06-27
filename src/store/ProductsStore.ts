import { create } from "zustand";
import type { ProductModel } from "@/models/ProductModel";

type sort = 'highlight' | 'priceMin' | 'priceMax' | 'az' | 'za'; // Opciones de ordenamiento
type filters = {
    search: string;
    priceRange: [number, number];
    color: string[];
    model: string[];
}; // Opciones de filtros

interface productStore {
    products: ProductModel[];

    filters: filters; // Filtros
    orderFor: sort; // Ordenar Por

    setProducts: (productos: ProductModel[]) => void;       // Lista de productos
    //setOrderFor: (option: sort) => void;                    // Aplicar ordenamiento
    //setFilters: (filters: filters) => void;                 // Aplicar filtros
}

export const useProductStore = create<productStore>((set) => ({
    // Inicializacion de variables
    products: [],
    filters: {
        search: '',
        priceRange: [0, Infinity],
        color: [],
        model: []
    },
    orderFor: 'highlight', // Predeterminado
    setProducts: (products: ProductModel[]) => {
        set({ products }); // Actualizar la lista de productos
    },
/*     setOrderFor: (option: sort) => {
        set({ orderFor: option }); // Actualizar el ordenamiento
    },
    setFilters: (filters: filters) => {
        set({ filters }); // Actualizar los filtros
    } */
}))