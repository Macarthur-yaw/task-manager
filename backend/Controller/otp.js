const express=require("express")
const bcrypt=require("bcrypt")
const router=express.Router()
const otpGenerator=require("otp-generator")


const otpmodel = require("../Models/otpModel")
const sendEmail = require("../Utils/EmailSender")
const saveOtp = require("../Utils/SaveOtp")

const otpRouter=router.post(`/new-otp`,async(req,res)=>{
    const otpNumber=otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})

    const {email}=req.body;

try {
    
await sendEmail(email,otpNumber);
await saveOtp(email,otp)
} catch (error) {
    res.status(500).send({message:"internal server error"});
}
     

}).post("/verify",async (req,res)=>{
try {
    
    const {email,otp}=req.body;
     
    const response =await otpmodel.find({Email:email})
    if(response.length <1){
        return res.status(400).send({success:false,message:"Otp has not been sent to that email"})
    }



const returnOtp=response.map((content)=>content.otp);
const changeArray=returnOtp.toString();


if(otp===changeArray){
    return res.status(200).send({message:"account has been verified"})
}
 else {
    return res.status(400).send({message:"Invalid otp code"})
 }





} catch (error) {
    res.status(500).send({message:"Internal server error"})
}
})
module.exports=otpRouter;
