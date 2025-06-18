import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Layaout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
                <div className="pt-16">
                    {children}
                </div>
            <Footer />
        </>
    );
}

export default Layaout;