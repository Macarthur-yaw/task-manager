const passport = require("passport");
const { users } = require("../Models/Model");
const router = require("express").Router();


const googleRouter = router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
);


googleRouter.get("/auth/google/callback", 
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
 async   (req, res) => {
        
        const user = req.user; 
console.log(user)
 const username=user.Profile.displayName;
 const email=user.Profile.email;
 try {
   
    const newUser=new users({
        Username:username,
        Email:email,
        Password:null
    })
    await newUser.save();

 } catch (error) {
    console.log(error)
   return  res.status(500).send({message:"Internal sever error"})
 }
const accessToken=user.Accesstoken
      res.status(200).send({success:true,message:{name:username,accessToken:accessToken,providerType:"google"}})  
        
    }
);

module.exports = googleRouter;
