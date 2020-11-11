import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import '../index.css';
import ControlledOpenSelect from './rolDropDown.js';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { deleteUsers, getUsers } from "../actions/adminLoginActions";
import Login from '../components/Login';
import { Link, Route, Redirect} from 'react-router-dom';
import AwSnap from '../components/AwSnap';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const BasicTable = () => {
  const classes = useStyles();
  const  { users, loading, error } = useSelector (state => state.getUsers)
   console.log('usersmessahe!:', users.message)
   console.log('error!:', error)
  const dispatch = useDispatch();

  const handlerDelete = async (id) => {
    await dispatch(deleteUsers(id))
    await dispatch(getUsers())
  }
  
  console.log('loading', loading);


  return (
    <>
      <br />
      {loading ? (<div>Loading...</div>) : error ? (<Login/>) : users.message ? (<AwSnap/>) : (
        <TableContainer component={Paper}>
          <div id="adm-usuarios">
            <Typography variant="h6" id="tableTitle">
              Administracion de Usuarios
            </Typography>
          </div>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>E-mail</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Contraseña</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="center">{user.firstname}</TableCell>
                  <TableCell align="center">{user.lastname}</TableCell>
                  <TableCell align="center">{user.password}</TableCell>
                  <TableCell align="center">
                    <ControlledOpenSelect />
                  </TableCell>
                  <TableCell align="center">
                    <SaveIcon onClick={() => alert("Guardar")} />

                    <DeleteIcon onClick={() => handlerDelete(user.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }</>
  )
}

export default BasicTable;