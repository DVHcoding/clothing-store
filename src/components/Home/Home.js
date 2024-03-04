import React, { Fragment, useEffect } from 'react'
/*---------------------*\
 * IMPORT Css
\*---------------------*/
import "./Home.css";

/*---------------------*\
 * IMPORT Components
\*---------------------*/
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productAction.js";
import Loader from '../layout/Loader/Loader.js';

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { CgMouse } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)


    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getProduct());

    }, [dispatch, error, alert]);



    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="HOME PAGE" />

                    <div className="banner">

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div style={{ marginInline: "auto", maxWidth: "max-content" }}>
                        <Link to={"/products"} >
                            <Button variant="outlined" sx={{
                                '&:hover': {
                                    backgroundColor: '#3f51b5', // Màu nền khi hover
                                    color: 'white', // Màu chữ khi hover
                                }
                            }}>Xem thêm</Button>
                        </Link>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home