import React, { Fragment, useEffect, useState } from 'react';
/*---------------------*\
 * IMPORT Css
\*---------------------*/
import "./ProductDetails.css";

/*---------------------*\
 * IMPORT Components
\*---------------------*/
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { formatNumber } from '../FormatNumber/formatNumber';
import ReviewCard from "./ReviewCard";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET, CLEAR_PRODUCT_DETAILS } from '../../constants/productConstants';


/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rate } from 'antd';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/swiper-bundle.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


// ###############################
const ProductDetails = () => {


    // ################ 
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // ################ 
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { isAuthenticated } = useSelector((state) => state.user);

    // ############################
    // #    MANAGEMENT STATE      #
    // ############################
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    // ################ 
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };


    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }


    // ################ 
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item add To Cart");
    }


    // ################ 
    const options = {
        count: 5,
        value: product ? product.rating : 0,
        disabled: true,
        allowHalf: true,
    };


    // ################ 
    const submitReviewToggle = () => {
        setOpen(!open);
    };


    // ################ 
    const reviewSubmitHandler = () => {
        if (!isAuthenticated) {
            alert.error("Please Login to review")
            navigate("/login");
        }

        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };




    // ################ 
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
            navigate("/ProductNotFound")
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(id));


        return () => {
            dispatch({ type: CLEAR_PRODUCT_DETAILS })
        }

    }, [dispatch, error, id, alert, success, reviewError, navigate]);


    // ################ 
    return (
        <Fragment>
            {loading || !product ? (<Loader />) : (
                <Fragment>
                    <MetaData title={`${product.name}`} />

                    <div className="ProductDetails">
                        <div>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    maxHeight: "30rem"
                                }}
                                loop={true}
                                autoplay={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                {product.images && product.images.map((item, i) => (
                                    <SwiperSlide key={item.url}>
                                        <img
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {product && product.images.map((item, i) => (
                                    <SwiperSlide key={item.url}>
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                            style={{ maxHeight: "130px" }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>

                            <div className="detailsBlock-2">
                                <Rate  {...options} style={{ fontSize: '15px' }} />

                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>


                            <div className="detailsBlock-3">
                                <h1>{formatNumber(product.price)}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    <button disabled={product.Stock < 1} style={product.Stock < 1 ? { "backgroundColor": "gray", "color": "white" } : {}} onClick={addToCartHandler}>
                                        Add to Cart
                                    </button>

                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Mô tả: <p>{product.description}</p>
                            </div>

                            <button className="submitReview" onClick={submitReviewToggle}>Đánh giá</button>
                        </div>
                    </div>

                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>

                        <DialogContent className="submitDialog">
                            <Rate
                                onChange={(value) => setRating(parseFloat(value))}
                                value={parseFloat(rating)}
                                size="small"
                                name={product ? `product-rating-${id}` : ""}
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>


                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>

                    </Dialog>


                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </Fragment>
            )}

        </Fragment >
    );
}

export default ProductDetails;
