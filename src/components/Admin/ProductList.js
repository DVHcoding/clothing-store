import React, { Fragment, useEffect } from "react";
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import "./ProductList.css";
import { clearErrors, getAdminProduct, deleteProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";
import { formatNumber } from "../FormatNumber/formatNumber";

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
    // #######################
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // #######################
    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted, loading } = useSelector((state) => state.product);


    // #######################
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };


    // #######################
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    // ########################
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];


    // ########################
    const rows = products.map((item) => ({
        id: item._id,
        stock: item.Stock,
        price: formatNumber(item.price),
        name: item.name,
    }));


    // ########################
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title={`ALL PRODUCTS - Admin`} />

                    <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer" style={{ overflow: "hidden" }}>
                            <h1 id="productListHeading">ALL PRODUCTS</h1>

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className="productListTable"
                                autoHeight
                            />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductList;
