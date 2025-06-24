export interface ProductVariant {
    model: string,
    stock: number
}

export interface ProductModel{
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    modelsStock: ProductVariant[]; // Por cada modelo hay cierta cantidad de stock
}

export interface ProductToCart extends Pick<ProductModel, 'id' | 'name' | 'images' | 'price'> {
    model: string;
}