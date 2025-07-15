import type { ProductToCart } from "./ProductModel";

export interface CartItem {
    id: string;
    product: ProductToCart;
    quantity: number;
    maxStock: number;
}