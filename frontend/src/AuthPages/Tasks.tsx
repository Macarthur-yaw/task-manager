import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import api_url from "../BaseUrl";

interface Task {
  id: number;
  Title: string;
  Date: string; 
  completed: boolean;
}

const TaskDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);




  const fetchTasksWithDate = async () => {
    try {
      const tokens = localStorage.getItem("accessToken");
      let results: string = "";
      if (tokens) {
        results = JSON.parse(tokens);
      }

    
   console.log(selectedDate?.toISOString())   

      
      const response = await fetch(`${api_url}/projects/date?date=${selectedDate?.toISOString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${results}`,
        },
      });

      const data = await response.json();

   
      setFilteredTasks(data.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTasksWithDate(); 
    }
  }, [selectedDate]); 

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date); 
    }
  };

 

  return (
    <div className="p-4 bg-gray-50 h-screen">
      <div className="flex flex-col sm:flex-row gap-6">
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>

    
        <div className="flex-1 bg-white rounded-lg shadow-md p-4">
          <Box>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">
                Tasks on {selectedDate?.format("YYYY-MM-DD")} ({filteredTasks.length})
              </Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>


            <div className="space-y-4">
              {filteredTasks?.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={task.completed} />
                    <Typography className={task.completed ? "line-through" : ""}>
                      {task.Title}
                    </Typography>
                  </div>
                  <Typography color="textSecondary">
                    {dayjs(task.Date).format("MMM DD")}
                  </Typography>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
