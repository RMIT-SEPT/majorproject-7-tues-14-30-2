import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from ''
import { isWorker } from ''
import { isCustomer } from ''

const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Switch>
            <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} />
            : <Redirect to="/Admin_Dashboard" />
            
            )} />

            <Route {...rest} render={props => (
            isWorker() ?
                <Component {...props} />
            : <Redirect to="/Worker_Dashboard" />
            )} />

            <Route {...rest} render={props => (
            isCustomer() ?
                <Component {...props} />
            : <Redirect to="/Customer_Dashboard" />
            )} />
            

        </Switch>
        

    );
};

export default PrivateRoute;

