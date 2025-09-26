import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import type { ProductModel } from "@/models/ProductModel";

interface ListPorductsProps {
    products: ProductModel[];    // Productos pasados por props
    className?: string;
}

function ListProducts({ products, className }: ListPorductsProps) {
    // Función para verificar si un producto tiene stock disponible
    const hasStock = (product: ProductModel): boolean => {
        return product.modelStock.some(stock => stock.stock > 0);
    };

    return (
        <div className={`p-5 ${className}`}>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map((product) => {
                    const productHasStock = hasStock(product);
                    
                    return (
                        <li
                            key={product.id}
                            className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
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
                                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                        />
                                    )}
                                    
                                    {/* Etiqueta de Sin Stock en esquina superior derecha */}
                                    {!productHasStock && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide shadow-lg">
                                                Sin Stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-center p-2 gap-1 bg-black">
                                    <h3 className="text-sm font-bold truncate text-white">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-white">
                                        ${product.price.toLocaleString('es-AR')}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ListProducts;