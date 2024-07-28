//UserReviewsPage


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import UserProdReviewCard from '../components/UserProdReviewCard';
import { getUserEmail } from './Addreviewpage'; 
import { productLoader } from './Addreviewpage';

const UserReviewsPage = () => {
    const location = useLocation();
    const reviewedProduct = location.state?.reviewedProduct;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = getUserEmail(); 

    useEffect(() => {
        const fetchReviewedProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/user-home/reviewed-products', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProducts(data); 
                } else {
                    throw new Error('Failed to fetch reviewed products');
                }
            } catch (error) {
                console.error('Error fetching reviewed products:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchReviewedProducts();
    }, [reviewedProduct, userEmail]);

    return (
        <>
            <Header />
            <div className="mx-24 bg-white">
                <div className="p-8">
                    <h3 className="font-semibold text-4xl">Your Reviews</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="mt-6">
                            {products.map((product, index) => (
                                <UserProdReviewCard key={index} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export { UserReviewsPage as default, productLoader, getUserEmail };




