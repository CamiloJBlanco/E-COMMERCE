import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton, TwitterLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import '../index.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ocultar, mostrar, setUserName } from './AppBar';

const responseGoogle = (response) => {
  console.log(response);
}

console.log('ver esto',setUserName)

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login(props) {

  console.log('ocultar', ocultar)

  console.log('SOYLASPROPS', props)

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    });


  const handleChange = async e => {
    e.preventDefault();
    
    await setForm({
      ...form,
      [e.target.name]: e.target.value
    })
   
  }

  const enviarDatos = (event) => {
    event.preventDefault();

    var data = JSON.stringify({ "email": form.email, "password": form.password });
    
    axios({
      method: 'post',
      url: 'http://localhost:3001/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      withCredentials: true
    }
    )
      .then(function (response) {
        console.log('axios response', response);
        if (response.status === 200) {
          mostrar();
          props.history.replace({pathname : '/'})
          setUserName(response.data.user.firstname);
        }
        else  {
          ocultar();
          props.history.replace({pathname : '/'})
          setUserName(response.data.user.firstname);
        }
        
      })
      .catch(function (error) {
        console.log('axios error', error);
      });
  }

   

  const classes = useStyles();

  // const estado = useSelector(state => state.getUsers)
  // console.log('useSelector', estado)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form onSubmit={enviarDatos} className={classes.form} noValidate>
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Direccion de correo electronico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>

          <Grid container>
          <Grid item xs={12} sm={6}>
          <GoogleLoginButton  onClick={() => alert("Hello")}>
            <span className='loginG'>Ingresar con cuenta Google</span>
          </GoogleLoginButton>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <GithubLoginButton className='loginG'onClick={() => alert("Hello")}>
            <span className='loginG'>Ingresar con cuenta Github</span>
          </GithubLoginButton>
        </Grid>
        
            <Grid item xs>
              <Link href="#" variant="body2">
                Olviste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/registro' href="#" variant="body2" >
                {"No tenes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>

      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}