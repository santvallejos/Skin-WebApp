import { BlurFade } from "../components/magicui/blur-fade";

// Definir las rutas de los medios (imágenes y video)
const media = [
    { type: "video", url: "pruebavideo.mp4" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/vintage-case-negra-c468b419ea9128375317285049354616-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/sweet-cases-0a0659156a04ad5f8917228867568900-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_4992-2060009c031c4f1fd617316171910221-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_4979-138e68ccfc1be0aca417316171419600-1024-1024.jpg" },
    { type: "image", url: "https://acdn-us.mitiendanube.com/stores/001/096/065/products/img_6462-3bd4bdf0271cf88a7017398255478522-1024-1024.png" },
];

function AboutUs() {
    return (
        <>
            <section id="about-me" className="py-16 bg-white">
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
                                    <p className="text-2xl text-black text-end">
                                        <span className="text-[#d41e2b] font-medium">Skin</span> nace de una idea clara: darle un estilo propio a tus dispositivos.
                                    </p>
                                    <p className="text-2xl text-black text-end">
                                        Nuestras fundas están pensadas para quienes quieren algo más que lo común.
                                        Texturas únicas, diseños llamativos y detalles que no vas a encontrar en cualquier lugar.
                                    </p>
                                    <p className="text-2xl text-black text-end">
                                        Creemos que una funda no es solo protección: es una forma de darle originalidad a tu dispositivo.
                                        Es como cambiarle la <span className="text-[#d41e2b] font-medium">Skin</span> a tu celular, reflejando tu estilo en cada detalle.
                                    </p>
                                    <p className="text-2xl text-black text-end">
                                        Tu dispositivo. Tu estilo. Tu <span className="text-[#d41e2b] font-medium">Skin</span>.
                                    </p>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="relative flex items-center text-[17px] font-semibold no-underline cursor-pointer border overflow-hidden text-[rgb(255,0,0)] text-center px-[15px] rounded-[25px] border-solid border-[rgb(255,0,0)] before:absolute before:content-[''] before:block before:w-[20em] before:h-[20em] before:left-[-5em] before:text-center before:transition-shadow before:duration-[0.5s] before:ease-[ease-out] before:z-[-1] before:m-auto before:rounded-[50%] before:inset-0 hover:text-white hover:border hover:border-solid hover:border-[rgb(255,0,0)] hover:before:shadow-[inset_0_0_0_10em_rgb(255,0,0)] bg-transparent" style={{ background: "transparent", outline: "none", transition: "color 0.3s 0.1s ease-out"}}>
                                        <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path> </svg>
                                        <span className="m-2.5">Seguinos</span>
                                    </button>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default AboutUs;