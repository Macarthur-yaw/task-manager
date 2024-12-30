const express = require('express');
const router = express.Router();
const { users, tasks, project } = require('../Models/Model');
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../Authmiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         Title:
 *           type: string
 *         Description:
 *           type: string
 *         Date:
 *           type: string
 *           format: date
 *         UserId:
 *           type: string
 *         Status:
 *           type: string
 *     Project:
 *       type: object
 *       properties:
 *         Title:
 *           type: string
 *         Date:
 *           type: string
 *           format: date
 *         UserId:
 *           type: string
 *         projectTask:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               UserId:
 *                 type: string
 */

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
 * /tasks/{userId}:
 *   post:
 *     summary: Create a new task
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /tasks/{userId}:
 *   get:
 *     summary: Get all tasks for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /tasks/{userId}/{id}:
 *   delete:
 *     summary: Delete a specific task
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Delete operation failed
 */
router.delete('/tasks/:userId/:id', authMiddleware, (req, res) => {
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

/**
 * @swagger
 * /update/{userId}/{id}:
 *   put:
 *     summary: Update task details
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Update operation failed
 */
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

/**
 * @swagger
 * /tasks/{userId}/{id}:
 *   put:
 *     summary: Update task status
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Update operation failed
 */
router.put('/tasks/:userId/:id', authMiddleware, (req, res) => {
  const { id, userId } = req.params;
  const { status } = req.body;
  tasks.findByIdAndUpdate({
    _id: id,
    UserId: userId
  }, {
    Status: status,
  }).then(() => {
    res.status(200).send({ success: true })
  }).catch((err) => {
    res.status(400).send({ success: false })
  })
});

/**
 * @swagger
 * /projects/{userId}:
 *   post:
 *     summary: Create a new project
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /projects/{userId}:
 *   get:
 *     summary: Get all projects for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /projectTask/{userId}/{id}:
 *   post:
 *     summary: Add a task to a project
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project task added successfully
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /projectTask/{userId}/{projectId}/{taskIndex}:
 *   delete:
 *     summary: Delete a task from a project
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskIndex
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project task deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
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