import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Layaout from './Layaout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import TestSupabase from './pages/TestSupabase';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que usan Layout */}
        <Route element={<Layaout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:name" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test-supabase" element={<TestSupabase />} />
        </Route>

        {/* Ruta 404 SIN layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;