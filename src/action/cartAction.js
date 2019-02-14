export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATA_QTY = 'UPDATA_QTY';
export const CHANGE_OPEN = 'CHANGE_OPEN';
export const ADD_TO_SAME_CART = 'ADD_TO_SAME_CART';
export const DELETE_SAME = 'DELETE_SAME';
export const add = goods => {
    return {
        type: ADD_TO_CART,
        payload: goods
    }
}
export const addSameCart=(id,goods)=>{
    return {
        type: ADD_TO_SAME_CART,
        payload:{
            id,
            goods
        }
    }
}
export const remove = id => {
    return {
        type: REMOVE_CART,
        payload: {
            id
        }
    }
}

export const clear = () => {
    return {
        type: CLEAR_CART
    }
}

export const changeQty = (id,uid, qty) => ({
    type: UPDATA_QTY,
    payload: {
        id,
        uid,
        qty
    }
});

export const deleteSame=(id,uid)=>({
    type:DELETE_SAME,
    payload:{
        id,
        uid
    }
})
export const changeOpen = () => ({
    type: CHANGE_OPEN
});
export default {
    add,
    remove,
    clear,
    changeQty,
    changeOpen,
    deleteSame
}