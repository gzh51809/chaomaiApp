import {combineReducers} from 'redux';

//引入reducer
import cartReducer from './cart-reducer';


//组合多个reducer
const rootReducer=combineReducers({

    cart:cartReducer
});

export default rootReducer;