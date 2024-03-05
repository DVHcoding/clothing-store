/*---------------------*\
 * IMPORT Components
\*---------------------*/
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import axios from "axios";
axios.defaults.withCredentials = true;



/*---------------------*\
 * ADD ITEM ACTION 
\*---------------------*/
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity: quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


/*---------------------*\
 * REMOVE ITEM ACTION 
\*---------------------*/
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


/*----------------------------*\
 * SAVE SHIPPING INFO ACTION 
\*----------------------------*/
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}




