import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button as MButton,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogTitle,
  Input
} from '@material-ui/core';

import apiServices from '../../../service/RequestHandler';
import Page from '../../../components/layout/Page';

const INITIAL_STATE = {

};


const currencyUnits = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' }
];

const weightUnits = [
  { label: 'Kilogram', value: 'kg' },
  { label: 'Gram', value: 'g' },
  { label: 'Ounce', value: 'oz' },
  { label: 'Pounds', value: 'lbs' }
];

const measurementUnits = [
  { label: 'Meter', value: 'm' },
  { label: 'Centimeter', value: 'cm' },
  { label: 'Feet', value: 'ft' },
  { label: 'Inches', value: 'in' }
];

const changeCommodityUnits = props => {
  const { currency, measurementUnit, weightUnit } = props
 
  return (
    <Page activity={props.activity} style={{ minHeight: 'unset' }}>
      <DialogTitle>Change Commodity Units</DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth>
            <InputLabel htmlFor="parent-category">Dimension</InputLabel>
            <Select
              name="currency"
              value={currency}
              onChange={props.handleChange}
              input={<Input id="currency" />}
            >
              {currencyUnits.map(item => (
                <MenuItem key={item._id} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="parent-category">Dimension</InputLabel>
            <Select
              name="measurementUnit"
              value={measurementUnit}
              onChange={props.handleChange}
              input={<Input id="measurementUnit" />}
            >
              {measurementUnits.map(item => (
                <MenuItem key={item._id} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="parent-category">Weight</InputLabel>
            <Select
              name="weightUnit"
              value={weightUnit}
              onChange={props.handleChange}
              input={<Input id="weightUnit" />}
            >
              {weightUnits.map(item => (
                <MenuItem key={item._id} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <MButton onClick={props.handleDialogClose} color="primary">
          Submit
          </MButton>
      </DialogActions>
    </Page>
  );

}

export default changeCommodityUnits;

changeCommodityUnits.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()),
  handleCategories: PropTypes.func
};


