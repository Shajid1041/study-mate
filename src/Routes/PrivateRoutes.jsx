import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader/Loader';


const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loader } = use(AuthContext)
    if (loader) {
        return <Loader></Loader>
    }
    if (user) {
        return children
    }
    return <Navigate state={location?.pathname} to={'/signin'}></Navigate>
};

export default PrivateRoutes;