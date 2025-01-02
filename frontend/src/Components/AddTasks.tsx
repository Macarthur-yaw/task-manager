import  { useState, useEffect } from 'react';
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
import axios from 'axios';
import api_url from '../BaseUrl';
import { useSubmitTask } from '../hooks/useSubmit';

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
  show: boolean;
  handleShow: () => void;
}

const AddTasks = ({ taskId,  handleCallback, inputContent, show, handleShow }: PropTypes) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InitialState>();

  const { submitTask } = useSubmitTask();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (inputContent) {
      setValue('title', inputContent.title || '');
      setValue('description', inputContent.description || '');
    }
  }, [inputContent, setValue]);

  const userId = localStorage.getItem('accessToken');

  const onSubmit = async (data: InitialState) => {
    const formData = {
      date: selectedDate?.toISOString(),
      ...data,
    };
    setLoading(true);
    try {
      const FormData = { ...data };

      if (taskId) {
        await axios.put(
          `https://web-api-db7z.onrender.com/api/update/${userId}/${taskId}`,
          FormData
        );
      } else {
        submitTask({
          apiUrl: `${api_url}/tasks`,
          formData: formData,
          selectedDate: selectedDate?.toISOString(),
        });
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

  return (
    <Dialog open={show} onClose={handleShow} fullWidth maxWidth="sm">
      {loading && (
        <div className="absolute animate-progress-line top-0 left-0 h-1 bg-blue-500 animate-progress-line"></div>
      )}

      <DialogTitle>{taskId ? 'Update Task' : 'Add Task'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col border-b-[1px]">
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="Task title"
                className={`p-2 text-xl outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}

              <input
                {...register('description', { required: 'Description is required' })}
                placeholder="Description"
                className={`p-2 text-sm outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}

              <div className="mb-1 px-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Choose deadline of tasks"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShow} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {loading ? 'Submitting...' : taskId ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTasks;
