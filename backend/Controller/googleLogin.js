const passport = require("passport");
const { users } = require("../Models/Model");
const router = require("express").Router();
require("dotenv").config()
const {MY_SECRET_KEY,FRONTEND_URL}=process.env


const jwt=require("jsonwebtoken")
const googleRouter = router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
);


googleRouter.get("/auth/google/callback", 
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
 async   (req, res) => {
        
        const user = req.user; 

 const username=user.Profile.displayName;
 const email=user.Profile.email;


 try {
 
    const checkIfUserExists=await users.findOne({Email:email})
    if(checkIfUserExists){
        const accessToken = jwt.sign({  email: checkIfUserExists.Email }, MY_SECRET_KEY, { expiresIn: '24h' });
        const refreshToken=jwt.sign({email:checkIfUserExists.Email},MY_SECRET_KEY ,{expiresIn:'30d'})
       
        
       
       res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
       
    return;

    }
    const newUser=new users({
        Username:username,
        Email:email,
        Password:null
    })
    await newUser.save();
    const accessToken = jwt.sign({  email: email }, MY_SECRET_KEY, { expiresIn: '24h' });
    const refreshToken=jwt.sign({email:email},MY_SECRET_KEY ,{expiresIn:'30d'})
   
    
   
   res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
   
 } catch (error) {
   
   return  res.status(500).send({message:"Internal sever error"})
 }

 



    }
);

module.exports = googleRouter;
