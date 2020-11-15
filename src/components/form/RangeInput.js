import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 35 },
    };
  }

  // onChangeComplete = (value) => {
  //   console.log("THis is the on change complete", value)
  // }

  render() {
    return (
      <InputRange
        maxValue={this.props.max}
        minValue={this.props.min}
        value={this.props.value}
        onChange={this.props.onChange}
        onChangeComplete={this.props.onChangeComplete}
      />
    );
  }
}

export default RangeInput;