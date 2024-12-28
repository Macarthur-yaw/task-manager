const { users, tasks, project } = require("../Models/Model");
require("dotenv").config();
const sendEmail = require("./EmailReminder"); 


const TasksReminder = async () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const task = await tasks.find({ Date: { $gte: today, $lte: nextWeek } });

    for (const t of task) {
        const userId = t.UserId;

        const user = await users.findById(userId);  

        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            continue;
        }

        const { Email } = user;
        const taskName = t.Title;
        const taskDeadline = t.Date.getMinutes;
        const taskDescription = t.Description;
        const taskStatus = t.Status;

        const mailOptions = {
            from: process.env.EMAIL,
            to: Email,
            subject: "Task Reminder",
            text: `Task Name: ${taskName} \n Task Description: ${taskDescription} \n Task Deadline: ${taskDeadline} \n Task Status: ${taskStatus}`,
        };

        await sendEmail(mailOptions);
    }
};

const ProjectTasksReminder = async () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const getAllTasks = await project.find(); 

    
    const findTasks = getAllTasks.map((content) => content.projectTask);
    const deadlineTasks = findTasks.flat().filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate <= nextWeek;
    });

    for (const task of deadlineTasks) {
        const userId = task.UserId;
        const user = await users.findById(userId);

        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            continue;
        }

        const { Email } = user;
        const mailOptions = {
            from: process.env.EMAIL,
            to: Email,
            subject: "Project Task Reminder",
            text: `Task Name: ${task.title} is due in one week.`,
        };

        await sendEmail(mailOptions);
    }
};


const ProjectReminder = async () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    
    const projectDetails = await project.find({ Date: { $gte: today, $lte: nextWeek } });

    for (const proj of projectDetails) {
        const userId = proj.UserId;
        const user = await users.findById(userId);

        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            continue;
        }

        const { Email } = user;
        const projectName = proj.Title;
        const projectDeadline = proj.Date;
        const projectDescription = proj.Description;

        const mailOptions = {
            from: process.env.EMAIL,
            to: Email,
            subject: "Project Reminder",
            text: `Project Name: ${projectName} \n Project Description: ${projectDescription} \n Project Deadline: ${projectDeadline}`,
        };

        await sendEmail(mailOptions);
    }
};

TasksReminder();
ProjectTasksReminder();
ProjectReminder();
module.exports = { TasksReminder, ProjectTasksReminder, ProjectReminder };