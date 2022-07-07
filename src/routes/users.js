const express = require('express');
const {verifyAuth} = require('../middelware/verifyToken');
const User = require('../models/User');
const router = express.Router();

//Delete

router.delete('/:id', verifyAuth, async (req, res) => {
  try{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({ msg:'User deleted' })

  }catch(err){
    res.status(500).send({ msg:'Delete method not working' })
  }
});

module.exports = router;