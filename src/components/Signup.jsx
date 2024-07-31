import React, { useState } from "react";
import './style.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function Signup() {
  const [email, setEmail] = useState('');
  const [full_name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth()
  const navigate = useNavigate()

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!email || !full_name || !password || !role || !department){
       alert("Fill All Values")
       return
    }
    const payload = {
      email,
      full_name,
      password,
      role,
      department
    }
    try {
      const response = await axios.post("https://task-manager-backend-alle.onrender.com/backend/auth/signup",payload);
      console.log(response);
      if(response.ok){
        const data = response.data.token
        localStorage.setItem('authToken', data);
        login(data)
        navigate('/')
      }
    } catch (error) {
       console.error(error);
       alert(error.message)
       return
    }
    
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleSubmit}>
        <h3>Signup Here</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          id="name"
          value={full_name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div style={{position:"relative"}}>
        <input
           type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="password-toggle-icon" style={{position:"absolute",top:"17px",right:"20px"}} onClick={handlePasswordToggle}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
        </div>
        <label htmlFor="role">Role</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select a role</option>
          <option value="Manager">Manager</option>
          <option value="Team Member">Team Member</option>
        </select>
        <label htmlFor="department">Department</label>
        <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select a department</option>
          <option value="Software Development">Software Development</option>
          <option value="Data Engineer">Data Engineer</option>
          <option value="PowerBi">PowerBi</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button className="login-button" type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
