import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import FeaturedProducts from './components/FeaturedProducts';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
  const carouselImages = [
    'https://acdn-us.mitiendanube.com/stores/001/096/065/themes/baires/1-slide-1747233659500-5849132071-6fd76fe510ad3f73ff33687c63b5c6cc1747233662-1920-1920.jpg?2121089043',
    '/1.png'
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
        <FeaturedProducts />
        <AboutUs />
        <Footer />
      </>
  )
}

export default App
