import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { Button } from 'react-bootstrap';
export default class ProductComplete extends Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
       }
       handleClick(){
           return(
               console.log('clicked')
           )
       }
    render(){
        return(
            <div>
                <div>
                    <ProductCard/>
                    <Button variant='danger' onClick={this.handleClick} >Comprar</Button>
                </div>
            </div>
        )
    }
}