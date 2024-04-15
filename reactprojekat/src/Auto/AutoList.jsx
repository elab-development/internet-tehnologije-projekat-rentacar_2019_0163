import React, { useState } from 'react';
import useAuto from '../CustomHooks/useAuto';
import AutoCard from './AutoCard';
import './AutoCard.css';

const AutoList = () => {
  const [autos, setAutos] = useAuto();
  const [filters, setFilters] = useState({
    marka: '',
    godina: '',
    boja: '',
    cena_po_danu: '',
    broj_vrata: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredAutos = autos.filter(auto => (
    (filters.marka ? auto.marka.toLowerCase().includes(filters.marka.toLowerCase()) : true) &&
    (filters.godina ? auto.godina_proizvodnje >= Number(filters.godina) : true) &&
    (filters.boja ? auto.boja.toLowerCase().includes(filters.boja.toLowerCase()) : true) &&
    (filters.cena_po_danu ? auto.cena_po_danu <= Number(filters.cena_po_danu) : true) &&
    (filters.broj_vrata ? auto.broj_vrata === Number(filters.broj_vrata) : true)
  ));
  

  return (
    <>
      <h2>Automobili u ponudi</h2>
      <div className="auto-list">
        <div className="filters">
          <h3>Filteri</h3>
          <div>
            <label htmlFor="marka">Marka:</label>
            <input id="marka" name="marka" value={filters.marka} onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="godina">Godina:</label>
            <input type="number" id="godina" name="godina" value={filters.godina} onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="boja">Boja:</label>
            <input id="boja" name="boja" value={filters.boja} onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="cena_po_danu">Cena po danu (max):</label>
            <input type="number" id="cena_po_danu" name="cena_po_danu" value={filters.cena_po_danu} onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="broj_vrata">Broj vrata:</label>
            <input type="number" id="broj_vrata" name="broj_vrata" value={filters.broj_vrata} onChange={handleFilterChange} />
          </div>
        </div>
        <div className="auto-card-container">
          {filteredAutos.map(auto => (
            <AutoCard key={auto.id} auto={auto} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AutoList;
