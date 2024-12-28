const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenSecretKey = process.env.MY_SECRET_KEY ;

async function AuthMiddleware  (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  const splitToken =token.split(" ")
  const accessToken=splitToken[1]
  console.log(accessToken)
   
console.log(tokenSecretKey)
  try {
    let decoded;
    if(tokenSecretKey){
     decoded = jwt.verify(accessToken, tokenSecretKey);
     console.log(decoded)
    }
  
    if(decoded){
      if(decoded.userId){
        req.body.userId=decoded.userId
      }
      else{
        req.body.email=decoded.email
      }
    }
   
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
}
 

 

module.exports = AuthMiddleware;