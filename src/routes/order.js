const express = require('express');
const { verifyAuth } = require('../middelware/verifyToken');
const Order = require('../models/Order');

const router = express.Router();

//Create

router.post('/', verifyAuth, async (req,res) => {
  const newOrder = new Order(req.body);

  try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  }catch(err){
    console.log(err)
    res.status(500).send({ msg:'Product was not added' });
  }

})

//Update Order
router.put("/:id", verifyAuth, async (req, res) => {

  try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true});

    res.status(200).send({ msg:'Data updated'});

  }catch(err){
    res.status(500).send(err);
  }
});



module.exports = router;