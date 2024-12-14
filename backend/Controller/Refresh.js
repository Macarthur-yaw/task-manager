const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const refreshRouter = router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;

        
        const results = jwt.verify(refreshToken, process.env.MY_SECRET_KEY);

        if (results) {
            
            const accessToken = jwt.sign(
                { userId: results._id, username: results.Username },
                process.env.MY_SECRET_KEY,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { userId: results._id, username: results.Username },
                process.env.MY_SECRET_KEY,
                { expiresIn: '24h' }
            );

         
            res.status(200).send({
                success: true,
                accessToken: accessToken,
                refreshToken: newRefreshToken
            });
        } else {
            res.status(401).send({ success: false, message: 'Invalid refresh token' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = refreshRouter;
