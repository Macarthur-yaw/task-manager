const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.MY_SECRET_KEY || 'default_secret_key';

async function authMiddleware  (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  const splitToken =token.split(" ")
  const accessToken=splitToken[1]
  
   
  const {providerType}=req.body
  if(!providerType){
    return res.status(400).send({message:"provider type must be specified"})
  }
if(providerType==="google"){
  try {

    const response=await fetch( `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`)
    const changeResponse=await response.json()
    
    req.body.email=changeResponse.email
  return next();

} catch (error) {
    console.log(error)
}
} else{

  try {
    const decoded = jwt.verify(accessToken, tokenSecretKey);
    
    req.body.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
}
 

 
}

module.exports = authMiddleware;