import React, { useEffect, useState } from 'react'
import Task from './Task'
import axios from 'axios';

const CardContainer = () => {
  const [taskList,setTaskList] = useState([]);
  const user_id = localStorage.getItem("user_id");
 
  useEffect(()=>{
     try {
      async function fetchTasks() {
           const response = await axios.post("http://localhost:4000/backend/task/fetch",{user_id});
           if(response.data){
              const task_list = response.data.tasks
              setTaskList(task_list);
           }else{
              alert("Something went Wrong")
              return
           }
      }
      fetchTasks();
     } catch (error) {
          alert(error.message)
          return
     }
  },[])
  return (
    <div class="card-container">
             {
              taskList.map(task =>{
                const date = new Date(task.created_at);
                const formattedDate = date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
            
                return (
                  <Task
                    key={task._id}
                    id={task._id}
                    title={task.task_title}
                    assignedBy={task.assigned_by.full_name}
                    assignedOn={formattedDate} 
                    status={task.status}
                    task_description={task.task_description}
                    isManager = "false"
                  />
                );
              })
            }
    </div>
  )
}

export default CardContainer
