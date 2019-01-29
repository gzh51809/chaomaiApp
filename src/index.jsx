import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import App from './App';
import './App.css';
import './statics/iconfont/iconfont.css';
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , 
    document.getElementById('root')
);



