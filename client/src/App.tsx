import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './Component/ProtectedRoute';
import LoginApp from './Component/LoginApp';
import TodoApp from './Component/TodoApp';

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
        <Switch>
            <Route path="/login" exact component={LoginApp} />
            <ProtectedRoute path="/" exact component={TodoApp} />
        </Switch>
    );
};

export default App;
