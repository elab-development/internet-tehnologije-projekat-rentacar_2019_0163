import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';  

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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data);  
   
       
    } catch (error) {
      console.error('Registration failed:', error);  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="screen-1"> 
      <div className="name">
        <label htmlFor="name">Name</label>
        <div className="sec-2">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
             style={{width:"100%"}}
          />
        </div>
      </div>
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
            style={{width:"100%"}}
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
            style={{width:"100%"}}
          />
          <ion-icon className="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>
      <div className="jmbg">
        <label htmlFor="jmbg">JMBG</label>
        <div className="sec-2">
          <input
            type="text"
            name="jmbg"
            value={jmbg}
            onChange={handleChange}
            placeholder="Your JMBG"
            style={{width:"100%"}}
          />
        </div>
      </div>
      <div className="br_lk">
        <label htmlFor="br_lk">Broj LK</label>
        <div className="sec-2">
          <input
            type="text"
            name="br_lk"
            value={br_lk}
            onChange={handleChange}
            placeholder="Your Broj LK"
            style={{width:"100%"}}
          />
        </div>
      </div>
      <div className="adresa">
        <label htmlFor="adresa">Adresa</label>
        <div className="sec-2">
          <input
            type="text"
            name="adresa"
            value={adresa}
            onChange={handleChange}
            placeholder="Your Adresa"
            style={{width:"100%"}}
          />
        </div>
      </div>
      <div className="kontakt">
        <label htmlFor="kontakt">Kontakt</label>
        <div className="sec-2">
          <input
            type="text"
            name="kontakt"
            value={kontakt}
            onChange={handleChange}
            placeholder="Your Kontakt"
            style={{width:"100%"}}
          />
        </div>
      </div>
      <button type="submit" className="login">
        Register
      </button>
    </form>
  );
};

export default Register;
