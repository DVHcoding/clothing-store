import React from "react";
/*---------------------*\
* IMPORT Components
\*---------------------*/
import "./OrderSuccess.css";

/*---------------------*\
* IMPORT Npm
\*---------------------*/
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";


const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;
