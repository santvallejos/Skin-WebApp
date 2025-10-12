import { useEffect, useMemo } from "react";
//import { getAllProductsFromSupabase } from "@/services/SupabaseProductsService"; //Servicio creado aparte para supabase
import { getAllCases } from "@/services/ProductsServices";
import { useFilterStore } from "@/store/FilterStore";
import { Skeleton } from "@/components/ui/skeleton";
import ListProducts from "@/components/ListProducts";
import Filters from "@/components/Filters";

function Products() {
    const {
        cases,
        orderFor,
        models,
        minPrice,
        maxPrice,
        setProducts,
        clearFilters,
        isLoading,
        setIsLoading
    } = useFilterStore();

    /* 
    * Apply filters and sorting to the products
    */
    const filteredProducts = useMemo(() => {
        if (!cases || cases.length === 0) return []; // If no products, return empty array

        return [...cases].filter(product => {

            // Filter by models - check if any stock matches the selected models
            const matchesModels = models.length === 0 || 
                product.modelStock.some(stock => 
                    stock.phone_model && 
                    models.includes(stock.phone_model.name) && 
                    stock.stock > 0
                );

            // Filter by price
            const productPrice = product.new_price || product.price; // If the product has a discount, use the new price, else use the original price
            const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

            return matchesModels && matchesPrice;
        }).sort((a, b) => {

            // Order the products based on the selected criteria
            const priceA = a.new_price || a.price;
            const priceB = b.new_price || b.price;

            switch (orderFor) {
                case 'highlight':
                    return 0;
                case 'priceMin':
                    return priceA - priceB;
                case 'priceMax':
                    return priceB - priceA;
                case 'az':
                    return a.name.localeCompare(b.name);
                case 'za':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }, [cases, models, minPrice, maxPrice, orderFor]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const productsData = await getAllCases(); // Fetch products from Supabase
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts, setIsLoading]);

    if (isLoading) {
        return (
            <section className="flex flex-col p-4 md:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-[522px] w-[322px]" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-col p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Productos</h2>
                <Filters />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-xl border border-gray-200 transition-all hover:shadow-sm sm:h-[600px] xl:h-[1080px]">
                    <span className="text-6xl mb-4">😞</span>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">¡Ups! No encontramos productos</h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                        No hay productos que coincidan con la búsqueda o los filtros seleccionados.
                        Prueba ajustando los criterios de búsqueda.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Reiniciar filtros
                    </button>
                </div>
            ) : (
                <ListProducts 
                    products={filteredProducts} 
                />
            )}
        </section>
    );
}

export default Products;