/* Phone model interface */
export interface PhoneModel {
    id: string;
    name: string;
}

/* Case stock interface */
export interface CaseStock {
    id: string;
    phone_model: PhoneModel;
    color_hex: string;
    stock: number;
}

export interface CaseModel {
    id: string;
    name: string;
    description: string;
    price: number;
    discount: number | null;
    new_price: number | null;
    images: string[];
    stock: boolean;
    // Stock por modelo
    modelStock: CaseStock[];
}

/* Product to cart interface */
export interface ProductToCart extends Pick<CaseModel, 'id' | 'name' | 'images' | 'price'> {
    model: string;
}