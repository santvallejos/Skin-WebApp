import { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  images: string[] | undefined;
  autoPlayInterval?: number; // Intervalo en ms para el cambio automático
  showControls?: boolean; // Mostrar botones de control
  showIndicators?: boolean; // Mostrar indicadores de posición
  containerClassName?: string; // Estilos al contenedor del carousel
}

const Carousel = ({
  images,
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  containerClassName = '',
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Función para ir a la siguiente imagen
  const nextSlide = () => {
    if (images) {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  // Función para ir a la imagen anterior
  const prevSlide = () => {
    if (images) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Función para ir a una imagen específica
  const goToSlide = (index: number) => {
    if (images) {
      setCurrentIndex(index);
    }
  };
  
  // Efecto para el autoplay
  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        if (!isDragging) {
          nextSlide();
        }
      }, autoPlayInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, isDragging]);
  
  // Manejadores para el arrastre (drag)
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    
    // Obtener la posición inicial
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };
  
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    // Calcular el desplazamiento
    let currentX;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = currentX - startX;
    setTranslateX(diff);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Si el desplazamiento es significativo, cambiar de slide
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    // Resetear el desplazamiento
    setTranslateX(0);
  };
  
  return (
    <div className={`relative overflow-hidden w-full max-h-[80vh] ${containerClassName}`}>
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-out h-full"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {images?.map((image, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0"
            style={{ userSelect: 'none' }}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover max-h-[80vh]"
              draggable="false"
            />
          </div>
        ))}
      </div>
      
      {/* Controles (flechas) */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button 
            onClick={prevSlide}
            className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 focus:outline-none"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 focus:outline-none"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Indicadores */}
      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {images?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;