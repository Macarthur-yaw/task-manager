
import {  useState } from "react";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddTasks from "./AddTasks";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";



import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TaskIcon from "@mui/icons-material/Task";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";

import { useEffect } from "react";
import AddProjects from "./AddProjects";



import api_url from "../BaseUrl";



import BasicMenu from "./AboutMore";
import SettingsIcon from '@mui/icons-material/Settings';
export interface projectsTask{
  Userid:string,
  Title:string,
 _id:string,
  Date:Date
}
const Navbar = () => {
  const [theme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  
  
 
  const [shownav, setShownav] = useState(false);
 
  const[projects,setProjects]=useState<projectsTask[]>([])
 
  
  const[display,setDisplay]=useState<boolean>(false)
  const[show,setShow]=useState<boolean>(false)

  const addNewProject=(newProject:projectsTask)=>{
    
      setProjects(prevProjects=>[...prevProjects,newProject]);
    
  }

 const deleteProject=(id:string)=>{
  const newProjects=projects.filter((project)=>project._id!==id)
  setProjects(newProjects)
  }

 
  async function getProjects(){
    try {
    const id=localStorage.getItem('accessToken')
    let results: string = "";
    if(id){
    results=JSON.parse(id)
    }
      const getData= await fetch(`${api_url}/projects`,
      {
        headers:{
          "Authorization":`Bearer ${results}`
        }
      })
      const data=await getData.json()
     console.log(data);
     if(data)
     {
      setProjects(data.data)
     }
     
    
    
    } catch (error) {
      console.log(error)
      
    }
      }

  useEffect(
    () => {
      
    
      getProjects()
    }, []
  )

  
 
  

  
  
    
    
    
  const handleDisplay=()=>{
    setDisplay(false)
  }
  const handleShow=()=>{
setShow(false)
  }

 




  return (
    <div className={`${theme ? 'bg-[#1e1e1e]  h-screen pt-6':'  '} md:z-40  md:pl-0`}>
      <span
        onClick={() => setShownav(true)}
        className={`${theme ? 'pl-4  text-white':''} h-auto bg-white z-30  top-0 pl-4 py-5   md:hidden cursor-pointer fixed `}
      >
        <MenuOutlinedIcon />
      </span>
      <div
        className={`${
          theme
            ? "bg-[#282828] border-[#282828] w-[20%] text-white"
            : "bg-[#faf8f7] border-[#faf8f7] w-[20%] shadow-md"
        } hidden md:block md:fixed h-screen  flex-col justify-between  border-[1px]  p-2 `}
      >
        {/* {loading && (
      <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" />
    )} */}

        <nav className="flex flex-col justify-between h-full ">
        
<div className="flex flex-col justify-evenly items-start">
          <span
            className={`mt-6 mb-4 text-[12px]  ${
              theme ? "text-white" : "text-gray-600"
            }`}
          >
            MAIN
          </span>

          <ul className="flex flex-col gap-2 ">
            <Link to="/dashboard">
              <li
                className={`flex flex-row gap-2 cursor-pointer ${
                  theme ? "text-white " : "text-[#202020] hover:bg-[#f6efee]"
                }   rounded p-2 text-[14px] items-center `}
              >
                <DashboardCustomizeOutlinedIcon />
                <a href="/">Dashboard</a>
              </li>
            </Link>
            <Link to="/dashboard/tasks">
              <li
                className={`flex flex-row gap-2 cursor-pointer ${
                  theme ? "text-white " : "text-[#202020] hover:bg-[#f6efee]"
                }   rounded p-2 text-[14px] items-center `}
              >
                <TaskIcon />
                All Tasks
              </li>
            </Link>

            <li
              onClick={() => setShow(true)}
              className={`flex flex-row gap-2 cursor-pointer ${
                theme ? "text-white " : "text-[#202020] hover:bg-[#f6efee]"
              }   rounded p-2 text-[14px] items-center `}
            >
              <AddIcon />
              Add Tasks
            </li>
          </ul>  

      <span className="flex flex-col cursor-pointer justify-between items-center mt-10  text-sm  w-full">
<div className="flex flex-row justify-between cursor-pointer  w-full ">
          <span
            className={`{theme ? 'text-white':'text-gray-600'}`}
          >
            Projects

          </span>
<span className="" onClick={()=>setDisplay(true)}>            <AddIcon 
/>
</span>
</div>

<div className="flex flex-col h-64 
 scrollbar-[0.1px] scrollbar-thumb-gray-400 scrollbar-track-gray-200
overflow-y-scroll  gap-2 mt-4 rounded w-full ">
{
  projects.map((content)=>{
    return(
        <div key={content.Userid} className="flex flex-row   justify-between cursor-pointer  w-full
        hover:bg-gray-300 rounded
        active:bg-gray-300
        ">
     <Link to={`/dashboard/projects/${content._id}`} className="w-full  py-2" >  
     <span
        className={`{theme ? 'text-white':'text-gray-600'} p-1 `}
      >
        {content.Title}

      </span>
</Link>
      <span className="py-1">


<BasicMenu deleteProject={deleteProject} id={content._id}/>
      </span>
      
      </div>
  )
})}
  </div>
         </span>          
      </div>


         <span className="pt-8">
            <button className="px-3 inline-flex items-center gap-2">
              <SettingsIcon/>
              Settings</button>

          </span>

        </nav>
        
              <AddTasks
             
              show={show} handleShow={handleShow} />
      
      </div>
   
   
      <AnimatePresence>
        {shownav && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ x: "-100vw" }}
            className={`${
              theme
                ? "bg-[#282828] border-[#282828] text-white"
                : " border-[1px] bg-[#faf8f7] border-[#faf8f7]"
            } md:hidden fixed  top-0 z-50 left-0 h-screen  p-2 pt-4 w-[65%]`}
            onClick={(e)=>e.stopPropagation()}
          >
       

            <nav className="flex flex-col justify-between  ">
    
<span className="mb-4">
  <h1 className="font-bold text-[25px] ">Taskify</h1>
</span>
          
          <div className="flex flex-col w-full justify-evenly items-start">
              <span
                className={`mt-6 mb-4 text-[12px] ${
                  theme ? "text-white" : "text-gray-600"
                } `}
              >
                MAIN
              </span>
              <ul className="flex flex-col w-full gap-2 ">
                <Link to="/dashboard">
                  <li
                    className={`flex flex-row gap-2 cursor-pointer ${
                      theme ? "text-white " : "hover:bg-[#f6efee] text-[#202020]"
                    }   rounded p-2 text-[14px] items-center `}
                  >
                    {" "}
                    <DashboardCustomizeOutlinedIcon />
                    <a href="/">Dashboard</a>
                  </li>
                </Link>
                <Link to="/dashboard/tasks">
                  <li
                    className={`flex flex-row gap-2 cursor-pointer ${
                      theme ? "text-white " : "hover:bg-[#f6efee] text-[#202020]"
                    }   rounded p-2 text-[14px] items-center `}
                  >
                    <TaskIcon />
                    All Tasks
                  </li>
                </Link>

                <li
                onClick={() => setShow(true)}
                 
                  className={`flex flex-row gap-2 cursor-pointer ${
                    theme ? "text-white " : "text-[#202020] hover:bg-[#f6efee]"
                  }   rounded p-2 text-[14px] items-center `}
                >
                  <Add/>
                  Add Tasks
                </li>
              </ul>

              <span className="flex flex-col cursor-pointer justify-between  items-center mt-10  text-sm  w-full">
<div className="flex flex-row justify-between cursor-pointer  w-full ">
          <span
            className={`{theme ? 'text-white':'text-gray-600'}`}
          >
            Projects

          </span>
<span className="" onClick={()=>setDisplay(true)}>            <AddIcon/>
</span>
</div>
<div className="flex flex-col
h-64  overflow-y-scroll
gap-2 mt-4 rounded w-full">
{
  projects.map((content)=>{
    return(
        <div key={content.Userid} className="flex flex-row   justify-between cursor-pointer  w-full
        hover:bg-gray-300 rounded
        active:bg-gray-300
        ">
     <Link to={`/dashboard/projects/${content._id}`} className="w-full  py-2" >  
     <span
        className={`{theme ? 'text-white':'text-gray-600'} p-1 `}
      >
        {content.Title}

      </span>
</Link>
      <span className="py-1">


<BasicMenu deleteProject={deleteProject} id={content._id}/>
      </span>
      
      </div>
  )
})}
  </div>
          </span>        
              </div>
             

          


          <span className="pt-8">
            <button className="px-3 inline-flex items-center gap-2">
              <SettingsIcon/>
              Settings</button>

          </span>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    

 
            <AddTasks show={show} handleShow={handleShow} />
      

      <div
        onClick={() => setShownav(false)}
        className={`${
          shownav
            ? "bg-black bg-opacity-40 fixed top-0 left-0 z-40 w-full h-screen"
            : ""
        }`}
      ></div>


      <div >
       
          
            <AddProjects addNewProject={addNewProject}
            display={display}
            handleDisplay={handleDisplay}
            />

       
      
      </div>
    </div>
  );
};

export default Navbar;