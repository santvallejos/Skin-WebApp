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
    const Quantity = useState<number>(1);
    const [productsRandom, setProductsRandom] = useState<ProductModel[]>([]);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const [selectModel, setSelectModel] = useState<string>('');

    const handleAddCart = (product: ProductModel) => {
        const productToCart = {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            model: selectModel || product.modelsStock[0].model
        }
        addCart(productToCart, Quantity[0]);
    }

    const addQuantity = () => {
        Quantity[1](Quantity[0] + 1);
    }

    const removeQuantity = () => {
        if (Quantity[0] > 1) {
            Quantity[1](Quantity[0] - 1);
        }
    }

    const handleSelectModel = (model: string) => {
        setSelectModel(model);
    }

    useEffect(() => {
        const nameOriginal = slug ? deslugify(slug) : '';
        if (nameOriginal) {
            getProductByName(nameOriginal).then((product) => {
                setProduct(product);
                // Seleccionar el primer modelo con stock disponible
                const firstAvailableModel = product.modelsStock.find(model => model.stock > 0);
                if (firstAvailableModel) {
                    setSelectModel(firstAvailableModel.model);
                }
            })
            getProductsRandom().then((products) => {
                setProductsRandom(products);
            })
        }
    }, [slug]);

    return (
        <section className='py-16'>
            <div className='container mx-auto px-4 pb-5'>
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
                            <p className="text-4xl font-bold mb-2">${product?.price.toFixed(3)}</p>
                            <p className="text-sm text-green-600 font-medium mt-2">Envío gratis superando los $35.000</p>
                        </div>

                        {/* Model Selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">MODELO:</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {product?.modelsStock.map((variant, idx) => (
                                    <button
                                        key={idx}
                                        className={`px-3 py-2 border rounded text-sm transition-colors ${
                                            variant.stock === 0 
                                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                : selectModel === variant.model
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-300 hover:border-indigo-500'
                                        }`}
                                        disabled={variant.stock === 0}
                                        onClick={() => variant.stock > 0 && handleSelectModel(variant.model)}
                                    >
                                        {variant.model}
                                        {variant.stock === 0 && (
                                            <span className="block text-xs mt-1">Sin stock</span>
                                        )}
                                        {selectModel === variant.model && variant.stock > 0 && (
                                            <span className="block text-xs mt-1 text-indigo-600">Seleccionado</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-gray-300 rounded">
                                <button className="px-3 py-2 hover:bg-gray-100" onClick={removeQuantity}>-</button>
                                <span className="px-4 py-2 border-x border-gray-300">{Quantity[0]}</span>
                                <button className="px-3 py-2 hover:bg-gray-100" onClick={addQuantity}>+</button>
                            </div>
                            <button
                                className="flex-1 bg-red-500 text-white py-3 px-6 rounded font-medium hover:bg-red-600 transition-colors"
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


            <h2 className='text-4xl font-bold text-[#d41e2b] text-center text-shadow-lg/20'>Otras fundas</h2>

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