import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { Dropdown } from 'primereact/dropdown';

const FormSelect = props => {
  const {
    value,
    options,
    onChange,
    placeholder,
    label,
    error,
    disabled,
    style
  } = props;

  return (
    <div className={error ? 'form-select-error' : ''}>
      <Typography variant="subtitle2">{label}</Typography>
      <Dropdown
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        className={'form-select-drop-down'}
        disabled={disabled}
        style={style}
      />
    </div>
  );
};

FormSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.shape()
};

export default FormSelect;
