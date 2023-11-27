import {Outlet} from 'react-router-dom'
import Navbar from '../Components/Navbar';
const Dashboard = () => {
    return ( 
        <div className='flex flex-row'>
            
            <Navbar/>
            <Outlet/>
        </div>
     );
}
 
export default Dashboard;