import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {  useForm } from 'react-hook-form';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import api_url from '../BaseUrl';
import { useSubmitTask } from '../hooks/useSubmit';

const AddTasks = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
const {submitTask}=useSubmitTask()
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  console.log(api_url)

  const onSubmit = async(data: any) => {
    submitTask({apiUrl: `${api_url}/projects`, formData: data, selectedDate: selectedDate?.toISOString()});
    reset();
    setSelectedDate(null);
   
  }

  return (
    <div className="">
      <div className='lg:w-[40%] border-2 absolute rounded-md  z-50 bg-white shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-sm gap-2 "
        >
          <span className="flex flex-col border-b-[1px] ">
            <input
              {...register("title", {
                required: { value: true, message: "Title is required" },
                maxLength: { value: 20, message: "Title should be less than 20 characters" }
              })}
              placeholder="Task title"
              className={`p-2 text-xl outline-none `}
            />
            <p className='text-red-500'>
              {errors.title && String(errors.title.message)}
            </p>

            <input
              {...register("description", {
                required: { value: true, message: "Description is required" },
                maxLength: { value: 50, message: "Description should be less than 50 characters" }
              })}
              placeholder="Description"
              className={`p-2 text-sm outline-none `}
            />
            <p className='text-red-500'>
              {errors.description && String(errors.description.message)}
            </p>

            <span className="mb-1 px-1">
              <div className="">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      label="Choose deadline of tasks"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </span>
          </span>

          <span className={` flex flex-row gap-2 ml-auto p-2`}>
            <button
              type="submit"
              className={` rounded p-2 bg-black text-white`}
            >
              Add Project
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
