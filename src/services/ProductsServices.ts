import type { Product } from "../models/ProductModel";

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await fetch("https://raw.githubusercontent.com/santvallejos/Base-de-datos-JSONs/refs/heads/main/Skin-WebApp/Products.json");

    if (!response.ok) {
        throw new Error("Error al obtener los recursos recomendados");
    }

    const data: Product[] = await response.json();
    return data;
}