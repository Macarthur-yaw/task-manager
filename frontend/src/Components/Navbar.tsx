// import {A} from '@mui/icons-material'
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
// import  SearchIcon from '../assets/search.svg'

import ListIcon from "../assets/list.svg";
import DashboardIcon from "../assets/dashboard.svg";
import AddIcon from "../assets/add.svg";
import NotifyIcon from "../assets/notifications.svg";
import { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link,useNavigate } from "react-router-dom";
import {motion,AnimatePresence} from 'framer-motion'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddTasks from "./AddTasks";
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import { CloseOutlined } from '@mui/icons-material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const Navbar = () => {
    const[dropdown,setDropdown]=useState<boolean>(false)
    const[settings,setSettings]=useState<boolean>(false)
    const[add,setAdd]=useState<boolean>(false)
    // const[loading,setLoading]=useState<boolean>(false)
const[shownav,setShownav]=useState(false)

    const navigate=useNavigate()
    const handleDropdown=()=>{
        setDropdown(prevState=>!prevState)
    }
    const handleSettings=()=>{
        setSettings(true)
    }
    const handleLogout=()=>{
    localStorage.setItem('authentication', JSON.stringify(false))

      navigate('/')
    }
  return (
    <div className="pt-6 pl-4 md:p-0">
      <span onClick={()=>setShownav(true)} className="md:hidden cursor-pointer">
      <MenuOutlinedIcon/>
      </span>
    <div className="hidden md:block h-screen border-[1px] bg-[#faf8f7] border-[#faf8f7] p-2 w-[85%]">
  
    {/* {loading && (
      <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" />
    )} */}
  
      <nav className="flex flex-col ">
        <div className="flex flex-col gap-4">
          <span className="flex flex-row items-center justify-between">
            {/* <img src={}/> */}
            <div className="flex flex-row cursor-pointer hover:bg-[#f6efee] rounded p-1 gap-2">
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
              {/* <h2 className='text-[0.8rem] text-gray-500'>arthurkevin1260@gmail.com</h2> */}
            </div>
            <img  
              src={NotifyIcon}
              alt="notify"
              className="w-[20px] h-[20px] cursor-pointer rounded-full  hover:bg-[#f6efee]"
            />
          </span>
            {
                    dropdown&&(
                        <div className="relative">
                            {/* <DropDown/> */}
<div className="absolute left-0 top-[-12px] w-[200px]  bg-white  h-[100px] rounded shadow-md  ">
    <ul className=" ">
        <li onClick={handleSettings} className="p-2 cursor-pointer hover:bg-[#f6efee]"><SettingsOutlinedIcon/> Settings</li> 
        <li onClick={handleLogout} className="p-2 cursor-pointer hover:bg-[#f6efee]"><LogoutOutlinedIcon/>  Logout</li>
</ul></div>                            </div>
                    )
                }
                {
                    settings&&(
<div onClick={()=>setSettings(false)} className={`${settings ? ' w-full h-screen fixed bg-opacity-50 top-0 left-0 z-20 bg-black':''}`}>

                        <div  className="absolute top-1/2   md:w-[100%]">
      <div onClick={(e)=>e.stopPropagation()} className="bg-white w-[100%] transform  -translate-y-1/2 absolute left-1/2  -translate-x-1/2 p-6 rounded-md md:w-[30%] ws-[100%]">
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <div className="flex flex-row items-center gap-2 mb-2">
          <button>Light theme <WbSunnyOutlinedIcon/> </button>
          </div>
        {/* <button  className="text-blue-500 hover:text-blue-700 cursor-pointer">
          Close
        </button> */}
      </div>
      </div>
    </div>

                            )
                }
           
          <div className="border-[1px] border-gray-100 flex flex-row items-center  gap-1 p-0.5  bg-white">
            <span className="text-gray-500 ">
              {" "}
              <SearchOutlinedIcon />
            </span>
            <input
              type="text"
              placeholder="Search"
              className=" outline-none text-gray-900 w-full"
            />
          </div>
        </div>

        <span className="mt-6 mb-4 text-[12px] text-gray-600">MAIN</span>
        <ul className="flex flex-col gap-2 ">
        <Link to='/dashboard'>
          <li className="flex flex-row gap-2 cursor-pointer text-[#202020] hover:bg-[#f6efee] rounded p-2 text-[14px] items-center ">
            <img
              src={DashboardIcon}
              alt="dashboard"
              className="w-[20px] h-[20px] cursor-pointer "
            />

            <a href="/">Dashboard</a>
          </li>
          </Link>
          <Link to='/dashboard/tasks'>
          
          <li className="flex flex-row items-center gap-2 cursor-pointer text-[14px] text-[#202020] hover:bg-[#f6efee] rounded p-2">
            <img
              src={ListIcon}
              alt="list"
              className="w-[20px] h-[20px] cursor-pointer"
            />
            All Tasks
          </li>
          </Link>
        
          <li onClick={()=>setAdd(true)} className="flex flex-row items-center gap-2 text-[14px] cursor-pointer text-[#202020] hover:bg-[#f6efee] rounded p-2">
            <img
              src={AddIcon}
              alt="add"
              className="w-[20px] h-[20px] cursor-pointer"
            />
            Add Tasks
          </li>
        </ul>

        <span className="mt-10 text-sm text-gray-600 w-full">Projects</span>
      </nav>
 {
        add&&(
         <div>
<div onClick={()=>setAdd(false)} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"> 
<AddTasks/>
        </div>
        </div>
        )
 }
    </div>
<AnimatePresence>
    {
      shownav && (
        <motion.div
        initial={{x:'-100vw'}}
        animate={{x:0}}
        transition={{duration:0.2}}
        exit={{x:'-100vw'}}
        
        className=" md:hidden fixed top-0 z-10 left-0 h-screen border-[1px] bg-[#faf8f7] border-[#faf8f7] p-2 w-[65%]">
{/* <div className=" flex justify-end">
  <span className="">
    <CloseOutlined className="w-fit" />
  </span>
</div> */}
 {/* {loading && (
          <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" />
        )} */}
      
          <nav className="flex flex-col ">
            <div className="flex flex-col gap-4">
              <span className="flex flex-row items-center justify-between">
                {/* <img src={}/> */}
                <div className="flex flex-row cursor-pointer hover:bg-[#f6efee] rounded p-1 gap-2">
                  <span className="border-[1px]   rounded-full  p-1">
                    <FaUserAlt />
                  </span>
                  <div className=" flex flex-row items-center gap-1">
                    <h1 className="text-[0.8rem] ">Kevin</h1>
                    <span className="text-[12px]" onClick={handleDropdown}>
                      {" "}
                      <FaAngleDown />
                    </span>
                  
                  </div>{" "}
                  {/* <h2 className='text-[0.8rem] text-gray-500'>arthurkevin1260@gmail.com</h2> */}
                </div>
                <img  
                  src={NotifyIcon}
                  alt="notify"
                  className="w-[20px] h-[20px] cursor-pointer rounded-full  hover:bg-[#f6efee]"
                />
              </span>
                {
                        dropdown&&(
                            <div className="relative">
                                {/* <DropDown/> */}
    <div className="absolute left-0 top-[-12px] w-[200px]  bg-white  h-[100px] rounded shadow-md  ">
        <ul className=" ">
            <li onClick={handleSettings} className="p-2 cursor-pointer hover:bg-[#f6efee]"><SettingsOutlinedIcon/> Settings</li> 
            <li onClick={handleLogout} className="p-2 cursor-pointer hover:bg-[#f6efee]"><LogoutOutlinedIcon/>  Logout</li>
    </ul></div>                            </div>
                        )
                    }
           


               
              <div className="border-[1px] border-gray-100 flex flex-row items-center  gap-1 p-0.5  bg-white">
                <span className="text-gray-500 ">
                  {" "}
                  <SearchOutlinedIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className=" outline-none text-gray-900 w-full"
                />
              </div>
            </div>
    
            <span className="mt-6 mb-4 text-[12px] text-gray-600">MAIN</span>
            <ul className="flex flex-col gap-2 ">
            <Link to='/dashboard'>
              <li className="flex flex-row gap-2 cursor-pointer text-[#202020] hover:bg-[#f6efee] rounded p-2 text-[14px] items-center ">
                <img
                  src={DashboardIcon}
                  alt="dashboard"
                  className="w-[20px] h-[20px] cursor-pointer "
                />
    
                <a href="/">Dashboard</a>
              </li>
              </Link>
              <Link to='/dashboard/tasks'>
              
              <li className="flex flex-row items-center gap-2 cursor-pointer text-[14px] text-[#202020] hover:bg-[#f6efee] rounded p-2">
                <img
                  src={ListIcon}
                  alt="list"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                All Tasks
              </li>
              </Link>
            
              <li onClick={()=>setAdd(true)} className="flex flex-row items-center gap-2 text-[14px] cursor-pointer text-[#202020] hover:bg-[#f6efee] rounded p-2">
                <img
                  src={AddIcon}
                  alt="add"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                Add Tasks
              </li>
            </ul>
    
            <span className="mt-10 text-sm text-gray-600 w-full">Projects</span>
          </nav>
       
        </motion.div>
      )
    }
    </AnimatePresence>

    {settings&&(
<div onClick={()=>setSettings(false)} className={`${settings ? ' w-full h-screen fixed md:hidden bg-opacity-50 top-0 left-0 z-20 bg-black':''} md:hidden`}>
<div  className="md:hidden absolute top-1/2  left-1/4 w-[50%]">
      <div onClick={(e)=>e.stopPropagation()} className="bg-white md:hidden w-[100%] transform  -translate-y-1/2 absolute left-1/2  -translate-x-1/2 p-6 rounded-md md:w-[30%] ws-[100%]">
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <div className="flex flex-row items-center gap-2 mb-2">
          <button>Light theme <WbSunnyOutlinedIcon/> </button>
          </div>
        {/* <button  className="text-blue-500 hover:text-blue-700 cursor-pointer">
          Close
        </button> */}
      </div>
      </div>
    </div>

                            )
                }
   



    {
            add&&(
             <div>
    <div onClick={()=>setAdd(false)} className={`${add ? 'top-0 left-0  bg-black bg-opacity-30 fixed w-full h-screen':''}`}> 
    <AddTasks/>
            </div>
            </div>
            )
     }
     
    <div onClick={()=>setShownav(false)} className={`${shownav ? 'bg-black bg-opacity-40 fixed top-0 left-0 w-full h-screen':''}`}>

    </div>
    </div>
  );
};

export default Navbar;
