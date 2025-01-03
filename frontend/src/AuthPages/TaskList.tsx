import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddTasks from "../Components/AddTasks";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Menu, MenuItem } from '@mui/material';
import api_url from "../BaseUrl";

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

const TaskList: React.FC = () => {
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
    setAnchorEl(null);
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
      const response = await fetch(`${api_url}/tasks`, {
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
      await fetch(`${api_url}/tasks/${id}`, {
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
      <span className="">
        <h2 className={`text-xl px-6 font-semibold  ${theme ? 'text-white' : 'text-gray-800'}`}>Task List</h2>
        <h3 className="px-6 text-sm">Add tasks to your project</h3>
      </span>
      <span className="">
        <h1></h1>
        <ul className="pt-10 pl-6 ">
          {data.map((task, index) => (
            <div
              key={index}
              className="flex group cursor-pointer flex-row items-start mt-2 border-b-[1px] border-b-gray-100 "
            >
              <span>
                <input
                  type="checkbox"
                  checked={checkedItems[task._id] || false}
                  onChange={() => handleCheckbox(task._id)}
                  className="mr-2 text-gray-100 focus:ring-gray-100 "
                />
              </span>
              <li className="mb-2   flex flex-col w-full  ">
                <strong className={`${theme ? 'text-white' : 'text-[#202020]'}
                ${task.Status === 'completed' ? 'line-through' : ''}
                text-[14px] leading-[21px] `}>
                  {task.Title}
                </strong>
                <h3 className="text-[12px] leading-[18px] text-[#666] mb-2">
                  {task.Description}
                </h3>
              </li>
              <span className="hidden group-hover:flex-row group-hover:gap-2   group-hover:flex">
                <button
                  onClick={() => handleUpdate(task._id, index)}
                  className="text-[10px]  text-[#666]"
                >
                  <EditOutlinedIcon className="w-2" />
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
              </span>
            </div>
          ))}
        </ul>
      </span>
      <AddTasks
        show={show}
        handleShow={handleShow}
        taskId={taskId}
        onTaskUpdate={fetchData}
        inputContent={inputContent}
        display={display}
      />

      {done && (
        <div className="">
          <div className="absolute left-4   bottom-2">
            <span className="absolute flex flex-row items-center gap-6 left-0 w-72 rounded bottom-0 bg-[#202020] text-gray-200 p-4">
              You have completed the task
              <span onClick={() => setDone(false)} className="cursor-pointer">
                <CloseOutlinedIcon />
              </span>
            </span>
          </div>
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

export default TaskList;
