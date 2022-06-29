const express = require('express');
const { verifyAuth } = require('../middelware/verifyToken');
const Cart = require('../models/Cart');

const router = express.Router();

//Create

router.post('/', verifyAuth, async (req,res) => {
  const newCart = new Cart(req.body);

  try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }catch(err){
    console.log(err)
    res.status(500).send({ msg:'Product was not added' });
  }

})

//Update cart
router.put("/:id", verifyAuth, async (req, res) => {

  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true});

    res.status(200).send({ msg:'Data updated'});

  }catch(err){
    res.status(500).send(err);
  }
});

//Delete cart

router.delete("/:id", verifyAuth, async (req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).send({ msg:'Cart deleted' })

  }catch(err){
    res.status(500).send({ msg:'Delete method not working' })
  }
});

//Get cart

router.get('/find/:userId', verifyAuth, async (req, res) => {
  try{
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).send(cart);
  } catch(err){
    res.status(500).send({ msg:'Cart was not found'})
  }
});

module.exports = router;