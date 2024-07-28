// Addreviewpage

import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import dummyImage from '../assets/images/placeholder.jpg';
import { jwtDecode } from 'jwt-decode';
import Reviewcard from '../components/Reviewcard'; 

const Addreviewpage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState('');
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const userEmail = getUserEmail();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                    setReviews(data.reviews || []); 
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const submitReview = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token'); 

        try {
            const res = await fetch(`/api/products/view-review/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    reviewText,
                    userEmail: userEmail
                }),
            });

            if (res.ok) {
                const updatedProduct = await res.json();
                setReviews([...reviews, updatedProduct.reviews.slice(-1)[0]]); 
                toast.success('Review added successfully');
                setReviewText('');
                // navigate('/user-home/reviewed-products', { state: { reviewedProduct: updatedProduct } });
               
            } else {
                toast.error('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review:', error);
            toast.error('Failed to add review');
        }
        
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />

            <form className="block space-y-6 mx-auto my-12 bg-white p-8 md:p-12 shadow-2xl rounded-lg max-w-3xl" 
                onSubmit={submitReview}>
                 <p className="text-3xl font-sans font-semibold">{product.productName}</p>
                <div className='flex gap-6'>
                    <div>
                        <img src={dummyImage} alt="Product" className="h-48 border border-none rounded-lg" />
                    </div>
                    
                    <div>
                       
                        <p className="text-xl font-bold">Category :{product.category}</p>
                        <p className="text-xl font-bold">{product.description}</p>
                        <p className="text-xl font-semibold">Price: {product.price}</p>
                    </div>
                </div>
               

            <textarea
                placeholder="Write a review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
                type="submit"
                className="bg-gray-900 text-white rounded-lg py-2 px-6 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>

            <p className="text-2xl font-bold mt-6">Customer Ratings</p>

            <div className="mt-4 space-y-4">
                {reviews.map((review, index) => (
                <Reviewcard key={index} review={review} />
                ))}
            </div>
            </form>

        </>
    );
};



const productLoader = async ({ params }) => {
    const res = await fetch(`/api/products/${params.id}`);
    const data = await res.json();
    return data;
}
  
const getUserEmail = () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    console.log("document.cookie vslue", authToken);
  
    const decoded = jwtDecode(authToken);
    console.log("decoded", decoded);
    const userEmail = decoded.userEmail;
    console.log("useremail", userEmail);
    return userEmail;
  };

export { Addreviewpage as default, productLoader, getUserEmail };
    
    
