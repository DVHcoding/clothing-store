import React, { Fragment, useState, useEffect } from 'react';

/*-----------------------------------*\
 * IMPORT Components
\*-----------------------------------*/
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';


/*-----------------------------------*\
 * IMPORT Npm
\*-----------------------------------*/
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';



const UpdateProfile = () => {

    // #################
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // #################
    const { user } = useSelector((state) => state.user);
    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const [uploading, setUploading] = useState(false);


    // #################
    const updateProfileSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        // #################
        const myForm = new FormData();
        myForm.append("file", avatar);
        myForm.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        myForm.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
        myForm.append("folder", "avatars");

        // #################
        user.name = name;
        user.email = email;


        // #################
        if (avatar !== undefined) {
            try {
                setUploading(true);

                user.old_public_id = user.avatar.public_id;

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, myForm, config);

                const { public_id, url } = cloudinaryResponse.data;

                user.avatar.public_id = public_id;

                user.avatar.url = url;

                setUploading(false);
            } catch (error) {
                alert.error(error);
            }
        }

        dispatch(updateProfile(user));

    };



    // #################
    const updateProfileDataChange = async (e) => {

        const file = e.target.files[0];
        setAvatar(file);

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    // #################
    useEffect(() => {
        // #################
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        // #################
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        // #################
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, alert, error, navigate, user, isUpdated]);



    return (
        <Fragment>
            {loading || uploading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <div className='boxImage'>
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                    </div>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default UpdateProfile