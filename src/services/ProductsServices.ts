import type { Product } from "../models/ProductModel";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Token para acceder al json ya que es privado

export const getAllProducts = async (): Promise<Product[]> => {
    const url = "https://api.github.com/repos/santvallejos/Base-de-datos-JSONs/contents/Skin-WebApp/Products.json?ref=main";

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw"
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los recursos de productos");
    }

    const data: Product[] = await response.json();
    return data;
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const url = "https://api.github.com/repos/santvallejos/Base-de-datos-JSONs/contents/Skin-WebApp/FeaturedProducts.json?ref=main";

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw"
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los recursos de productos destacados");
    }

    const data: Product[] = await response.json();
    return data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const products = await getAllProducts(); // Obtener todos los productos
    const product = products.find((product) => product.id === id); // Buscar el producto por su id
    if(!product) {
        throw new Error("Producto no encontrado");
    } else {
        return product;
    }
}

export const getProductByName = async (name: string): Promise<Product> => {
    const products = await getAllProducts(); // Obtener todos los productos
    const product = products.find((product) => product.name === name); // Buscar el producto por su nombre
    if(!product) {
        throw new Error("Producto no encontrado");
    } else {
        return product;
    }
}