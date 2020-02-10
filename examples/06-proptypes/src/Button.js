import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { label, updateState } = props;
  return <button onClick={updateState}>{label}</button>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired
};

export default Button;
