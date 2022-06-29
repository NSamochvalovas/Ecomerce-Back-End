const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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

//Login
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).send({ msg:'No data' }) 

    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(400).send({ msg:'Wrong password'});
    }

    const Token = jsonwebtoken.sign({
      id:user._id, 
      isAdmin: user.isAdmin,
    }, 
    process.env.JWT_SECRECT
  );

    const {password, ...others } = user._doc

    res.status(200).json({others, Token});
  }catch(err){
    console.log(err);
    res.status(500).send({ msg:"something wrong with the server" });
  }
});

module.exports = router;