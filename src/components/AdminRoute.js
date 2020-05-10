
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = useSelector(state => state.curUser.isLoggedIn)
    const admin = useSelector(state => state.curUser.user.admin)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn && admin ?
                // true ?  ///for testing
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};


export default AdminRoute;