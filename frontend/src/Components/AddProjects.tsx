import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar'
import ScheduleIcon from '@mui/icons-material/Schedule';
import 'react-calendar/dist/Calendar.css';
interface InitialState {
  title?: string;
  description?: string;
}

interface PropTypes {
  display?: boolean;
}

const AddProjects = ({  display }: PropTypes) => {
  const [formData, setFormData] = useState<InitialState>({
    title: "",
  });
const[date,setDate]=useState<Date>(new Date())
  const [theme, setTheme] = useState<string | null>(null);
 const[calendar,setCalendar]=useState<boolean>(false)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme);
  }, []);

 

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(date);

const formdata={
    title:formData.title,
    dueDate:date.toString()



}
console.log(formdata)
    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        formdata
      );
    } catch (error) {
      console.log(error);
    }
  };


  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div className="">
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
              placeholder="Project title"
              className={`p-2 text-xl outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />


          <span className={`${display ? 'hidden' : 'block'} flex flex-row-reverse justify-between gap-2 ml-auto p-2`}>
            <button
              type="submit"
              className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded p-2`}
            >
      Add    
            </button>


            <span onClick={()=>setCalendar(!calendar)} className="p-1 cursor-pointer  flex flex-col">
<ScheduleIcon/>
{calendar && (
<div className="absolute left-6 top-[100%]">
<Calendar value={date} onChange={()=>setDate(date)}
className='mycalendar'
/> </div>)}
</span>
          </span>

          </span>

        </form>
     
      </div>
    </div>
  );
};

export default AddProjects;
