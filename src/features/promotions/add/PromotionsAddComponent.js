import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

import Page from '../../../components/layout/Page';

const PromotionsAddComponent = props => {
  const {
    code,
    discount,
    validFrom,
    validTill,
    maxDiscount,
    text,
    handleChange,
    activity,
    handleSubmit,
    errors,
    handleCloseDialog
  } = props;

  return (
    <Page activity={activity} style={{ minHeight: 'unset' }}>
      <DialogContent style={{ padding: '1rem' }}>
        <div className="p-grid" style={{ margin: 0 }}>
          <div className="p-col-12 p-sm-6">
            <TextField
              label="Code"
              value={code}
              onChange={e => handleChange('code', e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              style={{ margin: 0 }}
              error={errors.code}
            />
          </div>
          <div className="p-col-12 p-sm-6">
            <FormControl variant="outlined" fullWidth error={errors.discount}>
              <InputLabel
                htmlFor="discount"
                style={{ backgroundColor: '#fff', padding: '0 5px' }}
              >
                Discount
              </InputLabel>
              <OutlinedInput
                id="discount"
                value={discount}
                onChange={e => handleChange('discount', e.target.value)}
                fullWidth
                labelWidth={0}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </FormControl>
          </div>
          <div className="p-col-12 p-sm-6">
            <DatePicker
              label="Valid From"
              fullWidth
              autoOk
              format="DD MMM, YYYY"
              value={validFrom ? validFrom : null}
              onChange={e => handleChange('validFrom', e)}
              variant="outlined"
              minDate={new Date()}
              error={errors.validFrom}
            />
          </div>
          <div className="p-col-12 p-sm-6">
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
          <div className="p-col-12 p-sm-6">
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                htmlFor="max-discount"
                style={{ backgroundColor: '#fff', padding: '0 5px' }}
              >
                Max Discount
              </InputLabel>
              <OutlinedInput
                id="max-discount"
                value={maxDiscount}
                onChange={e => handleChange('maxDiscount', e.target.value)}
                fullWidth
                labelWidth={0}
                endAdornment={
                  <InputAdornment position="end">&euro;</InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="p-col-12 p-sm-6">
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="select-user-type"
                style={{ backgroundColor: '#fff', padding: '0 5px' }}
              >
                User Type
              </InputLabel>
              <Select
                value={props.userType}
                name="userType"
                onChange={e => handleChange('userType', e.target.value)}
                input={<OutlinedInput id="select-user-type" labelWidth={0} />}
                variant="outlined"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="transporter">Transporter</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="p-col-12 p-sm-6">
            <TextField
              label="Text"
              value={text}
              onChange={e => handleChange('text', e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              style={{ margin: 0 }}
              multiline
              rowsMax={4}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={activity} onClick={handleCloseDialog}>
          Back
        </Button>
        <Button color="primary" disabled={activity} onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Page>
  );
};

PromotionsAddComponent.propTypes = {
  code: PropTypes.string,
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validFrom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment)
  ]),
  validTill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment)
  ]),
  maxDiscount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  userType: PropTypes.string,
  handleChange: PropTypes.func,
  activity: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.bool)
};

export default PromotionsAddComponent;
