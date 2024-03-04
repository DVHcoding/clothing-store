import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";


const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:dohung2ka3@gmail.com">
                <Button>Contact: dohung2ka3@gmail.com</Button>
            </a>
        </div>
    );
};

export default Contact;
