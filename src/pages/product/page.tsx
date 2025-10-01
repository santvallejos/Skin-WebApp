import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CaseModel, CaseStock } from '@/models/ProductModel';
import { useCartStore } from '@/store/CartStore';
import { deslugify } from '@/lib/deslugify';
import Carousel from '@/components/Carousel';
import { Skeleton } from '@/components/ui/skeleton';
import ListProducts from '@/components/ListProducts';
import NotProduct from './NotProduct';
import { getCasesByName, getCasesRandom } from '@/services/ProductsServices';
import { usePhoneModels } from '@/hooks/usePhoneModels';

function Product() {
    const {
        addCart
    } = useCartStore();

    const { models: availableModels } = usePhoneModels();

    const { name: slug } = useParams<{ name: string }>();
    const [product, setProduct] = useState<CaseModel>();
    const Quantity = useState<number>(1);
    const [productsRandom, setProductsRandom] = useState<CaseModel[]>([]);
    const [selectModel, setSelectModel] = useState<string>();
    const [selectColor, setSelectColor] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    const handleAddCart = async (product: CaseModel) => {
        const selectedStock = product.modelStock.find((stock: CaseStock) => 
            stock.phone_model?.name === selectModel && stock.color_hex === selectColor
        );
        
        if (!selectedStock || selectedStock.stock === 0) {
            alert('Por favor selecciona un modelo y color disponible');
            return;
        }
        
        const productToCart = {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            model: selectModel || '',
            color: selectColor
        }
        addCart(productToCart, Quantity[0], selectedStock.stock);
    }

    const addQuantity = () => {
        Quantity[1](Quantity[0] + 1);
    }

    const removeQuantity = () => {
        if (Quantity[0] > 1) {
            Quantity[1](Quantity[0] - 1);
        }
    }

    const handleSelectColor = (colorHex: string) => {
        setSelectColor(colorHex);
        // Reset model selection when color changes
        setSelectModel(undefined);
    }

    const handleSelectModel = (modelName: string) => {
        setSelectModel(modelName);
    }

    useEffect(() => {
        const nameOriginal = slug ? deslugify(slug) : '';
        setIsLoading(true);
        if (nameOriginal) {
            const loadProduct = async () => {
                try {
                    const prodcutData = await getCasesByName(nameOriginal); 
                    setProduct(prodcutData);

                    // Obtener el primer color disponible
                    const firstAvailableStock = prodcutData.modelStock.find((stock: CaseStock) => 
                        stock.stock > 0
                    );
                    
                    if (firstAvailableStock) {
                        setSelectColor(firstAvailableStock.color_hex);
                        // Luego seleccionar el primer modelo disponible para ese color
                        const firstModelForColor = prodcutData.modelStock.find((stock: CaseStock) => 
                            stock.color_hex === firstAvailableStock.color_hex && 
                            stock.stock > 0 && 
                            stock.phone_model
                        );
                        if (firstModelForColor?.phone_model) {
                            setSelectModel(firstModelForColor.phone_model.name);
                        }
                    }

                    const randomProducts = await getCasesRandom(nameOriginal);
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

    // Obtener todos los colores únicos disponibles para este producto
    const getAvailableColors = () => {
        if (!product) return [];
        
        const colorsMap = new Map<string, number>();
        
        product.modelStock.forEach(stock => {
            if (stock.stock > 0) {
                const currentStock = colorsMap.get(stock.color_hex) || 0;
                colorsMap.set(stock.color_hex, currentStock + stock.stock);
            }
        });
        
        return Array.from(colorsMap.entries()).map(([hex, totalStock]) => ({
            hex,
            stock: totalStock
        }));
    };

    // Obtener modelos disponibles para el color seleccionado
    const getAvailableModels = () => {
        if (!product) return [];
        
        // Obtener todos los modelos únicos que existen en este producto
        const productModelNames = new Set<string>();
        product.modelStock.forEach(stock => {
            if (stock.phone_model) {
                productModelNames.add(stock.phone_model.name);
            }
        });
        
        // Retornar todos los modelos del array principal que existen en este producto
        return availableModels.filter(model => productModelNames.has(model));
    };

    // Verificar si una combinación modelo+color tiene stock
    const hasStock = (modelName: string, colorHex?: string) => {
        if (!product) return false;
        
        return product.modelStock.some(stock => 
            stock.phone_model?.name === modelName &&
            (colorHex ? stock.color_hex === colorHex : true) &&
            stock.stock > 0
        );
    };

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

                            {/* Color Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">COLOR:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {getAvailableColors().map((colorInfo) => (
                                        <button
                                            key={colorInfo.hex}
                                            className={`w-12 h-12 rounded-full border-4 transition-all ${
                                                selectColor === colorInfo.hex
                                                    ? 'border-indigo-500 scale-110'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            style={{ backgroundColor: colorInfo.hex }}
                                            onClick={() => handleSelectColor(colorInfo.hex)}
                                            title={`Color ${colorInfo.hex} - Stock total: ${colorInfo.stock}`}
                                        />
                                    ))}
                                </div>
                                {selectColor && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Color seleccionado: {selectColor}
                                    </p>
                                )}
                            </div>

                            {/* Model Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">MODELO:</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {getAvailableModels().map((modelName) => {
                                        const modelHasStock = selectColor ? hasStock(modelName, selectColor) : hasStock(modelName);
                                        return (
                                            <button
                                                key={modelName}
                                                className={`px-1 py-1 border rounded text-sm transition-colors lg:h-14 h-full ${
                                                    !modelHasStock
                                                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                        : selectModel === modelName
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                        : 'border-gray-300 hover:border-indigo-500'
                                                }`}
                                                disabled={!modelHasStock}
                                                onClick={() => modelHasStock && handleSelectModel(modelName)}
                                            >
                                                {modelName}
                                                {!modelHasStock && (
                                                    <span className="block text-xs mt-1">
                                                        {selectColor ? 'No disponible en este color' : 'Sin stock'}
                                                    </span>
                                                )}
                                                {selectModel === modelName && modelHasStock && (
                                                    <span className="block text-xs mt-1 text-indigo-600">Seleccionado</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>                            {/* Quantity and Add to Cart */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center border border-gray-300 rounded">
                                    <button className="px-3 py-2 hover:bg-gray-100" onClick={removeQuantity}>-</button>
                                    <span className="px-4 py-2 border-x border-gray-300">{Quantity[0]}</span>
                                    <button className="px-3 py-2 hover:bg-gray-100" onClick={addQuantity}>+</button>
                                </div>
                                <button
                                    className={`flex-1 py-3 px-6 rounded font-medium transition-colors ${
                                        selectModel && selectColor
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    onClick={() => product && handleAddCart(product)}
                                    disabled={!selectModel || !selectColor}
                                >
                                    {!selectModel || !selectColor 
                                        ? 'Selecciona modelo y color' 
                                        : 'Agregar al carrito'
                                    }
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

                <ListProducts products={productsRandom} className='lg:pl-24 lg:pr-24'/>
                </div>
            )}
        </section>
    );
    }
}

export default Product;