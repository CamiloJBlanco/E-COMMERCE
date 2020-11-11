import {
    GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, 
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR,
    SAVE_PRODUCT_REQUEST, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_ERROR,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR,
} from "../constants-F/constanst";
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST, payload: '' });
        const { data } = await axios.get('http://localhost:3001/products');
        console.log('ESTO ES DATA', data);
        
        let prodInOrder = data.sort(function(a, b){
            return a.id-b.id
            console.log(data);
        });
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: prodInOrder })
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message })
    }
}

export const saveProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_PRODUCT_REQUEST, payload: product });
        const { data } = await axios.post('http://localhost:3001/products', product,
            { headers: { 'Content-Type': 'multipart/form-data' } });
        dispatch({ type: SAVE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SAVE_PRODUCT_ERROR, payload: error.message })
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST, payload: id});
        const { data } = axios.put('http://localhost:3001/products/' + id, product);
        dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_PRODUCT_ERROR, payload: error.message})
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id });
        const { data } = await axios.delete('http://localhost:3001/products/' + id);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_ERROR, payload: error.message })
    }
}
