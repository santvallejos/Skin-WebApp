import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect } from "react";
import { getAllProducts } from "@/services/ProductsServices";
import ListProducts from "@/components/ListProducts";
import { useProductStore } from "@/store/ProductsStore";
import { Checkbox } from "@/components/ui/checkbox";

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
                <div>
                    <Sheet>
                        <SheetTrigger className="p-2 inset-shadow-sm rounded-2xl shadow-xl">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#d41e2b"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 6l8 0" /><path d="M16 6l4 0" /><path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12l2 0" /><path d="M10 12l10 0" /><path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 18l11 0" /><path d="M19 18l1 0" /></svg>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="pt-4">Ordenar Por:</SheetTitle>
                                <select name="order" id="" className="select select-bordered border border-black p-1 rounded-lg">
                                    <option value="default">Destacados</option>
                                    <option value="priceMax">Precio: mayor a menor</option>
                                    <option value="priceMin">Precio: menor a mayor</option>
                                    <option value="az">A - Z</option>
                                    <option value="za">Z - A</option>
                                </select>
                                <SheetTitle className="pt-4">Color</SheetTitle>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="Rojo" />
                                        <label htmlFor="Rojo">Rojo</label>
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="Negro" />
                                        <label htmlFor="Negro">Negro</label>
                                        <span className="w-3 h-3 bg-black rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="Blanco" />
                                        <label htmlFor="Blanco">Blanco</label>
                                        <span className="w-3 h-3 bg-white border border-black rounded-full"></span>
                                    </div>
                                </div>

                                <SheetTitle className="pt-4">Modelo</SheetTitle>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="iPhone11" />
                                        <label htmlFor="iPhone11">iPhone 11</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="iPhone12" />
                                        <label htmlFor="iPhone12">iPhone 12</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="iPhone13" />
                                        <label htmlFor="iPhone13">iPhone 13</label>
                                    </div>
                                </div>

                                <SheetTitle className="pt-4">Precio</SheetTitle>
                                <div className="flex flex-col gap-2">
                                    <input type="number" className="input input-bordered border border-black p-1 rounded-lg" placeholder="Precio Minimo" />
                                    <input type="number" className="input input-bordered border border-black p-1 rounded-lg" placeholder="Precio Maximo" />
                                </div>
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