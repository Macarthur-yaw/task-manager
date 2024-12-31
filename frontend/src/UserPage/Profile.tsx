import LogoutIcon from '@mui/icons-material/Logout';
import { DarkMode } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router';
export default function ProfileManagement(){
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.clear();
        navigate('/')
        }

    return (
        <div className="absolute
     flex-col gap-2
        top-10 left-3 w-30 h-30 rounded-md bg-white z-50 flex justify-center shadow-2xl items-start ">
            
            <button  onClick={handleLogout}
            className='items-center  w-full cursor-pointer inline-flex gap-1 p-1'>
                <LogoutIcon />
                Sign out</button> 
            <button className='items-center
            cursor-pointer p-1
            inline-flex gap-1'>
                <DarkMode />
                Dark mode</button>
            <button className='items-center
            cursor-pointer
            inline-flex gap-1 p-1 px-2'>
                <AccountBoxIcon />
                Profile Management</button>

        </div>
    )
}