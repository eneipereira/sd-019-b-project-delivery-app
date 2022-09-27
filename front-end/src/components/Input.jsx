import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, type, title, value, handleChange, dataTestId }) {
  return (
    <label htmlFor={ name }>
      <p>
        {title}
      </p>
      <input
        data-testid={ dataTestId }
        required
        name={ name }
        type={ type }
        value={ value }
        onChange={ handleChange }
      />

    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Input;
