import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useCartStore } from '@/store/CartStore';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const {
    items
  } = useCartStore();

  const location = useLocation();
  const navigate = useNavigate();

  // Estados para controlar la visibilidad de los menús laterales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  //const [searchQuery, setSearchQuery] = useState('');

  // Función para manejar el scroll a la sección ComoComprar
  const handleComoComprarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSheetOpen(false); // Cerrar el Sheet

    if (location.pathname === '/') {
      // Si ya estamos en home, hacer scroll directo
      const element = document.getElementById('ComoComprar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, navegar a home y luego hacer scroll
      navigate('/');
      // Usar setTimeout para asegurar que la página se haya cargado
      setTimeout(() => {
        const element = document.getElementById('ComoComprar');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Función para manejar la navegación y cerrar el Sheet
  const handleNavigation = () => {
    setIsSheetOpen(false);
  };

  // Efecto para manejar el scroll cuando se carga la página con hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#ComoComprar') {
      setTimeout(() => {
        const element = document.getElementById('ComoComprar');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const itemsMenu = [
    { section: 'Inicio', href: '/' },
    { section: 'Productos', href: '/products' },
    { section: 'Como comprar?', href: '/#ComoComprar', onClick: handleComoComprarClick },
    { section: 'Contacto', href: '/contact' },
  ];

  // Función para manejar la búsqueda
/*   const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSheetOpen(false); // Cerrar el Sheet al realizar búsqueda
    // Implementar lógica de búsqueda aquí
    setSearchQuery('');
  }; */

  return (
    <>
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
        {/* Barra de navegación principal */}
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">
            {/* Izquierda: Menú hamburguesa y búsqueda */}
            <div className="flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </SheetTrigger>
                <SheetContent side='left'>
                  <SheetHeader>
                    <SheetTitle>
                      Menú
                    </SheetTitle>

                    {/* Formulario de búsqueda dentro del menú (visible solo en pantallas pequeñas) */}
{/*                     <div className="p-2">
                      <form onSubmit={handleSearch}>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <div className="absolute left-3 top-2.5">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </form>
                    </div> */}

                    <ul className="space-y-4">
                      {itemsMenu.map((item) => (
                        <li key={item.section}>
                          {item.onClick ? (
                            <a
                              href={item.href}
                              onClick={item.onClick}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:rounded-2xl'
                            >
                              {item.section}
                            </a>
                          ) : (
                            <Link
                              to={item.href}
                              onClick={() => handleNavigation()}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-2xl'
                            >
                              {item.section}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

            {/* Centro: Logo/Nombre en el centro */}
            <div className="flex-shrink-0 flex items-start">
              <Link to="/" className="flex items-center">
                <img src="LogoNavbar.png" alt="Logo" className="h-10 object-cover" />
              </Link>
            </div>

            {/* Derecha: Carrito de compras */}
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none relative"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Componente Cart separado */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;