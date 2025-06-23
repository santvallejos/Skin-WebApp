import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import type { Product } from "@/models/ProductModel";
import ListProducts from "@/components/ListProducts";

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

            <ListProducts products={products} />
        </section>
    );
}

export default Products;