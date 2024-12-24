import { useState, useEffect } from "react";
import axios from "axios";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface InitialState {
  title?: string;
  description?: string;
}

interface PropTypes {
  taskId?: string;
  display?: boolean;
  inputContent?: InitialState;
  handleCallback?: (forminfo?: InitialState) => void;
}

const AddTasks = ({ taskId, display, handleCallback, inputContent }: PropTypes) => {
  const [formData, setFormData] = useState<InitialState>({
    title: "",
    description: "",
  });
 
  const [theme, setTheme] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
const[loading,setLoading]=useState<boolean>(false)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, []);

  
  useEffect(() => {
   

    const handleCall = () => {
      setFormData((prevData) => ({
        ...prevData,
        title: inputContent?.title,
        description: inputContent?.description,
      }));
      if (handleCallback) {
        handleCallback(formData);
      }
    };

    if (taskId) {
      handleCall();
    }
  
  }, []);
  const userId=localStorage.getItem('accessToken');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
setLoading(true)
    setTitleError(null);

    if (!formData.title) {
      setTitleError("Title is required");
      return;
    }

    const FormData = {
      title: formData.title,
      description: formData.description,
    };
    // const getItem=localStorage.getItem('accesstoken')
    

    try {
      await axios.post(`https://web-api-db7z.onrender.com/api/tasks/${userId}`, FormData);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
    
  };

  const handleChanges = async () => {
    setLoading(true)
    const id=taskId;
    try {
      await axios.put(`https://web-api-db7z.onrender.com/api/update/${userId}/${id}`, formData);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div className="">
      {loading && (
      <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" >
      </div>
    )}
      <div onClick={handleClick} className={`${display && 'flex flex-col gap-6'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} md:w-[400px]  w-[80%] absolute z-20 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-md `}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-sm gap-2 "
        >
          <span className="flex flex-col border-b-[1px] ">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Task title"
              className={`p-2 text-xl outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            {titleError && <p className="text-red-500">{titleError}</p>}
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              className={`p-2 text-sm outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />

            <span className="mb-1 px-1">           
            
                <div className="">
                       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker label="Choose deadline of tasks" />
      </DemoContainer>
    </LocalizationProvider>
                      </div>
                
            </span>

          </span>

          <span className={`${display ? 'hidden' : 'block'} flex flex-row gap-2 ml-auto p-2`}>
            <button
              type="submit"
              className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded p-2`}
            >
              Add Task
            </button>
          </span>
        </form>
        {display && (
          <span className="p-2  w-fit ml-auto">
            <button
              onClick={handleChanges}
              className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded p-2`}
            >
              Update Task
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default AddTasks;
