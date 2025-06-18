export interface ProductVariant {
    model: string,
    stock: number
}

export interface Product{
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    modelsStock: ProductVariant[]; // Por cada modelo hay cierta cantidad de stock
}

export interface ProductToCart extends Pick<Product, 'id' | 'name' | 'images' | 'price'> {
    model: string;
}