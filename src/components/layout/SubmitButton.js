import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'primereact/button';

const SubmitButton = props => {
  const { label, disabled, className, onClick } = props;
  return (
    <Button
      label={label}
      className={className}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

SubmitButton.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SubmitButton;
