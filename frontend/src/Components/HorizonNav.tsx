import { useEffect, useState } from "react";
import AlertDialog from "./Subscribe";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import { useAuthenticated } from "../hooks/useAuthenticated";
import api_url from "../BaseUrl";
import ProfileManagement from "../UserPage/Profile";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AlertDialogSlide from "./Searchbox";

export default function HorizonNav(){
const[subscribe,setSubscribe]=useState<boolean>(false)
  const[info,setInfo]=useState<string>("")  
  const [theme] = useState(() => {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme ? JSON.parse(storedTheme) : false;
    });
  const [settings, setSettings] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  

  const [show, setShow] = useState(false);

  const handleClickShow = () => {
    setShow(true);
  };

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
          console.log(data.message.username)
        }
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
  
      fetchUserDetails()
    }, [theme]);

      const handleClose = () => {
            setOpen(false);
          };
const handleClickClose=()=>{
      setShow(false)
}
      const handleSubscribe=(data:boolean)=>{
            setSubscribe(data)
           }
           const handleClickOpen = (events:string) => {
            setOpen(true);
            setInfo(events)
          };

      return (
            <nav className="md:p-2 z-30 py-4 pl-6 flex flex-row fixed bg-white border-b right-0 items-center justify-between w-[90%]">
     <div className="flex justify-between items-center  w-fit">

          <AlertDialogSlide show={show} handleClickClose={handleClickClose}/>

            <span
            
            onClick={handleClickShow}
            className="inline-flex items-center
         bg-white border-gray-100  border rounded-lg px-2 
            ">

                  <SearchOutlinedIcon fontSize="small" />

                  <input type="text"
            placeholder="Search"
            className="md:w-64
            outline-none cursor-pointer
            p-1   
            w-40 "
            />
            </span>
        
            </div>


                    <div className={`flex flex-col gap-4 ${theme && "text-[#fff]"}`}>
            <span className="flex flex-row-reverse gap-2 items-center  ">
          
              <div
              onClick={()=>setSettings(true)}
              className={ `flex flex-row cursor-pointer  ${theme ? '':'hover:bg-[#f6efee]'} rounded p-1 gap-1`}>
                <span className="border-[1px]   rounded-full  p-1">
                  <FaUserAlt />
                </span>
                <div className=" flex flex-row items-center gap-1">
                
                  <span className="text-[12px]">
                    {" "}
                    <FaAngleDown />
                  </span>
                </div>{" "}
                {/* <h2 className='text-[0.8rem] text-gray-500'>arthurkevin1260@gmail.com</h2> */}
              </div>
              {settings && (
      <ProfileManagement/>
      )}    


    <div
    onClick={()=>setSettings(false)}
    className={`${settings ? 'fixed w-full h-screen  top-0 left-0':''} `}>

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
            </nav>
      )
}