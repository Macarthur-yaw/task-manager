import axios from "axios";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddTasks from "../Components/AddTasks";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface Task {
  _id: string;
  Title: string;
  Description: string;
}

interface inputContent {
  title?: string;
  description?: string;
}

const TaskList: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [inputContent, setInputContent] = useState<inputContent>({
    title: "",
    description: "",
  });
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
const[done,setDone]=useState<boolean>(false)
  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://web-api-db7z.onrender.com/api/tasks");
      setData(response.data.data);
    } catch (error) {
    //   setError("Error fetching data");
    } finally {
    //   setLoading(false);
    }
  };

  function handleDelete(id: string) {
    axios
      .delete(`https://web-api-db7z.onrender.com/api/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdate(id: string, index: number) {
    setDisplay(true);
    setTaskId(id);
    setInputContent({
      title: data[index].Title,
      description: data[index].Description,
    });
    handleCallback();
  }

  function handleCallback(dataForms?: inputContent) {
    console.log(dataForms);
  }

  function handleCheckbox(taskId: string) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [taskId]: !prevCheckedItems[taskId],
    }));
    // console.log(checkedItems);
    handleDelete(taskId);
setDone(true)
    

  }

  return (
    <div className="container mx-auto w-[80%] mt-8 p-8 ">
      <span className="">
        <h2 className="text-xl px-6 font-semibold text-gray-800">Task List</h2>
        <h3 className="px-6 text-sm">Add tasks to your project</h3>
      </span>
      <span className="">
        <h1></h1>
        <ul className="pt-10 pl-6 ">
          {data.map((task, index) => (
            <div
              key={index}
              className="flex group cursor-pointer flex-row items-start mt-2 border-b-[1px] border-b-gray-100 "
            >
              <span>
                <input
                  type="checkbox"
                  checked={checkedItems[task._id] || false}
                  onChange={() => handleCheckbox(task._id)}
                  className="mr-2 text-gray-100 focus:ring-gray-100 "
                />
              </span>
              <li className="mb-2   flex flex-col w-full  ">
                <strong className="text-[14px] leading-[21px] text-[#202020]">
                  {task.Title}
                </strong>
                <h3 className="text-[12px] leading-[18px] text-[#666] mb-2">
                  {" "}
                  {task.Description}
                </h3>
              </li>
              <span className="hidden group-hover:flex-row group-hover:gap-2   group-hover:flex">
                <button
                  onClick={() => handleUpdate(task._id, index)}
                  className="text-[10px]  text-[#666]"
                >
                  <EditOutlinedIcon className="w-2" />{" "}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-[12px] text-[#666]"
                >
                  <DeleteOutlineOutlinedIcon />
                </button>
              </span>
            </div>
          ))}
        </ul>
      </span>
      {display && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <AddTasks
              taskId={taskId}
              handleCallback={handleCallback}
              inputContent={inputContent}
              display={display}
            />
          </div>
        </div>
      )}

      {
        done &&(
            <div className="">
   <div className="absolute left-4   bottom-2">
                    <span className="absolute flex flex-row items-center gap-6 left-0 w-72 rounded bottom-0 bg-[#202020] text-gray-200 p-4">
                        You have completed the task
<span onClick={()=>setDone(false)} className="cursor-pointer">
<CloseOutlinedIcon/>
</span>              </span>
                </div>

                </div>
        )
      }
    </div>
  );
};

export default TaskList;
