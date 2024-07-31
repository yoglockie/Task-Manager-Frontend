import React, { useState } from 'react';
import CardContainer from './CardContainer';
import AssignTaskForm from './AssignTaskForm';
import TaskAssignedByYou from './TaskAssignedByYou';
import { useAuth } from "../AuthContext/AuthContext";

const Home = () => {
  const [activePage, setActivePage] = useState('tasksAssignedToYou'); // Initialize state with a default value
  const { logout } = useAuth();

  const role = localStorage.getItem('role');
  const full_name = localStorage.getItem('full_name').split(" ")[0];

  return (
    <div className='home'>
      <div className='header'>
        <p>Hello {full_name} <span style={{fontSize: "56px"}}>☺️</span></p>
        <div style={{display: "flex", flexDirection: "column"}}>
          <button
            className='logout-button'
            style={{backgroundColor: activePage === 'tasksAssignedToYou' ? "#d6b598" : "transparent", color: "white"}}
            onClick={() => setActivePage('tasksAssignedToYou')}
          >
            Task Assigned to you
          </button>
          { role === "Manager" ?
            <button
              className='logout-button'
              style={{backgroundColor: activePage === 'assignTaskToTeam' ? "#d6b598" : "transparent", color: "white"}}
              onClick={() => setActivePage('assignTaskToTeam')}
            >
              Assign Task to your Team
            </button>
            : null
          }
        </div>
        
        <div style={{display: "flex", flexDirection: "column"}}>
        { role === "Manager" ?
           <button
           className='logout-button'
           style={{backgroundColor: activePage === 'yourAssignedTasks' ? "#d6b598" : "transparent", color: "white"}}
           onClick={() => setActivePage('yourAssignedTasks')}
         >
           See Tasks Assigned By You
         </button>
            : null
          }
          
          <button className='logout-button' onClick={logout}>Logout</button>
        </div>
      </div>
      {
        activePage === 'tasksAssignedToYou' ? <CardContainer /> :
        activePage === 'assignTaskToTeam' ? <AssignTaskForm /> :
        <TaskAssignedByYou />
      }
    </div>
  )
}

export default Home;
