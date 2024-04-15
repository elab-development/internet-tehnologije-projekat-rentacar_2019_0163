import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';  
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';  

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'Pera',
    email: 'pera@gmail.com',
    password: 'password',
    jmbg: '15616456',
    br_lk: '156165',
    adresa: 'perina adresa',
    kontakt: '06555555'
  });

  const { name, email, password, jmbg, br_lk, adresa, kontakt } = formData;
  let navigate=useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data);  
      alert("USPESNO!")
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error);  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="screen-1"> 
 
      <InputField
        label="Name"
        name="name"
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Your Name"
      />
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
      <InputField
        label="JMBG"
        name="jmbg"
        type="text"
        value={jmbg}
        onChange={handleChange}
        placeholder="Your JMBG"
      />
      <InputField
        label="Broj LK"
        name="br_lk"
        type="text"
        value={br_lk}
        onChange={handleChange}
        placeholder="Your Broj LK"
      />
      <InputField
        label="Adresa"
        name="adresa"
        type="text"
        value={adresa}
        onChange={handleChange}
        placeholder="Your Adresa"
      />
      <InputField
        label="Kontakt"
        name="kontakt"
        type="text"
        value={kontakt}
        onChange={handleChange}
        placeholder="Your Kontakt"
      />
      <button type="submit" className="login">
        Register
      </button>
    </form>
  );
};

export default Register;
