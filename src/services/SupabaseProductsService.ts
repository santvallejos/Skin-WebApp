import supabase from "@/lib/supabase";
import type { ProductModel, CaseStock } from "@/models/ProductModel";

export const getAllProductsFromSupabase = async (): Promise<ProductModel[]> => {
    try {
        // Obtener todos los cases con su stock
        const { data: cases, error: casesError } = await supabase
            .from('cases')
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock
            `);

        if (casesError) {
            throw new Error(`Error fetching cases: ${casesError.message}`);
        }

        // Obtener todo el stock con información de modelos de teléfono
        const { data: stockData, error: stockError } = await supabase
            .from('case_stock')
            .select(`
                id,
                case_id,
                phone_model_id,
                stock,
                color_hex,
                phone_model:phone_model_id (
                    id,
                    name
                )
            `);

        if (stockError) {
            throw new Error(`Error fetching stock: ${stockError.message}`);
        }

        // Combinar los datos
        const products: ProductModel[] = (cases || []).map(caseItem => {
            const caseStock = (stockData || []).filter(
                stock => stock.case_id === caseItem.id
            ) as CaseStock[];

            return {
                ...caseItem,
                modelStock: caseStock
            };
        });

        return products;
    } catch (error) {
        console.error('Error in getAllProductsFromSupabase:', error);
        throw error;
    }
};

export const getProductByIdFromSupabase = async (id: string): Promise<ProductModel> => {
    try {
        // Obtener el case específico
        const { data: caseData, error: caseError } = await supabase
            .from('cases')
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock
            `)
            .eq('id', id)
            .single();

        if (caseError) {
            throw new Error(`Error fetching case: ${caseError.message}`);
        }

        if (!caseData) {
            throw new Error("Producto no encontrado");
        }

        // Obtener el stock para este case
        const { data: stockData, error: stockError } = await supabase
            .from('case_stock')
            .select(`
                id,
                case_id,
                phone_model_id,
                stock,
                color_hex,
                phone_model:phone_model_id (
                    id,
                    name
                )
            `)
            .eq('case_id', id);

        if (stockError) {
            throw new Error(`Error fetching stock: ${stockError.message}`);
        }

        return {
            ...caseData,
            modelStock: stockData as CaseStock[] || []
        };
    } catch (error) {
        console.error('Error in getProductByIdFromSupabase:', error);
        throw error;
    }
};

export const getProductByNameFromSupabase = async (name: string): Promise<ProductModel> => {
    try {
        const { data: caseData, error: caseError } = await supabase
            .from('cases')
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock
            `)
            .eq('name', name)
            .single();

        if (caseError || !caseData) {
            throw new Error("Producto no encontrado");
        }

        const { data: stockData, error: stockError } = await supabase
            .from('case_stock')
            .select(`
                id,
                case_id,
                phone_model_id,
                stock,
                color_hex,
                phone_model:phone_model_id (
                    id,
                    name
                )
            `)
            .eq('case_id', caseData.id);

        if (stockError) {
            throw new Error(`Error fetching stock: ${stockError.message}`);
        }

        return {
            ...caseData,
            modelStock: stockData as CaseStock[] || []
        };
    } catch (error) {
        console.error('Error in getProductByNameFromSupabase:', error);
        throw error;
    }
};

export const getFeaturedProductsFromSupabase = async (): Promise<ProductModel[]> => {
    // Por ahora, retornamos los primeros 8 productos
    // Puedes agregar una columna 'featured' a la tabla cases si necesitas una lógica específica
    try {
        const products = await getAllProductsFromSupabase();
        return products.slice(0, 8);
    } catch (error) {
        console.error('Error in getFeaturedProductsFromSupabase:', error);
        throw error;
    }
};

export const getProductsRandomFromSupabase = async (excludeName: string): Promise<ProductModel[]> => {
    try {
        const products = await getAllProductsFromSupabase();
        const filteredProducts = products.filter(product => product.name !== excludeName);
        
        // Mezclar array aleatoriamente
        const shuffled = filteredProducts.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    } catch (error) {
        console.error('Error in getProductsRandomFromSupabase:', error);
        throw error;
    }
};