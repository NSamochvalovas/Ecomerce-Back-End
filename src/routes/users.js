const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.send({ msg:'tes is working'})
});

module.exports = router;