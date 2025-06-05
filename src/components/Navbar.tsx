import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Navbar = () => {
  // Estados para controlar la visibilidad de los menús laterales
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado para los items del carrito (ejemplo)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Producto 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Producto 2', price: 39.99, quantity: 2 },
  ]);

  const itemsMenu = [
    { section: 'Inicio', href: '#inicio' },
    { section: 'Productos', href: '#productos' },
    { section: 'Como comprar?', href: '#ComoComprar'},
    { section: 'Contacto', href: '#contacto' },
  ];

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Función para enviar pedido a WhatsApp
  const sendToWhatsApp = () => {
    const phoneNumber = '1234567890'; // Reemplazar con el número real
    const message = `Hola, me gustaría confirmar mi compra:\n\n${cartItems
      .map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')}\n\nTotal: $${calculateTotal().toFixed(2)}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // Función para manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de búsqueda aquí
    console.log('Buscando:', searchQuery);
    // Cerrar el menú después de buscar en dispositivos móviles
    if (window.innerWidth < 640) { // 640px es el breakpoint 'sm' en Tailwind
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      {/* Barra de navegación principal */}
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Izquierda: Menú hamburguesa y búsqueda */}
          <div className="flex items-center">
            {/* Botón de menú hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Centro: Logo/Nombre en el centro */}
          <div className="flex-shrink-0 flex items-start">
            <h1 className="text-xl font-bold text-gray-900">SKIN</h1>
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
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú lateral izquierdo */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Overlay de fondo oscuro */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Panel del menú */}
        <div className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Menú</h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Formulario de búsqueda dentro del menú (visible solo en pantallas pequeñas) */}
          <div className="p-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
          
          <div className="py-4 px-4">
            <ul className="space-y-4">
              {itemsMenu.map((item) => (
                <li key={item.section}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)} // Cerrar el menú al hacer clic en un enlace
                  >
                    {item.section}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Panel del carrito derecho */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Overlay de fondo oscuro */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsCartOpen(false)}
        ></div>
        
        {/* Panel del carrito */}
        <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Tu Carrito</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col h-full">
            {/* Lista de productos */}
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Resumen y botón de compra */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Total</p>
                  <p>${calculateTotal().toFixed(2)}</p>
                </div>
                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                  </svg>
                  Confirmar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;