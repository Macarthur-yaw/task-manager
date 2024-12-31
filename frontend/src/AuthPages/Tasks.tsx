import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
 


  Checkbox,
} from '@mui/material';
import {

  MoreVert as MoreVertIcon,
  
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Task {
  id: number;
  title: string;
  due: string;
  completed: boolean;
}





const TaskDashboard: React.FC = () => {
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Finish monthly reporting', due: 'Today', completed: true },
    { id: 2, title: 'Contract signing', due: 'Today', completed: false },
    { id: 3, title: 'Market overview keyno...', due: 'Tomorrow', completed: false },
    { id: 4, title: 'Project research', due: 'Tomorrow', completed: false },
    { id: 5, title: 'Prepare invoices', due: 'This week', completed: false },
  ]);

 

 

  return (
    <div className="p-4 bg-gray-50 h-screen">
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Calendar Section */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </div>
  
      {/* Task Section */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <Box>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">My tasks (05)</Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={task.completed} />
                  <Typography
                    className={task.completed ? 'line-through' : ''}
                  >
                    {task.title}
                  </Typography>
                </div>
                <Typography color="textSecondary">{task.due}</Typography>
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