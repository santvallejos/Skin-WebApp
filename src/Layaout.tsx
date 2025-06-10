import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Layaout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
                {children}
            <Footer/>
        </>
    );
}

export default Layaout;