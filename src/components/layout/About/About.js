import React from "react";
/*---------------------*\
 * IMPORT Components
\*---------------------*/
import "./About.css";

/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import AvatarImage from "../../../images/avatar.jpg";

// #########################
const About = () => {
    // #######################
    const visitInstagram = () => {
        window.location = "https://www.facebook.com/profile.php?id=100044022424100";
    };

    // #######################
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src={AvatarImage}
                            alt="Founder"
                        />
                        <Typography>DVHcoding</Typography>

                        <Button onClick={visitInstagram} color="primary">
                            Visit Facebook
                        </Button>

                        <span>
                            This is a ecommerce wesbite made by @DVHcoding. Only with the
                            purpose to teach MERN Stack on the channel DVHcoding
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.youtube.com/@DVHcoding"
                            target="blank"
                        >
                            <YouTubeIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://www.facebook.com/profile.php?id=100044022424100" target="blank">
                            <FacebookIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
