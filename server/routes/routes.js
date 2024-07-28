//routes.js

const express = require("express");
const router = express.Router();
const products = require("../models/products");
const verifyToken = require("../middleware/authMiddleware");



router.get("/all-products", async (req, res) => {
  const details = await products.find({});
  res.json(details);
});



router.get("/products", verifyToken, async (req, res) => {
  const details = await products.find({});
  res.json(details);
});

router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const details = await products.findOne({ productId: productId }, { _id: 0 });
  res.json(details);
});

router.post("/products", async (req, res) => {
  try {
    const data = req.body;
    const result = await products.create(data);
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});


router.put("/products/:id", async (req, res) => {
  const data = req.body;
  const productId = data.productId;
  try {
    const result = await products.findOneAndUpdate(
      { productId: productId},
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).send("Item not found");
    }
    res.send("Item updated successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.delete("/products/:id",verifyToken, async (req, res) => {
  const productId = req.params.id;
  if(req.userType != 'admin'){
    return res
    .status(401)
    .json({ error: "Authentication failed- password doesn't match" });
  }
  try {
    const result = await products.findOneAndDelete({ productId: productId });
    if (!result) {
      return res.status(404).send("Item not found");
    }
    res.send("Item deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});


router.get('/products/:id', async (req, res) => {
  try {
      const product = await products.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


router.post('/products/view-review/:id',verifyToken, async (req, res) => {
  const { id } = req.params;
   const userEmaill = req.email
  const { reviewText ,userEmail} = req.body;
  console.log(userEmail);

  try {
      const updatedProduct = await products.findOneAndUpdate(
          { productId: id },
          { $push: { reviews: { userDetails: userEmaill, reviewText } } },
          { new: true }
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
  } catch (err) {
      console.error('Error adding review:', err.message);
      res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/products/view-review/:id', async (req, res) => {
  const productId = req.params.id;
  try {
      const product = await products.findOne({ productId: productId });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product.reviews);
  } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Server error while fetching reviews' });
  }
});



router.get('/user-home/reviewed-products', verifyToken, async (req, res) => {
  try {
      const userEmail = req.email; 
      const reviewedProducts = await products.find({ 'reviews.userDetails': userEmail });
      res.json(reviewedProducts);
  } catch (error) {
      console.error('Error fetching reviewed products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/products/category/:category', async (req, res) => {
  const { category } = req.params;
  
  try {
      const filteredProducts = await products.find({ category: category });
      res.json(filteredProducts);
  } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


