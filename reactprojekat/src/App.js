 
import './App.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { useEffect, useState } from 'react';
import AutoList from './Auto/AutoList';
import Footer from './Navbar/Footer';
import Automobili from './Admin/Automobili';
import Profile from './Profile/Profile';
import Admin from './Admin/Admin';
function App() {
  const [token,setToken] = useState(null);
  const [uloga,setUloga] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');  
    const storedUloga = sessionStorage.getItem('uloga');  
    if (storedToken) {
      setToken(storedToken);  
    }
    if (storedUloga) {
      setUloga(storedUloga);  
    }
  }, []);
  return (
    <Router>
       <Navbar token={token} setToken={setToken} uloga={uloga} setUloga={setUloga}></Navbar>
      <div>
       
        <Routes>
          <Route path="/" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/automobili" element={<Automobili />} />
          <Route path="/ponuda" element={<AutoList />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/admin" element={<Admin />} />{/*dodato */}

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
