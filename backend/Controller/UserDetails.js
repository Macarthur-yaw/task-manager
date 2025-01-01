const AuthMiddleware = require("../Authmiddleware");
const authMiddleware = require("../Authmiddleware");
const { users, tasks } = require("../Models/Model");

const router = require("express").Router();

/**
 * @swagger
 * /userdetails:
 *   get:
 *     summary: Get user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: User's email
 *                       example: user@example.com
 *                     username:
 *                       type: string
 *                       description: User's username
 *                       example: johndoe
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get user's pending task notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email (optional)
 *                 example: user@example.com
 *               userId:
 *                 type: string
 *                 description: User's ID
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Pending tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */



const getPendingTasks = async (userId) => {
  try {
    const today = new Date();

    
    const allTasks = await tasks.find({ UserId: userId });

    
    const pendingTasks = allTasks.filter((task) => {
      const taskDate = new Date(task.Date);
      return taskDate <= today;
    });

    console.log(`${pendingTasks.length} pending tasks found`);
    return pendingTasks; 
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    throw new Error(error.message);
  }
};

const userDetails = router.get("/userdetails", AuthMiddleware, async (req, res) => {
  const { userId, email } = req.body;
  let findUser;
  try {
    if (email) {
      findUser = await users.findOne({ Email: email });
    } else {
      findUser = await users.findById(userId);
    }
    res.status(200).send({
      message: { email: findUser.Email, username: findUser.Username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}).get("/notifications",AuthMiddleware,async(req,res)=>{
try {
  const{email,userId}=req.body  
  let id;
  const findUser=await users.findById(userId)

  if(email){
    id=await users.findOne({Email:email })
  }
  else{
    id=await users.findById(userId)
  }
const pendingTasks=await getPendingTasks(id)
res.status(200).send({message:pendingTasks});

  
} catch (error) {
  console.log(error)
  res.status(500).send({message:"Internal server error"})
}
});

module.exports = userDetails;
