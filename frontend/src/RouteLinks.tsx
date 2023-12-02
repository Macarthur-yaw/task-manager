import {Routes,Route} from 'react-router-dom'
import Login from './UserPage/Login';
import SignUp from './UserPage/SignUp';
import {Dashboard} from './AuthPages/Dashboard';
import Tasks from './AuthPages/Tasks';
import Projects from './AuthPages/Projects';
import TaskList from './AuthPages/TaskList';
const RouteLinks = () => {
    return ( 
        <div>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route index element={<Login/>}/>
            <Route path="*" element={<h1>404</h1>}/>
<Route path='/dashboard' element={<Dashboard/>}>
    <Route index element={<Tasks/>}/>
    {/* <Route path='/dashboard/projects' element={<Projects/>}/>  */}
   <Route path='/dashboard/tasks' element={<TaskList/>}/>
   <Route path='/dashboard/projects/:id' element={<Projects/>}/>
    </Route>


            </Routes>
        </div>
     );
}
 
export default RouteLinks;