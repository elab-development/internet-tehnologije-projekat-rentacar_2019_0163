import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AutoCard.css';
import RezervacijaModal from './RezervacijaModal'; 
const AutoCard = ({ auto }) => {
  const [carImages, setCarImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // State za prikazivanje modala

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const fetchCarImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${auto.marka}&client_id=AYoD1RB6ATmNpK69MpZK7lqW5fFyqTUtrHFhEZW7o1k`);
        const images = response.data.results.map(result => result.urls.regular);
        setCarImages(images);
      } catch (error) {
        console.error('Error fetching car images:', error);
      }
    };

    fetchCarImages();
  }, [auto.marka]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carImages.length) % carImages.length);
  };

  return (
    <div className="auto-card">
      <div className="auto-images">
        {carImages.length > 0 && (
          <>
            <img className="auto-image" src={carImages[currentImageIndex]} alt={`${auto.marka} ${auto.model}`} />
            <div className="navigation-buttons">
              <button onClick={prevImage}>&#8249;</button>
              <button onClick={nextImage}>&#8250;</button>
            </div>
          </>
        )}
      </div>
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
        <button onClick={openModal}>Rezerviši</button>
      </div>
      {showModal && <RezervacijaModal closeModal={closeModal} auto={auto} />}
    </div>
  );
};

export default AutoCard;
