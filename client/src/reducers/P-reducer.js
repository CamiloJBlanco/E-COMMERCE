import {
    DELETE_PRODUCT_ERROR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_ERROR, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS,
    SAVE_PRODUCT_ERROR, SAVE_PRODUCT_REQUEST, SAVE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS,
} from "../constants-F/constanst";


const initialState = {
    productsLoaded: [],
    loading: false,
    error: "",
}

function getProductsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, loading: false, productsLoaded: action.payload };
        case GET_PRODUCTS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function deleteProductReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case DELETE_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function saveProductReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case SAVE_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case SAVE_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function updateProductReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    getProductsReducer,
    deleteProductReducer,
    saveProductReducer,
    updateProductReducer
}