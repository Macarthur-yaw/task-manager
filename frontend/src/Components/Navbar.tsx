// import {A} from '@mui/icons-material'
import { FaUserAlt, FaAngleDown, FaSearch } from "react-icons/fa";
// import  SearchIcon from '../assets/search.svg'

import ListIcon from "../assets/list.svg";
import DashboardIcon from "../assets/dashboard.svg";
import AddIcon from "../assets/add.svg";
import NotifyIcon from "../assets/notifications.svg";
import { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link,useNavigate } from "react-router-dom";
const Navbar = () => {
    const[dropdown,setDropdown]=useState<boolean>(false)
    const[settings,setSettings]=useState<boolean>(false)
    const[add,setAdd]=useState<boolean>(false)
    const navigate=useNavigate()
    const handleDropdown=()=>{
        setDropdown(prevState=>!prevState)
    }
    const handleSettings=()=>{
        setSettings(true)
    }
  return (
    <div className="h-screen border-[1px] bg-[#faf8f7] border-[#faf8f7] p-2 w-[20%]">
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
        <li onClick={()=>navigate('/')} className="p-2 cursor-pointer hover:bg-[#f6efee]"><LogoutOutlinedIcon/>  Logout</li>
</ul></div>                            </div>
                    )
                }

                {
                    settings&&(
                        <div className="absolute">
 <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[30%]">
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <div className="flex flex-row items-center gap-2 mb-2">
          <button>Light theme</button>
          </div>
        <button  className="text-blue-500 hover:text-blue-700 cursor-pointer">
          Close
        </button>
      </div>
    </div>

                            </div>)
                }
           
          <div className="border-[1px] border-gray-100 flex flex-row items-center  gap-1 p-1  bg-white">
            <span className="text-gray-500 p-1">
              <FaSearch />
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
<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"> 
<div className="bg-white w-[30%]     rounded ">
    <form className="flex flex-col rounded-sm  gap-2 ">
        <span className="flex flex-col  border-b-[1px] ">
        <input type="text" placeholder="Task title" className="p-2 text-xl outline-none"/>
        <input type="text"  placeholder="Description" className="p-2  text-sm outline-none"/></span>

<span className="flex flex-row gap-2 ml-auto p-2">
    <button type="submit" className="bg-black rounded text-white p-2">Add Task</button>
    <button onClick={()=>setAdd(false)}>Close</button>
</span>
    </form>
    </div>
</div>
        </div>
        )
 }
    </div>
  );
};

export default Navbar;
