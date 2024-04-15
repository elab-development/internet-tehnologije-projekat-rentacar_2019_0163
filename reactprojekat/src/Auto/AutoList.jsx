import React, { useState } from 'react';
import useAuto from '../CustomHooks/useAuto';
import AutoCard from './AutoCard';
import './AutoCard.css';
import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";
const AutoList = () => {
  const [autos, setAutos] = useAuto();
  const [filters, setFilters] = useState({
    marka: '',
    godina: '',
    boja: '',
    cena_po_danu: '',
    broj_vrata: '',
  });
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; // Broj automobila po stranici

  const [sortAsc, setSortAsc] = useState(true); // Da li sortiramo rastuće ili opadajuće
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Resetujemo trenutnu stranicu na prvu kada se primeni novi filter
  };

  const filteredAutos = autos.filter(auto => (
    (filters.marka ? auto.marka.toLowerCase().includes(filters.marka.toLowerCase()) : true) &&
    (filters.godina ? auto.godina_proizvodnje >= Number(filters.godina) : true) &&
    (filters.boja ? auto.boja.toLowerCase().includes(filters.boja.toLowerCase()) : true) &&
    (filters.cena_po_danu ? auto.cena_po_danu <= Number(filters.cena_po_danu) : true) &&
    (filters.broj_vrata ? auto.broj_vrata === Number(filters.broj_vrata) : true)
  ));
  // Sortiranje automobila po ceni
  const sortedAutos = [...filteredAutos].sort((a, b) => {
    if (sortAsc) {
      return a.cena_po_danu - b.cena_po_danu;
    } else {
      return b.cena_po_danu - a.cena_po_danu;
    }
  });
  // Izračunavanje indeksa prvog i poslednjeg automobila na trenutnoj stranici
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAutos = sortedAutos.slice(indexOfFirstItem, indexOfLastItem);

  // Funkcija za promenu trenutne stranice
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Funkcija za promenu smera sortiranja
  const toggleSort = () => setSortAsc(prev => !prev);
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
               {/* Dodajemo dugme za promenu smera sortiranja */}
          <button onClick={toggleSort}>
            {sortAsc ? 'Sortiraj opadajuće' : 'Sortiraj rastuće'}
          </button>
          <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><MdNavigateBefore /></button>
          <span>Trenutna stranica: {currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentAutos.length < itemsPerPage}><MdNavigateNext /></button>
        </div>
        </div>

        <div className="auto-card-container">
          {currentAutos.map(auto => (
            <AutoCard key={auto.id} auto={auto} />
          ))}
        </div>
       

      </div>
    </>
  );
};

export default AutoList;
