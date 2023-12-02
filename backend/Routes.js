require('dotenv').config();
const express=require('express')
const router=express.Router()
const { users}=require('./Model')
const {tasks}=require('./Model')
const {project}=require('./Model')
// const bcrypt=require('bcrypt')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
// const tasks}
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
    const{title,description,dueDate} =req.body;
    // const isChecked=req.body;

    const task=new tasks({
        Title:title,
        Description:description,
        Date:dueDate,
        
    
      })
      // console.log(task);
      
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
 }).delete('/tasks/:id', (req, res) => {
     console.log(req.params.id)
     tasks.findByIdAndDelete(req.params.id).then(() => {
         res.status(200).send({ success: true })
    }).catch((err) => {
        res.status(400).send({ success: false })
     })
 }).put('/update/:id',(req,res)=>{
    const {id}=req.params;
    console.log(req.body);
         const {title,description}=req.body;
     tasks.findByIdAndUpdate(id,{
         Title:title,
         Description:description,
     }).then(()=>{
         res.status(200).send({success:true})
     }).catch((err)=>{
         res.status(400).send({success:false})
     })    
 }).put('/tasks/:id',(req,res)=>{
    const {id}=req.params;
         const {status}=req.body;
     tasks.findByIdAndUpdate(id,{
          Status:status,
     }).then(()=>{
         res.status(200).send({success:true})
     }).catch((err)=>{
         res.status(400).send({success:false})
     })    
 

 })
 
router.post('/projects',async (req,res)=>{
  const{title,dueDate}=req.body;
console.log(req.body);

try {
 const projects=new project({
  Title:title,
  Date:dueDate,
  projectTask:null
  })

await projects.save();
res.status(200).send({success:true})
}
catch(error){
  console.log(error)
}


}).get('/projects',async (req,res)=>{

  try {
   const getProjects= await project.find({});


   res.status(200).send(getProjects);

  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not fetch data'})
  }
  

  
}).get('/projects/:id',async (req,res)=>{
  const {id}=req.params;

  try {
    const getProject=await project.findById(id);
  
    res.status(200).send(getProject.projectTask);
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not fetch data'})
  }
  
}).delete('/projects/:id',async (req,res)=>{
  const {id}=req.params;

  try {
    await project.findByIdAndDelete(id);
    res.status(200).send({success:true})
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not update data'})
  }
  
}).post('/projectTask/:id',async (req,res)=>{
  
  try {
    const {id}=req.params;
    const {title,date,description}=req.body;
    // console.log(req.body);
console.log(req.body);   
    await project.updateOne({_id:id},{
      $push:{
        projectTask:{
          title:title,
          date:date,
          description:description
        }
      }
    })
    
  
    res.status(200).send({success:true})
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not post data'})
  }
}).get('/projectTask/:id',async (req,res)=>{
  const {id}=req.params;
  // const {title,date,description}=req.body;
  try {
    const getProject=await project.findById(id);
    // console.log(getProject);
    res.status(200).send(getProject.projectTask);
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not fetch data'})
  }
  
}).delete('/projectTask/:id',async (req,res)=>{
  const {id}=req.params;
  // const {title,date,description}=req.body;
  try {
    const getProject=await project.findByIdAndDelete(id);
    // console.log(getProject);
    // res.status(200).send(getProject.projectTask);
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not fetch data'})
  }
  
}).put('/projectTask/:id',async (req,res)=>{
  try {
    const {id}=req.params;
    const {title,date,description}=req.body;
    
    const getProject=await project.findByIdAndUpdate(id);
    console.log(getProject);
    res.status(200).send(getProject.projectTask);
  } catch (error) {
    console.log(error)
    res.status(400).send({error:'Can not fetch data'})
  }
  
})

module.exports=router