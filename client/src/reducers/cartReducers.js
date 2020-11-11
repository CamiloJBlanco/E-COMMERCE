import {
    CART_ADD_ITEM_ERROR, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS,
    CART_DELETE_ITEM_ERROR, CART_DELETE_ITEM_REQUEST, CART_DELETE_ITEM_SUCCESS,
    CART_SUBSTRACT_ITEM_ERROR, CART_SUBSTRACT_ITEM_REQUEST, CART_SUBSTRACT_ITEM_SUCCESS,
    GET_PRODUCTS_FROM_CART_ERROR, GET_PRODUCTS_FROM_CART_REQUEST, GET_PRODUCTS_FROM_CART_SUCCESS
} from "../constants-F/constanst";

const initialState = {
    cartItems: [],
    loading: false,
    error: '',
    totalQuantity: '',
    totalPrice: '',
}

function getProductFromCartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_FROM_CART_REQUEST:
            return { ...state, loading: true };
        case GET_PRODUCTS_FROM_CART_SUCCESS:
            return {
                ...state, loading: false,
                cartItems: action.payload,
                totalPrice: action.payload.products[0].price,
                totalQuantity: action.payload.products[0].quantity,
            };
        case GET_PRODUCTS_FROM_CART_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function substractFromCartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_SUBSTRACT_ITEM_REQUEST:
            return { ...state, loading: true }
        case CART_SUBSTRACT_ITEM_SUCCESS:
            return { ...state, loading: false }
        case CART_SUBSTRACT_ITEM_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function removeFromCartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_DELETE_ITEM_REQUEST:
            return { ...state, loading: true }
        case CART_DELETE_ITEM_SUCCESS:
            return { ...state, loading: false }
        case CART_DELETE_ITEM_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function addToCartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { ...state, loading: true }
        case CART_ADD_ITEM_SUCCESS:
            return { ...state, loading: false }
        case CART_ADD_ITEM_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}


export { getProductFromCartReducer, substractFromCartReducer, removeFromCartReducer, addToCartReducer };