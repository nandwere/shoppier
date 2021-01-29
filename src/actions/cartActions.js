import axios from "axios";
import Cookies from "js-cookies/src/cookies";
import {CART_ADD_ITEM} from "../constants/cartConstants";
import {CART_REMOVE_ITEM} from "../constants/cartConstants"

const baseUrl = "http://127.0.0.1:5001";

const addToCart = (productId, qty ) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(baseUrl+"/api/products/"+ productId);
        dispatch({type: CART_ADD_ITEM, payload:{
             product: data._id,
             name: data.name,
             image: data.image,
             price: data.price,
             countInStock: data.countInStock,
             qty
        }});
        const {cart:{cartItems}} = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

const removeFromCart = (productId) =>  (dispatch, getState) =>{

    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart:{cartItems}} = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));


}

export {addToCart, removeFromCart}