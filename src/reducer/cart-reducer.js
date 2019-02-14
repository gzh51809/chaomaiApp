// 购物车reducer
// 增删改查

//cartAction
import {
    ADD_TO_CART,
    ADD_TO_SAME_CART,
    REMOVE_CART,
    CLEAR_CART,
    UPDATA_QTY,
    CHANGE_OPEN,
    DELETE_SAME
} from '../action/cartAction'


//初始化仓库
const defaultState = {
    goodslist: [],
    open: false
}

//创建reducer
const reducer = (state = defaultState, action) => {
    let {
        type,
        payload
    } = action;
    switch (type) {
        // 增加商品
        case ADD_TO_CART:
            return {
                ...state,
                goodslist: [...state.goodslist, payload]
            }
            //增加同商店商品
        case ADD_TO_SAME_CART:
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.id === payload.id) {
                        item.product.push(payload.goods)
                    }
                    return item;
                })
            }
            //删除商品
        case REMOVE_CART:
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.id !== payload.id)
            }

            //更新商品数量
        case UPDATA_QTY:
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.id === payload.id) {
                        item.product.map(it => {
                            if (it.id === payload.uid) {
                                it.qty = payload.qty;
                            }
                            return it;
                        })
                    }
                    return item;
                })
            }
            //清空购物车
        case CLEAR_CART:
            return {
                ...state,
                goodslist: []
            }
            //删除同店铺商品
        case DELETE_SAME:
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.id === payload.id) {
                        item.product=item.product.filter(it => {
                            return it.id !== payload.uid
                        })
                    }
                    return item;
                })
            }
        case CHANGE_OPEN:
            return {
                ...state,
                open: !state.open,
                goodslist:state.goodslist.map(item=>{
                    item.product.map(it=>it.open=!state.open)
                    return item;
                })
            }

        default:
            return state;
    }

}

export default reducer;