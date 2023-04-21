import { useState } from "react";

const CheckboxColor = ({ color, name, type, onChange, valueName, selectedColor }) => {

  const onSelect = (e) => {
    onChange(e.target.getAttribute('data-name'));
  }

  return (
    <label htmlFor={color+'-'+name} className={`checkbox-color`}>
      <input onChange={onSelect} checked={selectedColor?.colors[0] === color} value={color} data-name={valueName} name={name} type={type} id={color+'-'+name} />
      <span className="checkbox__check cursor-pointer">
        <span className="checkbox__color" style={{backgroundColor: color}}></span>
      </span>
    </label>
  )
};

CheckboxColor.defaultProps = {
  type: 'checkbox',
};
  
export default CheckboxColor;