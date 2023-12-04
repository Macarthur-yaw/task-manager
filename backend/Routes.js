const express = require('express');
const router = express.Router();
const { users, tasks, project } = require('./Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

function authMiddleware(req, res, next) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Access denied. No user ID provided.' });
  }

  req.userId = userId;
  next();
}

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
      res.status(200).send({ success: true, token: token, id: user._id });
    } else {
      res.status(401).send({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/tasks/:userId', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new tasks({
      Title: title,
      Description: description,
      Date: dueDate,
      UserId: req.userId,
    });

    await newTask.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/tasks/:userId', authMiddleware, async (req, res) => {
  try {
    const userTasks = await tasks.find({ UserId: req.userId });
    res.status(200).json({ data: userTasks, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}).delete('/tasks/:userId/:id', (req, res) => {
   console.log(req.params.id)
   const {userId,id}=req.params
   tasks.findByIdAndDelete({
    _id:id,
    UserId:userId
   }).then(() => {
       res.status(200).send({ success: true })
  }).catch((err) => {
      res.status(400).send({ success: false })
   })
}).put('/update/:userId/:id',(req,res)=>{
  const {id,userId}=req.params;
  console.log(req.body);
       const {title,description}=req.body;
   tasks.findByIdAndUpdate({
    _id:id,
    UserId:userId
   },{
       Title:title,
       Description:description,
   }).then(()=>{
       res.status(200).send({success:true})
   }).catch((err)=>{
       res.status(400).send({success:false})
   })    
}).put('/tasks/:userId/:id',(req,res)=>{
  const {id,userId}=req.params;
       const {status}=req.body;
   tasks.findByIdAndUpdate({
    _id:id,
    UserId:userId
   },{
        Status:status,
   }).then(()=>{
       res.status(200).send({success:true})
   }).catch((err)=>{
       res.status(400).send({success:false})
   })    


})

router.post('/projects/:userId', authMiddleware, async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const newProject = new project({
      Title: title,
      Date: dueDate,
      UserId: req.userId,
    });

    await newProject.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/projects/:userId', authMiddleware, async (req, res) => {
  try {
    const userProjects = await project.find({ UserId: req.userId });
    res.status(200).json({ data: userProjects, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/projects/:userId/:projectId', authMiddleware, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const projectDetails = await project.findOne({ _id: projectId, UserId: userId });
    if (!projectDetails) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ data: projectDetails.projectTask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/projects/:userId/:projectId', authMiddleware, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const deletedProject = await project.findOneAndDelete({ _id: projectId, UserId: userId });
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/projectTask/:userId/:id', authMiddleware, async (req, res) => {
 


  try {
    const { userId, id } = req.params;
 console.log(id);

    const { title, date, description } = req.body;

    await project.updateOne({_id:id,
      UserId:userId
    
    },{
      $push:{
        projectTask:{
          UserId:userId,
          title:title,
          date:date,
          description:description
        }
      }})

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
  });

router.get('/projectTask/:userId/:projectId', authMiddleware, async (req, res) => {
 
  try {
    const { userId, projectId } = req.params;
    const projectDetails = await project.findOne({ _id: projectId, UserId: userId });
    if (!projectDetails) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ data: projectDetails.projectTask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/projectTask/:userId/:projectId/:taskIndex', authMiddleware, async (req, res) => {
  try {
    const { userId, projectId, taskIndex } = req.params;
    const projectDetails = await project.findOne({ _id: projectId, UserId: userId });
    if (!projectDetails) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    projectDetails.projectTask.splice(taskIndex, 1);
    await projectDetails.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




module.exports = router;
