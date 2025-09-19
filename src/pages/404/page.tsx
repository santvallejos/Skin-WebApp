import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFound(){
    return(
        <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Skinn Accesorios</h1>
                <h2 className="text-2xl font-bold text-gray-800">Página no encontrada</h2>
                <p className="text-gray-600">Volver a la pagina principal</p>

                <div className="space-y-4">
                <Button asChild className="w-full bg-[#dc2626] hover:bg-[#b91c1c]">
                    <Link to="/">Volver al inicio</Link>
                </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
