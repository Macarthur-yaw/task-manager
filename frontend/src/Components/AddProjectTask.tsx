import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

interface projectId {
  id: string | undefined;
}

const AddProjectTask = ({ id }: projectId) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
const[loading,setLoading]=useState<boolean>(false)
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme ? JSON.parse(theme) : false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
setLoading(true)
    setTitleError(null);
    setDescriptionError(null);

    if (!title) {
      setTitleError("Title is required");
      return;
    }

    if (!description) {
      setDescriptionError("Description is required");
      return;
    }

    const projectTask = {
      title: title,
      date: date,
      description: description,
    };
const userId=localStorage.getItem('accessToken')
    try {
      await axios.post(
        `http://localhost:5000/api/projectTask/${userId}/${id}`,
        projectTask
      );
    } catch (error) {
      console.log(error);
    }
    finally
    {
      setLoading(false)
    }
  };

  return (
    <div className="mt-4 p-2">
      {loading && <div className="animate-progress-line absolute top-0 " />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-2 border-[1px] rounded-md p-1"
      >
        <span className="flex flex-col border-b-[1px] ">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className={`p-2 text-md outline-none ${
              theme ? "bg-transparent" : ""
            }`}
          />
          {titleError && <p className="text-red-500">{titleError}</p>}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`p-1 text-sm outline-none mb-2 ${
              theme ? "bg-transparent" : ""
            }`}
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}

          <span className="mb-2">
            <span
              onClick={() => setShow(!show)}
              className="md:w-[14%] justify-center items-center gap-4 border-[1px] inline-flex rounded-md text-[15px]"
            >
              <CalendarTodayOutlinedIcon style={{ fontSize: "14px" }} />
              Due Date
              <div className="relative">
                {show && (
                  <div className="absolute top-0 md:left-0 left-0 ">
                    <Calendar
                      value={date}
                      onChange={(date) => setDate(date as Date)}
                      className=""
                    />
                  </div>
                )}
              </div>
            </span>
          </span>
        </span>

        <span className={` flex flex-row gap-2 ml-auto p-1 bg-[#282828] text-white rounded-md`}>
          <button type="submit" className={` rounded p-1 `}>
            Add Task
          </button>
        </span>
      </form>
    </div>
  );
};

export default AddProjectTask;
