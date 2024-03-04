import React, { Fragment, useState, useEffect } from "react";
/*---------------------*\
* IMPORT Components
\*---------------------*/
import "./ConfirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { formatNumber } from "../FormatNumber/formatNumber";
import Loader from "../layout/Loader/Loader";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { RESET_CART } from "../../constants/cartConstants";


/*---------------------*\
* IMPORT Npm
\*---------------------*/
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";



const ConfirmOrder = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    // #########################################
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );


    // #########################################
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    // #########################################
    const [loading, setLoading] = useState(false)



    // #########################################
    const proceedToPayment = async () => {
        try {

            // ###################
            setLoading(true);

            const orderInfo = {
                shippingInfo,
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shippingCharges,
                totalPrice: totalPrice,
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // ###################
            const response = await axios.post("/api/v1/stripe/create-checkout-session", {
                cartItems,
                orderInfo,
                userId: user._id,
            }, config);


            if (response.data.url) {
                window.location.href = response.data.url;
            } else {
                alert.error("You are have some error. Please try after");
            }

            setLoading(false);

        } catch (error) {
            alert.error("Hệ thống bị lỗi bạn vui lòng thử lại sau hoặc giảm bớt sản phẩm!");
            navigate("/order/confirm");
            setLoading(false);
        }
    };

    const paymentToDelivery = () => {
        const order = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice: subtotal,
            taxPrice: tax,
            shippingPrice: shippingCharges,
            totalPrice: totalPrice,
            paymentInfo: {
                id: `${Date.now()}`,
                status: "notPaid",
            },
        };

        dispatch(createOrder(order));
        dispatch({ type: RESET_CART });

        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");

        navigate("/success");
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, navigate]);



    // #########################################
    return (
        <>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="Confirm Order" />

                    <CheckoutSteps activeStep={1} />
                    <div className="confirmOrderPage">
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="confirmshippingAreaBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            <div key={item.product}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                </div>
                                                <span>
                                                    {item.quantity} x {formatNumber(item.price)} ={" "}
                                                    <b>{formatNumber(item.price * item.quantity)}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* ########################################### */}
                        <div>
                            <div className="orderSummary">
                                <Typography>Order Summery</Typography>
                                <div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>{formatNumber(subtotal)}</span>
                                    </div>
                                    <div>
                                        <p>Shipping Charges:</p>
                                        <span>{formatNumber(shippingCharges)}</span>
                                    </div>
                                    <div>
                                        <p>GST:</p>
                                        <span>{formatNumber(tax)}</span>
                                    </div>
                                </div>

                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>{formatNumber(totalPrice)}</span>
                                </div>

                                <button onClick={proceedToPayment} className="cardPaymentBtn">Thanh toán bằng thẻ VISA</button>
                                <button onClick={paymentToDelivery} className="paymentBtn">Thanh toán khi nhận hàng</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    );
};

export default ConfirmOrder;
