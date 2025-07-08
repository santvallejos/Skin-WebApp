import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import type { ProductModel } from "@/models/ProductModel";

interface ListPorductsProps {
    products: ProductModel[];    // Productos pasados por props
    className?: string;
}

function ListProducts({ products, className }: ListPorductsProps) {
    return (
        <div className={`p-5 ${className}`}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                        <Link
                            to={`/products/${slugify(product.name)}`}
                            state={{ id: product.id }}
                            className="flex flex-col h-full group"
                        >
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                />
                                {product.images[1] && (
                                    <img
                                        src={product.images[1]}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col items-center p-4 gap-2 bg-black">
                                <h3 className="text-lg font-bold truncate text-white">
                                    {product.name}
                                </h3>
                                <p className="text-lg text-white">
                                    ${product.price}
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