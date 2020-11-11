import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {getCategoriesReducer, saveCategoryReducer, updateCategoryReducer, deleteCategoryReducer} from '../reducers/C-reducer';
import { getProductsReducer, deleteProductReducer, saveProductReducer, updateProductReducer }  from '../reducers/P-reducer';
import thunk from 'redux-thunk';
import search from '../reducers/searchReducer';
import { getUsersReducer, deleteUsersReducer, saveUsersReducer, updateUsersReducer } from '../reducers/adminLoginReducers';
import { getProductFromCartReducer } from '../reducers/cartReducers';

const reducer = combineReducers({
    categories: getCategoriesReducer,
    saveCategory: saveCategoryReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    product: getProductsReducer,
    cart: getProductFromCartReducer,
    deleteProduct: deleteProductReducer,
    saveProduct: saveProductReducer,
    updateProduct: updateProductReducer,
    search: search,
    getUsers: getUsersReducer,
    deleteUsers: deleteUsersReducer,
    saveUsers: saveUsersReducer,
    updateUsers: updateUsersReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    //initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
