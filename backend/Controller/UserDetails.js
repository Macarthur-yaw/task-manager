const AuthMiddleware = require("../Authmiddleware");
const authMiddleware = require("../Authmiddleware");
const { users } = require("../Models/Model");

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
});

module.exports = userDetails;
