require('dotenv').config();

const mongoose = require('mongoose');

const connectionString = `mongodb+srv://arthurkevin1260:${process.env.API_KEY}@cluster0.5vopeu0.mongodb.net/?retryWrites=true&w=majority`;

const connection=mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });


module.exports = connection;
