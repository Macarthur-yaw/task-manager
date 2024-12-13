const express=require("express");
const router=express.Router()
const {users}=require("../Models/Model")
const bcrypt = require('bcrypt');
const sendEmail = require("../Utils/EmailSender")
const saveOtp = require("../Utils/SaveOtp")
const otpGenerator=require("otp-generator")
const otpNumber=otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})

const Signuprouter=router.post('/signup', async (req, res) => {
    const {username, email, password } = req.body;
  
    try {
      const existingUser = await users.findOne({ Email: email });
  
      if (existingUser) {
        return  res.status(400).send({ success: false, message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new users({
        Username:username,
        Email: email,
        Password: hashedPassword,
      });

      await user.save();
      await saveOtp(email,otpNumber);
     
      await sendEmail(email,otpNumber)
  
      
      res.status(200).send({ success: true, message: 'An otp has been sent to the account' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
  });
  module.exports=Signuprouter