const passport=require("passport")
const googleStrategy=require("passport-google-oauth2").Strategy
require("dotenv").config(
)
const {BAKCEND_URL}=process.env
if(BAKCEND_URL){


    throw new Error("Please provide frontend url")
}
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${BAKCEND_URL}/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
 
   const user={Profile:profile,Accesstoken:accessToken}
    return done(null, user);
  }
))

passport.serializeUser((user, done) => {
    done(null, user); 
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user); 
  });