import { create } from 'zustand';
import type { Product } from '@/models/ProductModel';
//import { getAllProducts, getProductById } from '@/services/ProductsServices';

interface itemCart {
    product: Product;
    quantity: number;
}

interface cartStore {
    items: itemCart[];

    addCart: (product: Product) => void;
}

export const useCartStore = create<cartStore>((set) => ({
    // inicializar variables
    items: [],

    addCart: (product: Product) => {
        // evaluar si el producto ya esta en el carrito
        const productInCart = useCartStore.getState().items.find((item) => item.product.id === product.id);
        if (productInCart) {
            // Si el producto ya esta en el carrito, aumentar la cantidad
            set((state) => ({
                items: state.items.map((item) => {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            }))
        } else {
            // Si el producto no esta en el carrito, agregarlo
            set((state) => ({
                items: [...state.items, { product, quantity: 1 }]
            }))
        }
    }
}))