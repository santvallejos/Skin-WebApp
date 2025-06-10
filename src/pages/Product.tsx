import { useLocation } from 'react-router-dom';

function Product() {
    const id = useLocation().state?.id;

    return (
        <>
            <section>
                <h2>Estas en el producto {id}</h2>
            </section>
        </>
    );
}

export default Product;