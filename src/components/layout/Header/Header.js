import React from 'react'
/*---------------------*\
 * IMPORT Css
\*---------------------*/
import "./Header.css";

/*---------------------*\
 * IMPORT Images
\*---------------------*/
import logo from "../../../images/logo.jpg";

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ReactNavbar } from "overlay-navbar";


const Header = () => {
    return (<ReactNavbar
        burgerColorHover="#eb4034"
        logo={logo}
        logoUrl="/"
        logoWidth="20vmax"
        navColor1="white"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="gray"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        link1Margin="1vmax"
        profileIconUrl="/account"
        profileIcon={true}
        ProfileIconElement={AccountBoxIcon}
        profileIconColor="gray"
        searchIcon={true}
        SearchIconElement={SearchIcon}
        searchIconColor="gray"
        cartIcon={true}
        CartIconElement={ShoppingCartIcon}
        cartIconColor="gray"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
    />
    );
}

export default Header