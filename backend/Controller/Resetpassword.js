const express=require("express");
const { users } = require("../Models/Model");
const sendEmail = require("../Utils/EmailSender");
const resetRouter=express.Router()
const otpNumber=require("../Utils/OtpGenerator");
const saveOtp = require("../Utils/SaveOtp");
const otpmodel = require("../Models/otpModel");
const otp=otpNumber;
/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Request a password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent to email
 *       400:
 *         description: Invalid email or email not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 description: One-time password sent to email
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid OTP or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid OTP
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /new-password:
 *   post:
 *     summary: Set new password after reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: newPassword123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated
 *       400:
 *         description: Invalid input or passwords don't match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: passwords do not match
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

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
})


resetRouter.post('/verify-otp',async(req,res)=>{
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


    


})



resetRouter.post('/new-password',async (req,res)=>{

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

module.exports=resetRouter;