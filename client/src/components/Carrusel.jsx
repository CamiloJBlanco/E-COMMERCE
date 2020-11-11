import React from 'react';
// import ProductCard from './ProductCard';
// import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
// import { colors } from '@material-ui/core';
import StyleSheet from './StyleSheet.css';


function Carrusel() {
    return(
            <div>
                <Carousel className="Carousel">
                    <Carousel.Item>
                        <img width={600} height={400} alt="600x400" src="https://c0.wallpaperflare.com/preview/943/148/889/nike-air-jordan-1-shoes-near-chain-link-fence.jpg"
                        className="center-block"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Zapatillas Nike</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={600} height={400} alt="600x400" src="https://c0.wallpaperflare.com/preview/659/1/76/trainer-yeezy-sneaker-boost.jpg"
                        className="center-block"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h3>Zapatillas Adidas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={600} height={400} alt="600x400" src="https://c0.wallpaperflare.com/preview/877/230/517/singapore-sprint-sprinter-spikes.jpg"
                        className="center-block"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Zapatillas Puma</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                 </Carousel>
                 </div>
    )
}

export default Carrusel;