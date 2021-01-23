import { Route } from 'react-router-dom';
import ProtectedRoute from './Component/ProtectedRoute';
import Login from './Component/Login';
import Todo from './Component/Todo';

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
    return (
        <>
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path="/" exact component={Todo} />
        </>
    );
};

export default App;
