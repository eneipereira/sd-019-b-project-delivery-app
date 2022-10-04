import React from 'react';
import PropType from 'prop-types';

export default function Select({
  options, name, selectTitle, handleChange, dataTestId }) {
  return (
    <div className="select-container">
      <p>{selectTitle}</p>
      <select
        className="input"
        data-testid={ dataTestId }
        required
        defaultValue=""
        name={ name }
        id={ name }
        onChange={ handleChange }
      >
        <option value="" disabled hidden>Select an Option</option>
        {options.map((option) => (
          <option key={ option.id } value={ option.id }>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  options: PropType.arrayOf(PropType.shape({
    id: PropType.number,
    name: PropType.string,
  })).isRequired,
  name: PropType.string.isRequired,
  selectTitle: PropType.string.isRequired,
  handleChange: PropType.func.isRequired,
  dataTestId: PropType.string.isRequired,
};
