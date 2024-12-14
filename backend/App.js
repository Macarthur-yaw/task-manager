const express=require('express')
const app=express()
require('./Utils/passportConfig');
const passport=require("passport")
const cors=require('cors')
require('dotenv').config()
const router=require('./Routes')
const otpRouter=require("./Controller/otp")
const connection=require('./Connection')
const users=require('./Models/Model')	
const loginRouter = require('./Controller/login')
const Signuprouter = require('./Controller/Signup')
const googleRouter = require('./Controller/googleLogin')
const session=require("express-session");
const userDetails = require('./Controller/UserDetails');
const portNumber=process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(session({
    secret:process.env.MY_SECRET_KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api',router)
app.use('/api',loginRouter)
app.use('/api',otpRouter)
app.use('/api',Signuprouter)
app.use("/api",googleRouter)
app.use("/api",userDetails)
// console.log(connection)
app.listen((portNumber),()=>{
    console.log(`Server is running on port ${portNumber}`)
})