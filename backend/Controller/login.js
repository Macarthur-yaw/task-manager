const express=require("express")
const router=express.Router()
const {users}=require("../Models/Model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const {MY_SECRET_KEY}=process.env
const loginRouter=router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if(email === " " || password === " "){
     return  res.status(400).send({message:"The request body must be filled"});
    }
    else{
      try {
        const user = await users.findOne({ Email: email });
    
        if (!user) {
          return res.status(400).send({ success: false, message: 'User not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.Password);
    
        if (isPasswordValid) {
          const accessToken = jwt.sign({ userId: user._id, username: user.Username }, MY_SECRET_KEY, { expiresIn: '1h' });
          const refreshToken=jwt.sign({userId:user._id,username:user.Username},MY_SECRET_KEY ,{expiresIn:'24h'})
          res.status(200).send({ success: true, Accesstoken: accessToken, RefreshToke:refreshToken });
        } else {
          res.status(401).send({ success: false, message: 'Invalid password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
      }
    }
   
  });
  module.exports=loginRouter