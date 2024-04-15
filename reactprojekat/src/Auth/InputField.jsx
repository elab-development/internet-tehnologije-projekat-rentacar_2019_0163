 
import React from 'react';
import './Auth.css';  
const InputField = ({ label, name, type, value, onChange, placeholder }) => {
  return (
    <div className="email">
      <label htmlFor={name}>{label}</label>
      <div className="sec-2">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{width:"100%"}}
        />
      </div>
    </div>
  );
};

export default InputField;
