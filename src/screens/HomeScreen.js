import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';

function HomeScreen(props) {
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {
        };
    }, [])

    console.log(products);
    return loading ? <div>loading...</div> :
        error ? <div>{error}</div> :

            <ul className="products">
                {
                    products.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <div className="product-name">
                                    <Link to={'/product/' + product._id} className="href">
                                        {product.name}
                                        <img className="product-image" src={product.image} alt="products"/>
                                    </Link>
                                </div>
                                <div className="product-brand">
                                    {product.brand}
                                </div>
                                <div className="product-price">
                                    ${product.price}
                                </div>
                                <div className="product-rating">
                                    {product.rating} Stars {product.numReviews}
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
}
export default HomeScreen;