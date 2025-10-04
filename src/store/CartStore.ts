import { create } from 'zustand';
import type { CartItem } from '@/models/CartModel';
import type { ProductToCart } from '@/models/ProductModel';
import { loadCart, saveCart, CART_KEY } from '@/lib/SaveCart';
import { toast, Slide } from 'react-toastify';

// Toast Notifications
const toastAddProduct = (prompt: string) => toast.success(prompt, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });

const toastErrorAddProduct = () => toast.error("No hay stock disponible", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    });

interface cartStore {
    items: CartItem[]; // List products in cart

    // Funciones para manipular el carrito
    addCart: (product: ProductToCart, quantity: number, stock: number) => void;  // Agregar un producto al carrito
    removeCart: (id: string) => void;                                            // Remover un producto del carrito
    updateQuantity: (id: string, quantity: number) => void;                      // Actualizar la cantidad de un producto en el carrito
    clearCart: () => void;                                                       // Limpiar el carrito

    // Getters
    getSubtotal: (id: string) => number;                                         // Subtotal de un producto
    getTotal: () => number;                                                      // Total del carrito
}

export const useCartStore = create<cartStore>((set, get) => ({
    // inicializar variables
    items: loadCart(),

    addCart: (product: ProductToCart, quantity: number, stock: number) => {
        const productInCar = useCartStore.getState().items.find((item) => item.product.id === product.id && item.product.model === product.model);         // evaluar si el producto del mismo modelo ya esta en el carrito

        if (productInCar) {
            if (stock >= quantity && stock >= productInCar.quantity + quantity) { // Si el stock es mayor o igual a la cantidad del producto y el stock es mayor o igual a la cantidad del producto en el carrito
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.product.id === product.id && item.product.model === product.model) {
                            return {
                                ...item,
                                quantity: item.quantity + quantity
                            }
                        }
                        return item;
                    })
                }))
                toastAddProduct(`${product.name} - $${product.price.toLocaleString('es-AR')} x ${quantity}`);
            } else {
                toastErrorAddProduct();
            }
        } else if (stock >= quantity) {
            set((state) => ({
                items: [ { id: crypto.randomUUID(), product, quantity, maxStock: stock }, ...state.items ]     // Si el producto no esta en el carrito, agregarlo
            }))
            toastAddProduct(`${product.name} - $${product.price.toLocaleString('es-AR')} x ${quantity}`);
        } else {
            toastErrorAddProduct();
        }

        saveCart(get().items);
    },
    removeCart: (itemCartId: string) => {
        // Evaluamos si el producto esta en el carrito
        const itemInCart = get().items.find((item) => item.id === itemCartId);

        if (itemInCart) {
            // Si el producto esta en el carrito, lo eliminamos, tambien sus cantidades
            set((state) => ({
                items: state.items.filter((item) => item.id !== itemCartId)
            }))
        } else {
            // Si el producto no esta en el carrito, no hacemos nada
            return;
        }
        saveCart(get().items);
    },
    updateQuantity: (itemCartId: string, quantity: number) => {
        const itemInCart = get().items.find((item) => item.id === itemCartId);         // Evaluamos si el producto esta en el carrito

        if (itemInCart && quantity > 0) {
            if(itemInCart.maxStock >= quantity && itemInCart.maxStock >= itemInCart.quantity + quantity){
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.id === itemCartId) {
                            return {
                                ...item,
                                quantity: quantity
                            }
                        }
                        return item;
                    })
                }))
            } else {
                toastErrorAddProduct();
            }
        } else {
            // Si el producto no esta en el carrito, no hacemos nada
            return;
        }
        saveCart(get().items);
    },
    clearCart: () => {
        // Limpiar completamente el carrito
        set({ items: [] });
        localStorage.removeItem(CART_KEY);
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