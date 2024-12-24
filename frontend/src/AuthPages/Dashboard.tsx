// import { createContext, useState } from 'react';
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
              <div className='md:w-[80%]  w-full '>
               
              <Outlet />
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
