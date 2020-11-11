import React from "react";
import '../index.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function AwSnap() {
  return (
    <div>
        <div> 
        <img width={800} height={525} alt="600x400" className= "center" src = "https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg" />
        </div>
        <div className='linkInicio'> 
            <Link to='/'>
            <Button variant="contained" color="primary" >
            <div>Volver al Inicio</div>
           </Button>
            </Link>
        </div>

    </div>
  );
}
