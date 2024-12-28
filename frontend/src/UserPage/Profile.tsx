import LogoutIcon from '@mui/icons-material/Logout';
import { DarkMode } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
export default function ProfileManagement(){
    return (
        <div className="absolute
     flex-col gap-4
        top-8 left-0 w-30 h-30 rounded-md bg-white z-50 flex justify-center shadow-2xl items-start p-4">
            
            <button className='items-center inline-flex gap-1'>
                <LogoutIcon />
                Sign out</button> 
            <button className='items-center inline-flex gap-1'>
                <DarkMode />
                Dark mode</button>
            <button className='items-center inline-flex gap-1'>
                <AccountBoxIcon />
                Profile Management</button>

        </div>
    )
}