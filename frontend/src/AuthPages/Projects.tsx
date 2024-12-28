import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddProjectTask from "../Components/AddProjectTask";
import api_url from "../BaseUrl";

interface Project {
  _id: string;
  title: string;
  description: string;
}

const Projects = () => {
  const { id } = useParams();
  const [add, setAdd] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [theme, setTheme] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setTheme(theme ? JSON.parse(theme) : false);
    AddTasks();

    async function AddTasks() {
      try {
        const userId = localStorage.getItem('accessToken');
        let results;
        if (userId) {
          results = JSON.parse(userId);
        }
        const getData = await fetch(`${api_url}/projectTask/${id}`, {
          headers: {
            'Authorization': `Bearer ${results}`
          }
        });
        const changeResponse = await getData.json();
        if (changeResponse.data) {
          setProjects(changeResponse.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [id, theme]);

  // Mock data for demonstration
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className={`max-w-4xl mx-auto ${theme ? 'bg-gray-900 text-white' : 'bg-white'} p-6`}>
      {loading && <div className="h-1 bg-blue-500 absolute top-0 left-0 animate-pulse w-full" />}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{today}</span>
            <span className="text-red-500 text-sm bg-red-100 px-2 py-0.5 rounded">
              Overtime Detected
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">09:00:00</span>
              <span className="text-red-500">+30:00</span>
            </div>
            <span className="text-gray-600">260</span>
            <KeyboardArrowUpIcon className="text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className={`
              rounded-lg border ${theme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 shadow-lg'}
              p-4 transition-all duration-200 hover:border-gray-400
            `}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className={`font-medium ${theme ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>08:17 AM - 09:29 AM</span>
                    <span>01:10:00</span>
                  </div>
                  <span className="text-gray-600">$124.76</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <PlayCircleOutlineIcon className="text-gray-400" style={{ fontSize: "24px" }} />
                  </button>
                  <button 
                    onClick={() => setMenu(!menu)} 
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MoreHorizOutlinedIcon className="text-gray-400" style={{ fontSize: "24px" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {add && <AddProjectTask id={id} />}
      <div className="mt-6">
        <button 
          onClick={() => setAdd(!add)} 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg 
            ${theme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'} 
            hover:bg-gray-200 transition-colors duration-200`}
        >
          <AddIcon style={{ fontSize: "20px" }} />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Projects;