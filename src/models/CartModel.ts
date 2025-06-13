import type { ProductToCart } from "./ProductModel";

export interface CartItem {
    product: ProductToCart;
    quantity: number;
}  