import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';  

const Login = ({setToken}) => {
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
      console.log(response.data);  
      sessionStorage.setItem("token",response.data.token)
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token)
       
    } catch (error) {
      console.error('Login failed:', error);  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="screen-1"> 
      <div className="email">
        <label htmlFor="email">Email Address</label>
        <div className="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Username@gmail.com"
          />
        </div>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <div className="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="············"
          />
          <ion-icon className="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>
      <button type="submit" className="login">
        Login
      </button>
      <div className="footer">
        <span>Sign up</span>
        <span>Forgot Password?</span>
      </div>
    </form>
  );
};

export default Login;
