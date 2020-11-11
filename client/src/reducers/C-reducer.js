import { 
    DELETE_CATEGORY_ERROR, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, 
    SAVE_CATEGORY_ERROR, SAVE_CATEGORY_REQUEST, SAVE_CATEGORY_SUCCESS, 
    UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS,
} from "../constants-F/constanst";


const initialState = {
    categoriesLoaded: [],
    loading: false,
    error: "",
}

function getCategoriesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { ...state, loading: true };
        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categoriesLoaded: action.payload };
        case GET_CATEGORIES_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function deleteCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return { ...state, loading: true };
        case DELETE_CATEGORY_SUCCESS:
            return { ...state, loading: false };
        case DELETE_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function saveCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_CATEGORY_REQUEST:
            return { ...state, loading: true };
        case SAVE_CATEGORY_SUCCESS:
            return { ...state, loading: false };
        case SAVE_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function updateCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
            return { ...state, loading: true };
        case UPDATE_CATEGORY_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    getCategoriesReducer,
    deleteCategoryReducer,
    saveCategoryReducer,
    updateCategoryReducer
}
