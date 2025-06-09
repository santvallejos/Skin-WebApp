import { BlurFade } from "../components/magicui/blur-fade";

// Definir las rutas de los medios (imágenes y video)
const media = [
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/sweet-cases-0a0659156a04ad5f8917228867568900-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/portada-cherry-f79b5912f45b2b876117228881975233-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/cuore-tambien-d8f5cc1aeb2551168d17228888669448-1024-1024.jpg" },
    { type: "video", url: "pruebavideo.mp4" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_4992-2060009c031c4f1fd617316171910221-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_6462-3bd4bdf0271cf88a7017398255478522-1024-1024.png" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_4979-138e68ccfc1be0aca417316171419600-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/vintage-case-negra-c468b419ea9128375317285049354616-1024-1024.jpg" },
];

function AboutUs() {
    return (
        <>
            <section id="about-me" className="py-16 bg-white rounded-l-2xl">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Bento Grid de imágenes y video (lado izquierdo) */}
                    <div className="w-full lg:w-1/2">
                        <div className="columns-2 gap-4 sm:columns-3">
                            {media.map((item, idx) => (
                                <BlurFade key={item.url} delay={0.25 + idx * 0.05} inView>
                                    {item.type === "image" ? (
                                        <img
                                            className="mb-4 size-full rounded-lg object-cover"
                                            src={item.url}
                                            alt={`Imagen ${idx + 1}`}
                                        />
                                    ) : (
                                        <video
                                            className="mb-4 size-full rounded-lg object-cover"
                                            src={item.url}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            controls={false}
                                        />
                                    )}
                                </BlurFade>
                            ))}
                        </div>
                    </div>
                    
                    {/* Información sobre mí (lado derecho) */}
                    <div className="w-full lg:w-1/2">
                        <BlurFade delay={0.3} inView>
                            <h2 className="text-5xl font-bold mb-6 text-black text-end">¿Quiénes Somos?</h2>
                            <div className="space-y-4">
                                <p className="text-xl text-black text-end">
                                    Mi nombre es Santiago Vallejos, tengo más de 2 años de experiencia como 
                                    <span className="text-blue-500 font-medium"> Full Stack Developer</span>, 
                                    me apasiona mucho la tecnología y el desarrollo de software.
                                </p>
                                <p className="text-xl text-black text-end">
                                    Actualmente estudio Licenciatura en Sistemas en la Universidad Nacional del Nordeste. 
                                    Participé en varios programas donde tuve la posibilidad de destacar algunos de 
                                    <span className="text-blue-500"> mis proyectos y trabajar en grupo</span>.
                                </p>
                                <p className="text-xl text-black text-end">
                                    <span className="text-blue-500">Mi objetivo</span> es mejorar continuamente en el ámbito 
                                    del desarrollo de software, aplicar mis conocimientos a proyectos reales y contribuir a su éxito.
                                </p>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </div>
            </section>

            <section id="#ComoComprar" className="text-gray-600 body-font bg-black">
                <div className="container px-5 pt-3 pb-12 mx-auto">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-white mb-20">¿Como Comprar?
                    </h1>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-100 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                1
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="text-white text-lg title-font font-medium mb-2">Elige tus productos</h2>
                                <p className="leading-relaxed text-base">Navega por nuestro catálogo y selecciona la funda perfecta para tu dispositivo</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-100 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                2
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="text-white text-lg title-font font-medium mb-2">Agrega al Carrito</h2>
                                <p className="leading-relaxed text-base">Añade los productos que desees a tu carrito de compras.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-100 text-shadow-orange-200 mb-4 flex-shrink-0 text-2xl">
                                3
                            </div>
                            <div className="flex-grow pl-6">
                                <h2 className="text-white text-lg title-font font-medium mb-2">Finaliza por WhatsApp</h2>
                                <p className="leading-relaxed text-base">Confirma tu pedido a través de WhatsApp y coordina la entrega</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default AboutUs;