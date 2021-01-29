import axios from "axios";
import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST
} from "../constants/productConstants";

const baseUrl = "http://127.0.0.1:5001";

const listProducts = () => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const { data } = await axios.get(baseUrl+"/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        console.log("Product Id"+ productId);
        const { data } = await axios.get(baseUrl+"/api/products/" + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}

export { listProducts, detailsProduct }