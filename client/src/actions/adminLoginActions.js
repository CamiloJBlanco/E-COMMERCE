import {
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR, 
    DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS, DELETE_USERS_ERROR,
    SAVE_USERS_REQUEST, SAVE_USERS_SUCCESS, SAVE_USERS_ERROR,
    UPDATE_USERS_REQUEST, UPDATE_USERS_SUCCESS, UPDATE_USERS_ERROR,
} from "../constants/adminLoginConstants";
import axios from 'axios';

// Esta accion se usa en http://localhost:3000/adminlogin para TRAER los users
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USERS_REQUEST, payload: '' });
        const { data } = await axios.get('http://localhost:3001/users', {withCredentials: true});
        console.log('data Accion', data)
        if (!data.error){
         dispatch({ type: GET_USERS_SUCCESS, payload: data })     
        }
        else{
            dispatch({ type: GET_USERS_ERROR, payload: data })
            // console.log('dispatch desde el else', data.error)
        }
    } catch (error) {
        dispatch({ type: GET_USERS_ERROR, payload: error.message })
        // console.log('dispatch desde el catch', error.message)
    }
}

// Esta accion se usa en http://localhost:3000/adminlogin para GUARDAR los users
export const saveUsers = (user) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_USERS_REQUEST, payload: user });
        const { data } = await axios.post('http://localhost:3001/users', user,
            { headers: { 'Content-Type': 'multipart/form-data' } });
        dispatch({ type: SAVE_USERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SAVE_USERS_ERROR, payload: error })
    }
}

// Esta accion se usa en http://localhost:3000/adminlogin para EDITAR los users
export const updateUsers = (id, user) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USERS_REQUEST, payload: id});
        const { data } = axios.put('http://localhost:3001/users/' + id, user);
        dispatch({type: UPDATE_USERS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_USERS_ERROR, payload: error})
    }
}


// Esta accion se usa en http://localhost:3000/adminlogin para BORRAR los users
export const deleteUsers = (id) => async (dispatch) => {
    console.log('id', id)
    try {
        dispatch({ type: DELETE_USERS_REQUEST, payload: id });
        await axios.delete('http://localhost:3001/users/' + id);
        dispatch({ type: DELETE_USERS_SUCCESS, payload: '' });
    } catch (error) {
        dispatch({ type: DELETE_USERS_ERROR, payload: error.message })
    }
}