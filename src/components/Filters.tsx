import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox";
import { useProductStore } from "@/store/ProductsStore";
import type { sort } from "@/store/ProductsStore";
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { usePhoneModels } from "@/hooks/usePhoneModels";

function Filters() {
    const {
        orderFor,
        setOrderFor,
        models,
        setModels,
        maxPrice,
        setMaxPrice,
        clearFilters
    } = useProductStore();

    const { models: availableModels, loading: modelsLoading } = usePhoneModels();
    const [isExpanded, setIsExpanded] = useState(false);

    // Usar todos los modelos disponibles
    const modelsWithStock = useMemo(() => {
        return availableModels;
    }, [availableModels]);
    

    // Cambiar el ordenamiento
    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderFor(e.target.value as sort);
    };

    // Filtrar por modelo
    const handleModelChange = (model: string) => {
        if (!models.includes(model)) {
            setModels([...models, model]);
        } else {
            setModels(models.filter((m) => m !== model));
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(parseInt(e.target.value));
    };

    return(
        <>
            <div>
                <Sheet>
                    <SheetTrigger className="p-2 inset-shadow-sm rounded-2xl shadow-xl cursor-pointer">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#d41e2b"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 6l8 0" /><path d="M16 6l4 0" /><path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12l2 0" /><path d="M10 12l10 0" /><path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 18l11 0" /><path d="M19 18l1 0" /></svg>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                                <SheetTitle className="pt-4">Ordenar Por:</SheetTitle>
                                <select
                                    value={orderFor} // Valor actual de ordenamiento
                                    name="order" 
                                    className="select select-bordered border border-black p-1 rounded-lg cursor-pointer" 
                                    onChange={handleOrderChange}>
                                    <option value="highlight">Destacados</option>
                                    <option value="priceMax">Precio: mayor a menor</option>
                                    <option value="priceMin">Precio: menor a mayor</option>
                                    <option value="az">A - Z</option>
                                    <option value="za">Z - A</option>
                                </select>

                                <SheetTitle className="pt-4">Modelo</SheetTitle>
                                {modelsLoading ? (
                                    <div className="text-gray-500">Cargando modelos...</div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                    {modelsWithStock
                                        .slice(0, isExpanded ? modelsWithStock.length : 5)
                                        .map((value) => (
                                            <div key={value} className="flex items-center gap-2">
                                                <Checkbox
                                                    className="cursor-pointer" 
                                                    id={value}
                                                    checked={models.includes(value)}
                                                    onCheckedChange={() => handleModelChange(value)}
                                                />
                                                <label htmlFor={value}>{value}</label>
                                            </div>
                                        ))
                                    }
                                    {modelsWithStock.length > 5 && (
                                        <button
                                            className="text-blue-500 mt-2 text-left cursor-pointer"
                                            onClick={() => setIsExpanded(!isExpanded)}
                                        >
                                            {isExpanded ? 'Ver menos' : 'Ver más'}
                                        </button>
                                    )}
                                    </div>
                                )}

                                <SheetTitle className="pt-4">Precio Máximo:</SheetTitle>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="range" 
                                        className="range range-primary w-full cursor-pointer" 
                                        onChange={handlePriceChange}
                                        min={1}
                                        max={20000}
                                        value={maxPrice}
                                    />
                                    <span>${maxPrice.toLocaleString('es-AR')}</span>
                                </div>
                                <Button
                                    className="btn btn-primary hover:bg-red-500 w-28 cursor-pointer"
                                    onClick={clearFilters}
                                    variant="destructive"
                                >
                                    Limpiar Filtros
                                </Button>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
            </div>
        </>
    )
}

export default Filters;
