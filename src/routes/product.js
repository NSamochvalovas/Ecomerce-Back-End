const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

//Create

router.post('/', async (req,res) => {
  const newProduct = new Product(req.body);

  try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  }catch(err){
    console.log(err)
    res.status(500).send({ msg:'Product was not added' });
  }
});

//Get product

router.get('/find/:id', async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch(err){
    res.status(500).send({ msg:'Product was not found'})
  }
});

//Get products

  router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
      let products;
  
    if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      } 
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;