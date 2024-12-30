import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import {  useState } from "react";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddTasks from "./AddTasks";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TaskIcon from "@mui/icons-material/Task";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";

import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect } from "react";
import AddProjects from "./AddProjects";

import { useAuthenticated } from "../hooks/useAuthenticated";

import api_url from "../BaseUrl";
import ProfileManagement from "../UserPage/Profile";
import AlertDialog from "./Subscribe";


export interface projectsTask{
  Userid:string,
  Title:string,
 
  Date:Date
}
const Navbar = () => {
  const [theme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  
  const [settings, setSettings] = useState<boolean>(false);
 
  const [shownav, setShownav] = useState(false);
 
  const[projects,setProjects]=useState<projectsTask[]>([])
  const[name,setName]=useState("")
  const[subscribe,setSubscribe]=useState<boolean>(false)
  const[info,setInfo]=useState<string>("")  
  const [open, setOpen] = useState(false);
  const[display,setDisplay]=useState<boolean>(false)
  const[show,setShow]=useState<boolean>(false)

  const addNewProject=(newProject:projectsTask)=>{
    
      setProjects(prevProjects=>[...prevProjects,newProject]);
    
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
 

    const{tokens}=useAuthenticated()
    const fetchUserDetails=async()=>{
      try {
      const response=  await fetch(`${api_url}/userdetails`,
        {
          method:"GET",
          headers: {
            "Authorization": `Bearer ${tokens}`,
            "Content-Type": "application/json",  
          },
        }
      )
      const data =await response.json()
      if(data){
        setName(data.message.username)
      }
      console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserDetails()
  }, [theme]);

 
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

  
 
  

  
  
      const handleClickOpen = (events:string) => {
        setOpen(true);
        setInfo(events)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  const handleDisplay=()=>{
    setDisplay(false)
  }
  const handleShow=()=>{
setShow(false)
  }

 const handleSubscribe=(data:boolean)=>{
  setSubscribe(data)
 }




  return (
    <div className={`${theme ? 'bg-[#1e1e1e]  h-screen pt-6':'pl-4 pt-6 '}   md:p-0`}>
      <span
        onClick={() => setShownav(true)}
        className={`${theme ? 'pl-4 mt-2 text-white':''} h-screen md:hidden cursor-pointer absolute `}
      >
        <MenuOutlinedIcon />
      </span>
      <div
        className={`${
          theme
            ? "bg-[#282828] border-[#282828] w-[20%] text-white"
            : "bg-[#faf8f7] border-[#faf8f7] w-[20%] shadow-md"
        } hidden md:block md:fixed h-screen border-[1px]  p-2 `}
      >
        {/* {loading && (
      <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" />
    )} */}

        <nav className="flex flex-col ">
          <div className={`flex flex-col gap-4 ${theme && "text-[#fff]"}`}>
            <span className="flex flex-row items-center justify-between">
              {/* <img src={}/> */}
              <div className={ `flex flex-row cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'} rounded p-1 gap-2`}>
                <span className="border-[1px]   rounded-full  p-1">
                  <FaUserAlt />
                </span>
                <div className=" flex flex-row items-center gap-1">
                  <h1 className="text-[0.8rem] ">Hello, {name}</h1>
                  <span className="text-[12px]">
                    {" "}
                    <FaAngleDown />
                  </span>
                </div>{" "}
                {/* <h2 className='text-[0.8rem] text-gray-500'>arthurkevin1260@gmail.com</h2> */}
              </div>
            
             {subscribe ? (
                <span
                onClick={()=>handleClickOpen("subscribe")}
                className={`${theme && "text-white"} cursor-pointer`}>
<NotificationsIcon/>
</span>
             ):(
              <span
              onClick={()=>handleClickOpen("unsubscribe")}
              className={`${theme && "text-white"} cursor-pointer`}>
              <NotificationsOutlinedIcon />
            </span>
             )
             
            }    
              
            </span>
       


<AlertDialog 
info={info}
sendData={handleSubscribe}
 open={open}  handleClose={handleClose}/>

            
          </div>

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
<div className="flex flex-col gap-2 mt-4 rounded w-full">
{
  projects.map((content)=>{
    return(
      <Link to={`/dashboard/projects/${content.Userid}`} >     <div key={content.Userid} className="flex flex-row  gap-4 justify-between cursor-pointer  w-full p-2">
     <span
        className={`{theme ? 'text-white':'text-gray-600'} p-1 `}
      >
        {content.Title}

      </span>
      
      </div></Link>
  )
})}
  </div>
          </span>
        </nav>
        
              <AddTasks show={show} handleShow={handleShow} />
      
      </div>
   
   {(settings && shownav) && (
    <div onClick={()=>setSettings(false)} className="fixed  z-40 w-[65%]  h-screen inset-0 ">
      </div>
   )}
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
            } md:hidden fixed top-0 z-10 left-0 h-screen  p-2 pt-4 w-[65%]`}
            onClick={(e)=>e.stopPropagation()}
          >
       

            <nav className="flex flex-col ">
              <div
                className={`${
                  theme && "bg-[#2828282] text-white"
                }flex flex-col gap-4`}
              >
                <span className="flex relative flex-row items-center justify-between">
                  {/* <img src={}/> */}
                  <div
                  onClick={()=>setSettings(true)}
                    className={`${
                      theme ? "bg-[#282828] text-white":'hover:bg-[#f6efee]'
                    } flex flex-row cursor-pointer  rounded p-1 gap-2`}
                  >
 

                    <span className="border-[1px]   rounded-full  p-1">
                      <FaUserAlt />
                    </span>
                    <div className=" flex flex-row items-center gap-1">
                      <h1 className="text-[0.8rem] ">Hello {name}</h1>
                      <span className="text-[12px]" >
                        {" "}
                        <FaAngleDown />
                      </span>
                    </div>{" "}
                  </div>
               
                  {subscribe ? (
                <span
                onClick={()=>handleClickOpen("subscribe")}
                className={`${theme && "text-white"} cursor-pointer`}>
<NotificationsIcon/>
</span>
             ):(
              <span
              onClick={()=>handleClickOpen("unsubscribe")}
              className={`${theme && "text-white"} cursor-pointer`}>
              <NotificationsOutlinedIcon />
            </span>
             )
             
            }   

                {settings && (
      <ProfileManagement/>
      )}

                </span>
                
              
   </div>

              <span
                className={`mt-6 mb-4 text-[12px] ${
                  theme ? "text-white" : "text-gray-600"
                } `}
              >
                MAIN
              </span>
              <ul className="flex flex-col gap-2 ">
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

              <span className="flex flex-col cursor-pointer justify-between items-center mt-10  text-sm  w-full">
<div className="flex flex-row justify-between cursor-pointer  w-full ">
          <span
            className={`{theme ? 'text-white':'text-gray-600'}`}
          >
            Projects

          </span>
<span className="" onClick={()=>setDisplay(true)}>            <AddIcon/>
</span>
</div>
<div className="flex flex-col gap-2 mt-4 rounded w-full">
{
  projects.map((content)=>{
    return(
      <Link to={`/dashboard/projects/${content.Userid}`} >     <div key={content.Userid} className="flex flex-row  gap-4 justify-between cursor-pointer  w-full p-2">
     <span
        className={`{theme ? 'text-white':'text-gray-600'} p-1 `}
      >
        {content.Title}

      </span>
      
      </div></Link>
  )
})}
  </div>
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
            ? "bg-black bg-opacity-40 fixed top-0 left-0 z-0 w-full h-screen"
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