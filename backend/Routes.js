require('dotenv').config();
const express=require('express')
const router=express.Router()
const users=require('./Model')
// const bcrypt=require('bcrypt')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await users.findOne({ Email: email });
  
      if (existingUser) {
        return res.status(400).send({ success: false, message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new users({
        Email: email,
        Password: hashedPassword,
      });
  
      await user.save();
      res.status(200).send({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await users.findOne({ Email: email });
  
      if (!user) {
        return res.status(400).send({ success: false, message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.Password);
  
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id, email: user.Email }, tokenSecretKey, { expiresIn: '1h' });
  
        res.status(200).send({ success: true, token: token });
      } else {
        res.status(401).send({ success: false, message: 'Invalid password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
  });
router.post('/tasks',(req,res)=>{
    const{title,Description} =req.body;
    const task=new tasks({
        Title:title,
        Description:Description,
    })
    task.save().then(()=>{
        res.status(200).send({success:true})
    }).catch((err)=>{
        res.status(400).send({success:false})
    })
}).get('/tasks',(req,res)=>{
    tasks.find().then((response)=>{
        res.status(200).send({success:true,data:response})
    }).catch((err)=>{
        res.status(400).send({success:false})
    })
}).delete('taks/:id',(req,res)=>{
    console.log(req.params.id)
    tasks.findByIdAndDelete(req.params.id).then(()=>{
        res.status(200).send({success:true})
    }).catch((err)=>{
        res.status(400).send({success:false})
    })
})

module.exports=router