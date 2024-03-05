import React, { Fragment, useRef, useState, useEffect } from 'react';

/*-----------------------------------*\
 * IMPORT Components
\*-----------------------------------*/
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, login, register } from "../../actions/userAction";


/*-----------------------------------*\
* IMPORT Npm
\*-----------------------------------*/
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
axios.defaults.withCredentials = true;


const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // ##################
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);


    // ##################
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [uploading, setUploading] = useState(false);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    let { name, email, password } = user;

    // ##################
    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword));
    };


    // ##################
    const registerSubmit = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append("file", avatar);
        myForm.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        myForm.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
        myForm.append("folder", "avatars");

        try {
            setUploading(true);

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, myForm, config);

            const { public_id, url } = cloudinaryResponse.data;

            user.public_id = public_id;
            user.url = url;

            setUploading(false);
        } catch (error) {
            alert.error(error);
        }

        dispatch(register(user));
    };

    // ##################
    const registerDataChange = async (e) => {
        if (e.target.name === "avatar") {
            if (e.target.files.length === 0) {
                setAvatarPreview("/Profile.png");
                return;
            }

            const file = e.target.files[0];
            setAvatar(file);

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    // ##################
    const { redirect } = useParams();


    /*---------*/
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/shipping");
        } else {
            navigate(`/login?redirect=${redirect || "/shipping"}`);
        }

    }, [dispatch, alert, error, isAuthenticated, navigate, redirect]);


    /*------*/
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


    return (
        <Fragment>
            {loading || uploading ? (<Loader />) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>

                            {/* LOGIN FORM */}
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forget Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>


                            {/* SIGN-UP FORM */}
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <div className='boxImage'>
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                    </div>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default LoginSignUp