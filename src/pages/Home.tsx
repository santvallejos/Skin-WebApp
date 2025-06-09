import Carousel from '../components/Carousel';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutUs from '../components/AboutUs';

function Home() {
    return (
        <>
            <Carousel
                images={[
                    'https://acdn-us.mitiendanube.com/stores/001/096/065/themes/baires/1-slide-1747233659500-5849132071-6fd76fe510ad3f73ff33687c63b5c6cc1747233662-1920-1920.jpg?2121089043',
                    '/1.png'
                ]}
                autoPlayInterval={5000}
                showControls={true}
                showIndicators={true}
            />
            <FeaturedProducts />
            <AboutUs />
        </>
    );
}

export default Home;