const passport=require("passport")
const googleStrategy=require("passport-google-oauth2").Strategy
require("dotenv").config(
)
const {BACKEND_URL}=process.env
if(!BACKEND_URL){
throw new Error("Please provide backend url")
}


  
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/auth/google/callback`
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