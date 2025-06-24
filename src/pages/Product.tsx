import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { slugify } from '@/lib/slugify';
import type { ProductModel } from '@/models/ProductModel';
import { getProductByName, getProductsRandom} from '@/services/ProductsServices';
import { useCartStore } from '@/store/CartStore';
import { deslugify } from '@/lib/deslugify';
import Carousel from '@/components/Carousel';

function Product() {
    const {
        addCart
    } = useCartStore();
    const { name: slug } = useParams<{ name: string }>();
    const [product, setProduct] = useState<ProductModel>();
    const [productsRandom, setProductsRandom] = useState<ProductModel[]>([]);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

    const handleAddCart = (product: ProductModel) => {
        const productToCart = {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            model: product.modelsStock[0].model
        }
        addCart(productToCart);
    }

    useEffect(() => {
        const nameOriginal = slug ? deslugify(slug) : '';
        if (nameOriginal) {
            getProductByName(nameOriginal).then((product) => {
                setProduct(product);
            })
            getProductsRandom().then((products) => {
                setProductsRandom(products);
            })
        }
    }, [slug]);

    return (
        <section className='py-16'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row gap-8 items-start'>
                    {/* Carousel Section */}
                    <div className="lg:w-1/2">
                        <Carousel 
                        images={product?.images}
                        showIndicators={false}
                        containerClassName='rounded-2xl'/>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">{product?.description}</p>

                        {/* Price Section */}
                        <div className="mb-8">
                            <p className="text-4xl font-bold text-indigo-600 mb-2">${product?.price.toFixed(3)}</p>
                            <p className="text-sm text-gray-500">3 cuotas sin interés de ${product ? (product.price / 3).toFixed(2) : '0'}</p>
                            <p className="text-sm text-gray-500">15% de descuento pagando con Efectivo/Transferencia</p>
                            <p className="text-sm text-green-600 font-medium mt-2">Envío gratis superando los $35.000</p>
                        </div>

                        {/* Model Selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">MODELO:</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {product?.modelsStock.map((variant, idx) => (
                                    <button
                                        key={idx}
                                        className="px-3 py-2 border border-gray-300 rounded text-sm hover:border-indigo-500 transition-colors"
                                    >
                                        {variant.model}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-gray-300 rounded">
                                <button className="px-3 py-2 hover:bg-gray-100">-</button>
                                <span className="px-4 py-2 border-x border-gray-300">1</span>
                                <button className="px-3 py-2 hover:bg-gray-100">+</button>
                            </div>
                            <button
                                className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
                                onClick={() => product && handleAddCart(product)}
                            >
                                Agregar al carrito
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-sm text-gray-600">
                            <p className="mb-2"><strong>Medios de envío</strong></p>
                            <p>• Envío a domicilio</p>
                            <p>• Retiro en sucursal</p>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="flex flex-col gap-4 justify-center items-center">
                <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {productsRandom.map((product) => (
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

export default Product;