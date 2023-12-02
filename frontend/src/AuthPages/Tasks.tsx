import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TaskIcon from '@mui/icons-material/Task';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Calendar from 'react-calendar';

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
  const [date, setDate] = useState<Date>(new Date());
const[inprogress,setInProgress]=useState<number>(0)
const[completed,setCompleted]=useState<number>(0)
const[filteredTasks,setFilteredTasks]=useState<Task[]>([])  
const[search,setSearch]=useState<string>('')
const[filterbox,setFilterBox]=useState<boolean>(false)
const[theme,setTheme]=useState<boolean>(false)
useEffect(() => {
   
   const theme= localStorage.getItem('theme')
   setTheme(theme ? JSON.parse(theme):false)

   
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://web-api-db7z.onrender.com/api/tasks");
      setTasks(response.data.data);
      countTasks(response.data.data);
      setFilteredTasks(response.data.data)  
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  fetchTasks();
  
  }, [theme]);


  const countTasks = (taskList: Task[]) => {
    const notCompletedCount = taskList.filter(task => task.Status === 'not_completed').length;
    setCount(notCompletedCount);
    const completed=taskList.filter(tasks=>tasks.Status==='completed').length
    setCompleted(completed)
    const inprogress=taskList.filter(tasks=>tasks.Status==='in_progress').length
  
    setInProgress(inprogress)};


 const handleDate=(date:Date)=>{
  const date1=date.toString().slice(4,15)
  setDate(date1 as unknown as Date)
  // console.log(date.toISOString());
  console.log(date1);

 const getTasks = filteredTasks.filter(task=>task.Date===date1)

console.log(getTasks);
setTasks(getTasks);


} 
const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setSearch(e.target.value)
  const getSearch=filteredTasks.filter(task=>task.Title.toLowerCase().includes(search.toLowerCase()))
  setTasks(getSearch)

}
function handleFilter(){
setFilterBox(!filterbox)

}
const filterChange=(status:string)=>{
  const getFilter=filteredTasks.filter(task=>task.Status===status)
  setTasks(getFilter)
  setFilterBox(false)
}
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


      <main className={`${theme ? 'bg-[#1e1e1e]':''} flex md:flex-row  flex-col gap-2 justify-between`}>
      
        <div className={`md:w-[65%]    ${theme ? 'bg-[#282828] text-white border-gray-500 border-[0.1px]':'bg-white border-white' } `}>
          <span className='flex flex-row items-center p-2 py-4 md:gap-6 gap-2'>
            <h1 className='md:text-xl text-md'>Tasks</h1>
            <span className='rounded-md outline-none border-[1px]  md:p-[2px]  flex flex-row md:gap-2  px-2 items-center'>
              <SearchOutlinedIcon className='' style={{fontSize:'18px'}}/>
              <input type='text'
              value={search} onChange={handleSearch}
              
              placeholder='Search Task' className='outline-none bg-transparent  '/>
            </span>
            <button onClick={handleFilter} className={`ml-auto border-[1px] flex flex-row items-center md:gap-2 gap-1 md:p-[1px] rounded  ${theme ? 'text-white':'text-gray-400'}`}>
              <FilterListIcon  style={{fontSize:'12px'}}/>
              Filter
              <KeyboardArrowDownIcon style={{fontSize:'18px'}}/>
            </button>
<div className='relative border-[1px] border-black'>            {
              filterbox && (
                <div className={`absolute md:w-[115px] right-5    top-5 shadow-xl rounded-sm  ${theme ? 'bg-[#282828]':'bg-white'}  `}>
                <span className=' '>
                  <button onClick={()=>filterChange('not_completed')} className='text-[12px] hover:bg-gray-50 w-full p-1' >Not Completed</button>
                  <button onClick={()=>filterChange('completed')} className='text-[12px] hover:bg-gray-50 w-full p-1'>Completed</button>
                  <button onClick={()=>filterChange('in_progress')} className='text-[12px] hover:bg-gray-50 w-full p-1'>In Progress</button>
                  </span>  </div>
              )
            }</div>

          </span>
          <ul className="divide-y divide-gray-300">
            <table className={`${theme ? 'bg-[#282828] ':'bg-white'} md:w-[100%] md:h-[400px]`}>
              <thead>
                <tr className={`flex flex-row font-normal justify-around p-1 gap-2 w-full ${theme ? 'bg-[#282828]':'bg-gray-50'}`}>
                  <th className='font-normal text-[14px]'>Title</th>
                  <th className='font-normal text-[14px]'>Description</th>
                  <th className='font-normal tetx-[14px]'>Status</th>
                  <th className='font-normal text-[14px]'>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <li key={task._id} className="">
                    <tr className='flex flex-row py-4 justify-around'>  
                      <td>
                        <h3 className="text-md font-medium text-[13px]">{task.Title}</h3>
                      </td>
                      <td>
                        <p className=" text-[12px]">{task.Description}</p>
                      </td>
                      <td>
                        <p className=" text-[12px]">{task.Status}</p>
                      </td>
                      <td>
                        <p className=" text-[12px]">{task.Date}</p>
                      </td>
                    </tr> 
                  </li>
                ))}
              </tbody>
            </table>
          </ul>
        </div>

        <div className={`flex flex-col gap-4 border-[1px] ${theme ? 'bg-[#282828] text-white  border-gray-500':'border-white bg-white'}  rounded-sm shadow-sm items-center justify-center`}>
          <span className='md:text-xl font-medium'>Activities</span>
          <Calendar
            value={date}

            className={`${theme ? 'bg-[#282828]':'bg-white'}`}
            onChange={(date)=>handleDate(date as Date)}
          />
        </div> 
      </main>
    </div>
  );
};

export default TaskComponent;
