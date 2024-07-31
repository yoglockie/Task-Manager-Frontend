import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';
// SimpleDialog component
function SimpleDialog({ open, onClose, task_description }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Task Description</DialogTitle>
      <div>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>{task_description}</Box>
      </div>
    </Dialog>
  );
}

const Task = ({ id, title, assignedBy, assignedOn, status, task_description,isManager }) => {
  const [isDescEnable, setIsDescEnable] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  let isManagerFlag = false
  if(isManager == "true"){
       isManagerFlag = true
  }
  const handleEyeClick = () => {
    setIsDescEnable(true);
  };

  const handleClose = () => {
    setIsDescEnable(false);
  };
  
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setCurrentStatus(newStatus);

    try {
      // Make an API call to update the task status
      const response = await axios.put(`https://task-manager-backend-alle.onrender.com/backend/task/change/status`, { task_id: id, status: newStatus });
      console.log('Status updated:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <>
      {isDescEnable && <SimpleDialog open={isDescEnable} onClose={handleClose} task_description={task_description}/>}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {
            isManagerFlag ?
            <div className="card-meta">Assigned to: <span>{assignedBy}</span></div>
            :
            <div className="card-meta">Assigned by: <span>{assignedBy}</span></div>
          }
          <div className="card-meta">Assigned on: <span>{assignedOn}</span></div>
        </div>
        <div className="card-body">
          <div className="card-status">
            <div className="status">{currentStatus}</div>
            <div className="status-label" title='Task Description' onClick={handleEyeClick}><FaEye /></div>
          </div>
          {/* <button className="button">Mark as Pending</button> */}
          <select name="" id="" className="button" value={currentStatus} onChange={handleStatusChange}>
            <option value="default" disabled>--Change Status--</option>
            <option value="Pending">Pending</option>
            <option value="Working">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Task;
