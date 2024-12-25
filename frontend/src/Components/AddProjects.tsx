

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";





const AddTasks = () => {
  
 
 

  return (
    <div className="">
     
      <div className='lg:w-[40%] border-2 absolute rounded-md  z-50 bg-white shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' >
        <form
          className="flex flex-col rounded-sm gap-2 "
        >
          <span className="flex flex-col border-b-[1px] ">
            <input
              type="text"
              
              placeholder="Task title"
              className={`p-2 text-xl outline-none `}
            />
          
            <input
              type="text"
           
             
              placeholder="Description"
              className={`p-2 text-sm outline-none `}
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
