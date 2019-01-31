import React, { PureComponent, Fragement } from 'react'
import 'react-input-range/lib/css/index.css';


const SelectPref = ({ label, value, list, onChange }) => (
  <div className="select">
    <label>{label}</label>
    <select onChange={onChange} value={value}>

      {list.map((l, i) => {
        return (
          <option key={i} value={l.name}>{l.name}</option>
        );
      })}
    </select>
  </div >
);

export default SelectPref;

