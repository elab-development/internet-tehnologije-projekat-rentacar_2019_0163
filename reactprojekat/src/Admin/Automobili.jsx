import React, { useState } from 'react';
import useAuto from '../CustomHooks/useAuto';
import './Automobili.css';

const Automobili = () => {
  const [autos] = useAuto();
  const [searchParams, setSearchParams] = useState({
    marka: '',
    model: '',
    godina_proizvodnje: '',
    boja: '',
    broj_vrata: '',
    prenos: '',
    registraciona_oznaka: '',
    istek_registracije: '',
    maksimalan_broj_putnika: '',
    cena_po_danu: ''
  });

  // Funkcija za filtriranje automobila
  const filteredAutos = autos.filter(auto => {
    return Object.keys(searchParams).every(key => {
      if (searchParams[key] === '') return true; // Ako je polje za pretragu prazno, vraćamo true i ne filtriramo po tom parametru
      return auto[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
    });
  });

  // Funkcija za ažuriranje stanja pretrage
  const handleSearchChange = e => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className='auto-table'>
      <h2>Lista automobila</h2>
    
      <div className="search-fields">
        <input type="text" name="marka" value={searchParams.marka} onChange={handleSearchChange} placeholder="Marka" />
        <input type="text" name="model" value={searchParams.model} onChange={handleSearchChange} placeholder="Model" />
        <input type="text" name="godina_proizvodnje" value={searchParams.godina_proizvodnje} onChange={handleSearchChange} placeholder="Godina proizvodnje" />
        <input type="text" name="boja" value={searchParams.boja} onChange={handleSearchChange} placeholder="Boja" />
        <input type="text" name="registraciona_oznaka" value={searchParams.registraciona_oznaka} onChange={handleSearchChange} placeholder="Registraciona oznaka" />
        <input type="text" name="istek_registracije" value={searchParams.istek_registracije} onChange={handleSearchChange} placeholder="Istek registracije" />
        <input type="text" name="cena_po_danu" value={searchParams.cena_po_danu} onChange={handleSearchChange} placeholder="Cena po danu" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Marka</th>
            <th>Model</th>
            <th>Godina proizvodnje</th>
            <th>Boja</th>
            <th>Broj vrata</th>
            <th>Prenos</th>
            <th>Registraciona oznaka</th>
            <th>Istek registracije</th>
            <th>Maksimalan broj putnika</th>
            <th>Cena po danu</th>
          </tr>
        </thead>
        <tbody>
          {filteredAutos.map(auto => (
            <tr key={auto.id}>
              <td>{auto.marka}</td>
              <td>{auto.model}</td>
              <td>{auto.godina_proizvodnje}</td>
              <td>{auto.boja}</td>
              <td>{auto.broj_vrata}</td>
              <td>{auto.prenos}</td>
              <td>{auto.registraciona_oznaka}</td>
              <td>{auto.istek_registracije}</td>
              <td>{auto.maksimalan_broj_putnika}</td>
              <td>{auto.cena_po_danu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Automobili;
