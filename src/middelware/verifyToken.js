const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
  const authHeader = req.headers.token;

  if(authHeader){
    const token = authHeader.split(' ')[1];
    jsonwebtoken.verify(token, process.env.JWT_SECRECT, (err, user) => {
      
      if(err) res.status(401).send( {msg:'Token is not good'} )
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send( {msg:'You have no token'} )
  };
};

const verifyAuth = (req, res, next) => {
  verifyToken(req,res, () =>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    } else {
      res.status(401).send({ msg:'you are not allowed' })
    }
  });
}



module.exports = {verifyToken, verifyAuth}