import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import { useState } from "react";
import type { ProductModel } from "@/models/ProductModel";

interface ListPorductsProps {
    products: ProductModel[];    // Productos pasados por props
}

function ListProducts({ products }: ListPorductsProps) {
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

    return (
        <div className="p-5">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="flex flex-col bg-[#191919] rounded-2xl border border-neutral-400 shadow-2xl overflow-hidden"
                    >
                        <Link
                            to={`/products/${slugify(product.name)}`}
                            state={{ id: product.id }}
                            className="flex flex-col h-full"
                            onMouseEnter={() => setHoveredProductId(product.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div className="relative w-full aspect-[3/4]">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className={`
                                    absolute inset-0 w-full h-full object-cover
                                    transition-opacity duration-500 ease-in-out
                                    ${hoveredProductId === product.id ? 'opacity-0' : 'opacity-100'}
                                `}
                                />
                                {product.images[1] && (
                                    <img
                                        src={product.images[1]}
                                        alt={product.name}
                                        className={`
                                    absolute inset-0 w-full h-full object-cover
                                    transition-opacity duration-500 ease-in-out
                                    ${hoveredProductId === product.id ? 'opacity-100' : 'opacity-0'}
                                    `}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col items-center p-4 gap-2">
                                <h3 className="text-lg font-bold text-white truncate">
                                    {product.name}
                                </h3>
                                <p className="text-lg text-white">
                                    ${product.price.toFixed(3)}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListProducts;