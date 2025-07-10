import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from 'react-router-dom';

function Layaout() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layaout;