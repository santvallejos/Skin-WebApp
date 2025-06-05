import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

function App() {
  // Ejemplo de imágenes para el carousel (reemplaza con tus propias URLs)
  const carouselImages = [
    '',
    'https://via.placeholder.com/1200x400?text=Imagen+2',
    'https://via.placeholder.com/1200x400?text=Imagen+3',
    'https://via.placeholder.com/1200x400?text=Imagen+4',
  ];

  return (
      <>
        <Navbar/>
        <Carousel 
            images={carouselImages} 
            autoPlayInterval={5000} 
            showControls={true} 
            showIndicators={true} 
          />
      </>
  )
}

export default App
