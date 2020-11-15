import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

export default class MapOverlayComponent extends Component {
  static propTypes = {
    mapOverlay: PropTypes.shape({
      visible: PropTypes.bool,
      data: PropTypes.shape()
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      opacity: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapOverlay.visible !== this.props.mapOverlay.visible) {
      if (this.props.mapOverlay.visible) {
        this.setState({ show: true });
        setTimeout(() => this.mountStyle(), 10);
      } else {
        this.unMountStyle();
      }
    }
  }

  unMountStyle() {
    this.setState({
      opacity: 0
    });
    setTimeout(() => this.setState({ show: false }), 500);
  }

  mountStyle() {
    this.setState({
      opacity: 1
    });
  }

  render() {
    const {
      mapOverlay: {
        data: { content }
      }
    } = this.props;

    return this.state.show ? (
      <div
        className="map-overlay-container"
        style={{ opacity: this.state.opacity }}
      >
        <div>
          <Typography variant="body1">{content}</Typography>
        </div>
      </div>
    ) : null;
  }
}
