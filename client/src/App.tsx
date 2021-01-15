import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Login from './Component/Login';
import Todo from './Component/Todo';
import { useAuth } from './Context/AuthContext';

// #F56A57
// #4E3C36
// #F7EADC

// #EAE7DC
// #DBC3A5
// #4E3C36
// #8E8D8A
// #E98074
// #E85A4F

const App = () => {
    const { isFetching } = useAuth();

    return isFetching ? (
        <span />
    ) : (
        <Fragment>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Todo} />
        </Fragment>
    );
};

export default App;
