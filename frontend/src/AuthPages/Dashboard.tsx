// import { createContext, useState } from 'react';
import Navbar from '../Components/Navbar';
import Login from '../UserPage/Login';
import { Outlet } from 'react-router';


const Dashboard = () => {
  const getItem = localStorage.getItem('authentication');
  const isAuthenticated = getItem ? JSON.parse(getItem) : false;
  // const [theme, setTheme] = useState<boolean>(false);

  return (
    <>
      <div>
        {isAuthenticated ? (
          <div className='flex flex-row '>
              <Navbar />
              <Outlet />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export { Dashboard };
