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

router.get("/", verifyAdmin, async (req, res) => {
  try{
    const users = await User.find(req.params.id)
    res.status(200).json(users)

  }catch(err){
    res.status(500).send({ msg:'Something wrong with server' })
  }
});

module.exports = router;