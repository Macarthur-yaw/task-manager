const express=require("express");
const { users } = require("../Models/Model");
const sendEmail = require("../Utils/EmailSender");
const resetRouter=express.Router()
const otpNumber=require("../Utils/OtpGenerator");
const saveOtp = require("../Utils/SaveOtp");
const otpmodel = require("../Models/otpModel");
const otp=otpNumber;

resetRouter.post('/reset',async(req,res)=>{

    
    
    
    
    const {email}=req.body;
    if(!email){
        return res.status(400).send({message:"Email should be provided"})
    }

    try {

       const foundEmail= await users.findOne({Email:email})
if(!foundEmail){
    return res.status(400).send({message:"Invalid email"})
}

const {Email}=foundEmail
sendEmail(Email,otp,"reset");
saveOtp(Email,otp);

        
    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
}).post('/verify-otp',async(req,res)=>{
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({ message: "Email and OTP must be provided" });
    }
  
    try {
   
      const validOtp = await otpmodel.findOne({ Email: email, Otp: otp });
  
      if (!validOtp) {
        return res.status(400).send({ message: "Invalid OTP" });
      }
  
      
  

      return res.status(200).send({ message: "OTP verified successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }


    


}).post('/new-password',async (req,res)=>{

    const {password,confirmPassword}=req.body;
    if(!password || !confirmPassword){
        return res.status(400).send({message:"passwords must be provided"})
    }

    //checking if passwords match 

    if(password !==confirmPassword){
        return res.status(400).send({message:"passwords do not match"})
    }
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
     
    const user = await users.findOneAndUpdate({ Email: email }, { Password: hashedPassword });

    if(user){
        return res.status(200).send({message:"Password updated"})
    }
    else{
        return res.status(500).send({message:"Internal server error"})
    }



})

