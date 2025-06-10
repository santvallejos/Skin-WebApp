import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Layaout from './Layaout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <Layaout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />}/>
            <Route path="/contact" element={<Contact />} />
          </Routes>
      </Layaout>
    </Router>
  )
}

export default App;