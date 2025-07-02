import { useEffect } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import ListProducts from "@/components/ListProducts";
import { useProductStore } from "@/store/ProductsStore";
import Filters from "@/components/Filters";

function Products() {
    const {
        products,
        setProducts
    } = useProductStore();

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
    });

    return (
        <section className="flex flex-col p-3">
            <div className="flex justify-between">
                <h2 className="text-5xl font-bold text-shadow-lg/20">Productos</h2>
                <Filters />
            </div>

            <ListProducts products={products} />
        </section>
    );
}

export default Products;