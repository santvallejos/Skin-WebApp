import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CaseModel, CaseStock } from '@/models/ProductModel';
import { useCartStore } from '@/store/CartStore';
import { deslugify } from '@/lib/deslugify';
import { getColorName } from '../../mappers/ColorMapper';
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

    const { name: slug } = useParams<{ name: string }>();                        // Get product name from URL params
    const [product, setProduct] = useState<CaseModel>();                         // Store the product in a state when querying the product with the name we received as a slug parameter
    const Quantity = useState<number>(1);                                        // Quantity state   
    const [productsRandom, setProductsRandom] = useState<CaseModel[]>([]);       // State to store random products
    const [selectModel, setSelectModel] = useState<string>();                    // State to store selected model
    const [selectColor, setSelectColor] = useState<string>();                    // State to store selected color
    const [isLoading, setIsLoading] = useState<boolean>(true);                   // Loading state
    const [notFound, setNotFound] = useState<boolean>(false);                    // If product not found

    /**
     * Check if the product has color variations
     * 
     * @returns True if the product has color variations, false otherwise
     */
    const hasColorVariations = () => {
        if (!product) return false;

        return product.modelStock.some(stock => stock.color_hex !== null && stock.stock > 0);
    };

    /**
     * Add product to cart
     * 
     * @param product Product to add
     */
    const handleAddCart = async (product: CaseModel) => { 
        // For products without color variations, look for stock without considering color
        const selectedStock = hasColorVariations()
            ? product.modelStock.find((stock: CaseStock) =>
                stock.phone_model?.name === selectModel && stock.color_hex === selectColor
            )
            : product.modelStock.find((stock: CaseStock) =>
                stock.phone_model?.name === selectModel && stock.color_hex === null
            );

        if (!selectedStock || selectedStock.stock === 0) {
            alert('Por favor selecciona un modelo disponible');
            return;
        }

        const productToCart = {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            model: selectModel || '',
            color: hasColorVariations() ? getColorName(selectColor ?? null) : undefined
        }
        addCart(productToCart, Quantity[0], selectedStock.stock);
    }

    /**
     * Add quantity
     */
    const addQuantity = () => {
        Quantity[1](Quantity[0] + 1);
    }

    /**
     * Remove quantity
     */
    const removeQuantity = () => {
        if (Quantity[0] > 1) {
            Quantity[1](Quantity[0] - 1);
        }
    }

    /**
     * Handle select color
     * 
     * @param colorHex Color hex to select
     */
    const handleSelectColor = (colorHex: string) => {
        setSelectColor(colorHex);
        // Reset model selection when color changes
        setSelectModel(undefined);
    }

    /**
     * Handle select model
     * 
     * @param modelName Model name to select
     */
    const handleSelectModel = (modelName: string) => {
        setSelectModel(modelName);
    }

    /**
     * Get available colors with stock
     * 
     * @return Array of colors with stock, or empty array if product has no colors
    */
    const getAvailableColors = () => {
        if (!product) return [];

        const colorsMap = new Map<string, number>();

        product.modelStock.forEach(stock => {
            if (stock.stock > 0) {
                // If color_hex is null, use 'no-color' as key
                const colorKey = stock.color_hex || 'no-color';
                const currentStock = colorsMap.get(colorKey) || 0;
                colorsMap.set(colorKey, currentStock + stock.stock);
            }
        });

        // If the only key is 'no-color', return an empty array (indicating no colors)
        if (colorsMap.size === 1 && colorsMap.has('no-color')) {
            return [];
        }

        // Filter only real colors (not null)
        return Array.from(colorsMap.entries())
            .filter(([hex]) => hex !== 'no-color')
            .map(([hex, totalStock]) => ({
                hex,
                name: getColorName(hex ?? null),
                stock: totalStock
            }));
    };

    /**
     * Get all available models in the system (not just those with stock for this product)
     * 
     * @returns Array of all available models in the system
     */
    const getAvailableModels = () => {
        return availableModels;
    };

    /**
     * Check if a specific model and color combination is in stock
     * 
     * @param modelName Model name to check
     * @param colorHex Color hex to check (optional for products without color)
     * @returns True if the model and color combination is in stock, false otherwise
     */
    const hasStock = (modelName: string, colorHex?: string) => {
        if (!product) return false;

        return product.modelStock.some(stock =>
            stock.phone_model?.name === modelName &&
            (hasColorVariations()
                ? (colorHex ? stock.color_hex === colorHex : true)
                : stock.color_hex === null || stock.color_hex === colorHex
            ) &&
            stock.stock > 0
        );
    };

    useEffect(() => {
        const nameOriginal = slug ? deslugify(slug) : '';
        setIsLoading(true);
        if (nameOriginal) {
            const loadProduct = async () => {
                try {
                    const prodcutData = await getCasesByName(nameOriginal);
                    setProduct(prodcutData);

                    // If the product has color variations, select the first available color and model
                    if (prodcutData.modelStock.some(stock => stock.color_hex !== null && stock.stock > 0)) {
                        // Get the first available color
                        const firstAvailableStock = prodcutData.modelStock.find((stock: CaseStock) =>
                            stock.stock > 0 && stock.color_hex !== null
                        );

                        if (firstAvailableStock) {
                            setSelectColor(firstAvailableStock.color_hex);
                            // Then select the first available model for that color
                            const firstModelForColor = prodcutData.modelStock.find((stock: CaseStock) =>
                                stock.color_hex === firstAvailableStock.color_hex &&
                                stock.stock > 0 &&
                                stock.phone_model
                            );
                            if (firstModelForColor?.phone_model) {
                                setSelectModel(firstModelForColor.phone_model.name);
                            }
                        }
                    } else {
                        // If the product does not have color variations, only select the first available model
                        const firstAvailableStock = prodcutData.modelStock.find((stock: CaseStock) =>
                            stock.stock > 0 && stock.color_hex === null && stock.phone_model
                        );

                        if (firstAvailableStock?.phone_model) {
                            setSelectModel(firstAvailableStock.phone_model.name);
                            setSelectColor(undefined); // No color to select
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
                                            <Skeleton className="h-[42px] w-[108]" />
                                        </div>
                                        <Skeleton className='h-[48px] w-[484px]' />
                                    </div>

                                    {/* Aditional info */}
                                    <div className="text-sm text-gray-600">
                                        <Skeleton className="h-[17px] w-[111px]" />
                                        <Skeleton className="h-[17px] w-[111px]" />
                                        <Skeleton className="h-[17px] w-[111px]" />
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
                                        containerClassName='rounded-2xl' />
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

                                    {/* Color Selection - Show only if the product has color variations */}
                                    {hasColorVariations() && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-3">COLOR:</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {getAvailableColors().map((colorInfo) => (
                                                    <button
                                                        key={colorInfo.hex}
                                                        className={`w-12 h-12 rounded-full border-4 transition-all ${selectColor === colorInfo.hex
                                                                ? 'border-indigo-500 scale-110'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                            }`}
                                                        style={{ backgroundColor: colorInfo.hex }}
                                                        onClick={() => handleSelectColor(colorInfo.hex)}
                                                        title={`${colorInfo.name} - Stock total: ${colorInfo.stock}`}
                                                    />
                                                ))}
                                            </div>
                                            {selectColor && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Color seleccionado: {getColorName(selectColor ?? null)}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Model Selection */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">MODELOS:</h3>
                                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                                            {getAvailableModels().map((modelName) => {
                                                const modelHasStock = hasColorVariations()
                                                    ? (selectColor ? hasStock(modelName, selectColor) : hasStock(modelName))
                                                    : hasStock(modelName);
                                                return (
                                                    <button
                                                        key={modelName}
                                                        className={`px-1 py-1 border rounded text-sm transition-colors lg:h-14 h-full ${!modelHasStock
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
                                                                {hasColorVariations() && selectColor ? 'No disponible' : 'No disponible'}
                                                            </span>
                                                        )}
                                                        {selectModel === modelName && modelHasStock && (
                                                            <span className="block text-xs mt-1 text-indigo-600">Seleccionado</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
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
                                            className={`flex-1 py-3 px-6 rounded font-medium transition-colors ${selectModel && (hasColorVariations() ? selectColor : true)
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            onClick={() => product && handleAddCart(product)}
                                            disabled={!selectModel || (hasColorVariations() && !selectColor)}
                                        >
                                            {!selectModel
                                                ? 'Selecciona modelo'
                                                : hasColorVariations() && !selectColor
                                                    ? 'Selecciona color'
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

                        <ListProducts products={productsRandom} className='lg:pl-24 lg:pr-24' />
                    </div>
                )}
            </section>
        );
    }
}

export default Product;