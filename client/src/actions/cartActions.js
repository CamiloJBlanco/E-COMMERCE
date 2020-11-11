import axios from "axios";
import {
    CART_ADD_ITEM_ERROR, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS,
    GET_PRODUCTS_FROM_CART_ERROR, GET_PRODUCTS_FROM_CART_REQUEST, GET_PRODUCTS_FROM_CART_SUCCESS,
    CART_SUBSTRACT_ITEM_REQUEST, CART_SUBSTRACT_ITEM_SUCCESS, CART_SUBSTRACT_ITEM_ERROR, 
    CART_DELETE_ITEM_REQUEST, CART_DELETE_ITEM_SUCCESS, CART_DELETE_ITEM_ERROR
} from "../constants-F/constanst";



const addToCart = (product, qty) => async (dispatch) => {
    try {
        var dataProduct = { productId: product.id, price: product.price, quantity: 1 }
        dispatch({ type: CART_ADD_ITEM_REQUEST, payload: '' });
        const { data } = await axios.post('http://localhost:3001/users/1/cart', dataProduct);
        dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CART_ADD_ITEM_ERROR, payload: error.message })
    }
}

const substractFromCart = (productId, orderline) => async (dispatch) => {
    const { quantity, cartorderId } = orderline
    const data = { productId, quantity, cartorderId }
    try {
        dispatch({ type: CART_SUBSTRACT_ITEM_REQUEST, payload: '' });
        await axios.put('http://localhost:3001/users/1/cart', data)
        dispatch({ type: CART_SUBSTRACT_ITEM_SUCCESS, payload: '' })
    } catch (error) {
        dispatch({ type: CART_SUBSTRACT_ITEM_ERROR, payload: error.message })
    }
}

const getProductFromCart = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_FROM_CART_REQUEST, payload: '' });
        const { data } = await axios.get('http://localhost:3001/users/1/cart');
        dispatch({ type: GET_PRODUCTS_FROM_CART_SUCCESS, payload: { products: data } })
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FROM_CART_ERROR, payload: error.message })
    }
}

const removeFromCart = (orderline) => async (dispatch) => {
    const { productId } = orderline; // 2
    var data = JSON.stringify({ "productId": productId });
    var config = {
        method: 'delete',
        url: 'http://localhost:3001/users/1/cart',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    try {
        dispatch({type: CART_DELETE_ITEM_REQUEST, payload: ''})
        await axios(config)
        dispatch({type:CART_DELETE_ITEM_SUCCESS, payload: ''})
    } catch (error) {
        dispatch({type: CART_DELETE_ITEM_ERROR, payload: error.message })
    }
}

export { addToCart, substractFromCart, getProductFromCart, removeFromCart }