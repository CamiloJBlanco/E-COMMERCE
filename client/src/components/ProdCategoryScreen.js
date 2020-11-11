import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';



function ProdCategoryScreen(props) {

    let matchCategory = props.location.pathname.split('/', 6)[3];
    console.log('matchCategory', matchCategory);
    

    const products = useSelector(state => state.product.productsLoaded);
    console.log('products', products);
   
    const prodFilter = products.filter(el => el.category === matchCategory);
    console.log('prodFilter', prodFilter);
   

    return (
        
        <div>
            <ul className="products">
                {
                    prodFilter.map(el => (

                        <li key={el.id}>
                            <div className="product">
                                <ProductCard
                                    name={el.name}
                                    price={el.price}
                                    stock={el.stock}
                                    description={el.description}
                                    category={el.category}
                                    id={el.id}
                                    image= {el.image}
                                />
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProdCategoryScreen;

