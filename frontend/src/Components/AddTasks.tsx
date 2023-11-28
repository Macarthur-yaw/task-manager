import { useState,useEffect } from "react";
import axios from "axios";
interface InitialState {
  title?: string;
  description?: string;
}

interface PropTypes {
  taskId?: string;
  display?:boolean
 inputContent?:InitialState
  handleCallback?:(forminfo?:InitialState
  )=>void;
  
}

const AddTasks = ({ taskId,display,handleCallback,inputContent }: PropTypes) => {
  const [formData, setFormData] = useState<InitialState>({
    title: "",
    description: "",
  });
  const handleCall = () => {
    setFormData((prevData) => ({
      ...prevData,
      title: inputContent?.title,
      description: inputContent?.description,
    }));
  if(handleCallback){
    handleCallback(formData);
  
  }
  };
  
  // ...
  
  useEffect(() => {

    if(taskId){
        handleCall();
 
    }
  }, []); 
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await axios.post(
        "https://web-api-db7z.onrender.com/api/tasks",
        formData
      );
    //   console.group(result.data);

 
} catch (error) {
      console.log(error);
    }
  };

  const handleChanges = async () => {
    try {
       
      await axios.put(`https://web-api-db7z.onrender.com/api/update/${taskId}`, formData);
    } catch (error) {
      console.log(error);
    }
  };
function handleClick(e:React.MouseEvent<HTMLDivElement>){
e.stopPropagation()
}
  return (
    <div  className="">
      <div onClick={handleClick} className={`${display && 'flex flex-col gap-6'} bg-white md:w-[400px]  w-[80%] absolute z-20 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-md `}>
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
              className="p-2 text-xl outline-none"
            />
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              className="p-2 text-sm outline-none"
            />
          </span>

          <span className={`${display ? 'hidden':'block'} flex flex-row gap-2 ml-auto p-2`}>
            <button
              type="submit"
              className="bg-black rounded text-white p-2"
            >
              Add Task
            </button>
          </span>
        </form>
       { display &&(
        <span className="p-2  w-fit ml-auto">
        <button
              onClick={handleChanges}
              className="bg-black rounded   text-white p-2"
            >
              Update Task
            </button>
            </span>)}
      </div>
    </div>
  );
};

export default AddTasks;
