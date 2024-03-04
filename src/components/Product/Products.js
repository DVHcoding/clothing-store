import React, { Fragment, useEffect, useState } from 'react'
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import MetaData from '../layout/MetaData';
import { formatNumber } from '../FormatNumber/formatNumber';

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import { Slider } from 'antd';



const categories = [
    "Áo sơ mi",
    "Áo dáng peplum",
    "Áo thun len",
    "Áo vest/blazer",
    "Set bộ công sở",
    "Quần dài",
    "Quần jeans",
    "Chân váy bút chì",
    "Chân váy chữ A",
    "Chân váy jeans",
    "Đầm công sở",
    "Phụ kiện",
];

const Products = () => {
    // ########################
    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();


    // ########################
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
    } = useSelector(state => state.products);


    // ########################
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 5000000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    // ########################
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }


    // ########################
    const priceHandler = (newPrice) => {
        setPrice(newPrice);
    }

    // ########################
    const formatter = (value) => {
        return <span>{formatNumber(value)}</span>;
    };


    // ########################
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings));

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (window.scrollY > 100) {
            window.scrollTo(0, 0);
        }

    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);



    return (
        <>
            {loading ? (<Loader />)
                : (
                    <Fragment>
                        <MetaData title="ALL PRODUCTS" />
                        <h1 className="productsHeading">Products</h1>

                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                range
                                defaultValue={price}
                                onChangeComplete={(value) => priceHandler(value)}
                                min={0} max={5000000}
                                tipFormatter={formatter}
                            />


                            <Typography>Category</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className='category-link'
                                        key={category}
                                        onClick={() => setCategory(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    defaultValue={ratings}
                                    onChangeComplete={(newRating) => {
                                        setRatings(newRating);
                                    }}
                                    min={0}
                                    max={5}
                                >
                                </Slider>

                            </fieldset>
                        </div>


                        {resultPerPage < productsCount && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}

                    </Fragment>
                )
            }
        </>
    );
}

export default Products;