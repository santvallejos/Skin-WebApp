import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/services/ProductsServices";
import type { Product } from "@/models/ProductModel";

function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFeatureProducts = async () => {
            try{
                const featuredProductsData = await getFeaturedProducts();
                setFeaturedProducts(featuredProductsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchFeatureProducts();
    });

    // Estado para controlar qué productos están en hover
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

    return (
        <section className="flex flex-col gap-4 p-4 bg-[#f2ebd9] rounded-b-3xl">
            {/* Title */}
            <div className="flex justify-center items-center w-full">
                <h2 className="text-4xl font-bold">Productos Destacados</h2>
            </div>

            {/* Products */}
            <div className="flex justify-center items-center p-5">
                <ul className="flex flex-col gap-4 justify-center items-center">
                    <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {featuredProducts.map((product) => (
                            <div 
                                key={product.id}
                                className="flex flex-col gap-2 w-full h-full bg-[#191919] p-5 rounded-2xl"
                            >
                                <Link 
                                    to={`/products/${slugify(product.name)}`} 
                                    state={{ id: product.id }} 
                                    className="flex flex-col gap-2 w-full h-full"
                                    onMouseEnter={() => setHoveredProductId(product.id)}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <div className="relative w-72 h-72">
                                        {/* Imagen por defecto */}
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className={`
                                                absolute inset-0 w-full h-full object-cover rounded-2xl
                                                transition-opacity duration-500 ease-in-out
                                                ${hoveredProductId === product.id ? 'opacity-0' : 'opacity-100'}
                                            `}
                                        />
                                        {/* Imagen al hover */}
                                        <img
                                            src={product.images[1]}
                                            alt={product.name}
                                            className={`
                                                absolute inset-0 w-full h-full object-cover rounded-2xl
                                                transition-opacity duration-500 ease-in-out
                                                ${hoveredProductId === product.id ? 'opacity-100' : 'opacity-0'}
                                            `}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                                        <p className="text-lg text-white">${product.price.toFixed(3)}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default FeaturedProducts;