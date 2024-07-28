//Product card

import React from 'react';
import { getUserType } from '../pages/Loginpage';
import { Link, useParams } from 'react-router-dom';
import dummyImage from '../assets/images/placeholder.jpg'; 

const Productcard = ({ product }) => {
  const userType = getUserType();
  console.log(product)

  return (
    <div className='border border-solid border-gray-400 rounded-lg p-4 flex flex-col'>
      <h2 className='text-xl font-semibold mb-2'>{product.productName}</h2>
      <img src={dummyImage} alt="product thumbnail" className='w-full h-40 object-cover rounded-md mb-2' />
      <p className='text-black mb-2'>{product.description}</p>

      <div className="flex justify-between items-center">
        
        <Link to={`/view-product/${product.productId}`}>
           <button class=" rounded-full bg-teal-500 px-8 py-2 hover:outline-double  hover:outline-teal-500">View</button>     
        </Link>

        {userType === 'admin' && (
          <Link to="">
            <button className="rounded-full bg-red-600 px-8 py-2 hover:outline-double hover:outline-red-600">Delete</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Productcard;


