//UserProdReviewCard component

import React from 'react';
import dummyImage from '../assets/images/placeholder.jpg'; 

const UserProdReviewCard = ({ product }) => {
  return (
    <div className="my-8 text-md">
      <div className="border border-gray-300 rounded-md p-4 bg-white">
        <div className="flex items-center mb-4">
          <img src={dummyImage} alt="Product" className="h-28 border border-solid" />
          <div className="ml-4">
            <p className="text-md font-semibold">{product.productName}</p>
            <p className="text-md font-semibold">Category :{product.category}</p>
            <p className="text-md font-semibold">{product.description}</p>
            <p className="text-md font-semibold">Price: {product.price}</p>
            <div className="flex items-center mt-1">
             
              <div className="flex">
                <span className="text-yellow-500">★</span>
                <span className="text-yellow-500">★</span>
                <span className="text-yellow-500">★</span>
                <span className="text-gray-400">☆</span>
                <span className="text-gray-400">☆</span>
              </div>
              <p className="text-gray-500 ml-2">Posted on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-600">{product.reviews.find(review => review.userDetails === product.userDetails)?.reviewText || 'No review'}</p>
      </div>
    </div>
  );
};

export default UserProdReviewCard;



