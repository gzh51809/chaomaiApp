export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATA_QTY = 'UPDATA_QTY';

export const add = goods => {
    return {
        type: ADD_TO_CART,
        payload: goods
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

export const changeQty = (id, qty) => ({
    type: UPDATA_QTY,
    payload: {
        id,
        qty
    }
});

export default {
    add,
    remove,
    clear,
    changeQty
}