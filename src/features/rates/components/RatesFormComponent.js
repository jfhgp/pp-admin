import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import Page from '../../../components/layout/Page';
import SubmitButton from '../../../components/layout/SubmitButton';
import FormSelect from '../../../components/form/FormSelect';
import FormInput from '../../../components/form/FormInput';

const modeSelectItems = [
  { label: 'Bike', value: 'bike' },
  { label: 'Car', value: 'car' },
  { label: 'Van', value: 'van' },
  { label: 'Truck', value: 'truck' },
  { label: 'Train', value: 'train' },
  { label: 'Aeroplane', value: 'aeroplane' }
];

const userTypeSelectItems = [
  { label: 'Transporter', value: 'transporter' },
  { label: 'Customer', value: 'customer' }
];

const typeSelectItems = [
  { label: 'Economical', value: 'economical' },
  { label: 'Standard', value: 'standard' },
  { label: 'Urgent', value: 'urgent' }
];

const RatesFormComponent = props => {
  const {
    heading,
    btnLabel,
    customer,
    peakFactor,
    mode,
    type,
    onChange,
    minWeight,
    maxWeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    minLength,
    maxLength,
    minDistance,
    maxDistance,
    price,
    onSubmit,
    activity,
    hideModal,
    errors
  } = props;

  return (
    <Page
      activity={activity}
      className=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '10px 0'
      }}
    >
      <div className="p-grid" style={{ flexGrow: 1, overflowY: 'auto' }}>
        <div className="p-col-12 p-sm-6">
          <Typography variant="h5">{heading}</Typography>
        </div>
        <div className="p-col-12 p-sm-6 text-right">
          <SubmitButton
            label="Back"
            className="p-button-raised p-button-secondary"
            onClick={hideModal}
            disabled={activity}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormSelect
            label="User Type"
            value={customer}
            options={userTypeSelectItems}
            onChange={e => onChange('customer', e.value)}
            placeholder="Select a user type"
            error={errors.customer}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Peak Factor"
            value={peakFactor}
            onChange={e => onChange('peakFactor', e.target.value)}
            keyfilter={'pnum'}
            disabled={customer === 'transporter'}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormSelect
            label="Mode"
            value={mode}
            options={modeSelectItems}
            onChange={e => onChange('mode', e.value)}
            placeholder="Select a mode"
            error={errors.mode}
            disabled={customer === 'customer'}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormSelect
            label="Type"
            value={type}
            options={typeSelectItems}
            onChange={e => onChange('type', e.value)}
            placeholder="Select a type"
            error={errors.type}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Minimum Weight"
            value={minWeight}
            onChange={e => onChange('minWeight', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">kg</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Maximum Weight"
            value={maxWeight}
            onChange={e => onChange('maxWeight', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">kg</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Minimum Width"
            value={minWidth}
            onChange={e => onChange('minWidth', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Maximum Width"
            value={maxWidth}
            onChange={e => onChange('maxWidth', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Minimum Height"
            value={minHeight}
            onChange={e => onChange('minHeight', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Maximum Height"
            value={maxHeight}
            onChange={e => onChange('maxHeight', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Minimum Length"
            value={minLength}
            onChange={e => onChange('minLength', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Maximum Length"
            value={maxLength}
            onChange={e => onChange('maxLength', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">m</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Minimum Distance"
            value={minDistance}
            onChange={e => onChange('minDistance', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">mi</span>}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInput
            label="Maximum Distance"
            value={maxDistance}
            onChange={e => onChange('maxDistance', e.target.value)}
            keyfilter={'pnum'}
            right={<span className="p-inputgroup-addon">mi</span>}
          />
        </div>
        <div className="p-col-12">
          <FormInput
            label="Price"
            value={price}
            onChange={e => onChange('price', e.target.value)}
            keyfilter={'money'}
            left={<span className="p-inputgroup-addon">&euro;</span>}
            right={<span className="p-inputgroup-addon">.00</span>}
            error={errors.price}
          />
        </div>
      </div>
      <div className="submit-btn-div">
        <SubmitButton
          label={btnLabel}
          className="p-button-raised"
          onClick={onSubmit}
          disabled={activity}
        />
      </div>
    </Page>
  );
};

RatesFormComponent.propTypes = {
  heading: PropTypes.string,
  btnLabel: PropTypes.string,
  mode: PropTypes.string,
  type: PropTypes.string,
  customer: PropTypes.string,
  onChange: PropTypes.func,
  peakFactor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubmit: PropTypes.func,
  activity: PropTypes.bool,
  hideModal: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.bool)
};

export default RatesFormComponent;
