import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProjectTask from "../Components/AddProjectTask";
import EditOutlined from "@mui/icons-material/EditOutlined";

interface Project {
  _id: string;
  title: string;
  description: string;
}

const Projects = () => {
  const { id } = useParams();
  const [add, setAdd] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [theme, setTheme] = useState<boolean>(false);
const[menu,setMenu]=useState<boolean>(false)
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setTheme(theme ? JSON.parse(theme) : false);
    AddTasks();

    async function AddTasks() {
      try {
        const getData = await axios.get(`https://web-api-db7z.onrender.com/api/projectTask/${id}`);
        if (getData.data.length > 0) {
          setProjects(getData.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, theme]);

  

  const handleDelete = async (projectId: string) => {
    try {
      await axios.delete(`https://web-api-db7z.onrender.com/api/projectTask/${projectId}`);
      
      // Update the projects state after deletion
      const updatedProjects = projects.filter(project => project._id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${theme ? 'bg-[#1e1e1e]' : ''} px-20 h-screen mx-auto`}>
      <span className="flex p-4 flex-row py-10 justify-between">
        <h1 className="text-[16px] font-medium">Projects</h1>
        <MoreHorizOutlinedIcon className="text-[20px]" />
      </span>
      <span className="px-4">
        <button onClick={() => setAdd(!add)} className="inline-flex text-[14px] gap-2 items-center">
          <AddIcon style={{ fontSize: "16px" }} />
          Add Task
        </button>
      </span>
      {add && <AddProjectTask projectId={id} />}
<div className="grid md:grid-cols-4 grid-cols-2 ">      {projects.map((project, index) => (
        <div key={index} className="group">
         <div className=" my-4 p-4 inline-flex justify-between transition-bg duration-100 cursor-pointer   border-[1px] border-gray-500 rounded w-[80%] bg-[#282828]">
    <span>          <h1 className="text-white font-sm">{project.title}</h1>
          <span className="text-gray-400">{project.description}</span>
          </span>
 <div onClick={()=>setMenu(!menu)} className=" mt-2 group-hover:block hidden">
        <MoreHorizOutlinedIcon className="text-white"/>
          </div>
      <div className="relative">    {
            menu && (
                <div className="absolute top-10 w-[100px] flex flex-col justify-center right-0 shadow-2xl bg-white h-[60px]">
                    <button className="text-sm inline-flex gap-1 items-center w-full justify-center">
                        <EditOutlined style={{fontSize:'14px'}}/>
                        Edit Task</button>
                    <button
                    onClick={()=>handleDelete(project._id)}
                    className="text-sm inline-flex gap-1 items-center w-full justify-center">
                        <DeleteIcon style={{fontSize:'14px'}}/>
                        Delete Task</button>
                    </div>
            )
          }</div>
          </div>
        </div>
      ))}</div>
    </div>
  );
};

export default Projects;
