import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  CheckCircleOutline as CompletedIcon,
  HourglassEmpty as InProgressIcon,
  RadioButtonUnchecked as UncompletedIcon,
} from "@mui/icons-material";
import api_url from "../BaseUrl";

interface Task {
  id: string;
  Status: string;
}

const DashboardTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tokens = localStorage.getItem("accessToken");
      const results = tokens ? JSON.parse(tokens) : "";

      const response = await fetch(`${api_url}/tasks/count`, {
        headers: {
          "Authorization": `Bearer ${results}`,
        },
      });

      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskCountByStatus = (status: string) => {
    return tasks.filter(task => task.Status === status).length;
  };

  return (
    <div className="p-4 bg-gray-50 h-screen">
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Box textAlign="center">
              <CompletedIcon style={{ color: "green", fontSize: 40 }} />
              <Typography variant="h6">
                Completed
              </Typography>
              <Typography variant="h5">
                {getTaskCountByStatus("completed")}
              </Typography>
            </Box>

            <Box textAlign="center">
              <InProgressIcon style={{ color: "orange", fontSize: 40 }} />
              <Typography variant="h6">
                In Progress
              </Typography>
              <Typography variant="h5">
                {getTaskCountByStatus("in_progress")}
              </Typography>
            </Box>

            <Box textAlign="center">
              <UncompletedIcon style={{ color: "red", fontSize: 40 }} />
              <Typography variant="h6">
                Uncompleted
              </Typography>
              <Typography variant="h5">
                {getTaskCountByStatus("uncompleted")}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default DashboardTasks;
