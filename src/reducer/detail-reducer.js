// 购物车reducer
// 增删改查

//初始化仓库
const defaultState = {
    goodslist: [],
    step: 0
}

//创建reducer
const reducer = (state = defaultState, action) => {
    let {
        type,
        payload
    } = action;
    switch (type) {
        // 增加商品
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist: [...state.goodslist, payload]
            }

            //删除商品
        case 'REMOVE_CART':
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.id !== payload.id)
            }

            //更新商品数量
        case 'UPDATA_QTY':
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.id === payload.id) {
                        item.qty = payload.qty;
                    }
                    return item;
                })
            }
        default:
            return state;
    }

}

export default reducer;
