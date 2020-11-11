import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';



const SearchResult = () => {
    const search = useSelector((state) => state.search);
    console.log('estado de search',search);
    const { product, loading, error } = search

    console.log('que es product', product)
    return (
        <>
            <br />
            <br />
            {loading ? (<div className='text-warning'>Buscando..</div>) : error ? (<span className='text-danger'>{error}</span>) : (
                <div className='ResultSearch'>
                    <br />
                    <br />                  
                    <ul className="products">
                        {product.map(product => (
                            <li key={product}>
                                <div className="product">
                                    <ProductCard
                                        name={product.name}
                                        brand={product.brand}
                                        price={product.price}
                                        stock={product.stock}
                                        description={product.description}
                                        category={product.category}
                                        id={product.id}
                                        image={product.image}
                                    />
                                </div>
                            </li>
                        ))
                        }
                    </ul>


                </div>
            )}

        </>
    );





//     return (
//         <div>
//             <h1 className='text-black'>Resultado: </h1>
//             <div className='text-warning'>Buscando..</div>
//             <div className='text-success'>
//                 <span>Producto</span>
//             </div>
//             <span className='text-danger'>Error</span>
//         </div>
//     )
// }
}
export default SearchResult;