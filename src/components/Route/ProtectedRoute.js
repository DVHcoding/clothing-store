import React from 'react'

/*---------------------*\
* IMPORT Npm
\*---------------------*/
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading === false) {

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        if (isAdmin === true && user.role !== "admin") {
            return <Navigate to="/account" />;
        }
    }

    return <Outlet />;
}


export default ProtectedRoute