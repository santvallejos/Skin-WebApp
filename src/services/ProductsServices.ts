import supabase from "@/lib/supabase";
import type { CaseModel } from "@/models/ProductModel";

export const getAllCases = async (): Promise<CaseModel[]> => {
    try {
        /* Consulta a supabase a la tabla cases */
        const { data, error } = await supabase
            .from('cases')
            /* Pudes haber problemas por el *, si no especificar cada columna de la tabla */
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock,
                case_stock (
                    id,
                    phone_model:phone_model_id (
                        id,
                        name
                    ),
                    color_hex,
                    stock
                )
                `);

        if (error) throw new Error(`Error trayendo los productos: ${error?.message}`);

        // Transformar los datos para que coincidan con ProductModel
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cases: CaseModel[] = (data || []).map((caseItem: any) => ({
            id: caseItem.id,
            name: caseItem.name,
            description: caseItem.description,
            price: caseItem.price,
            discount: caseItem.discount,
            new_price: caseItem.new_price,
            images: caseItem.images,
            stock: caseItem.stock,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            modelStock: (caseItem.case_stock || []).map((stock: any) => ({
                id: stock.id,
                case_id: stock.case_id,
                phone_model_id: stock.phone_model_id,
                stock: stock.stock,
                color_hex: stock.color_hex,
                phone_model: stock.phone_model ? {
                    id: stock.phone_model.id,
                    name: stock.phone_model.name
                } : null
            }))
        }));

        return cases;
    }
    catch (error) {
        console.error('Error trayendo los casos: ', error);
        throw error;
    }
};

export const getFeaturedCases = async (): Promise<CaseModel[]> => {
    try {
        const { data, error } = await supabase
            .from('cases')
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock,
                case_stock (
                    id,
                    phone_model:phone_model_id (
                        id,
                        name
                    ),
                    color_hex,
                    stock
                )
            `)
            .eq('outstanding', true);

        if (error) throw new Error(`Error trayendo los productos destacados: ${error?.message}`);

        // Transformar los datos para que coincidan con ProductModel
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cases: CaseModel[] = (data || []).map((caseItem: any) => ({
            id: caseItem.id,
            name: caseItem.name,
            description: caseItem.description,
            price: caseItem.price,
            discount: caseItem.discount,
            new_price: caseItem.new_price,
            images: caseItem.images,
            stock: caseItem.stock,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            modelStock: (caseItem.case_stock || []).map((stock: any) => ({
                id: stock.id,
                case_id: stock.case_id,
                phone_model_id: stock.phone_model_id,
                stock: stock.stock,
                color_hex: stock.color_hex,
                phone_model: stock.phone_model ? {
                    id: stock.phone_model.id,
                    name: stock.phone_model.name
                } : null
            }))
        }));

        return cases;
    }
    catch (error) {
        console.error('Error trayendo los casos destacados: ', error);
        throw error;
    }
};

export const getCasesByName = async (name: string): Promise<CaseModel> => {
    try {
        const { data, error } = await supabase
            .from('cases')
            .select(`
                id,
                name,
                description,
                price,
                discount,
                new_price,
                images,
                stock,
                case_stock (
                    id,
                    phone_model:phone_model_id (
                        id,
                        name
                    ),
                    color_hex,
                    stock
                )
            `)
            .eq('name', name)
            .single();

        if (error || !data) throw new Error(`Error trayendo el producto por nombre: ${error?.message}`);

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            discount: data.discount,
            new_price: data.new_price,
            images: data.images,
            stock: data.stock,
            modelStock: (data.case_stock || [])
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((stock: any) => stock.phone_model) // Filtrar solo los que tienen phone_model
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((stock: any) => ({
                    id: stock.id,
                    phone_model: {
                        id: stock.phone_model.id,
                        name: stock.phone_model.name
                    },
                    color_hex: stock.color_hex,
                    stock: stock.stock
                }))
        };
    } catch (error) {
        console.error('Error trayendo el caso por nombre: ', error);
        throw error;
    }
};

export const getCasesRandom = async (caseName: string): Promise<CaseModel[]> => {
    try {
        const randomCases = await getAllCases();
        const filteredCases = randomCases.filter((caseItem) => caseItem.name !== caseName).sort(() => Math.random() - 0.5);

        // Mesclar el array
        const shuffledCases = filteredCases.sort(() => 0.5 - Math.random());
        return shuffledCases.slice(0, 4);
    } catch (error) {
        console.error('Error trayendo casos aleatorios: ', error);
        throw error;
    }
};