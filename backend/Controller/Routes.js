const express = require('express');
const router = express.Router();
const { users, tasks, project } = require('../Models/Model');
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../Authmiddleware');


function authMiddleware(req, res, next) {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Access denied. No user ID provided.' });
  }
  req.userId = userId;
  next();
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *         date:
 *           type: string
 *           format: date-time
 *     Project:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 * 
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks for a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 * 
 * /api/tasks/counts:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task counts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 completed:
 *                   type: number
 *                 not_completed:
 *                   type: number
 * 
 * /api/tasks/update/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update task completion status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated successfully
 * 
 * /api/tasks/delete/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted successfully
 * 
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get all projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 * 
 * /api/project/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 * 
 * /api/projectTask/{id}:
 *   post:
 *     tags: [Projects]
 *     summary: Add task to project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task added successfully
 * 
 * /api/project/delete/{id}:
 *   delete:
 *     tags: [Projects]
 *     summary: Delete project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */

router.post('/tasks/status/:id', AuthMiddleware, async (req, res) => {

  try {
    const id=req.params.id
    const {  status } = req.body;
   const newTasks=  await tasks.findByIdAndUpdate(id, { Status: status }, { new: true });
   res.status(200).send({ success: true, data: newTasks });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }

})

router.put('/tasks/:id', AuthMiddleware, async (req, res) => {
  try {
    const id=req.params.id
    const { title, description, date } = req.body;
   const newTasks= await tasks.findByIdAndUpdate(id, { Title: title, Description: description, Date: date }, { new: true });
    res.status(200).send({ success: true, data: newTasks });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
})

router.get('/tasks/counts',async(req,res)=>{

  try {
    const {email,userId}=req.body
    let id;
    if(email){
      const user = await users.findOne({ Email: email });
      id=user._id;
    }
    else{
      id=userId
    }
    const allTasks = await tasks.find({ UserId: id });
    const not_completed=allTasks.filter((task)=>task.Status==='not_completed')
    const completed=allTasks.filter((task)=>task.Status==='completed')
    const in_progress=allTasks.filter((task)=>task.Status==='in_progress')
    res.status(200).send({success:true,not_completed:not_completed,completed:completed,in_progress:in_progress})
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' })}
})

router.delete('/tasks/:id', AuthMiddleware, async (req, res) => {
  try {
    const id=req.params.id
    await tasks.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: 'Task deleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
})

router.post('/tasks', AuthMiddleware, async (req, res) => {
  try {
    const { title, description, date ,email} = req.body;
    let id;
    if(email){
      const user = await users.findOne({ Email: email });
      id=user._id
    }
    else{
      id=userId
    }

    const newTask = new tasks({
      Title: title,
      Description: description,
      Date: date,
      UserId: id,
    });
   const results= await newTask.save();
    res.status(201).json({ success: true,results:results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/tasks', AuthMiddleware, async (req, res) => {
  try {
    console.log("hee")
    const {email,userId}=req.body
    let id;
    if(email){
      const user = await users.findOne({ Email: email });
      id=user._id
    }
    else{
      id=userId
    }

    const userTasks = await tasks.find({ UserId: id });
    res.status(200).json({ data: userTasks, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/tasks/:userId/:id', AuthMiddleware, (req, res) => {
  const { userId, id } = req.params;
  tasks.findByIdAndDelete({
    _id: id,
    UserId: userId
  }).then(() => {
    res.status(200).send({ success: true })
  }).catch((err) => {
    res.status(400).send({ success: false })
  })
});

router.put('/update/:userId/:id', authMiddleware, (req, res) => {
  const { id, userId } = req.params;
  const { title, description } = req.body;
  tasks.findByIdAndUpdate({
    _id: id,
    UserId: userId
  }, {
    Title: title,
    Description: description,
  }).then(() => {
    res.status(200).send({ success: true })
  }).catch((err) => {
    res.status(400).send({ success: false })
  })
});



router.post('/projects',AuthMiddleware, async (req, res) => {
  try {
console.log(req.body)
    
    const {email,userId, date,title,description } = req.body;
   let id;
    if(email){
      const user = await users.findOne({ Email: email });
      id=user._id
    }
    else{
      id=userId
    }
    const newProject = new project({
      Title: title,
      Date: date,
      UserId: id,
    });
   const savedProject= await newProject.save();
    res.status(201).json({ success: true,new:savedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/projects', AuthMiddleware, async (req, res) => {
  try {
    const {email,userId}=req.body
    let id;
    if(email){
      const user = await users.findOne
      ({ Email
        : email });
      id=user._id
    }
    else{
      id=userId
    }
    const userProjects = await project.find({ UserId: id });
    res.status(200).json({ data: userProjects, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.get('/projectTask/:projectId', AuthMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    


    const projectDetails = await project.findOne({ _id: projectId });
    if (!projectDetails) {
      return res.status(404).send({ success: false, message: 'Project not found' });
    }
    res.status(200).send({ data: projectDetails.projectTask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

router.post('/projectTask', AuthMiddleware, async (req, res) => {
  try {

   
    const { title, date, description,email } = req.body;

    let id;
    if(email){
      const user = await users.findOne
      ({ Email: email });
      id=user._id
    }
    else{
      id=userId
    }


  const results=  await project.updateOne({
    
      UserId: id
    }, {
      $push: {
        projectTask: {
        
          title: title,
          date: date,
          description: description
        }
      }
    });
    res.status(201).json({ success: true,results:results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/projectTask/:id', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
   

    
    await project.deleteOne({_id:id});



    res.status(200).send({ success: true,message:"deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/projectTask/:id', AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const results= await project.updateOne({
      _id: id
    }, {
      $set: {
        projectTask: {
          title: title,
       
        }
      }
    });
    res.status(200).json({ success: true,results:results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/projects/search',AuthMiddleware,async(req,res)=>{
  const search=req.query.search
  const{email,userId}=req.body

try{  let id;
  if(email){
    const user = await users.findOne({ Email: email });
    id=user._id
  }
  else{
    id=userId
  }
  const projects=await project.find({UserId:id,Title:{$regex:search,$options:'i'}});
  res.status(200).send({success:true,data:projects})
}catch(error){
  console.error(error);
  res.status(500).send({ success: false, message: 'Internal Server Error' })
}})

router.get('/projects',AuthMiddleware,async(req,res)=>{
  const search=req.query.date

  const{email,userId}=req.body
let id;
try{
  if(email){
    const user = await users.findOne({ Email: email });
    id=user._id
  }
  else{
    id=userId
  }
  const tasks=await tasks.find({UserId:id,Date:search});
  const findAllProjects=await project.find({UserId:id,Date:search});
  const allPendingTasks=[...tasks,...findAllProjects]

  res.status(200).send({success:true,data:allPendingTasks})

}catch(error){
  console.error(error);
  res.status(500).send({ success: false, message: 'Internal Server Error' })
}})

module.exports = router;