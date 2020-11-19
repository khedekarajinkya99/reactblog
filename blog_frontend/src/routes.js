import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Welcome from '././components/Welcome/Welcome';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import Home from '././components/Home/Home';
import AddBlog from '././components/AddBlog/AddBlog';
import EditBlog from '././components/EditBlog/EditBlog';
import NotFound from  '././components/NotFound/NotFound';

const Routes = () => (

    <BrowserRouter>
        <Switch>
            {/* <Route exact path="/" component={Welcome} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/addblog" component={AddBlog} />
            <Route path="/edit" component={EditBlog} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>

);

export default Routes;