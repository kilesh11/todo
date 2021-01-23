import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const { user } = useAuth();
    return user ? <Route {...props} component={props.component} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
