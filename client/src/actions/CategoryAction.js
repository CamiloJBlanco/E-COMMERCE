import { 
    DELETE_CATEGORY_ERROR, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, 
    GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, 
    SAVE_CATEGORY_ERROR, SAVE_CATEGORY_REQUEST, SAVE_CATEGORY_SUCCESS, 
    UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS 
} from '../constants-F/constanst';
import axios from 'axios';

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORIES_REQUEST, payload: '' });
        const { data } = await axios.get('http://localhost:3001/categories');
        let catInOrder = data.sort(function(a, b){
            return a.id-b.id
        });
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: catInOrder })
    } catch (error) {
        dispatch({ type: GET_CATEGORIES_ERROR, payload: error.message })
    }
}

export const saveCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_CATEGORY_REQUEST, payload: category });
        const { data } = await axios.post('http://localhost:3001/categories', category);
        dispatch({ type: SAVE_CATEGORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SAVE_CATEGORY_ERROR, payload: error.message })
    }
}

export const updateCategory = (id, category) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_CATEGORY_REQUEST, payload: id});
        const { data } = axios.put('http://localhost:3001/categories/' + id, category);
        dispatch({type: UPDATE_CATEGORY_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_CATEGORY_ERROR, payload: error.message})
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST, payload: id });
        const { data } = await axios.delete('http://localhost:3001/categories/' + id);
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_ERROR, payload: error.message })
    }
}
