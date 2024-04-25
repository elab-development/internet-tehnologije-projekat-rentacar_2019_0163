import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';  
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';  

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'vlatkovicsebastijan@gmail.com',
    password: 'password'
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      console.log(response.data.token);  
      sessionStorage.setItem("token", response.data.token)
      sessionStorage.setItem("uloga", response.data.user.uloga)

      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token)
      if(response.data.user.uloga==="admin"){
        navigate("/automobili")
      }else{
        navigate('/ponuda')

      }
    } catch (error) {
      console.error('Login failed:', error);  
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      console.log(response.data.status);  
      alert("PROVERITE SVOJ MAIL")
    } catch (error) {
      alert("GRESKA")
      console.error('Forgot password failed:', error);  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="screen-1"> 
    
      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Username@gmail.com"
      />
      
      <InputField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="············"
      />
      <button type="submit" className="login">
        Login
      </button>
      <div className="footer-login">
     
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
    </form>
  );
};

export default LoginForm;
