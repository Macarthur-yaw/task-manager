const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.MY_SECRET_KEY || 'default_secret_key';

async function authMiddleware  (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  const splitToken =token.split(" ")
  const accessToken=splitToken[1]
  
   

  try {
    const decoded = jwt.verify(accessToken, tokenSecretKey);
    if(decoded){
      if(decoded.userId){
        req.body.userId=decoded.userId
      }
      else{
        req.body.username=decoded.username
      }
    }
   
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
}
 

 

module.exports = authMiddleware;