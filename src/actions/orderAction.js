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

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,

    CLEAR_ERRORS,
} from "../constants/orderConstants";


/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import axios from "axios";


/*-------------------------*\
 * CREATE NEW ORDER ACTION
\*-------------------------*/
export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const { data } = await axios.post(`${REACT_APP_SERVER_URL}/api/v1/order/new`, order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        if (data.error) {
            const error = data.error;
            dispatch({ type: CREATE_ORDER_FAIL, payload: error });
        }

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}


/*---------------------*\
 * MY ORDERS ACTION
\*---------------------*/
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDER_REQUEST });

        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/orders/me`);

        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });

        if (data.error) {
            const error = data.error;
            dispatch({ type: MY_ORDER_FAIL, payload: error });
        }

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}


/*---------------------*\
 * ORDER DETAILS ACTION
\*---------------------*/
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/order/${id}`);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

        if (data.error) {
            const error = data.error;
            dispatch({ type: ORDER_DETAILS_FAIL, payload: error });
        }

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};



/*-------------------------------*\
 * GET ALL ORDERS ACTION -- Admin
\*-------------------------------*/
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/admin/orders`);

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};



/*-------------------------------*\
 * DELETE ORDER ACTION -- Admin
\*-------------------------------*/
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`${REACT_APP_SERVER_URL}/api/v1/admin/order/${id}`);

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });

        if (data.error) {
            const error = data.error;
            dispatch({ type: DELETE_ORDER_FAIL, payload: error });
        }

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};



/*-------------------------------*\
 * UPDATE ORDER ACTION -- Admin
\*-------------------------------*/
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `${REACT_APP_SERVER_URL}/api/v1/admin/order/${id}`,
            order,
            config
        );

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });

        if (data.error) {
            const error = data.error;
            dispatch({ type: UPDATE_ORDER_FAIL, payload: error });
        }

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


/*---------------------*\
 * CLEARING ERRORS
\*---------------------*/
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}