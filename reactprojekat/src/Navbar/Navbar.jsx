import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      sessionStorage.removeItem('token');
      setToken(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar">
      {token === null ? (
        <div className="auth-links">
          <button onClick={() => navigate('/')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      ) : (
        <div className="auth-links">
        <button onClick={() => navigate('/ponuda')}>Ponuda</button>
        <button onClick={handleLogout}>Logout</button></div>
      )}
    </div>
  );
};

export default Navbar;
