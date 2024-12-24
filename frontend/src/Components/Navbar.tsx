import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import {  useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddTasks from "./AddTasks";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TaskIcon from "@mui/icons-material/Task";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import { useEffect } from "react";
import AddProjects from "./AddProjects";
import axios from "axios";
import { useAuthenticated } from "../hooks/useAuthenticated";
interface projectsTask{
  _id:string,
  Title:string,
  // Description:string,
  dueDate:Date
}
const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [shownav, setShownav] = useState(false);
  const[addprojects,setAddprojects]=useState<boolean>(false)
  const[projects,setProjects]=useState<projectsTask[]>([])
  const[name,setName]=useState("")
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    getProjects()

    const{tokens}=useAuthenticated()
    const fetchUserDetails=async()=>{
      try {
      const response=  await fetch("http://localhost:8086/api/user",
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

  const changeDisplay = () => {
    setTheme((prevTheme:boolean) => !prevTheme);
window.location.reload()
  };
  // console.log(theme);

  const navigate = useNavigate();
  const handleDropdown = () => {
    setDropdown((prevState) => !prevState);
  };
  const handleSettings = () => {
    setSettings(true);
  };
  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  function addProjects(){
setAddprojects(!false)  
// setShownav(false)
  }
  

  

 async function getProjects(){
try {
const id=localStorage.getItem('accessToken')
  const getData= await axios.get(`https://web-api-db7z.onrender.com/api/projects/${id}`)
if(getData.data.data){
  setProjects(getData.data.data)

}
// console.log(getData);
// console.log(projects);
// console.log(getData.data.data)

} catch (error) {
  console.log(error)
  
}
  }
console.log(projects)



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
                  <span className="text-[12px]" onClick={handleDropdown}>
                    {" "}
                    <FaAngleDown />
                  </span>
                </div>{" "}
                {/* <h2 className='text-[0.8rem] text-gray-500'>arthurkevin1260@gmail.com</h2> */}
              </div>
              <span className={`${theme && "text-white"}`}>
                <NotificationsOutlinedIcon />
              </span>
            </span>
            {dropdown && (
              <div className="relative">
                {/* <DropDown/> */}
                <div
                  className={`absolute left-0 top-[-12px] w-[200px] ${
                    theme ? "bg-[#282828] text-white absolute" : "bg-white "
                  }   h-[100px] rounded shadow-md  `}
                >
                  <ul className=" ">
                    <li
                      onClick={handleSettings}
                      className={`p-2 cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'}`}
                    >
                      <SettingsOutlinedIcon /> Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className={`p-2 cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'}`}
                    >
                      <LogoutOutlinedIcon /> Logout
                    </li>
                  </ul>
                </div>{" "}
              </div>
            )}
            {settings && (
              <div
                onClick={() => setSettings(false)}
                className={`${
                  settings
                    ? " w-full h-screen fixed bg-opacity-50 top-0 left-0 z-20 bg-black"
                    : ""
                } `}
              >
                <div className="absolute top-1/2   md:w-[100%]">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`${
                      theme ? "bg-[#282828] text-white" : "bg-white"
                    } w-[100%] transform  -translate-y-1/2 absolute left-1/2  -translate-x-1/2 p-6 rounded-md md:w-[30%] ws-[100%]`}
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      Theme Settings
                    </h2>
                    <div className="flex flex-row items-center gap-2 mb-2">
                  { theme ?   (<button onClick={changeDisplay} >
               
                    Dark Theme <WbSunnyOutlined/>
                      </button>):(
                        <button onClick={changeDisplay}>
                              Light Theme <DarkModeOutlinedIcon/>
                        </button>
                      )}
                    </div>
                    {/* <button  className="text-blue-500 hover:text-blue-700 cursor-pointer">
          Close
        </button> */}
                  </div>
                </div>
              </div>
            )}

            
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
              onClick={() => setAdd(true)}
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
<span className="" onClick={addProjects}>            <AddIcon/>
</span>
</div>
<div className="flex flex-col gap-2 mt-4 rounded w-full">
{
  projects.map((content)=>{
    return(
      <Link to={`/dashboard/projects/${content._id}`} >     <div key={content._id} className="flex flex-row  gap-4 justify-between cursor-pointer  w-full p-2">
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
        {add && (
          <div>
            <div
              onClick={() => setAdd(false)}
              className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
            >
              <AddTasks />
            </div>
          </div>
        )}
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
            } md:hidden fixed top-0 z-20 left-0 h-screen  p-2 pt-4 w-[65%]`}
            onClick={(e)=>e.stopPropagation()}
          >
            {/* <div className=" flex justify-end">
  <span className="">
    <CloseOutlined className="w-fit" />
  </span>
</div> */}
            {/* {loading && (
          <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" />
        )} */}

            <nav className="flex flex-col ">
              <div
                className={`${
                  theme && "bg-[#2828282] text-white"
                }flex flex-col gap-4`}
              >
                <span className="flex flex-row items-center justify-between">
                  {/* <img src={}/> */}
                  <div
                    className={`${
                      theme ? "bg-[#282828] text-white":'hover:bg-[#f6efee]'
                    } flex flex-row cursor-pointer  rounded p-1 gap-2`}
                  >
                    <span className="border-[1px]   rounded-full  p-1">
                      <FaUserAlt />
                    </span>
                    <div className=" flex flex-row items-center gap-1">
                      <h1 className="text-[0.8rem] ">Hello</h1>
                      <span className="text-[12px]" onClick={handleDropdown}>
                        {" "}
                        <FaAngleDown />
                      </span>
                    </div>{" "}
                  </div>
                <span className={`${theme && "text-white"}`}>
                  <NotificationsOutlinedIcon />
                </span>
                </span>
                
                {dropdown && (
                  <div className="relative">
                    {/* <DropDown/> */}
                    <div
                      className={`absolute left-0 top-[-12px] w-[200px]  ${
                        theme ? "bg-[#282828] text-white" : "bg-white"
                      }  h-[100px] rounded shadow-md  `}
                    >
                      <ul className=" ">
                        <li
                          onClick={handleSettings}
                        className={`p-2 cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'}`}
                        >
                          <SettingsOutlinedIcon /> Settings
                        </li>
                        <li
                          onClick={handleLogout}
                          className={`p-2 cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'}`} >
                          <LogoutOutlinedIcon /> Logout
                        </li>
                      </ul>
                    </div>{" "}
                  </div>
                )}
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
                  onClick={() => setAdd(true)}
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
<span className="" onClick={()=>setAddprojects(true)}>            <AddIcon/>
</span>
</div>
<div className="flex flex-col gap-2 mt-4 rounded w-full">
{
  projects.map((content)=>{
    return(
      <Link to={`/dashboard/projects/${content._id}`} >     <div key={content._id} className="flex flex-row  gap-4 justify-between cursor-pointer  w-full p-2">
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

      {settings && (
        <div
          onClick={() => setSettings(false)}
          className={`${
            settings
              ? " w-full h-screen fixed md:hidden bg-opacity-50 top-0 left-0 z-20 bg-black"
              : ""
          } md:hidden `}
        >
          <div className="md:hidden absolute top-1/2  left-1/4 w-[50%]">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${
                theme ? "bg-[#282828] text-white" : "bg-white"
              } md:hidden w-[100%] transform  -translate-y-1/2 absolute left-1/2  -translate-x-1/2 p-6 rounded-md md:w-[30%] ws-[100%]`}
            >
              <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
              <div className="flex flex-row items-center gap-2 mb-2">
                <button onClick={changeDisplay}>
                  Light theme <WbSunnyOutlinedIcon />{" "}
                </button>
              </div>
              {/* <button  className="text-blue-500 hover:text-blue-700 cursor-pointer">
          Close
        </button> */}
            </div>
          </div>
        </div>
      )}

      {add && (
        <div>
          <div
            onClick={() => setAdd(false)}
            className={`${
              add
                ? "top-0 left-0  bg-black bg-opacity-30 fixed w-full h-screen"
                : ""
            }`}
          >
            <AddTasks />
          </div>
        </div>
      )}

      <div
        onClick={() => setShownav(false)}
        className={`${
          shownav
            ? "bg-black bg-opacity-40 fixed top-0 left-0 z-0 w-full h-screen"
            : ""
        }`}
      ></div>


      <div>
        {addprojects && (
          <div onClick={()=>setShownav(false)}>
            <AddProjects/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
