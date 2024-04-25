import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ token, setToken, uloga, setUloga }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('uloga');

      setToken(null);
      setUloga(null);

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar">
      {token !== null && uloga === 'admin' ? ( // Proveravamo da li je uloga admin
        <div className="auth-links">
          <button onClick={() => navigate('/ponuda')}>Automobili</button> {/* Prikazujemo opciju 'Automobili' za admina */}
          <button onClick={handleLogout}>Logout</button> {/* Adminu se prikazuje opcija 'Logout' */}
        </div>
      ) : token !== null ? ( // Ako uloga nije admin, ali postoji token
        <div className="auth-links">
          <button onClick={() => navigate('/profile')}>Moj profil</button> 
          <button onClick={() => navigate('/ponuda')}>Ponuda</button> {/* Prikazujemo opciju 'Ponuda' za korisnike koji nisu admini */}
          <button onClick={handleLogout}>Logout</button> {/* Prikazujemo opciju 'Logout' za korisnike koji nisu admini */}
        </div>
      ) : ( // Ako ne postoji token
        <div className="auth-links">
          <button onClick={() => navigate('/')}>Login</button> {/* Prikazujemo opciju 'Login' */}
          <button onClick={() => navigate('/register')}>Register</button> {/* Prikazujemo opciju 'Register' */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
