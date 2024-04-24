import React from 'react';
import useAuto from '../CustomHooks/useAuto';
import './Automobili.css';
const Automobili = () => {
  const [autos] = useAuto();  

  return (
    <div className='auto-table'>
      <h2>Lista automobila</h2>
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
          {autos.map(auto => (
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
