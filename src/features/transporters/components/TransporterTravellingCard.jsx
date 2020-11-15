import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Divider } from '@material-ui/core';

const TransporterTravellingCard = props => {
  const { travelling } = props;

  const originSplit = travelling.origin.name.split(',');
  const destSplit = travelling.destination.name.split(',');
  return (
    <div
      key={travelling._id}
      className="t-travelling-card"
      style={{ marginBottom: '1rem' }}
    >
      <div>
        <div>
          <i className="fas fa-car-alt" />
          <span>{travelling.mode}</span>
        </div>
        <span>{moment(travelling.date).format('DD MMM, YYYY')}</span>
      </div>
      <Divider style={{ margin: '1rem -0.9rem' }} />
      <div>
        <i className="fas fa-dot-circle" />
        <div>
          <button
          // {...(transporterType === 'dropoff'
          //   ? {
          //       style: { cursor: 'pointer' },
          //       onClick: () =>
          //         this.props.handleFindTransporters(item, travel, 'dropoff')
          //     }
          //   : {})}
          >
            {originSplit[originSplit.length - 1].trim()}
          </button>
          <p>{travelling.origin.name}</p>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <i className="fas fa-paper-plane" />
        <div>
          <button
          // {...(transporterType === 'pickup'
          //   ? {
          //       style: { cursor: 'pointer' },
          //       onClick: () =>
          //         this.props.handleFindTransporters(item, travel, 'pickup')
          //     }
          //   : {})}
          >
            {destSplit[destSplit.length - 1].trim()}
          </button>
          <p>{travelling.destination.name}</p>
          <div>
            <p>{travelling.stopOvers.length} Stop(s)</p>
            <button onClick={props.onStopsClick}>
              <i className="pi pi-info-circle" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TransporterTravellingCard.propTypes = {
  travelling: PropTypes.shape(),
  onStopsClick: PropTypes.func
};

export default TransporterTravellingCard;

// e =>
//                 travelling.stopOvers.length
//                   ? this.props.handleStopsClick(e, travelling.stopOvers)
//                   : null
