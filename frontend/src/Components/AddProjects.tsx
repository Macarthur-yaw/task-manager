import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import 'react-calendar/dist/Calendar.css';

interface InitialState {
  title?: string;
  description?: string;
}

interface PropTypes {
  display?: boolean;
  addProjects?:boolean
}

const AddProjects = ({ display,addProjects }: PropTypes) => {
  const [formData, setFormData] = useState<InitialState>({
    title: "",
  });
  const [date, setDate] = useState<Date>(new Date());
  const [theme, setTheme] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [calendar, setCalendar] = useState<boolean>(false);
const[loading,setLoading]=useState<boolean>(false)

useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
setLoading(true)
    // Clear previous errors
    setTitleError(null);

    // Check for empty fields
    if (!formData.title) {
      setTitleError("Title is required");
      return;
    }

    const formdata = {
      title: formData.title,
      dueDate: date.toString(),
    };
const id=localStorage.getItem('accessToken')
    try {
      await axios.post(
        `https://web-api-db7z.onrender.com/api/projects/${id}`,
        formdata
      );
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div 
    className={`${
      addProjects
        ? "top-0 left-0 z-50 bg-black bg-opacity-40  fixed w-full h-screen"
        : ""}`}>
{loading && <div className="animate-progress-line absolute top-0 " />}

      <div onClick={handleClick} className={`${display && 'flex flex-col gap-6'}
      ${addProjects  ? 'block':"hidden"}
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} md:w-[400px]  w-[80%] absolute z-40 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-md `}>
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
              placeholder="Project title"
              className={`p-2  text-xl outline-none ${theme === 'dark' ? 'text-white ' : 'text-black'}`}
            />
            {titleError && <p className="text-red-500">{titleError}</p>}

            <span className={`${display ? 'hidden' : 'block'} flex flex-row-reverse justify-between gap-2 ml-auto p-2`}>
              <button
                type="submit"
                className={`${theme === 'dark' ? ' text-black bg-black' : ' '} rounded p-2`}
              >
                Add
              </button>

              <span onClick={() => setCalendar(!calendar)} className="p-1 cursor-pointer  flex flex-col">
                <ScheduleIcon />
                {calendar && (
                  <div className="absolute left-6 top-[100%]">
                    <Calendar value={date} onChange={(date) => setDate(date as Date)}
                      className='mycalendar'
                    />
                  </div>)}
              </span>
            </span>

          </span>

        </form>

      </div>
    </div>
  );
};

export default AddProjects;
