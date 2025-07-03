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
        setProducts
    } = useProductStore();

    // Ordenar los productos
/*     const sortProducts = useMemo(() => {
        if (!products) return [];

        return [...products].sort((a, b) => {
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
    }, [products, orderFor]); */

    // Aplicar filtros y ordenamiento
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return [...products].filter(product => {
            const matchesModels = models.length === 0 || 
                product.modelsStock.some(variant => 
                    models.includes(variant.model) && variant.stock > 0
                );
            return matchesModels;
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
    }, [products, models, orderFor]);

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
        <section className="flex flex-col p-3">
            <div className="flex justify-between">
                <h2 className="text-5xl font-bold text-shadow-lg/20">Productos</h2>
                <Filters />
            </div>

            <ListProducts products={filteredProducts} />
        </section>
    );
}

export default Products;