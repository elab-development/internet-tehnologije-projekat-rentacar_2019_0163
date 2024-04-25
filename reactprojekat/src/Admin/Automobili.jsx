import React, { useState } from 'react';
import useAuto from '../CustomHooks/useAuto';
import axios from 'axios';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import './Automobili.css';

const Automobili = () => {
  const [autos, setAutos] = useAuto();
  const [searchParams, setSearchParams] = useState({
    marka: '',
    model: '',
    godina_proizvodnje: '',
    boja: '',
    registraciona_oznaka: '',
    istek_registracije: '',
    cena_po_danu: ''
  });
  const [editParams, setEditParams] = useState({
    marka: '',
    model: '',
    godina_proizvodnje: '',
    boja: '',
    registraciona_oznaka: '',
    istek_registracije: '',
    cena_po_danu: ''
  });
  const [editItemId, setEditItemId] = useState(null); // Čuva ID automobila koji se trenutno uređuje
  const [newAutoParams, setNewAutoParams] = useState({
    marka: '',
    model: '',
    godina_proizvodnje: '',
    boja: '',
    registraciona_oznaka: '',
    istek_registracije: '',
    cena_po_danu: '',
    broj_vrata: '',
    prenos: 'automatski', // Inicijalno postavljamo automatski prenos
    maksimalan_broj_putnika: ''
  });

  // Funkcija za filtriranje automobila
  const filteredAutos = autos.filter(auto => {
    return Object.keys(searchParams).every(key => {
      if (searchParams[key] === '') return true;
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

  // Funkcija za brisanje automobila
  const handleDelete = async id => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/auto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedAutos = autos.filter(auto => auto.id !== id);
      setAutos(updatedAutos);
      alert("USPESNO OBRISANO");
    } catch (error) {
      console.error('Error deleting auto:', error);
      alert("GRESKA PRILIKOM BRISANJA");
    }
  };

  // Funkcija za započinjanje uređivanja automobila
  const handleStartEdit = id => {
    setEditItemId(id);
    const editingAuto = autos.find(auto => auto.id === id);
    setEditParams(editingAuto);
  };

  // Funkcija za završavanje uređivanja automobila
  const handleFinishEdit = async id => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/auto/${id}`, editParams, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedAutos = autos.map(auto => {
        if (auto.id === id) {
          return { ...auto, ...editParams };
        }
        return auto;
      });
      setAutos(updatedAutos);
      setEditItemId(null);
    } catch (error) {
      console.error('Error updating auto:', error);
    }
  };

  // Funkcija za odustajanje od uređivanja
  const handleCancelEdit = () => {
    setEditItemId(null);
  };

  // Funkcija za izmenu automobila
  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  // Funkcija za unos novog automobila
  const handleNewAutoChange = e => {
    const { name, value } = e.target;
    setNewAutoParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  // Funkcija za dodavanje novog automobila
  const handleAddNewAuto = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/auto', newAutoParams, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newAuto = response.data;
      setAutos([...autos, newAuto]);
      setNewAutoParams({
        marka: '',
        model: '',
        godina_proizvodnje: '',
        boja: '',
        registraciona_oznaka: '',
        istek_registracije: '',
        cena_po_danu: '',
        broj_vrata: '',
        prenos: 'automatski',
        maksimalan_broj_putnika: ''
      });
      alert("USPESNO DODATO!")
    } catch (error) {
      console.error('Error adding new auto:', error);
      alert(error)
    }
  };

  return (
    <div className="auto-table">
      <h2>Pretraga automobila</h2>

      <div className="search-fields">
        <input type="text" name="marka" value={searchParams.marka} onChange={handleSearchChange} placeholder="Marka" />
        <input type="text" name="model" value={searchParams.model} onChange={handleSearchChange} placeholder="Model" />
        <input type="text" name="godina_proizvodnje" value={searchParams.godina_proizvodnje} onChange={handleSearchChange} placeholder="Godina proizvodnje" />
        <input type="text" name="boja" value={searchParams.boja} onChange={handleSearchChange} placeholder="Boja" />
        <input type="text" name="registraciona_oznaka" value={searchParams.registraciona_oznaka} onChange={handleSearchChange} placeholder="Registraciona oznaka" />
        <input type="text" name="istek_registracije" value={searchParams.istek_registracije} onChange={handleSearchChange} placeholder="Istek registracije" />
        <input type="text" name="cena_po_danu" value={searchParams.cena_po_danu} onChange={handleSearchChange} placeholder="Cena po danu" />
      </div>

      <h2>Dodaj novi automobil</h2>
      <div className="search-fields">
        <input type="text" name="marka" value={newAutoParams.marka} onChange={handleNewAutoChange} placeholder="Marka" />
        <input type="text" name="model" value={newAutoParams.model} onChange={handleNewAutoChange} placeholder="Model" />
        <input type="text" name="godina_proizvodnje" value={newAutoParams.godina_proizvodnje} onChange={handleNewAutoChange} placeholder="Godina proizvodnje" />
        <input type="text" name="boja" value={newAutoParams.boja} onChange={handleNewAutoChange} placeholder="Boja" />
        <input type="text" name="registraciona_oznaka" value={newAutoParams.registraciona_oznaka} onChange={handleNewAutoChange} placeholder="Registraciona oznaka" />
        <input type="text" name="istek_registracije" value={newAutoParams.istek_registracije} onChange={handleNewAutoChange} placeholder="Istek registracije" />
        <input type="text" name="cena_po_danu" value={newAutoParams.cena_po_danu} onChange={handleNewAutoChange} placeholder="Cena po danu" />
        <input type="text" name="broj_vrata" value={newAutoParams.broj_vrata} onChange={handleNewAutoChange} placeholder="Broj vrata" />
        <select name="prenos" value={newAutoParams.prenos} onChange={handleNewAutoChange}>
          <option value="automatski">Automatski</option>
          <option value="manuelni">Manuelni</option>
        </select>
        <input type="text" name="maksimalan_broj_putnika" value={newAutoParams.maksimalan_broj_putnika} onChange={handleNewAutoChange} placeholder="Maksimalan broj putnika" />
        <button onClick={handleAddNewAuto}>Dodaj</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Marka</th>
            <th>Model</th>
            <th>Godina proizvodnje</th>
            <th>Boja</th>
            <th>Registraciona oznaka</th>
            <th>Istek registracije</th>
            <th>Cena po danu</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredAutos.map(auto => (
            <tr key={auto.id}>
              <td>
                {editItemId === auto.id ? (
                  <input
                    type="text"
                    name="marka"
                    value={editParams.marka}
                    onChange={handleEditChange}
                  />
                ) : (
                  auto.marka
                )}
              </td>
              <td>
                {editItemId === auto.id ? (
                  <input
                    type="text"
                    name="model"
                    value={editParams.model}
                    onChange={handleEditChange}
                  />
                ) : (
                  auto.model
                )}
              </td>
              <td>
                {editItemId === auto.id ? (
                  <input
                    type="text"
                    name="godina_proizvodnje"
                    value={editParams.godina_proizvodnje}
                    onChange={handleEditChange}
                  />
                ) : (
                  auto.godina_proizvodnje
                )}
              </td>
              <td>
                {editItemId === auto.id ? (
                  <input
                    type="text"
                    name="boja"
                    value={editParams.boja}
                    onChange={handleEditChange}
                  />
                ) : (
                  auto.boja
                )}
              </td>
              <td>{auto.registraciona_oznaka}</td>
              <td>{auto.istek_registracije}</td>
              <td>{auto.cena_po_danu}</td>
              <td>
                {editItemId === auto.id ? (
                  <>
                    <button onClick={() => handleFinishEdit(auto.id)}>Sačuvaj</button>
                    <button onClick={handleCancelEdit}>Otkaži</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleStartEdit(auto.id)}><RiPencilLine /></button>
                    <button onClick={() => handleDelete(auto.id)}><RiDeleteBin6Line /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Automobili;
