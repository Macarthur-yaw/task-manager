import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TaskIcon from '@mui/icons-material/Task';

interface Task {
  _id: string;
  Title: string;
  Description: string;
  dueDate?: string;
  Date: string;
  Status: string;
}

const TaskComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState<number>(0);
const[inprogress,setInProgress]=useState<number>(0)
const[completed,setCompleted]=useState<number>(0)
const[theme,setTheme]=useState<boolean>(false)
// const[token,setToken]=useState<string>('')





useEffect(() => {
   
   const theme= localStorage.getItem('theme')
   setTheme(theme ? JSON.parse(theme):false)

   const accessToken=localStorage.getItem('accessToken');
  console.log(accessToken)
 
  const fetchTasks = async () => {
    try {
      const id = localStorage.getItem('accessToken');
       

   
      const response = await axios.get(`https://web-api-db7z.onrender.com/api/tasks/${id}`);
  if(response.data.data){
    setTasks(response.data.data);
    countTasks(response.data.data);
  
  }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  fetchTasks();
  
  }, [theme]);

console.log(tasks);

  const countTasks = (taskList: Task[]) => {
    const notCompletedCount = taskList.filter(task => task.Status === 'not_completed').length;
    setCount(notCompletedCount);
    const completed=taskList.filter(tasks=>tasks.Status==='completed').length
    setCompleted(completed)
    const inprogress=taskList.filter(tasks=>tasks.Status==='in_progress').length
  
    setInProgress(inprogress)};


 

  return (
    <div className={`${theme ? 'bg-[#1e1e1e]   ':'bg-white'}   p-4 pt-20  md:p-8 min-h-screen min-w-screen`}>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6  mb-4">
  <div
  className={`p-2 w-[100%]  h-[150px] ${theme ? 'bg-[#282828] text-white border-[1px] border-gray-400':'bg-white border-white' }  flex flex-col gap-1  border rounded shadow-sm cursor-pointer `}
>
 
<span className={`border-[1px]   w-fit h-fit p-1 rounded-sm mb-2  ${theme ? 'bg-[#4f2929] border-[#4f2929]':'bg-gray-100'}`}>    
 <ListAltIcon className={`${theme ? 'text-white':'text-green-500'}  `} style={{fontSize:"20px"}} />
 </span>
      <p className="text-sm ">Tasks Left</p>
      <p className="md:text-5xl text-xl font-medium">{count}</p>
    </div>
    <div
  
  className={`w-[100%]  h-[150px] p-2 ${theme ? 'bg-[#282828] text-white border-[1px] border-gray-400':'bg-white border-white' }  flex flex-col gap-1 rounded shadow-sm cursor-pointer `}
>   
<span className={`border-[1px]   w-fit h-fit p-1 rounded-sm mb-2  ${theme ? 'bg-[#4f2929] border-[#4f2929]':'bg-gray-100'}`}>    
 <DoneAllIcon className={`${theme ? 'text-white':'text-green-500'}  `} style={{fontSize:"20px"}} />
 </span>
  <p className="text-sm ">Tasks in progress</p>
      <p className="md:text-5xl text-xl font-medium">{inprogress}</p>
    </div>
    
    <div
 
  className={`w-[100%] ${theme ? 'bg-[#282828] text-white border-[1px] border-gray-400':'bg-white border-white' } h-[150px] flex flex-col  gap-1  p-2 border rounded shadow-sm cursor-pointer `}
> 
<span className={`border-[1px]   w-fit h-fit p-1 rounded-sm mb-2  ${theme ? 'bg-[#4f2929] border-[#4f2929]':'bg-gray-100'}`}>    
 <TaskIcon className={`${theme ? 'text-white':'text-green-500'}  `} style={{fontSize:"20px"}} />
 </span>

   <p className="text-sm ">Tasks Done</p>
      <p className="md:text-5xl text-xl font-medium">{completed}</p>
    </div>
  </div>


      
    </div>
  );
};

export default TaskComponent;
