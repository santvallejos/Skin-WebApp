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

    addCart: (product: ProductToCart, quantity: number, stock: number) => void;  // Add a product to cart
    removeCart: (id: string) => void;                                            // Remove a product from cart
    updateQuantity: (id: string, quantity: number) => void;                      // Update product quantity in cart
    clearCart: () => void;                                                       // Clear cart

    // Getters
    getSubtotal: (id: string) => number;                                         // Get subtotal of a product
    getTotal: () => number;                                                      // Get total of cart
}

export const useCartStore = create<cartStore>((set, get) => ({
    // Initialize state
    items: loadCart(),

    addCart: (product: ProductToCart, quantity: number, stock: number) => {
        const productInCar = useCartStore.getState().items.find((item) => item.product.id === product.id && item.product.model === product.model && item.product.color === product.color);         // Get the product in cart by id

        if (productInCar) {
            if (stock >= quantity && stock >= productInCar.quantity + quantity) { // If stock is greater than or equal to the quantity of the product and stock is greater than or equal to the quantity of the product in the cart
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.product.id === product.id && item.product.model === product.model && item.product.color === product.color) {
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
                items: [ { id: crypto.randomUUID(), product, quantity, maxStock: stock }, ...state.items ]     // Add new product to cart
            }))
            toastAddProduct(`${product.name} - $${product.price.toLocaleString('es-AR')} x ${quantity}`);
        } else {
            toastErrorAddProduct();
        }

        saveCart(get().items);
    },
    removeCart: (itemCartId: string) => {
        const itemInCart = get().items.find((item) => item.id === itemCartId); // Get the product in cart by id

        if (itemInCart) {
            // If product is in cart, remove it along with its quantities
            set((state) => ({
                items: state.items.filter((item) => item.id !== itemCartId)
            }))
        } else {
            // If product is not in cart, do nothing
            return;
        }
        saveCart(get().items);
    },
    updateQuantity: (itemCartId: string, quantity: number) => {
        const itemInCart = get().items.find((item) => item.id === itemCartId); // Get the product in cart by id

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
            return; // If product is not in cart, do nothing
        }
        saveCart(get().items);
    },
    clearCart: () => {
        // Clear cart
        set({ items: [] });
        localStorage.removeItem(CART_KEY);
    },
    // Getter: subtotal of a product
    getSubtotal: (productId) => {
        const item = get().items.find(item => item.product.id === productId);
        return item ? item.quantity * item.product.price : 0;
    },
    // Getter: total of cart
    getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    }
}))