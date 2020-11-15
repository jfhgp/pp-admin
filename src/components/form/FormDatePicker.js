import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import { Calendar } from 'primereact/calendar';

class FormDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
    this.count = 0;
  }

  handleFocus(isFocused) {
    this.setState({ isFocused });
  }

  getValue(value) {
    if (this.count === 0) {
      this.count = 1;
      return value;
    } else {
      return this.state.isFocused
        ? value
        : value && moment(value).format('DD MMM, YYYY');
    }
  }

  render() {
    const { value, onChange, placeholder, label, error, minDate } = this.props;

    return (
      <div className={error ? 'form-date-error' : ''}>
        <Typography variant="subtitle2">{label}</Typography>
        <div className="p-inputgroup">
          <Calendar
            value={this.getValue(value)}
            onChange={onChange}
            placeholder={placeholder}
            showIcon
            className="form-date-input"
            minDate={minDate}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false)}
          />
        </div>
      </div>
    );
  }
}

FormDatePicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  minDate: PropTypes.instanceOf(Date),
  error: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string
};

export default FormDatePicker;
