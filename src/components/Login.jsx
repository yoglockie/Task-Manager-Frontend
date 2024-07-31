import React, { useState } from "react";
import './style.css'
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()
  const { login } = useAuth()

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();

    if(!email || !password ){
      alert("Fill All Values")
      return
   }
   const payload = {
     email,
     password
   }
   try {
     const response = await axios.post("http://localhost:4000/backend/auth/login",payload);
     console.log(response);
     if(response.data){
       const data = response.data.user
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
      <form id="login-form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
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
        <button className="login-button" type="submit">Log In</button>
        {/* <div className="social">
          <div className="go"><FaGoogle /> Google</div>
          <div className="fb"><FaFacebook /> Facebook</div>
        </div> */}
      </form>
    </div>
  );
}

export default Login;

