import type { CartItem } from '@/models/CartModel';
import { useCartStore } from '@/store/CartStore';

export const CART_KEY = 'cart';                                                         // Clave para almacenar el carrito en localStorage
export const EXPIRATION_MINUTES = 40;                                                   // Tiempo de expiración del carrito
const CART_SCHEMA_VERSION = 1;                                                   // Añadir versión del esquema
let saveTimeout: NodeJS.Timeout | null = null;                                    // Timeout para guardar el carrito

export const loadCart = (): CartItem[] => {
    const cartData = localStorage.getItem(CART_KEY);    //Obtener el carrito
    if (!cartData) return [];                           //Si no hay carrito, retorna un array vacio

    try {
        const { items, timestamp, version } = JSON.parse(cartData); // Parsear el carrito
        
        // Check expiration and version
        const now = new Date().getTime();
        if (now - timestamp > EXPIRATION_MINUTES * 60 * 1000 || version !== CART_SCHEMA_VERSION) {
            localStorage.removeItem(CART_KEY);
            return [];
        }

        return items;
    } catch (error) {
        console.error("Failed to load cart", error);
        localStorage.removeItem(CART_KEY);
        return [];
    }
}

export const saveCart = (items: CartItem[]) => {
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(() => {
        const cartData = {
            version: CART_SCHEMA_VERSION,
            items,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(CART_KEY, JSON.stringify(cartData));
    }, 500);
}

// Sincronización entre pestañas
window.addEventListener('storage', (event) => {
    if (event.key === CART_KEY && event.newValue) {
        try {
            const newCart = JSON.parse(event.newValue);
            
            // Verificar versión y expiración
            if (newCart.version === CART_SCHEMA_VERSION) {
                const now = new Date().getTime();
                if (now - newCart.timestamp <= EXPIRATION_MINUTES * 60 * 1000) {
                    useCartStore.setState({ items: newCart.items });
                } else {
                    localStorage.removeItem(CART_KEY);
                    useCartStore.setState({ items: [] });
                }
            }
        } catch (error) {
            console.error("Error sincronizando carrito", error);
        }
    }
});