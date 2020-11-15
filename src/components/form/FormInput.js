import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const FormInput = props => {
  const {
    value,
    keyfilter,
    onChange,
    placeholder,
    label,
    left,
    right,
    disabled,
    error,
    textArea
  } = props;
  return (
    <div className={error ? 'form-error' : ''}>
      <Typography variant="subtitle2">{label}</Typography>
      <div className="p-inputgroup" style={{ marginTop: 5 }}>
        {left}
        {textArea ? (
          <InputTextarea
            rows={5}
            // cols={30}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={'form-select-input'}
            keyfilter={keyfilter}
            disabled={disabled}
          />
        ) : (
          <InputText
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={'form-select-input'}
            keyfilter={keyfilter}
            disabled={disabled}
          />
        )}

        {right}
      </div>
    </div>
  );
};

FormInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keyfilter: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element
};

export default FormInput;
