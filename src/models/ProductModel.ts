export interface ProductVariant {
    model: string,
    stock: number
}

export interface Product{
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    modelsStock: ProductVariant[]; // Por cada modelo hay cierta cantidad de stock
}

export interface ProductToCart extends Pick<Product, 'id' | 'name' | 'imageUrl' | 'price'> {
    model: string;
}