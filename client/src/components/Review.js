import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';


/*Este componente sirve para mostrar un review.
Debe mostrar la fecha de creación, el usuario que créo el review, la calificación y la descripción. */



import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),

	},


}));



export default function Review() {
	const [value, setValue] = React.useState(2);

	const classes = useStyles();
	const [value2, setValue2] = React.useState('Controlled');

	const handleChange = (event) => {
		setValue(event.target.value2);
	};

	return (
		<div className="center">
			<Container maxWidth="sm" className="reviewContainer">
				<Typography gutterBottom variant="h5" component="h2">
					Opiniones sobre el producto
         		</Typography>
				 <br/>
				<Box component="fieldset" mb={3} borderColor="transparent">
					<Typography component="legend">Puntua este producto</Typography>
					<Rating id="star_rating"
						size="large"
						name="simple-controlled"
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
					/>
				</Box>


				{/* ESTRELLAS DESHABILITADAS POR SI UN USUARIO NO ESTA LOGUEADO }
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Disabled</Typography>
        <Rating name="disabled" value={value} disabled />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Pristine</Typography>
        <Rating name="pristine" value={null} />
      </Box> */}
				<div className="containerComment" >
					<div className="alignComment">
						<Grid container spacing={1} alignItems="flex-end">
							<Grid item>
								<AccountCircle />
							</Grid>
							<Grid item >
								<TextField id="input-with-icon-grid" label="Deja un comentario" className="anchoClase" />
							</Grid>
						</Grid>
					</div>
					<br />
					<div className="alignButton">
						<Button
							width="100px"
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Enviar
            		</Button>
					</div>
				</div>
				<br/>
				<br/>
				<hr></hr>
				<br/>
				<Box component="fieldset"borderColor="transparent" >
				<Typography>17-9-2020</Typography>	
					<Rating name="disabled" value={value} readOnly />
				</Box>
				
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<AccountCircle />
					</Grid>
					
					<Grid item >
						<Typography component="legend">
							Este es otro comentario...
         		</Typography>
					</Grid>
				</Grid>
			</Container>
		</div >
	);
}


