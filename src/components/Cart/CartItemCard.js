import React from 'react'
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import "./CartItemCard.css";
import { formatNumber } from '../FormatNumber/formatNumber';


/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { Link } from "react-router-dom";




const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <div className="CartItemCard">
            <img src={item.image} alt={item.name} />

            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ${formatNumber(item.price)}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;
