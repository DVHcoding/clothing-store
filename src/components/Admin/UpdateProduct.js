import React, { Fragment, useEffect, useState } from "react";
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import {
    clearErrors,
    updateProduct,
    getProductDetails,
} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";



/*---------------------*\
* IMPORT Npm
\*---------------------*/
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// ########################
const UpdateProduct = () => {

    // ########################
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, product } = useSelector((state) => state.productDetails);


    // ########################
    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);



    // ########################
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loadingUpload, setLoadingUpload] = useState(false)


    // ########################
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


    const productId = id;


    // ########################
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully")
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, product, error, alert, navigate, isUpdated, id, updateError]);



    // ########################
    const updateProductSubmitHandler = async (e) => {
        e.preventDefault();

        const productFields = {
            name,
            price,
            description,
            category,
            Stock,
            images,
        };



        // ##########################
        try {
            setLoadingUpload(true);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false
            };


            // ##########################
            const uploadedImagesData = [];


            // ##########################
            for (const image of images) {

                const formData = new FormData();

                formData.append("file", image);
                formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
                formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
                formData.append("folder", "products");

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
                    formData,
                    config
                );

                const { public_id, url } = cloudinaryResponse.data;

                console.log(public_id);

                uploadedImagesData.push({
                    public_id: public_id,
                    url: url,
                });
            }

            // ##########################
            productFields.images = uploadedImagesData;

            console.log(productFields)

            setLoadingUpload(false);

        } catch (error) {
            alert.error(error);
        }


        dispatch(updateProduct(productId, productFields));
    };


    // ########################
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    return (
        <Fragment>
            {loading || loadingUpload ? (<Loader />) : (
                <Fragment>
                    <MetaData title="UPDATE PRODUCT" />

                    <div className="dashboard">
                        <SideBar />
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateProductSubmitHandler}
                            >
                                <h1>Update Product</h1>

                                <div>
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        required
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>

                                <div>
                                    <DescriptionIcon />

                                    <textarea
                                        placeholder="Product Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        cols="30"
                                        rows="1"
                                    ></textarea>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Choose Category</option>
                                        {categories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <StorageIcon />
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        required
                                        onChange={(e) => setStock(e.target.value)}
                                        value={Stock}
                                    />
                                </div>

                                <div id="createProductFormFile">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProductImagesChange}
                                        multiple
                                    />
                                </div>

                                <div id="createProductFormImage">
                                    {oldImages &&
                                        oldImages.map((image, index) => (
                                            <img key={index} src={image.url} alt="Old Product Preview" />
                                        ))}
                                </div>

                                <div id="createProductFormImage">
                                    {imagesPreview.map((image, index) => (
                                        <img key={index} src={image} alt="Product Preview" />
                                    ))}
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProduct;
