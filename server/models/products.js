//products schema

const { Schema } = require('mongoose');
const { model } = require('mongoose');

// Define a sub-schema for reviews
const reviewSchema = new Schema({
   userDetails: { type: String, required: true },
   reviewText: { type: String, default: null },
   createdAt: { type: Date, default: Date.now }
});


const productSchema = new Schema({
   productId: { type: String, required: true,unique:true },
   productName: { type: String, required: true },
   category: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: String, required: true },

  
    reviews: [reviewSchema]  

   
});

const products = model('item',productSchema );

module.exports = products;


