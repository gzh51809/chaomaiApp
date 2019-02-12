import {combineReducers} from 'redux';

//引入reducer
import detailReducer from './detail-reducer';
import cartReducer from './cart-reducer';


//组合多个reducer
const rootReducer=combineReducers({
    detail:detailReducer,
    cart:cartReducer
});

export default rootReducer;