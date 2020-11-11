import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './components/Home';
import AppBar from '../src/components/AppBar';
import Registro from '../src/components/Registro';
import Login from '../src/components/Login';
import ProductScreen from './components/ProductScreen';
import CreateCategoryScreen from './components/CreateCategoryScreen';
import CreateProductScreen from './components/CreateProductScreen';
import Checkout from './components/Checkout';
import Orden from './components/Orden';
import MisOrdenes from './components/MisOrdenes';
import Carrito from './components/Carrito';
import { useDispatch } from 'react-redux';
import { getProducts } from './actions/ProductsActions';
import { getCategories } from './actions/CategoryAction'
import Review from './components/Review'
import SearchResult from './components/SearchResult';
import fetchProduct from './actions/searchProduct';
import adminLogin from './components/adminLogin';
import { getUsers } from './actions/adminLoginActions';
import { getProductFromCart } from './actions/cartActions';
import ProdCategoryScreen from './components/ProdCategoryScreen';
import AwSnap from './components/AwSnap';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
    dispatch(getUsers())
    dispatch(getProductFromCart())
  }, [])


  return (
    <BrowserRouter>
      <div className="grid-container">
        <AppBar />
        <main className="main">
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/product/new" component={CreateProductScreen} />
            <Route path='/category/new' component={CreateCategoryScreen} />
            <Route path='/registro' component={Registro} />
            <Route path='/login' component={Login} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/users/1/cart' component={Carrito} />
            <Route path='/orden' component={Orden} />
            <Route path='/misordenes' component={MisOrdenes} />
            <Route path='/review' component={Review} />
            <Route path='/search' component={SearchResult} />
            <Route path='/adminlogin' component={adminLogin} />
            <Route path='/product/category' component={ProdCategoryScreen}/>
            <Route path='/error401' component={AwSnap} />
          </div>
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
