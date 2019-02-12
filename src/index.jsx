import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import './App.css';
import './statics/iconfont/iconfont.css';
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>

    ,
    document.getElementById('root')
);



