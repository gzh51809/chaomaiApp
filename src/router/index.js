import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from '../page/home';
import Cart from '../page/cart';
import UserShare from '../page/user/Share';
import UserCenter from '../page/user/Center';
import ProductCategory from '../page/product/category';
import ProductDetail from '../page/product/detail';
import Login from '../page/login';
import Register from '../page/register';

export default (
    <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/user/share' component={UserShare}/>
        <Route path='/user/center' component={UserCenter}/>
        <Route path='/product/category' component={ProductCategory}/>
        <Route path='/product/detail/:id' component={ProductDetail}/>
        <Redirect from={'/'} to={'/home'} exact/>
    </Switch>
)
