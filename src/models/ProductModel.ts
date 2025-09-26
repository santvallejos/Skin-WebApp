export interface PhoneModel {
    id: string;
    name: string;
}

export interface CaseStock {
    id: string;
    case_id: string;
    phone_model_id: string;
    stock: number;
    color_hex: string | null;
    phone_model: PhoneModel | null;
}

export interface ProductModel {
    id: string;
    name: string;
    description: string;
    price: number;
    discount: number | null;
    new_price: number | null;
    images: string[];
    stock: boolean;
    // Nuevo campo para el stock por modelo
    modelStock: CaseStock[];
}

export interface ProductVariant {
    model: string;
    stock: number;
}

export interface ProductToCart extends Pick<ProductModel, 'id' | 'name' | 'images' | 'price'> {
    model: string;
}