import { useCartStore } from "@/store/CartStore";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const {
    items,
    removeCart,
    updateQuantity,
    clearCart,
    getTotal
  } = useCartStore();

  const handleRemoveItemCart = (id: string) => {
    removeCart(id);
  }

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Overlay de fondo oscuro */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      ></div>
      
      {/* Panel del carrito */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Tu Carrito</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col h-full justify-between">
          {/* Lista de productos */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="py-4 flex">
                    <img src={item.product.images[0]} alt={item.product.name} className="h-full w-20 pr-1"/>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{item.product.name} - {item.product.model}</h3>
                      <p className="mt-1 text-sm text-gray-500">${item.product.price.toFixed(3)} x {item.quantity}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(3)}
                      </p>
                      <button
                          onClick={() => handleRemoveItemCart(item.product.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Borrar
                        </button> 
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Resumen y botón de compra */}
          {items.length > 0 && (
                <div className="sticky bottom-0 bg-white p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Total:</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${getTotal().toFixed(3)}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Comprar
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Vaciar carrito
                  </button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;