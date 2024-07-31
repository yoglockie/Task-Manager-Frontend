import React, { useState } from 'react';
import axios from 'axios';
import './AssignTaskForm.css';

function AssignTaskForm() {
    const [employeeSearch, setEmployeeSearch] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    
    const manager_details = {
        user_id : localStorage.getItem('user_id'),
        full_name : localStorage.getItem('full_name'),
        email : localStorage.getItem('email'),
        department : localStorage.getItem('department'),
        role : localStorage.getItem('role')
    }

    const handleEmployeeSearch = async (e) => {
        setEmployeeSearch(e.target.value);
        const payload = {
            user_id : localStorage.getItem('user_id'),
            role : localStorage.getItem('role'),
            department : localStorage.getItem('department'),
            search_term : e.target.value
        }
        if (e.target.value.length > 0) {
            try {
                const response = await axios.post("http://localhost:4000/backend/task/search/employee",payload);
                setEmployeeList(response.data.result);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        } else {
            setEmployeeList([]);
        }
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setEmployeeSearch(employee.full_name);
        setEmployeeList([]);
    };

    const handleSubmit = async() => {
       
        if(selectedEmployee.full_name != employeeSearch){
            alert("Select Employee Name from Suggestions Only")
            return
        }
        else if(taskName == "" || taskName == null || taskName == undefined){
            alert("Task Name Could Not Be Empty");
            return      
        }
        const payload = {
            full_name : selectedEmployee.full_name,
            task_title : taskName,
            task_description : taskDescription,
            assigned_to : selectedEmployee,
            assigned_by :  manager_details
        }
        try {
            const response = await await axios.post("http://localhost:4000/backend/task/assign",payload);
            if(response.status === 200){
                alert("Assigned the Task Successfully")
                return
            }
            else{
                alert("Something went wrong while assigning task");
                return
            }
        } catch (error) {
            alert(error.message)
            return
        }
    };

    return (
        <div className="assign-task-form">
            <div className="form-group">
                    <label htmlFor="employeeSearch">Search Employee:</label>
                    <input
                        type="text"
                        id="employeeSearch"
                        value={employeeSearch}
                        onChange={handleEmployeeSearch}
                        autoComplete="off"
                    />
                    {employeeList.length > 0 && (
                        <ul className="suggestions">
                            {employeeList.map((employee) => (
                                <li style={{color:"black"}} key={employee._id} onClick={() => handleEmployeeSelect(employee)}>
                                    {employee.full_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="taskDescription">Task Description:</label>
                    <textarea
                        id="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" onClick={handleSubmit}>Assign Task</button>
        </div>
    );
}

export default AssignTaskForm;
