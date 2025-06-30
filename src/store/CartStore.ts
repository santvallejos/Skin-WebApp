import { create } from 'zustand';
import type { CartItem } from '@/models/CartModel';
import type { ProductToCart } from '@/models/ProductModel';

interface cartStore {
    items: CartItem[]; // Lista de productos en el carrito

    // Funciones para manipular el carrito
    addCart: (product: ProductToCart, quantity: number) => void;                 // Agregar un producto al carrito
    removeCart: (id: string) => void;                          // Remover un producto del carrito
    updateQuantity: (id: string, quantity: number) => void;    // Actualizar la cantidad de un producto en el carrito
    clearCart: () => void;                                     // Limpiar el carrito

    // Getters
    getSubtotal: (id: string) => number;
    getTotal: () => number;
}

export const useCartStore = create<cartStore>((set, get) => ({
    // inicializar variables
    items: [],

    addCart: (product: ProductToCart, quantity: number) => {
        // evaluar si el producto ya esta en el carrito
        const productInCart = useCartStore.getState().items.find((item) => item.product.id === product.id);
        if (productInCart) {
            // Si el producto ya esta en el carrito, aumentar la cantidad
            set((state) => ({
                items: state.items.map((item) => {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    }
                    return item;
                })
            }))
        } else {
            // Si el producto no esta en el carrito, agregarlo
            set((state) => ({
                items: [...state.items, { product, quantity }]
            }))
        }
    },
    removeCart: (productId: string) => {
        // evaluamos si el producto esta en el carrito
        const productInCart = useCartStore.getState().items.find((item) => item.product.id === productId);
        if (productInCart) {
            // Si el producto esta en el carrito, lo eliminamos, tambien sus cantidades
            set((state) => ({
                items: state.items.filter((item) => item.product.id !== productId)
            }))
        } else {
            // Si el producto no esta en el carrito, no hacemos nada
            return;
        }
    },
    updateQuantity: (productId: string, quantity: number) => {
        // evaluamos si el producto esta en el carrito
        const productInCart = useCartStore.getState().items.find((item) => item.product.id === productId);
        if (productInCart) {
            // Si el producto esta en el carrito, evaluamos su cantidad y la actualizamos, ya que no puede pasar que la cantidad sea menor a 1
            if (quantity < 1) {
                return;
            }
            set((state) => ({
                items: state.items.map((item) => {
                    if (item.product.id === productId) {
                        return {
                            ...item,
                            quantity: quantity
                        }
                    }
                    return item;
                })
            }))
        }
    },
    clearCart: () => {
        // Limpiar el carrito
        set({ items: [] });
    },
    // Getter: subtotal de un ítem
    getSubtotal: (productId) => {
        const item = get().items.find(item => item.product.id === productId);
        return item ? item.quantity * item.product.price : 0;
    },

    // Getter: total del carrito
    getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    }
}))