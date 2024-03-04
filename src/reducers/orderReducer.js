/*---------------------*\
 * IMPORT Components
\*---------------------*/

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,

    CLEAR_ERRORS,
} from "../constants/orderConstants";



/*---------------------*\
 * NEW ORDER REDUCER 
\*---------------------*/
export const newOrderReducer = (state = {}, action) => {

    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // ######################
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        // ######################
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        // ######################
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


/*---------------------*\
 * MY ORDER REDUCER 
\*---------------------*/

export const myOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true,
            };
        // ######################
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        // ######################
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        // ######################
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


/*------------------------*\
 * ORDER DETAILS REDUCER 
\*------------------------*/
export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        // ######################
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        // ######################
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        // ######################
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        // ######################
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        // ######################
        default:
            return state;
    }
};



/*---------------------------*\
 * ALL ORDERS REDUCER -- Admin
\*---------------------------*/
export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        // ######################
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
            };

        // ######################
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        // ######################
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        // ######################
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        // ######################
        default:
            return state;
    }
};



/*----------------------------------------*\
 * DELETE & UPDATE ORDER REDUCER -- Admin
\*----------------------------------------*/
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        // ######################
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        // ######################
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        // ######################
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        // ######################
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        // ######################
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        // ######################
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        // ######################
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        // ######################
        default:
            return state;
    }
};