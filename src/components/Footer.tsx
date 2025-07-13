import { Link } from "react-router-dom";
import logo from '../assets/LogoNavbar.png';

function Footer() {

    const itemsNavegationFooter = [
        { section: 'Inicio', href: '/' },
        { section: 'Productos', href: '/products' },
        { section: 'Cómo comprar?', href: '/#ComoComprar'},
        { section: 'Contacto', href: '/contact' },
    ];

    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Navegation */}
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-lg">Navegación</span>
                        <div className="flex flex-col gap-2">
                            {itemsNavegationFooter.map((item) => (
                                <Link to={item.href} key={item.section} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    {item.section}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-lg">Contacto</span>
                        <span className="text-gray-600">skin.cts@gmail.com</span>
                        <a href="https://www.instagram.com/skin.cts/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            Instagram
                        </a>
                    </div>

                    {/* Branding */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center">
                            <img src={logo} alt="Skin Logo" className="w-36 h-10" />
                        </div>
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} Skin. Todos los derechos reservados.
                        </p>
                        <div>
                            <a href="https://www.instagram.com/skin.cts/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;