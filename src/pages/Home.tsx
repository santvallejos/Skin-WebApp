import Carousel from '../components/Carousel';
import AboutUs from '../components/AboutUs';
import AnimatedContent from '@/components/ui/AnimatedContent';
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/services/ProductsServices";
import type { ProductModel } from "@/models/ProductModel";
import ListProducts from '@/components/ListProducts';
import carouse1 from '@/assets/carousel/carousel1.webp';
import carouse2 from '@/assets/carousel/carousel2.webp';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchFeatureProducts = async () => {
            try {
                const featuredProductsData = await getFeaturedProducts();
                setFeaturedProducts(featuredProductsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchFeatureProducts();
    });

    return (
        <>
            <Carousel
                images={[
                    carouse1,
                    carouse2
                ]}
                autoPlayInterval={5000}
                showControls={true}
                showIndicators={true}/>
                <div className="flex flex-col gap-4 p-4 bg-[#f2ebd9] rounded-b-3xl">
                    {/* Title */}
                    <div className="flex justify-center items-center w-full">
                        <h2 className="text-4xl font-bold text-[#d41e2b] text-shadow-lg/20">Productos Destacados</h2>
                    </div>

                    {/* Lista de productos */}
                    <ListProducts products={featuredProducts} />
                </div>
            <AboutUs />


                <section id="ComoComprar" className="body-font bg-[#f2ebd9] rounded-t-3xl">
                    <div className="container px-5 pt-3 pb-12 mx-auto">
                        <h1 className="text-[#d41e2b] sm:text-3xl text-4xl title-font text-center mb-12 font-bold text-shadow-lg/20">
                            ¿Como Comprar?
                        </h1>

                        <AnimatedContent
                            distance={70}
                            direction="vertical"
                            reverse={false}
                            duration={0.8}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity
                            scale={1.1}
                            threshold={0.1}
                            delay={0}>
                        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                            <div className="p-4 md:w-1/3 flex">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-300 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#ff1515"  className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                </div>
                                <div className="flex-grow pl-6">
                                    <h2 className=" text-lg title-font font-medium mb-2">1. Elige tus productos</h2>
                                    <p className="leading-relaxed text-base">Navega por nuestro amplio catálogo de productos y selecciona la funda perfecta para tu dispositivo.</p>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3 flex">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-300 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ff1515"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                </div>
                                <div className="flex-grow pl-6">
                                    <h2 className=" text-lg title-font font-medium mb-2">2. Agrega al Carrito</h2>
                                    <p className="leading-relaxed text-base">Añade los productos que desees a tu carrito de compras.</p>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3 flex">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-300 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ff1515"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                                </div>
                                <div className="flex-grow pl-6">
                                    <h2 className=" text-lg title-font font-medium mb-2">3. Finaliza por WhatsApp</h2>
                                    <p className="leading-relaxed text-base">Cuando tengas todos tus productos listos para la compra, confirma el pedido por whatsapp y coordina la entrega del pedido.</p>
                                </div>
                            </div>
                        </div>
                        </AnimatedContent>
                    </div>
                </section>
        </>
    );
}

export default Home;