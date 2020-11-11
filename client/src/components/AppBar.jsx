import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase, Drawer } from '@material-ui/core'
import { AccountCircle } from "@material-ui/icons"
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { fade, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import fetchProduct from "../actions/searchProduct";
import '../index.css';
import axios from 'axios';


// SET NAME LOGGED USER
global.nameAvatar = 'guest';
console.log('nameAvatar',global.nameAvatar)

export function setUserName(userName) {
  
  global.nameAvatar = userName;
  console.log('se ejecuto', global.nameAvatar)
}



// OCULTAR BOTON
 export function ocultar() {
  document.getElementById('newProdButton').style.display = 'none';
  document.getElementById('newCatButton').style.display = 'none';
  document.getElementById('adminUsers').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('registerBtn').style.display = 'none';

  
}

 export function mostrar() {
  document.getElementById('newProdButton').style.display = 'block';
  document.getElementById('newCatButton').style.display = 'block';
  document.getElementById('adminUsers').style.display = 'block';
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('registerBtn').style.display = 'none';
  document.getElementById('cartBtn').style.display = 'none';
}


export default function Appbar() {


  const { totalQuantity } = useSelector(state => state.cart);
  const { categoriesLoaded } = useSelector(state => state.categories)
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [product_name, set_product_name] = useState('')

  const handleAccount = () => {
    setAnchor('right')
    setOpen(true)
  }

  const handleDrawer = () => {
    setAnchor('left')
    setOpen(true)

  }

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };


  // LOGOUT

  const logout = (event) => {
    // event.preventDefault();
    console.log('entra');
    axios({
      method: 'post',
      url: 'http://localhost:3001/users/logout',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true

    }
    )
      .then(function (response) {
        console.log('axios response', response);
        if (response.status === 200) {
          window.location.replace('http://localhost:3000/')
        }
        else {
          console.log('else')
          window.location.replace('http://localhost:3000/')
        }
      })
      .catch(function (error) {
        console.log('axios error', error);
      });
  }





  return (
    <div className="espacioBlanco">
      <AppBar position='static' >
        <Toolbar>
          <Typography variant='h4' style={{ flexGrow: 1 }}>
            <div className="brand">
              <button onClick={handleDrawer}>&#9776;</button>
              <Link className='link' to='/'>
                E-COMMERCE
            </Link>
            </div>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              fontSize="inherit" style={{ fontSize: "13px" }}
              type='search'
              name='query'
              value={product_name}
              placeholder="Busca tu producto"
              inputProps={{ 'aria-label': 'search' }}
              onChange={
                (event) => {
                  set_product_name(event.target.value);
                }
              }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            <Button type='submit'
              fontSize="inherit" style={{ fontSize: "13px" }}
              value='Buscar'
              variant="contained"
              color="primary"
              onClick={() => { dispatch(fetchProduct(product_name)) }}
            >
              <Link className='link' to='/search'>Buscar</Link>
            </Button>

          </div>
          <Button id='newProdButton' color='inherit' fontSize="inherit" style={{ fontSize: "12px", display: 'none' }}>
            <Link className='link' to='/product/new'>Nuevo Producto</Link>
          </Button>
          <Button id='newCatButton' color='inherit' fontSize="inherit" style={{ fontSize: "12px", display: 'none' }}>
            <Link className='link' to='/category/new'>Nueva Categoria</Link>
          </Button>
          <Button id='adminUsers' color='inherit' fontSize="inherit" style={{ fontSize: "12px", display: 'none' }}>
            <Link className='link' to='/adminlogin'>Usuarios</Link>
          </Button>
          <Button id='loginBtn' color='inherit' fontSize="inherit" style={{ fontSize: "12px" }}>
            <Link className='link' to='/login'>Login</Link>
          </Button>
          <Button id='registerBtn' color='inherit' fontSize="inherit" style={{ fontSize: "12px" }}>
            <Link className='link' to='/registro'>Registrarse</Link>
          </Button>
          <IconButton onClick={handleAccount} color='inherit' aria-label='account'>
            <AccountCircle fontSize="inherit" style={{ fontSize: "20px" }} /> <span style={{ fontSize: "12px" }}> {global.nameAvatar} </span> 
          </IconButton>
          <IconButton id='cartBtn' color='inherit'>
            <Link className='link' to='/users/1/cart'>
              {/* el badge es la cantidad de items en el carro */}
              <Badge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon fontSize="inherit" style={{ fontSize: "20px" }} />
              </Badge>
            </Link>
          </IconButton>
        </Toolbar>

        <Drawer
          anchor={anchor}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ height: '100%', padding: "20px" }}>
            {anchor === 'left' ?
              <div>
                <h5>Categorias</h5>
                <Divider />
                <br />
                {categoriesLoaded.map(category => (
                  <li>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/category/${category.name}`}>{category.name}</Link>
                  </li>
                ))}
              </div> : <div>
                <h5>Mi Perfil</h5>
                <Divider />
                <li>
                  <Link className='lista' to='/misordenes'>Mis ordenes</Link>
                </li>
                <li>
                  <Link className='lista' onClick={() => { logout() }} >Logout</Link>
                </li>
              </div>
            }
          </div>
        </Drawer>
      </AppBar>
    </div>
  );
}




const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(0, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

