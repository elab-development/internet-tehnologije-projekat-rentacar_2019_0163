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
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token)
      navigate('/ponuda')
    } catch (error) {
      console.error('Login failed:', error);  
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
        <span>Sign up</span>
        <span>Forgot Password?</span>
      </div>
    </form>
  );
};

export default LoginForm;
