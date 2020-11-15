import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import moment from 'moment';

import Page from '../../../components/layout/Page';

const PromotionsUpdateComponent = props => {
  const {
    validTill,
    handleChange,
    activity,
    handleSubmit,
    errors,
    handleCloseDialog
  } = props;

  return (
    <Page activity={activity} style={{ minHeight: 'unset' }}>
      <DialogContent>
        <div className="p-grid" style={{ margin: 0 }}>
          <div className="p-col-12">
            <DatePicker
              label="Valid Till"
              fullWidth
              autoOk
              format="DD MMM, YYYY"
              value={validTill ? validTill : null}
              onChange={e => handleChange('validTill', e)}
              variant="outlined"
              minDate={new Date()}
              error={errors.validTill}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={activity} onClick={handleCloseDialog}>
          BACK
        </Button>
        <Button color="primary" disabled={activity} onClick={handleSubmit}>
          UPDATE
        </Button>
      </DialogActions>
    </Page>
  );
};

PromotionsUpdateComponent.propTypes = {
  validTill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment)
  ]),
  handleChange: PropTypes.func,
  activity: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.bool)
};

export default PromotionsUpdateComponent;
