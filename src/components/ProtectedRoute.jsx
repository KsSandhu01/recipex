import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

const ProtectedRoute = () => {
    let isTrue = JSON.parse(localStorage.getItem('auth'));

    // If 'auth' is not in the local storage or it's false, set it to false
    if (isTrue === null || isTrue === false) {
      isTrue = false;
      localStorage.setItem('auth', JSON.stringify(isTrue));
    }
  
    return isTrue ? <Outlet /> : <Navigate to="/login" />;

    

    return(
        isTrue == true ? <Outlet/> : <Navigate to="/login"/>
    )
};

export default ProtectedRoute;
