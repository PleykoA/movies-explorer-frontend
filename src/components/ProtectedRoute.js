import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props }) {
    //console.log(props.loggedIn, 'logged');
    return props.loggedIn === true ? (
        <Component {...props} />
    ) : (
        <Navigate to='/signin' replace />
    );
}
export default ProtectedRoute;