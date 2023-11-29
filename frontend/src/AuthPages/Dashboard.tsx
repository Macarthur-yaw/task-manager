// Dashboard.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Login from '../UserPage/Login';
// import useAuthenticated from '../Hooks/useAuthenticated';
import { createContext } from 'react';
const ThemeContext = createContext(null);
const Dashboard = () => {
const getItem=localStorage.getItem('authentication')
const isAuthenticated=getItem ? JSON.parse(getItem):false 


  return (
    <>
      <div>
        {isAuthenticated ? (
          <div className='flex flex-row'>
            <Navbar />
            <Outlet />
          </div>
        ) : (
          <Login/>
        )}
      </div>
    </>
  );
};

export default Dashboard;
