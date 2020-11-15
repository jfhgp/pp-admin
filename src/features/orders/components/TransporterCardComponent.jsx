import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Divider } from '@material-ui/core';

const returnNull = e => {
  e.stopPropagation();
  return null;
};

export default class TransporterCardComponent extends PureComponent {
  render() {
    const { item, transporterType, onClick } = this.props;
    return (
      <div className="transporter-card" onClick={onClick}>
        <p>
          {item.firstName} {item.lastName}
        </p>
        <p>{item.mobile}</p>
        <Divider style={{ marginTop: '1rem' }} />
        <div>
          {item.travelling.length ? (
            item.travelling.map(travel => {
              const originSplit = travel.origin.name.split(',');
              const destSplit = travel.destination.name.split(',');
              return (
                <div key={travel._id} style={{ marginTop: '1rem' }}>
                  <div>
                    <div>
                      <i className="fas fa-car-alt" />
                      <span>{travel.mode}</span>
                    </div>
                    <span>{moment(travel.date).format('DD MMM, YYYY')}</span>
                  </div>
                  <Divider style={{ margin: '1rem -0.9rem' }} />
                  <div>
                    <i className="fas fa-dot-circle" />
                    <div>
                      <button
                        {...(transporterType === 'dropoff'
                          ? {
                              style: { cursor: 'pointer' },
                              onClick: () =>
                                this.props.handleFindTransporters(
                                  item,
                                  travel,
                                  'dropoff'
                                )
                            }
                          : {})}
                      >
                        {originSplit[originSplit.length - 1].trim()}
                      </button>
                      <p>{travel.origin.name}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <i className="fas fa-paper-plane" />
                    <div>
                      <button
                        {...(transporterType === 'pickup'
                          ? {
                              style: { cursor: 'pointer' },
                              onClick: () =>
                                this.props.handleFindTransporters(
                                  item,
                                  travel,
                                  'pickup'
                                )
                            }
                          : {})}
                      >
                        {destSplit[destSplit.length - 1].trim()}
                      </button>
                      <p>{travel.destination.name}</p>
                      <div>
                        <p>{travel.stopOvers.length} Stop(s)</p>
                        <button
                          onClick={e =>
                            travel.stopOvers.length
                              ? this.props.handleStopsClick(e, travel.stopOvers)
                              : null
                          }
                        >
                          <i className="pi pi-info-circle" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">No travelling information found.</p>
          )}
        </div>
      </div>
    );
  }
}

TransporterCardComponent.defaultProps = {
  item: {},
  transporterType: '',
  handleStopsClick: returnNull,
  handleFindTransporters: returnNull,
  onClick: returnNull
};

TransporterCardComponent.propTypes = {
  item: PropTypes.shape(),
  transporterType: PropTypes.string,
  handleStopsClick: PropTypes.func,
  handleFindTransporters: PropTypes.func,
  onClick: PropTypes.func
};
