import {
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR, 
    DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS, DELETE_USERS_ERROR,
    SAVE_USERS_REQUEST, SAVE_USERS_SUCCESS, SAVE_USERS_ERROR,
    UPDATE_USERS_REQUEST, UPDATE_USERS_SUCCESS, UPDATE_USERS_ERROR,
} from "../constants/adminLoginConstants";

const initialState = {
    users: [],
    loading: false,
    error: "",
}

function getUsersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { ...state, loading: true };
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case GET_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function deleteUsersReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_USERS_REQUEST:
            return { ...state, loading: true };
        case DELETE_USERS_SUCCESS:
            return { ...state, loading: false };
        case DELETE_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function saveUsersReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USERS_REQUEST:
            return { ...state, loading: true };
        case SAVE_USERS_SUCCESS:
            return { ...state, loading: false };
        case SAVE_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function updateUsersReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERS_REQUEST:
            return { ...state, loading: true };
        case UPDATE_USERS_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    getUsersReducer,
    deleteUsersReducer,
    saveUsersReducer,
    updateUsersReducer
}