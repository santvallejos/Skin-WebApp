import type { ProductModel } from "../models/ProductModel";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Token para acceder al json ya que es privado

export const getAllProducts = async (): Promise<ProductModel[]> => {
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

    const data: ProductModel[] = await response.json();
    return data;
}

export const getFeaturedProducts = async (): Promise<ProductModel[]> => {
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

    const data: ProductModel[] = await response.json();
    return data;
}

export const getProductById = async (id: string): Promise<ProductModel> => {
    const products = await getAllProducts(); // Obtener todos los productos
    const product = products.find((product) => product.id === id); // Buscar el producto por su id
    if(!product) {
        throw new Error("Producto no encontrado");
    } else {
        return product;
    }
}

export const getProductByName = async (name: string): Promise<ProductModel> => {
    const products = await getAllProducts(); // Obtener todos los productos
    const product = products.find((product) => product.name === name); // Buscar el producto por su nombre
    if(!product) {
        throw new Error("Producto no encontrado");
    } else {
        return product;
    }
}

// Buscamos productos al azar pero evitamos repetir el producto actual
export const getProductsRandom = async (productName: string): Promise<ProductModel[]> => {
    const products = await getAllProducts();                                                                                // Obtener todos los productos
    const productsRandom = products.filter((product) => product.name !== productName).sort(() => Math.random() - 0.5);     // Filtrar y ordenar aleatoriamente

    return productsRandom.slice(0, 4); // Devolver solo 4 productos
}