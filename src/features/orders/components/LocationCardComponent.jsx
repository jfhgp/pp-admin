import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from "primereact/button";

class LocationCardComponent extends PureComponent {
  render() {
    console.log("This is all props i receive", this.props.location)
    const { address, iconType, activity } = this.props;
    const split = address.split(',');

    return (
      <div className="location-card">
        <div>
          <i
            className={
              iconType === 'pickup' ? 'fas fa-dot-circle' : 'fas fa-paper-plane'
            }
          />
          <span />
        </div>
        <div>
          <p>{split[split.length - 1].trim()}</p>
          <p>{address}</p>

          {this.props.subOrder ? (
            <div>
              <Button
                label="Search Spaces"
                onClick={() => { this.props.handleSpaceSearch({ location: this.props.location }) }}
                disabled={activity}
              />
            </div>
          ) : null}
        </div>


      </div>
    );
  }
}

LocationCardComponent.propTypes = {
  address: PropTypes.string,
  iconType: PropTypes.string
};

export default LocationCardComponent;
