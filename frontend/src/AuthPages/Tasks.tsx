import React from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useEffect,useState } from 'react';
import AddTasks from '../Components/AddTasks';
interface Task {
  _id: string;
  Title: string;
  Description: string;
  dueDate: string;
  status: "todo" | "inProgress" | "done";
}

const TaskComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [displayAddTask, setDisplayAddTask] = useState<boolean>(false);
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showTasksLeft, setShowTasksLeft] = useState<boolean>(false);
  // const [showTasksDone, setShowTasksDone] = useState<boolean>(false);
// 
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://web-api-db7z.onrender.com/api/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    setDisplayAddTask(true);
  };

  // const handleTaskAdded = () => {
  //   setDisplayAddTask(false);
  //   fetchTasks();
  // };

  const handleEditTask = (task: Task) => {
  //  Implement editing logic here
  console.log(task);
  
   };

  const handleDeleteTask = async (taskId: string) => {
    // Implement deleting logic here
    try {
      await axios.delete(`https://web-api-db7z.onrender.com/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTaskCountByStatus = (status: "todo" | "inProgress" | "done") => {
    return tasks.filter((task) => task.status === status).length;
  };

  const toggleTasksLeft = () => {
    setShowTasksLeft(!showTasksLeft);
  };

 
  return (
    <div className="container mx-auto p-8">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Tasks for {(new Date).toLocaleDateString()}</h2>
    <button
      onClick={handleAddTask}
      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <AddIcon className="mr-2" />
      Add Task
    </button>
  </div>

  {/* Task Status Card */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div
  onClick={toggleTasksLeft}
  className="p-2 border rounded shadow-md cursor-pointer hover:bg-gray-100"
>
      <ListAltIcon className={`text-blue-500 mb-2`} />
      <p className="text-lg font-semibold">Tasks Left</p>
      <p className="text-2xl">{getTaskCountByStatus("todo")}</p>
    </div>
    <div
  onClick={toggleTasksLeft}
  className="p-2 border rounded shadow-md cursor-pointer hover:bg-gray-100"
>     <DoneAllIcon className={`text-green-500 mb-2`} />
      <p className="text-lg font-semibold">Tasks Done</p>
      <p className="text-2xl">{getTaskCountByStatus("done")}</p>
    </div>
  </div>

  {/* Task List */}
  <ul className="divide-y divide-gray-300">
    {tasks.map((task) => (
      <li key={task._id} className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{task.Title}</h3>
            <p className="text-gray-600">{task.Description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditTask(task)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>

  {displayAddTask && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <AddTasks />
    </div>
  )}
</div>


  );
};

export default TaskComponent;
