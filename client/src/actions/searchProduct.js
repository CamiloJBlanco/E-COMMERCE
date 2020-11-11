import Axios from 'axios';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

//ACCIONES

export const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    }
}

export const fetchProductSuccess = (product) => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

export const fetchProductFailure = (error) => {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: error
    }
}

const fetchProduct = (value) => {
    console.log('value',value);
    return (dispatch) => {
        dispatch(fetchProductRequest());
        Axios.get(`http://localhost:3001/search?name=${value}`)
            .then(response =>{
                dispatch(fetchProductSuccess(response.data));
            })
            .catch(error =>{
                dispatch(fetchProductFailure('no se encontro nada flaco'));
            })
    }
}

// let value = '';

// export const fetchProduct = (value) => async (dispatch) => {
//     console.log('esto es el value wachin: ',value)
//     try {
//         dispatch({ type: FETCH_PRODUCT_REQUEST, payload: '' });
//         const res = await Axios.get('http://localhost:3001/search?name=' + value);
//         dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: res })
//     } catch (error) {
//         dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
//     }
// }

export default fetchProduct;