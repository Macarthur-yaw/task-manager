import axios from "axios";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddTasks from "../Components/AddTasks";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import api_url from "../BaseUrl";
interface Task {
  _id: string;
  Title: string;
  Description: string;
}

interface inputContent {
  title?: string;
  description?: string;
}

const TaskList: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [inputContent, setInputContent] = useState<inputContent>({
    title: "",
    description: "",
  });
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
const[done,setDone]=useState<boolean>(false)
const[theme,setTheme]=useState<boolean>(false)
const[showDetails,setShowDetails]=useState<boolean>(false)
useEffect(() => {
    fetchData();
  // localStorage.getItem('themes')
  const storedTheme = localStorage.getItem('theme');

  setTheme(storedTheme ? JSON.parse(storedTheme) : false)
  }, []);

  const userId=localStorage.getItem('accessToken')
  let results: string = "";
  if(userId){
    results=JSON.parse(userId)
  }

  const fetchData = async () => {
   
    try {
      const response = await fetch(`${api_url}/tasks`,
      {
        headers:{
          
          'Authorization':`Bearer ${results}`
        }
      }
      );
const changeData=await response.json()
setData(changeData.data)
    
   console.log(changeData)
    } catch (error) {
        console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete= async (id: string)=> {
 setLoading(true)
    try {
   await axios.delete(`https://web-api-db7z.onrender.com/api/tasks/${userId}/${id}`)
}
      catch(error){
console.log(error);

      }
      finally{
        setLoading(true)
      }

  }

  function handleUpdate(id: string, index: number) {
    setDisplay(true);
    setTaskId(id);
    setInputContent({
      title: data[index].Title,
      description: data[index].Description,
    });
    handleCallback();
  }
  const ChangeInProgress=async(id:string)=>{
try {
  axios.put(`https://web-api-db7z.onrender.com/api/tasks/${userId}/${id}`,{
    status:"in_progress"
  })
    
} catch (error) {
  console.log(error)
}

    
  }

  function handleCallback(dataForms?: inputContent) {
    console.log(dataForms);
  }

  function handleCheckbox(taskId: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [taskId]: !prevCheckedItems[taskId],
    }));
    // console.log(checkedItems);
    // handleDelete(taskId);
    handleCheck(taskId)
setDone(true)

  }
  const handleCheck=async(id:string)=>{
    try {
      await axios.put(`https://web-api-db7z.onrender.com/api/tasks/${id}`,{
        status:"completed"
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`${theme ? 'bg-[#1e1e1e] w-full  min-h-screen text-white':''} pt-20`}>
 {loading && (
      <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" >
      </div>
    )} 
      <span className="">
        <h2 className={`text-xl px-6 font-semibold  ${theme ? 'text-white':'text-gray-800'}`}>Task List</h2>
        <h3 className="px-6 text-sm">Add tasks to your project</h3>
      </span>
      <span className="">
        <h1></h1>
        <ul className="pt-10 pl-6 ">
          {data.map((task, index) => (
            <div
              key={index}
              className="flex group cursor-pointer flex-row items-start mt-2 border-b-[1px] border-b-gray-100 "
            >
              <span>
                <input
                  type="checkbox"
                  checked={checkedItems[task._id] || false}
                  onChange={() => handleCheckbox(task._id)}
                  className="mr-2 text-gray-100 focus:ring-gray-100 "
                />
              </span>
              <li className="mb-2   flex flex-col w-full  ">
                <strong className={`${theme ? 'text-white':'text-[#202020]'} text-[14px] leading-[21px] `}>
                  {task.Title}
                </strong>
                <h3 className="text-[12px] leading-[18px] text-[#666] mb-2">
                  {" "}
                  {task.Description}
                </h3>
              </li>
              <span className="hidden group-hover:flex-row group-hover:gap-2   group-hover:flex">
                <button
                  onClick={() => handleUpdate(task._id, index)}
                  className="text-[10px]  text-[#666]"
                >
                  <EditOutlinedIcon className="w-2" />{" "}
                </button>
<span className="">
<MoreVertOutlinedIcon onClick={()=>setShowDetails(!showDetails)}/>
{ showDetails &&  (  
<div className="border-[1px] right-4 p-1 h-fit w-[120px] bg-white border-white shadow-lg rounded-md absolute">
<button
                  onClick={() => handleDelete(task._id)}
                  className="text-[12px] text-[#666] inline-flex gap-1 w-full items-center justify-center"
                >
                  Delete
                 {/* Delete <DeleteOutlineOutlinedIcon /> */}
                </button>

{/* <button className="text-[12px] text-[#666] inline-flex gap-1 w-full items-center justify-center">
  Completed
</button> */}

<button onClick={()=>ChangeInProgress(task._id)}
className="text-[12px] text-[#666] inline-flex gap-1 w-full items-center justify-center">
In progress
</button>

                </div>
                )
             }</span>             </span>
            </div>
          ))}
        </ul>
      </span>
      {display && (
        <div>
          <div
          onClick={()=>setDisplay(false)}
          className="fixed top-0 left-0 bg-black w-full h-screen bg-opacity-50 z-50">
            <AddTasks
              taskId={taskId}
              handleCallback={handleCallback}
              inputContent={inputContent}
              display={display}
            />
          </div>
        </div>
      )}

      {
        done &&(
            <div className="">
   <div className="absolute left-4   bottom-2">
                    <span className="absolute flex flex-row items-center gap-6 left-0 w-72 rounded bottom-0 bg-[#202020] text-gray-200 p-4">
                        You have completed the task
<span onClick={()=>setDone(false)} className="cursor-pointer">
<CloseOutlinedIcon/>
</span>              </span>
                </div>

                </div>
        )
      }
    </div>
  );
};

export default TaskList;
