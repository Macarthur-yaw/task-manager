const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username:{
type:String,
required:true
 
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        
    },
});

const taskSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true,
    },
    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Date: {
        type: String,
    },
    Status: {
        type: String,
        enum: ['completed', 'not_completed', 'in_progress'],
        default: 'not_completed',
    },
});

const projectSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    projectTask: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
        },
    },
});

const project = mongoose.model('project', projectSchema);
const tasks = mongoose.model('tasks', taskSchema);
const users = mongoose.model('users', userSchema);

module.exports = { users, tasks, project };
