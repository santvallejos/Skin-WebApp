import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ProductModel } from '@/models/ProductModel';
import { getProductByName, getProductsRandom} from '@/services/ProductsServices';
import { useCartStore } from '@/store/CartStore';
import { deslugify } from '@/lib/deslugify';
import Carousel from '@/components/Carousel';
import { Skeleton } from '@/components/ui/skeleton';
import ListProducts from '@/components/ListProducts';
import NotProduct from './NotProduct';
import Notifications, { AddToCart } from '@/components/Notifications';

function Product() {
    const {
        addCart
    } = useCartStore();

    const { name: slug } = useParams<{ name: string }>();
    const [product, setProduct] = useState<ProductModel>();
    const Quantity = useState<number>(1);
    const [productsRandom, setProductsRandom] = useState<ProductModel[]>([]);
    const [selectModel, setSelectModel] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    const handleAddCart = (product: ProductModel) => {
        const productToCart = {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            model: selectModel || product.modelsStock[0].model
        }
        addCart(productToCart, Quantity[0]);
        AddToCart(productToCart.name, selectModel || product.modelsStock[0].model, productToCart.price, Quantity[0]);
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
        setIsLoading(true);
        if (nameOriginal) {
            const loadProduct = async () => {
                try {
                    const prodcutData = await getProductByName(nameOriginal);
                    setProduct(prodcutData);

                    //Seleccionar el primer modelo con stock disponible
                    const firtsAvailableModel = prodcutData.modelsStock.find(model => model.stock > 0);
                    if (firtsAvailableModel) {
                        setSelectModel(firtsAvailableModel.model);
                    }

                    const randomProducts = await getProductsRandom(nameOriginal);
                    setProductsRandom(randomProducts);
                    setNotFound(false);
                } catch (error) {
                    console.error('Error al cargar el producto:', error);
                    setNotFound(true);
                } finally {
                    setIsLoading(false);
                }
            }
            loadProduct();
        } else {
            setNotFound(true);
            setIsLoading(false);
        }
    }, [slug, setIsLoading]);

    if (notFound) {
        return <NotProduct />
    } else {
        return (
            <section className='py-16'>
                {isLoading ? (
                    <div>
                    <div className='container mx-auto px-4 pb-5'>
                        <div className='flex flex-col lg:flex-row gap-8 items-start'>
                            
                            {/* Carousel Section */}
                            <div className="lg:w-1/2">
                                <Skeleton className="h-[480px] w-[600px]" />
                            </div>

                            {/* Product Info */}
                            <div className="lg:w-1/2">
                                <Skeleton className="h-[36px] w-[200px]" />
                                <Skeleton className="h-[156px] w-[608px]" />

                                {/* Price Section */}
                                <div className="mb-8">
                                    <Skeleton className="h-[40px] w-[200px]" />
                                    <Skeleton className="h-[20px] w-[250px]" />
                                </div>

                                {/* Model Selection */}
                                <div className='mb-6'>
                                    <Skeleton className="h-[28px] w-[100px]" />
                                    <Skeleton className="h-[348px] w-[608px]" />
                                </div>

                                {/* Quantity and Add to Cart */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center border rounded">
                                        <Skeleton className="h-[42px] w-[108]"/>
                                    </div>
                                    <Skeleton className='h-[48px] w-[484px]'/>
                                </div>

                                {/* Aditional info */}
                                <div className="text-sm text-gray-600">
                                    <Skeleton className="h-[17px] w-[111px]"/>
                                    <Skeleton className="h-[17px] w-[111px]"/>
                                    <Skeleton className="h-[17px] w-[111px]"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='container mx-auto px-4 pb-28'>
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
                                <p className="text-4xl font-bold mb-2">${product?.price.toLocaleString('es-AR')}</p>
                                <p className="text-sm text-green-600 font-medium mt-2">Envío gratis superando los $35.000</p>
                            </div>

                            {/* Model Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">MODELO:</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {product?.modelsStock.map((variant, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-1 py-1 border rounded text-sm transition-colors h-14 ${
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

                <ListProducts products={productsRandom} className='pl-24 pr-24'/>
                </div>
            )}
            <Notifications />
        </section>
    );
    }
}
export default Product;