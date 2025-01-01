const { users, tasks, project } = require("../Models/Model");
require("dotenv").config();
const sendEmail = require("./EmailReminder");


const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); 
    return {
        start: tomorrow.setHours(0, 0, 0, 0), 
        end: tomorrow.setHours(23, 59, 59, 999), 
    };
};


const sendTaskEmail = async ({ email, subject, text }) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text,
    };
    await sendEmail(mailOptions);
};


const sendReminders = async (tasks, subjectPrefix) => {
    for (const task of tasks) {
        const user = await users.findById(task.UserId);

        if (!user) {
            console.error(`User with ID ${task.UserId} not found.`);
            continue;
        }

        const { Email } = user;
        const text = `Task Name: ${task.Title || task.title} \nDeadline: ${task.Date || task.date}\nStatus: ${task.Status || "Pending"}`;
        await sendTaskEmail({ email: Email, subject: `${subjectPrefix} Reminder`, text });
    }
};


const TasksReminder = async () => {
    const { start, end } = getTomorrow();

    const tasksDue = await tasks.find({
        Date: {
            $gte: start, 
            $lt: end, 
        },
    });

    await sendReminders(tasksDue, "Task");
};


const ProjectTasksReminder = async () => {
    const { start, end } = getTomorrow();

    const allProjects = await project.find();
    const tasksDue = allProjects
        .map((proj) => proj.projectTask)
        .flat()
        .filter((task) => {
            const taskDate = new Date(task.date);
            return taskDate >= start && taskDate <= end;
        });

    await sendReminders(tasksDue, "Project Task");
};


const ProjectReminder = async () => {
    const { start, end } = getTomorrow();

    const projectsDue = await project.find({
        Date: {
            $gte: start,
            $lt: end, 
        },
    });

    for (const proj of projectsDue) {
        const user = await users.findById(proj.UserId);

        if (!user) {
            console.error(`User with ID ${proj.UserId} not found.`);
            continue;
        }

        const { Email } = user;
        const text = `Project Name: ${proj.Title}\nDeadline: ${proj.Date}`;
        await sendTaskEmail({ email: Email, subject: "Project", text });
    }
};


TasksReminder();
ProjectTasksReminder();
ProjectReminder();

module.exports = { TasksReminder, ProjectTasksReminder, ProjectReminder };
