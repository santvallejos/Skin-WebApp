import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';

function Contact() {
  const accessKey = import.meta.env.VITE_API_STATIC_FORMS;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current!);
      
      // Obtener el token del reCAPTCHA
      const recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        alert('Por favor, completa el reCAPTCHA');
        setIsSubmitting(false);
        return;
      }

      formData.append('g-recaptcha-response', recaptchaToken);
      formData.append('accessKey', accessKey);

      const response = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Mostrar dialog de éxito
        setIsDialogOpen(true);
        // Limpiar formulario
        formRef.current?.reset();
        // Resetear reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <a className="mt-1 text-red-500 hover:text-red-600 transition-colors">skin.ctes@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <PhoneIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium">Teléfono</h3>
                <p className="mt-1 text-gray-600">+54 9 3795 02-6137</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de formulario */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Envíanos un mensaje</h2>
          <p className="text-gray-600 mb-6">Cualquier consulta no dudes en comunicarte a través de WhatsApp, Instagram o Email!</p>
          
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
          >
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
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
                required
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
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition-colors"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          {/* CAPTCHA v2 visible */}
          <div className="mb-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_CAPTCHA_HTML}
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02] focus:outline-none">
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
          </form>
        </div>
      </div>

      {/* Dialog de confirmación */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">¡Mensaje enviado correctamente!</DialogTitle>
            <DialogDescription className="text-gray-600">
              Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Cerrar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Contact;