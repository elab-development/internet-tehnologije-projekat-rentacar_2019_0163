import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const token = sessionStorage.getItem('token'); // Dohvatanje tokena iz session storage-a

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}` // Postavljanje tokena u Authorization zaglavlje
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rezervacije', {
          headers: {
            Authorization: `Bearer ${token}` // Postavljanje tokena u Authorization zaglavlje
          }
        });
        setReservations(response.data.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    if (token) { // Provera da li postoji token pre slanja zahteva
      fetchUser();
      fetchReservations();
    }
  }, [token]); // Dodavanje tokena kao zavisnosti, tako da će se useEffect ponovo pokrenuti ako se token promeni
  return (
    <div className="profile-container">
      <div className="profile-info">
        <h1>User Profile</h1>
        {user && (
          <div>
            <h2>User Info</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
  
      <div className="reservations-table">
        <h2>Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Automobile</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Insurance</th>
              <th>Price</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{reservation.auto.marka + ' ' + reservation.auto.model}</td>
                <td>{reservation.datum_od}</td>
                <td>{reservation.datum_do}</td>
                <td>{reservation.osiguranje ? 'Yes' : 'No'}</td>
                <td>{reservation.cena}</td>
                <td>{reservation.napomena}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Profile;
