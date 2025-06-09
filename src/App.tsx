import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;