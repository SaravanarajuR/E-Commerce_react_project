import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;



    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(listTopSellers());
    }, [dispatch]);
    return (
        <div>
            <div className="home-div">
                <h2 className="slogan">Sow the Seed & <br /> Feel free to feed</h2>
                <Link to='/'> <button className="explore"> Explore </button></Link>
            </div>
            <h2 className='feature'>Featured Products</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                        {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}