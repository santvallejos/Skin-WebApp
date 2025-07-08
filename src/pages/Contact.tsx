import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';

function Contact() {
  return (
    <section className="text-gray-600 body-font relative bg-gray-50">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        
        {/* Sección de información de contacto */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8 mb-8 flex flex-col md:flex-row">
          
          {/* Columna izquierda - Mapa */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="rounded-lg overflow-hidden h-80 relative">
              <iframe 
                width="100%" 
                height="100%" 
                className="absolute inset-0"
                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.9)" }}
                title="map"
                scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884.8572285703527!2d-58.81647013037306!3d-27.487033298519346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456bb2c9c2b105%3A0x46e96fab98bd8c7a!2sAv.%20Regimiento%20Cazadores%20Correntinos%203010%2C%20W3400%20Corrientes!5e0!3m2!1ses!2sar!4v1750692948560!5m2!1ses!2sar"
              ></iframe>
            </div>
          </div>
          
          {/* Columna derecha - Información de contacto */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Contacto</h2>
            
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <MapPinIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">Dirección</h3>
                <p className="mt-1 text-gray-600">Av. Regimiento Cazadores Correntinos 3010</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <EnvelopeIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">Email</h3>
                <a className="mt-1 text-red-500 hover:text-red-600 transition-colors">Skin.ctes@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <PhoneIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">Teléfono</h3>
                <p className="mt-1 text-gray-600">+54 3794 94-8115</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de formulario */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Envíanos un mensaje</h2>
          <p className="text-gray-600 mb-6">Cualquier consulta no dudes en comunicarte a través de WhatsApp, Instagram o Email!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-colors"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>
          
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02] focus:outline-none">
            Enviar mensaje
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;