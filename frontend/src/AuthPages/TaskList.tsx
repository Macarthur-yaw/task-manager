import axios from "axios";
import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface Task {
_id:string,
  Title: string;
  Description: string;
}

const TaskList: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setData(response.data.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }
console.log(data)
  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }
function handleDelete(id:string){
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
    <div className="container mx-auto w-[80%] mt-8   p-8 ">

        <span className="">
      <h2 className="text-xl px-6 font-semibold text-gray-800">Task List</h2>
    
    <h3 className="px-6 text-sm">Add tasks to your project</h3>
      </span>     
      <span className="">
        <h1></h1>
      <ul className=" pt-10 pl-6 ">
        {data.map((task, index) => (
     <div key={index} className="flex group cursor-pointer  flex-row items-start mt-2 border-b-[1px] border-b-gray-100 ">
        <span>
            <input type="checkbox" className="mr-2 text-gray-100 focus:ring-gray-100 " />
        </span>
     <li  className="mb-2   flex flex-col w-full  ">
      
            <strong className="text-[14px] leading-[21px] text-[#202020]">{task.Title}</strong> 
          <h3 className="text-[12px] leading-[18px] text-[#666] mb-2">            {task.Description}</h3>

          </li>
          <span className="hidden group-hover:flex-row group-hover:gap-2   group-hover:flex">
                <button className="text-[10px]  text-[#666]"><EditOutlinedIcon className="w-2"/> </button>
         <button onClick={()=>handleDelete(task._id)} className="text-[12px] text-[#666]"><DeleteOutlineOutlinedIcon/></button>
          </span>
          </div>   ))}
      </ul>
      </span>
    </div>
  );
};

export default TaskList;
