import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "react-router-dom";
import slugify from "@/lib/slugify";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import type { Product } from "@/models/ProductModel";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);

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
                        <Link to={`/products/${slugify(product.name)}`} state={{ id: product.id }} className="flex flex-col gap-2 w-full h-full">
                            <img src={product.imageUrl} alt={product.name} className="w-92 h-92 object-cover rounded-2xl" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-500">${product.price.toFixed(3)}</p>
                            </div>
                        </Link>
                    ))}
                </li>
            </ul>
        </section>
    );
}

export default Products;