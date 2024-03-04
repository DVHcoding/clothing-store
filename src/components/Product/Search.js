import React, { Fragment, useState } from 'react'
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import "./Search.css";
import MetaData from '../layout/MetaData';


/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { useNavigate } from 'react-router-dom';


const Search = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    }

    return (
        <Fragment>
            <MetaData title="Search a Product" />
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder='Search a Product ...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
}

export default Search;