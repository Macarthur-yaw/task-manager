import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import api_url from '../BaseUrl';
import { useSubmitTask } from '../hooks/useSubmit';
type propTypes={
  display:boolean,
  handleDisplay:()=>void
}
const AddTasks = ({ display, handleDisplay }:propTypes) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const { submitTask } = useSubmitTask();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    submitTask({
      apiUrl: `${api_url}/projects`,
      formData: data,
      selectedDate: selectedDate?.toISOString(),
    });
    reset();
    setSelectedDate(null);
    handleDisplay();
  };

  return (
    <Dialog open={display} onClose={handleDisplay} fullWidth maxWidth="sm">
      <DialogTitle>Add Project</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <div className="flex flex-col gap-2">
            <span className="flex flex-col border-b-[1px] ">
              <input
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                  maxLength: { value: 20, message: "Title should be less than 20 characters" },
                })}
                placeholder="Project title"
                className={`p-2 text-xl outline-none`}
              />
              <p className='text-red-500'>
                {errors.title && String(errors.title.message)}
              </p>

              <input
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                  maxLength: { value: 50, message: "Description should be less than 50 characters" },
                })}
                placeholder="Description"
                className={`p-2 text-sm outline-none`}
              />
              <p className='text-red-500'>
                {errors.description && String(errors.description.message)}
              </p>

              <span className="mb-1 px-1">
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      label="Choose deadline of projects"
                    />
                  </LocalizationProvider>
                </div>
              </span>
            </span>
          </div>
        </DialogContent>
        <DialogActions>
        <Button type="submit" color='primary' variant='contained'>
            Add Project
          </Button>
          <Button onClick={handleDisplay} color="warning">
            Cancel
          </Button>
          
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTasks;
