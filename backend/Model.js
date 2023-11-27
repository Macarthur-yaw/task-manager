const connection=require('./Connection')

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true,
        
    },
    Password:{
        type:String,
        required:true,
    },
})
const taskSchema=new mongoose.Schema({
    Title:{
        type:String
    },
    Description:{
        type:String
    }


})
const tasks=mongoose.model('tasks',taskSchema)

const users=mongoose.model('users',userSchema)
module.exports={users,tasks}
