const passport = require("passport");
const router = require("express").Router();


const googleRouter = router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
);


googleRouter.get("/auth/google/callback", 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        
        const user = req.user; 

        
        const userEmail = user.email;
        const userName = user.displayName;

     
        res.send(`Welcome, ${userName}. Your email is ${userEmail}`);
    }
);

module.exports = googleRouter;
