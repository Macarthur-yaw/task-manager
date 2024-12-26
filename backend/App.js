
const express = require('express');
const cors = require('cors');
require("./Utils/Reminder")
const session = require("express-session");
const passport = require("passport");
require('dotenv').config();


const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const  swaggerOptions  = require('./SwaggerConfig');


const router = require('./Controller/Routes');
const otpRouter = require("./Controller/otp");
const loginRouter = require('./Controller/login');
const Signuprouter = require('./Controller/Signup');
const googleRouter = require('./Controller/googleLogin');
const userDetails = require('./Controller/UserDetails');


require('./Utils/passportConfig');
const connection = require('./Connection');
const users = require('./Models/Model');

const app = express();
const portNumber = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


const swaggerDocs = require("./SwaggerConfig")
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs));


app.use('/api', router);
app.use('/api', loginRouter);
app.use('/api', otpRouter);
app.use('/api', Signuprouter);
app.use("/api", googleRouter);
app.use("/api", userDetails);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('something broke!');
});


const startServer = async () => {
    try {
        app.listen(portNumber, () => {
            console.log(`Server is running on port ${portNumber}`);
            console.log(`Swagger docs available at http://localhost:${portNumber}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
       
    }
};

startServer();