import React from 'react';
import useAuto from '../CustomHooks/useAuto';
import AutoCard from './AutoCard';
import './AutoCard.css';
const AutoList = () => {
  const [autos, setAutos] = useAuto();
 

  return (
    <div className="auto-list">
      <h2>Automobili u ponudi</h2> 
        {Array.isArray(autos) && autos.map(auto => (
          <AutoCard key={auto.id} auto={auto}>  </AutoCard>
        ))} 
    </div>
  );
};

export default AutoList;
