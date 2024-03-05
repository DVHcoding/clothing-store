import React, { Fragment, useEffect, useState } from "react";
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import "./NewProduct.css";
import { clearErrors, createProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {

    // ########################
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);


    // ########################
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
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


    // ########################
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, navigate, success]);


    // ########################
    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        const productFields = {
            name,
            price,
            description,
            category,
            Stock,
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

                uploadedImagesData.push({
                    public_id: public_id,
                    url: url,
                });
            }

            // ##########################
            productFields.images = uploadedImagesData;

            setLoadingUpload(false);

        } catch (error) {
            alert.error(error);
        }

        dispatch(createProduct(productFields));
    };


    // ########################
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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


    // ########################

    return (
        <Fragment>
            {loadingUpload || loading ? (<Loader />) : (
                <Fragment>
                    <Fragment>
                        <MetaData title="Create Product" />
                        <div className="dashboard">
                            <SideBar />
                            <div className="newProductContainer">
                                <form
                                    className="createProductForm"
                                    encType="multipart/form-data"
                                    onSubmit={createProductSubmitHandler}
                                >
                                    <h1>Create Product</h1>

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
                                        <select onChange={(e) => setCategory(e.target.value)}>
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
                                        />
                                    </div>

                                    <div id="createProductFormFile">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={createProductImagesChange}
                                            multiple
                                        />
                                    </div>

                                    <div id="createProductFormImage">
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image} alt="Product Preview" />
                                        ))}
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading || images.length === 0 || category === "" ? true : false}
                                        style={images.length === 0 || category === "" ? { "backgroundColor": "gray", "color": "white" } : {}}
                                    >
                                        Create
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                </Fragment>
            )}
        </Fragment>
    );
};

export default NewProduct;
