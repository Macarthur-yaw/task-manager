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
 
    const checkIfUserExists=await users.find({Email:email})
    if(checkIfUserExists.length>0){
        return res.status(500).send({message:"User already exists"})
    }
    const newUser=new users({
        Username:username,
        Email:email,
        Password:null
    })
    await newUser.save();

 } catch (error) {
   
   return  res.status(500).send({message:"Internal sever error"})
 }

 const accessToken = jwt.sign({  username: username }, MY_SECRET_KEY, { expiresIn: '1h' });
 const refreshToken=jwt.sign({username:username},MY_SECRET_KEY ,{expiresIn:'24h'})

 

res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)




    }
);

module.exports = googleRouter;
