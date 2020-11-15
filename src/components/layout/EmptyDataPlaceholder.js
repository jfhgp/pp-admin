import React from 'react';
import PropTypes from 'prop-types';

const EmptyDataPlaceholder = props => {
  return (
    <div className="empty-data-placeholder">
      <div>{props.message}</div>
    </div>
  );
};

EmptyDataPlaceholder.propTypes = {
  message: PropTypes.string
};

export default EmptyDataPlaceholder;
