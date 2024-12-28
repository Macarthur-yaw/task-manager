
import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {Dayjs} from "dayjs";
import api_url from "../BaseUrl";
interface ProjectTask {
  title: string;
  description: string;
  date: Date;
}

interface ProjectId {
  id: string | undefined;
}

const AddProjectTask = ({ id }: ProjectId) => {
  console.log(id)
  const[selectedDate,setSelectedDate]=useState<Dayjs | null>(null)
  const [theme, setTheme] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  }
  const {
    register,
    handleSubmit,
  
    formState: { errors }
  } = useForm<ProjectTask>({
    defaultValues: {
      date: new Date()
    }
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme ? JSON.parse(theme) : false);
  }, []);

  const onSubmit: SubmitHandler<ProjectTask> = async (data) => {
    setLoading(true);
    console.log(data)
    const userId = localStorage.getItem('accessToken');
    let results;
if(userId){
  results=JSON.parse(userId)
}
    try {
    const response=  await fetch(
        `${api_url}/projectTask`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
          
            date: selectedDate?.toISOString()}),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${results}`
          },}
      );
      const changeResponse=await response.json()
      console.log(changeResponse)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-2">
      {loading && <div className="animate-progress-line absolute top-0" />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border-[1px] rounded-md p-1"
      >
        <span className="flex flex-col border-b-[1px]">
          <input
            {...register("title", { 
              required: "Title is required" 
            })}
            type="text"
            placeholder="Task title"
            className={`p-2 text-md outline-none ${theme ? "bg-transparent" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <input
            {...register("description", { 
              required: "Description is required" 
            })}
            type="text"
            placeholder="Description"
            className={`p-1 text-sm outline-none mb-2 ${theme ? "bg-transparent" : ""}`}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <span className="mb-2">
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
          </span>
        </span>

        <span className="flex flex-row gap-2 ml-auto p-1  bg-[#282828] text-white rounded-md">
          <button type="submit" className="rounded p-1">
            Add Task
          </button>
        </span>
      </form>
    </div>
  );
};

export default AddProjectTask;
