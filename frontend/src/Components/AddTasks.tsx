import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {Dayjs} from "dayjs";

import { useSubmitTask } from "../hooks/useSubmit";
import api_url from "../BaseUrl";
interface InitialState {
  title?: string;
  description?: string;
  date?: string;
}

interface PropTypes {
  taskId?: string;
  display?: boolean;
  inputContent?: InitialState;
  handleCallback?: (forminfo?: InitialState) => void;
}

const AddTasks = ({ taskId, display, handleCallback, inputContent }: PropTypes) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit,reset, setValue, formState: { errors } } = useForm<InitialState>();
const[selectedDate,setSelectedDate]=useState<Dayjs | null>(null)
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  }
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (inputContent) {
      setValue("title", inputContent.title || "");
      setValue("description", inputContent.description || "");
    }
  }, [inputContent, setValue]);

  const userId = localStorage.getItem('accessToken');
const {submitTask}=useSubmitTask()
  const onSubmit = async (data: InitialState) => {
    const formData = {
      date: selectedDate?.toISOString(),
      ...data,
    };
    setLoading(true);
    try {
      const FormData = { ...data };

      if (taskId) {
        await axios.put(`https://web-api-db7z.onrender.com/api/update/${userId}/${taskId}`, FormData);
      } else {
       
        submitTask({apiUrl: `${api_url}/tasks`, formData: formData, selectedDate: selectedDate?.toISOString()});
        reset();
        setSelectedDate(null);

      }

      if (handleCallback) {
        handleCallback(FormData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div>
      {loading && (
        <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line" ></div>
      )}

      <div
        onClick={handleClick}
        className={`${display ? 'flex flex-col gap-6' : ''} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} md:w-[400px] w-[80%] absolute z-20 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-md`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-sm gap-2 ">
          <div className="flex flex-col border-b-[1px]">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Task title"
              className={`p-2 text-xl outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            <input
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              className={`p-2 text-sm outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            <div className="mb-1 px-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="Choose deadline of tasks"
                value={selectedDate}
                onChange={handleDateChange} 
                 />
                </DemoContainer>
              </LocalizationProvider>
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>
          </div>

          <div className={`${display ? 'hidden' : 'block'} flex flex-row gap-2 ml-auto p-2`}>
            <button
              type="submit"
              className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded p-2`}
            >
              {loading ? "Submitting..." : "Add Task"}
            </button>
          </div>
        </form>

        {display && (
          <div className="p-2 w-fit ml-auto">
            <button
              onClick={handleSubmit(onSubmit)}
              className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded p-2`}
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTasks;
