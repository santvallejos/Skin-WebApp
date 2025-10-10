import Home from './pages/home/page';
import Products from './pages/list products/page';
import Contact from './pages/contact/page';
import Layaout from './Layaout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/product/page';
import NotFound from './pages/404/page';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route element={<Layaout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:name" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;