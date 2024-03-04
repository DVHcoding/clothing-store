/*---------------------*\
 * IMPORT Components
\*---------------------*/
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    RESET_CART,
} from "../constants/cartConstants";


/*---------------------*\
 * CART REDUCER 
\*---------------------*/
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        // #############
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            /**
             * @param {isItemExist} boolean
             */
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        // #############
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            }
        // #############
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
        // #############
        case RESET_CART:
            return {
                cartItems: [],
                shippingInfo: {}
            };
        // #############
        default:
            return state;
    }
}



