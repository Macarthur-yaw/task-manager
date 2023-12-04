const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const router=require('./Routes')

const connection=require('./Connection')
const users=require('./Model')	

const portNumber=process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/api',router)
// console.log(connection)
app.listen((portNumber),()=>{
    console.log(`Server is running on port ${portNumber}`)
})