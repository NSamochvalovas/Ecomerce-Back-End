const express = require('express');
const {verifyAuth, verifyAdmin} = require('../middelware/verifyToken');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');

const router = express.Router();

//Create

router.post('/', verifyAdmin, async (req,res) => {
  const newProduct = new Product(req.body);

  try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  }catch(err){
    console.log(err)
    res.status(500).send({ msg:'Product was not added' });
  }

})

//Update product
router.put("/:id", verifyAdmin, async (req, res) => {

  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true});

    res.status(200).send({ msg:'Data updated'});

  }catch(err){
    res.status(500).send(err);
  }
});

//Delete product

router.delete("/:id", verifyAdmin, async (req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).send({ msg:'Product deleted' })

  }catch(err){
    res.status(500).send({ msg:'Delete method not working' })
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
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try{
    let products; 
    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(5)
    } else if (qCategory){
      products = await Product.find({categories:{
        $in:[qCategory],
      }})
    } else {
      products = await Product.find();
    }

    res.status(200).json(products)
  }catch(err){
    res.status(500).send({ msg:'Something wrong with server' })
  }
});

module.exports = router;