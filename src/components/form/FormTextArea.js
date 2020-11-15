import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { InputTextarea } from 'primereact/inputtextarea';

const FormTextArea = props => {
  const {
    value,
    onChange,
    placeholder,
    label,
    error,
    autoResize,
    rows
  } = props;

  return (
    <div className={error ? 'form-error' : ''}>
      <Typography variant="subtitle2">{label}</Typography>
      <div className="p-inputgroup">
        <InputTextarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={'form-select-input'}
          autoResize={autoResize}
          rows={rows}
        />
      </div>
    </div>
  );
};

FormTextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool,
  autoResize: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rows: PropTypes.number
};

export default FormTextArea;
