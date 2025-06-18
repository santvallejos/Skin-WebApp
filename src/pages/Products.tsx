import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import type { Product } from "@/models/ProductModel";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    // Estado para controlar qué productos están en hover
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

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
        <section className="flex flex-col">
            <div className="flex justify-between">
                <h2 className="text-6xl">Productos</h2>
                <div>
                    <Sheet>
                        <SheetTrigger className="text-4xl">Open</SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <ul className="flex flex-col gap-4 justify-center items-center">
                <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        //Con el slugify hacemos que el nombre del producto aparecas en la ruta en ves del id
                        //y como estado le pasamos el id para que el componente Product pueda acceder a él
                        <div 
                        key={product.id}
                        className="flex flex-col gap-2 w-full h-full bg-[#191919] rounded-2xl border border-neutral-900"
                    >
                        <Link 
                            to={`/products/${slugify(product.name)}`} 
                            state={{ id: product.id }} 
                            className="flex flex-col gap-2 w-full h-full"
                            onMouseEnter={() => setHoveredProductId(product.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div className="relative w-72 h-96">
                                {/* Imagen por defecto */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className={`
                                        absolute inset-0 w-full h-full object-cover rounded-t-2xl
                                        transition-opacity duration-500 ease-in-out
                                        ${hoveredProductId === product.id ? 'opacity-0' : 'opacity-100'}
                                    `}
                                />
                                {/* Imagen al hover */}
                                <img
                                    src={product.images[1]}
                                    alt={product.name}
                                    className={`
                                        absolute inset-0 w-full h-full object-cover rounded-t-2xl
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
        </section>
    );
}

export default Products;