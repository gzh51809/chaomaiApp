import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from '../page/home';
import Cart from '../page/cart';
import UserShare from '../page/user/Share';
import UserCenter from '../page/user/Center';
export default (
    <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/user/share' component={UserShare}/>
        <Route path='/user/center' component={UserCenter}/>
        <Redirect from={'/'} to={'/home'} exact/>
    </Switch>
)
