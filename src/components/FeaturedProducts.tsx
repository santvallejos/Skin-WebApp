import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import { useState } from "react";

function FeaturedProducts() {
    const productsFeatured = [
        {
            id: "26da8fa7-9f7c-492d-8bd0-d5c5b460135e",
            name: "Fire Silver Matte",
            image: ["https://acdn-us.mitiendanube.com/stores/001/096/065/products/fire-silver-matte-2adab46b59b448ce4b17359145710054-1024-1024.jpg",
                    "https://acdn-us.mitiendanube.com/stores/001/096/065/products/portada-flame-case-matte-da9e52b002ed13189517359145671368-1024-1024.jpg"],
            price: 10.000
        },
        {
            id: "8e16ce95-a786-4fa8-a31b-972cdeb7ab99",
            name: "Vintage Case",
            image: ["https://acdn-us.mitiendanube.com/stores/001/096/065/products/seee-06d536ebbf3b13299317278954716808-1024-1024.jpg",
                    "https://acdn-us.mitiendanube.com/stores/001/096/065/products/portada-vintage-case-3b938ffee99bc3d53c17278952466993-1024-1024.jpg"],
            price: 9.000
        },
        {
            id: "7e9bb483-7b46-48ee-8d6a-1cdd7b0339a4",
            name: "Junk Case",
            image: ["https://acdn-us.mitiendanube.com/stores/001/096/065/products/captura-de-pantalla-2024-11-14-a-las-5-38-32p-m-459621b0d779331bb917316167189787-1024-1024.png",
                    "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_4992-2060009c031c4f1fd617316171910221-1024-1024.jpg"],
            price: 9.000
        }
    ];

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
                        {productsFeatured.map((product) => (
                            <div 
                                key={product.id}
                                className="flex flex-col gap-2 w-full h-full bg-white p-5 rounded-2xl"
                            >
                                <Link 
                                    to={`/products/${slugify(product.name)}`} 
                                    state={{ id: product.id }} 
                                    className="flex flex-col gap-2 w-full h-full"
                                    onMouseEnter={() => setHoveredProductId(product.id)}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <img 
                                        src={hoveredProductId === product.id ? product.image[1] : product.image[0]} 
                                        alt={product.name} 
                                        className="w-92 h-92 object-cover rounded-2xl transition-all duration-300" 
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <h3 className="text-lg font-bold">{product.name}</h3>
                                        <p className="text-lg text-gray-500">${product.price.toFixed(3)}</p>
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