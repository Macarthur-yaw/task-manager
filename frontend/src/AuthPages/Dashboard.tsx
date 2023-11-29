import { createContext, useState } from 'react';
import Navbar from '../Components/Navbar';
import Login from '../UserPage/Login';
import { Outlet } from 'react-router';

interface ThemeContextType {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const Dashboard = () => {
  const getItem = localStorage.getItem('authentication');
  const isAuthenticated = getItem ? JSON.parse(getItem) : false;
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <>
      <div>
        {isAuthenticated ? (
          <div className='flex flex-row'>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <Navbar />
              <Outlet />
            </ThemeContext.Provider>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export { Dashboard, ThemeContext };
