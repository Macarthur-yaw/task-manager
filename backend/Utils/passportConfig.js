const passport=require("passport")
const googleStrategy=require("passport-google-oauth2").Strategy
require("dotenv").config(
)

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8086/api/auth/google/callback", 
  },
  (accessToken, refreshToken, profile, done) => {
   console.log(accessToken)
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