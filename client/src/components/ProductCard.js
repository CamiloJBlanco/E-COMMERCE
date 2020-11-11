import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import lightGreen from '@material-ui/core/colors/lightGreen' //color de la fuente
import { addToCart, getProductFromCart } from "../actions/cartActions";
import '../index.css';

const ProductCard = (props) => {
 
  const [qty, setQty] = useState(5);
  const { cart } = useSelector(state => state.cart)
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    Card: {
      width: 240,
      height: 420,
    },
    Media: {
      height: "250px",
      paddingTop: '0%',
    }
  });
  const classes = useStyles();

  const handleAddtoCart = async () => {
   await dispatch(addToCart(props))
   await dispatch(getProductFromCart())
  }

  return (
    <div className='card'>
      <Card className={classes.Card}>
        <CardActionArea>
          <Link to={'/products/' + props.id}>
            <CardMedia
              className={classes.Media}
              component="img"
              image={`http://localhost:3001/static/${props.image}`}
              title="Imagen producto"
            />
          </Link>
          <CardContent>
            <Link to={'/products/' + props.id}>
              <Typography variant="h4" component="h2">
                {props.name}
              </Typography>
            </Link>
            <Typography style={{ color: lightGreen['800'] }} variant="h5" color="textPrimary" component="h1">${props.price}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary"
            onClick={handleAddtoCart}
          >
            <ShoppingCartIcon fontSize="inherit" style={{ fontSize: "35px", display: "flex", justifyContent: "center", alignItems: "center" }} />

          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ProductCard;