import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const { isAuth } = useAuth();
    return isAuth ? <Route {...props} component={props.component} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
