import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBar } from 'primereact/progressbar';

const Page = props => {
  return (
    <div
      style={props.style ? props.style : { padding: 10 }}
      className={props.className ? props.className : 'layout-page'}
    >
      <div id="activity-indicator" style={props.activityStyle}>
        {props.activity && (
          <ProgressBar mode="indeterminate" style={{ height: 5 }} />
        )}
      </div>
      <div style={{ paddingTop: 10 }}>{props.children}</div>
    </div>
  );
};

Page.propTypes = {
  activity: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  style: PropTypes.shape(),
  activityStyle: PropTypes.shape()
};

export default Page;
