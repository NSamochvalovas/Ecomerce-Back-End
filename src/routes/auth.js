const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt');

const router = express.Router();

//Register
router.post('/register', async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  }); 
  try{
    const savedUser = await newUser.save();
    res.status(200).json(savedUser)
  } catch(err){
    res.status(500).json(err);
  }
});


module.exports = router;