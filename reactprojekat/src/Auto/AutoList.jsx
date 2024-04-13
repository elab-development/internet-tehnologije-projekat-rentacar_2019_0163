import React from 'react';
import useAuto from '../CustomHooks/useAuto';
import AutoCard from './AutoCard';
 
const AutoList = () => {
  const [autos, setAutos] = useAuto();
 

  return (
    <div>
      <h2>Automobili u ponudi</h2>
      <ul>
        {Array.isArray(autos) && autos.map(auto => (
          <AutoCard key={auto.id} auto={auto}>  </AutoCard>
        ))}
      </ul>
    </div>
  );
};

export default AutoList;
