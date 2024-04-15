 
import './App.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { useState } from 'react';
import AutoList from './Auto/AutoList';
import Footer from './Navbar/Footer';
function App() {
  const [token,setToken] = useState(null);
  return (
    <Router>
       <Navbar token={token} setToken={setToken}></Navbar>
      <div>
       
        <Routes>
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />

          <Route path="/ponuda" element={<AutoList />} />

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
