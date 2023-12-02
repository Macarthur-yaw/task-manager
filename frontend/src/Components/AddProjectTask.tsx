import axios from "axios"
import { useState } from "react"
import Calendar from "react-calendar"
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
interface projectId{
    projectId:string | undefined
}
const AddProjectTask = ({projectId}:projectId) => {
    const [title,setTitle]=useState<string>('')
    const[description,setDescription]=useState<string>('')
    const[date,setDate]=useState<Date>(new Date())
    const[show,setShow]=useState<boolean>(false)
    const handleSubmit= async (e:React.FormEvent) => {
        e.preventDefault()
const projectTask={
    title:title,
    date:date,
    description:description
}
        try {
           await axios.post(`http://localhost:5000/api/projectTask/${projectId}`,projectTask)
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <div className="mt-4">
                <form
          onSubmit={handleSubmit}
          className="flex flex-col  gap-2 border-[1px] rounded-md p-1"
        >
          <span className="flex flex-col border-b-[1px] ">
            <input
              type="text"
              name="title"
         value={title}
         onChange={(e)=>setTitle(e.target.value)}     
              placeholder="Task title"
              className={`p-2 text-md outline-none `}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className={`p-1 text-sm outline-none mb-2`}
            />
 
 <span className="mb-2">           <button onClick={()=>setShow(!show)} className="w-[14%] justify-center items-center gap-4 border-[1px] inline-flex rounded-md text-[15px]">
<CalendarTodayOutlinedIcon style={{fontSize:'14px'}}/>
Due Date 
<div className="relative">{
    show && (
        <div className="absolute top-0 left-0">
<Calendar
value={date}
onChange={()=>setDate(date)}
/></div>
    )
}</div>

            </button>
            </span>   </span>

          <span className={` flex flex-row gap-2 ml-auto p-1 bg-black text-white rounded-md`}>
            <button
              type="submit"
              className={` rounded p-1 `}
            >
              Add Task
            </button>
          </span>
        </form>
     
        </div>
     );
}
 
export default AddProjectTask;