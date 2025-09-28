import type { CaseModel, PhoneModel, CaseStock } from "@/models/ProductModel";

/**
 *  Transformar un item de telefono de Supabase a PhoneModel 
 */
const toPhoneModel = (phoneModel: PhoneModel | null): PhoneModel => {
    if (!phoneModel) throw new Error("Invalid phone model");

    return {
        id: phoneModel.id,
        name: phoneModel.name
    }
}

/**
 * Transforma un item de stock de caso de Supabase a CaseStock
*/
const toCaseStock = (stockItem: CaseStock): CaseStock => ({
    id: stockItem.id,
    phone_model: toPhoneModel(stockItem.phone_model),
    color_hex: stockItem.color_hex,
    stock: stockItem.stock
});

/**
 * Transforma un item de caso de Supabase a CaseModel
 */
export const toCaseModel = (caseItem: CaseModel): CaseModel => ({
    id: caseItem.id,
    name: caseItem.name,
    description: caseItem.description,
    price: caseItem.price,
    discount: caseItem.discount,
    new_price: caseItem.new_price,
    images: caseItem.images,
    stock: caseItem.stock,
    modelStock: (caseItem.modelStock || []).map(toCaseStock)
});

/**
 * Transforma un array de casos de Supabase a array de CaseModel
 */
export const toCaseModelArray = (caseItems: CaseModel[]): CaseModel[] =>
    (caseItems || []).map(toCaseModel);

/**
 * Función de guardia para validar que el objeto tiene la estructura esperada
 */
export const isValidSupabaseCaseItem = (item: unknown): item is CaseModel => {
    if (!item || typeof item !== 'object') return false;
    
    const obj = item as Record<string, unknown>;
    
    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.description === 'string' &&
        typeof obj.price === 'number' &&
        (obj.discount === null || typeof obj.discount === 'number') &&
        (obj.new_price === null || typeof obj.new_price === 'number') &&
        Array.isArray(obj.images) &&
        typeof obj.stock === 'boolean' &&
        Array.isArray(obj.case_stock)
    );
};