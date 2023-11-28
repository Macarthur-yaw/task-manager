require('dotenv').config();

const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING ;

const connection=mongoose.connect(connectionString).then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });


module.exports = connection;
