import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import React from 'react';
import ProductCard from './ProductCard';
import Carrusel from './Carrusel.jsx'
import "../index.css";
import { useSelector } from 'react-redux';
import { listProducts, detailsProduct } from '../actions/productActions';
import '../index.css';

function Home() {

    const products = useSelector(state => state.product)
    const { productsLoaded, loading, error } = products
    
    return (
        <>
            {loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) : (
                <div>
                    
                    <div className='Home'>
                        <div className="Carousel">
                            <Carrusel />
                        </div>
                        <ul className="products">
                            {productsLoaded.map(el => (
                                <li key={el.id}>
                                    <div className="product">
                                        <ProductCard
                                            name={el.name}
                                            brand={el.brand}
                                            price={el.price}
                                            stock={el.stock}
                                            description={el.description}
                                            category={el.category}
                                            id={el.id}
                                            image={el.image}
                                        />
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>

                </div>
            )}
            
        </>
    );
}

export default Home;


