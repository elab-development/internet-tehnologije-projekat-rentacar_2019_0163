import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuto = () => {
  const [autos, setAutos] = useState([]);
  
  useEffect(() => {
    // Funkcija za dobijanje tokena iz session storage-a
    const getTokenFromStorage = () => {
      const token = sessionStorage.getItem('token');
      return token;
    };
    
    // Axios GET zahtev ka serveru
    const fetchAutos = async () => {
      try {
        const token = getTokenFromStorage();
        const response = await axios.get('http://127.0.0.1:8000/api/auto', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Postavljanje dobijenih podataka u state
        setAutos(response.data.data);
      } catch (error) {
        console.error('Error fetching autos:', error);
        
      }
    };

    fetchAutos(); // Pozivanje funkcije za dobijanje podataka pri svakom mount-u komponente

  }, []); // Prvi argument useEffect-a je prazan niz kako bi se ova funkcija pozvala samo jednom, kao componentDidMount

  return [autos, setAutos]; // Vraćanje niza i setera za niz
};

export default useAuto;
