import React, { useState } from 'react';
import axios from 'axios';
import './RezervacijaModal.css';

const RezervacijaModal = ({ closeModal, auto }) => {
  const [formData, setFormData] = useState({
    datum_od: '',
    datum_do: '',
    osiguranje: false,
    cena_po_danu: auto.cena_po_danu,  
    napomena: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const calculateTotalPrice = () => {
    const { datum_od, datum_do, cena_po_danu, osiguranje } = formData;

    const startDate = new Date(datum_od);
    const endDate = new Date(datum_do);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));   

    let totalPrice = daysDifference * cena_po_danu;

    if (osiguranje) {
      totalPrice *= 1.2; // Uvećavamo cenu za 20% ako je osiguranje čekirano
    }

    return totalPrice.toFixed(2); // Zaokružujemo na dve decimale
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ukupnaCena = calculateTotalPrice(); 
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/rezervacije',
        {
          automobil_id: auto.id,
          ...formData,
          cena: ukupnaCena,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      alert("Rezervacija je kreirana!")
      closeModal(); // Zatvaranje modala nakon uspešne rezervacije
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert("Greska prilikom kreiranja rezervacije!")
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Rezervacija automobila {auto.marka} - {auto.model}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="datum_od">Datum od:</label>
            <input
              type="date"
              id="datum_od"
              name="datum_od"
              value={formData.datum_od}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="datum_do">Datum do:</label>
            <input
              type="date"
              id="datum_do"
              name="datum_do"
              value={formData.datum_do}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="osiguranje"
                checked={formData.osiguranje}
                onChange={handleCheckboxChange}
              /> Osiguranje
            </label>
          </div>
          <div>
            <label htmlFor="cena_po_danu">Cena po danu:</label>
            <input
              type="number"
              id="cena_po_danu"
              name="cena_po_danu"
              value={formData.cena_po_danu}
              readOnly // Postavljamo polje kao readonly kako bi se prikazala cena automobila
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="napomena">Napomena:</label>
            <textarea
              id="napomena"
              name="napomena"
              value={formData.napomena}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="ukupna_cena">Ukupna cena:</label>
            <input
              type="text"
              id="ukupna_cena"
              name="ukupna_cena"
              value={calculateTotalPrice()} // Prikazujemo izračunatu ukupnu cenu
              readOnly
            />
          </div>
          <button type="submit">Potvrdi rezervaciju</button>
        </form>
      </div>
    </div>
  );
};

export default RezervacijaModal;
