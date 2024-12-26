const express = require("express");
const router = express.Router();
const { users } = require("../Models/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { MY_SECRET_KEY } = process.env;

if (!MY_SECRET_KEY) {
  console.error("MY_SECRET_KEY is not defined in the environment variables.");
  process.exit(1);
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Accesstoken:
 *                   type: string
 *                   description: JWT access token
 *                 RefreshToken:
 *                   type: string
 *                   description: JWT refresh token
 *       400:
 *         description: Bad request. The email or password is invalid.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "The request body must be filled" });
  }

  try {
    const user = await users.findOne({ Email: email });

    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (isPasswordValid) {
      const accessToken = jwt.sign(
        { userId: user._id, username: user.Username },
        MY_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id, username: user.Username },
        MY_SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.status(200).send({ success: true, Accesstoken: accessToken, RefreshToken: refreshToken });
    } else {
      res.status(401).send({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
