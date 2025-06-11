interface MoldelsProduct {
    model: string;
    quantity: number;
}

export interface ItemCart {
    id: string;
    name: string;
    price: number;
    models: MoldelsProduct[];
}
