import { useEffect, useMemo } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import ListProducts from "@/components/ListProducts";
import { useProductStore } from "@/store/ProductsStore";
import Filters from "@/components/Filters";

function Products() {
    const {
        products,
        orderFor,
        models,
        minPrice,
        maxPrice,
        setProducts,
        clearFilters
    } = useProductStore();

    // Aplicar filtros y ordenamiento
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return [...products].filter(product => {
            const matchesModels = models.length === 0 || product.modelsStock.some(variant => models.includes(variant.model) && variant.stock > 0);
            const matchesPrice = (minPrice === 0 && maxPrice === 0) || (product.price >= minPrice && product.price <= maxPrice);

            return matchesModels && matchesPrice;
        }).sort((a, b) => {
            switch(orderFor){
                case 'highlight':
                    return 0;
                case 'priceMin':
                    return a.price - b.price;
                case 'priceMax':
                    return b.price - a.price;
                case 'az':
                    return a.name.localeCompare(b.name);
                case 'za':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        })
    }, [products, models, minPrice, maxPrice, orderFor]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [setProducts]);

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
                        No hay productos que coincidan con la busqueda o los filtros seleccionados.
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
                <div className="overflow-y-auto h-[1240px]">
                    <ListProducts 
                        products={filteredProducts}
                        className="h-full overflow-y-auto"
                    />
                </div>
            )}
        </section>
    );
}

export default Products;