import { useParams } from 'react-router-dom';

function Product() {
    const { id } = useParams();

    return (
        <>
            <section>
                <h2>Estas en el producto {id}</h2>
            </section>
        </>
    );
}

export default Product;