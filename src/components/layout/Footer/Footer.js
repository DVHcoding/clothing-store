import React from 'react'

/*---------------------*\
 * IMPORT Css
\*---------------------*/
import "./Footer.css";

/*---------------------*\
 * IMPORT Images
\*---------------------*/
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";


const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2024 &copy; DVHcoding</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.youtube.com/watch?v=AN3t-OmdyKA&t=18179s">Instagram</a>
                <a href="https://www.youtube.com/watch?v=AN3t-OmdyKA&t=18179s">Youtube</a>
                <a href="https://www.facebook.com/profile.php?id=100044022424100">Facebook</a>
            </div>
        </footer>
    );
}

export default Footer