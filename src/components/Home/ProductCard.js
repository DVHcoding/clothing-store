import React from 'react'
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import { formatNumber } from '../FormatNumber/formatNumber';

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { Link } from 'react-router-dom';
// import Rating from '@mui/material/Rating';
import { Rate } from "antd";

const ProductCard = ({ product }) => {

    const options = {
        count: 5,
        value: product.rating,
        disabled: true,
        allowHalf: true,
    };


    return (
        <Link className="productCard" to={`/product/${product?._id}`}>
            <img src={product?.images[0]?.url} alt={product?.name} />
            <p>{product.name}</p>

            <div>
                <Rate {...options} style={{ fontSize: "15px" }} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{formatNumber(product.price)}</span>
        </Link>
    );
}

export default ProductCard