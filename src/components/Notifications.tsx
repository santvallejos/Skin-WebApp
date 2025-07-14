import { Slide, ToastContainer, toast } from 'react-toastify';

export const AddToCart = (name: string, model: string, price: number, quantity: number) => {
    toast(
        <div>
            <p>Agregado al carrito: {name}</p>
            <p>{model}</p>
            <p>$ {price.toLocaleString('es-AR')} (x{quantity})</p>
        </div>
        , {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        }
    )
}

function Notifications() {
    return (
        <ToastContainer />
    );
}

export default Notifications;