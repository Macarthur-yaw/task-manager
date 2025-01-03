import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Menu, MenuItem } from '@mui/material';
import api_url from "../BaseUrl";
import AddProjectTasks from "../Components/AddProjectTask";
import { useParams } from "react-router";

interface Task {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Date: string;
}

interface inputContent {
  title?: string;
  description?: string;
  Date?: string;
}

const Projects: React.FC = () => {
  const {id}=useParams();
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [display, setDisplay] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [inputContent, setInputContent] = useState<inputContent>({ title: "", description: "" });
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [done, setDone] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
 
  const [show, setShow] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'in-progress' | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleShow = () => {
    setShow(false);
  };

  function handleUpdate(id: string, index: number) {
    setDisplay(true);
    setTaskId(id);
    setInputContent({
      title: data[index].Title,
      description: data[index].Description,
      Date: data[index].Date,
    });
    setShow(true);
    handleCallback();
  }

  function handleCallback(dataForms?: inputContent) {
    console.log(dataForms);
  }

  const handleDialogOpen = (type: 'delete' | 'in-progress', taskId: string) => {
    setActionType(type);
    setCurrentTaskId(taskId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setActionType(null);
    setCurrentTaskId(null);
  };

  const handleConfirmAction = async () => {
    if (actionType === 'delete' && currentTaskId) {
      await handleDelete(currentTaskId);
    } else if (actionType === 'in-progress' && currentTaskId) {
      await ChangeInProgress(currentTaskId, "in_progress");
    }
    handleDialogClose();
  };

  useEffect(() => {
    fetchData();

    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme ? JSON.parse(storedTheme) : false);
  }, []);

  const userId = localStorage.getItem('accessToken');
  let results: string = "";
  if (userId) {
    results = JSON.parse(userId);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${api_url}/projectTask/${id}`, {
        headers: {
          'Authorization': `Bearer ${results}`
        }
      });
      const changeData = await response.json();
      setData(changeData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const getToken = localStorage.getItem('accessToken');
    let results: string = "";
    if (getToken) {
      results = JSON.parse(getToken);
    }
    setLoading(true);
    try {
      await fetch(`${api_url}/projectTask/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${results}`
        }
      });
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ChangeInProgress = async (id: string, data: string) => {
    try {
      const getToken = localStorage.getItem('accessToken');
      let results: string = "";
      if (getToken) {
        results = JSON.parse(getToken);
      }
      const response = await fetch(`${api_url}/tasks/status/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${results}`
        },
        body: JSON.stringify({
          status: data
        })
      });
      await response.json();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  function handleCheckbox(taskId: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [taskId]: !prevCheckedItems[taskId],
    }));
    ChangeInProgress(taskId, "completed");
    setDone(true);
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`${theme ? 'bg-[#1e1e1e] w-full  min-h-screen text-white' : ''} md:pt-4 pt-4`}>
      {loading && (
        <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line">
        </div>
      )}
      <div className="flex justify-between items-center px-6">
        <div>
          <h2 className={`text-2xl font-semibold ${theme ? 'text-white' : 'text-gray-800'}`}>Task List</h2>
          <h3 className="text-sm text-gray-500">Add and manage your tasks effortlessly</h3>
        </div>
        <button onClick={()=>setShow(true)} className="bg-black text-white py-2 px-4 rounded-md  transition">+ Add Task</button>
      </div>
      <div className="mt-6 px-6">
        <ul className="space-y-4">
          {data.length>0 && data.map((task, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow flex items-start justify-between">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={checkedItems[task._id] || false}
                  onChange={() => handleCheckbox(task._id)}
                  className="mr-4"
                />
                <div>
                  <h3 className={`text-lg font-medium ${task.Status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.Title}</h3>
                  <p className="text-sm text-gray-600">{task.Description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(task._id, index)}
                  className="text-black"
                >
                  <EditOutlinedIcon />
                </button>
                <button onClick={(e) => handleMenuClick(e, task._id)}>
                  <MoreVertOutlinedIcon />
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && currentTaskId === task._id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleDialogOpen('delete', task._id)}>Delete</MenuItem>
                  <MenuItem onClick={() => handleDialogOpen('in-progress', task._id)}>Mark as In Progress</MenuItem>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AddProjectTasks
        show={show}
        handleShow={handleShow}
        taskId={taskId}
        onTaskUpdate={fetchData}
        inputContent={inputContent}
        display={display}
      />

      {done && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2">
          <span>You have completed the task</span>
          <CloseOutlinedIcon className="cursor-pointer" onClick={() => setDone(false)} />
        </div>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {actionType === 'delete' ? 'Confirm Deletion' : 'Change Status'}
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to {actionType === 'delete' ? 'delete' : 'mark as in progress'} this task?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>

          <Button onClick={handleConfirmAction} color="primary">
            {actionType === 'delete' ? 'Delete' : 'Mark as In Progress'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;
