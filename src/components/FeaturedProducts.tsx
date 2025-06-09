function FeaturedProducts() {
    const productsFeatured = [
        {
            id: "26da8fa7-9f7c-492d-8bd0-d5c5b460135e",
            name: "Fire Silver Matte",
            image: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/fire-silver-matte-2adab46b59b448ce4b17359145710054-1024-1024.jpg",
            price: "10.000"
        },
        {
            id: "352899e7-d155-43dd-b002-5dc9777287a3",
            name: "Snake Case Silver",
            image: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_0197-0107b7586ca2bf726317480348168206-1024-1024.jpg",
            price: "10.000"
        },
        {
            id: "8e16ce95-a786-4fa8-a31b-972cdeb7ab99",
            name: "Vintage Case",
            image: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/seee-06d536ebbf3b13299317278954716808-1024-1024.jpg",
            price: "9.000"
        },
        {
            id: "7e9bb483-7b46-48ee-8d6a-1cdd7b0339a4",
            name: "Junk Case",
            image: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/captura-de-pantalla-2024-11-14-a-las-5-38-32p-m-459621b0d779331bb917316167189787-1024-1024.png",
            price: "9.000"
        }
    ];


    return (
        <section className="flex flex-col gap-4 p-4 bg-black">
            {/* Title */}
            <div className="flex justify-center items-center w-full">
                <h2 className="text-2xl font-bold">Featured Products</h2>
            </div>

            {/* Products */}
            <div className="flex justify-center items-center p-5">
                <ul className="flex flex-col gap-4 justify-center items-center">
                    <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {productsFeatured.map((product) => (
                            <div className="flex flex-col gap-2 w-full h-full">
                                <img src={product.image} alt={product.name} className="w-92 h-92 object-cover rounded-2xl"/>
                                <div className="flex flex-col items-center gap-2">
                                    <h3 className="text-lg font-bold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default FeaturedProducts;