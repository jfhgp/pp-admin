import React from 'react';
import PropTypes from 'prop-types';

import { Typography, DialogContent } from '@material-ui/core';

import { permissionFeatures } from '../../../utils/permissions.utils';

const ShowPermissionsContainer = props => {
  const { all } = props.dialogData;
  const permissionKeys = Object.keys(props.dialogData);

  return (
    <DialogContent>
      <Typography variant="title">Permissions</Typography>
      <div style={{ display: 'flex' }}>
        {all ? (
          permissionFeatures.map((key, index) => {
            return (
              <div key={`permissions-${index + 1}`} className="permissions-box">
                <Typography variant="body2">{key}</Typography>
                <div>create, read, update, delete</div>
              </div>
            );
          })
        ) : permissionKeys.length ? (
          permissionKeys.map((key, index) => {
            return (
              <div key={`permissions-${index + 1}`} className="permissions-box">
                <Typography variant="body2">{key}</Typography>
                <div>{props.dialogData[key].join(', ')}</div>
              </div>
            );
          })
        ) : (
          <div>No permissions assigned.</div>
        )}
      </div>
    </DialogContent>
  );
};

ShowPermissionsContainer.propTypes = {
  dialogData: PropTypes.shape()
};

export default ShowPermissionsContainer;
