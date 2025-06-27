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
      
      {/* Panel del carrito - Mejorado para responsive */}
      <div className={`fixed inset-y-0 right-0 w-full sm:max-w-md sm:w-full max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header del carrito */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-medium text-gray-900">Tu Carrito</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenedor principal con altura calculada */}
        <div className="flex flex-col" style={{height: 'calc(100vh - 80px)'}}>
          {/* Lista de productos con scroll mejorado */}
          <div className="flex-1 overflow-y-auto p-4 pb-0">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mt-1">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex gap-3">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.name} - {item.product.model}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ${item.product.price.toFixed(3)} c/u
                        </p>
                        
                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <span className="text-lg font-medium">−</span>
                            </button>
                            <span className="text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <span className="text-lg font-medium">+</span>
                            </button>
                          </div>
                          
                          {/* Botón eliminar mejorado */}
                          <button
                            onClick={() => handleRemoveItemCart(item.product.id)}
                            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                            aria-label={`Eliminar ${item.product.name}`}
                          >
                            Eliminar
                          </button>
                        </div>
                        
                        {/* Subtotal */}
                        <div className="mt-2 text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            Subtotal: ${(item.product.price * item.quantity).toFixed(3)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer con botones - Mejorado para mejor visibilidad */}
          {items.length > 0 && (
            <div className="bg-white border-t border-gray-200 p-4 space-y-3">
              {/* Total */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${getTotal().toFixed(3)}
                </span>
              </div>
              
              {/* Botones de acción */}
              <div className="space-y-2">
                <button
                  onClick={onClose}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base"
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-white text-red-600 py-2 px-4 rounded-lg font-medium border border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;