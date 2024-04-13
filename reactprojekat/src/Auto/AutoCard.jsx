import React from 'react';
import './AutoCard.css';

const AutoCard = ({ auto }) => {
  return (
    <div className="auto-card">
      <img className="auto-image" src={`https://via.placeholder.com/150?text=${auto.marka}+${auto.model}`} alt={`${auto.marka} ${auto.model}`} />
      <div className="auto-details">
        <h3>{auto.marka} - {auto.model}</h3>
        <p><strong>Boja:</strong> {auto.boja}</p>
        <p><strong>Broj vrata:</strong> {auto.broj_vrata}</p>
        <p><strong>Cena po danu:</strong> {auto.cena_po_danu}</p>
        <p><strong>Godina proizvodnje:</strong> {auto.godina_proizvodnje}</p>
        <p><strong>Registraciona oznaka:</strong> {auto.registraciona_oznaka}</p>
        <p><strong>Istek registracije:</strong> {auto.istek_registracije}</p>
        <p><strong>Maksimalan broj putnika:</strong> {auto.maksimalan_broj_putnika}</p>
        <p><strong>Prenos:</strong> {auto.prenos}</p>
      </div>
    </div>
  );
};

export default AutoCard;
