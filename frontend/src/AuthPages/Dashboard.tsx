// import { createContext, useState } from 'react';
import HorizonNav from '../Components/HorizonNav';
import Navbar from '../Components/Navbar';
import { useAuthenticated } from '../hooks/useAuthenticated';
import Login from '../UserPage/Login';
import { Outlet } from 'react-router';


const Dashboard = () => {
  const {authenticated}=useAuthenticated()
  // const [theme, setTheme] = useState<boolean>(false);

  return (
    <>
      <div>
        {authenticated ? (
          <div className='flex flex-row  justify-between'>
              <Navbar />
              <div className='md:w-[80%]    w-full '>
                <div className='bg-white fixed
                 md:w-full right-0 top-0 z-30  w-[90%]  flex flex-row justify-between md:justify-end items-center '>
               <HorizonNav/>
               </div>
               <div className='mt-16'>
              <Outlet />
              </div>
              </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export { Dashboard };
