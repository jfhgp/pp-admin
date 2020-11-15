import React from 'react';
import PropTypes from 'prop-types';
import ChangeCommodityUnits from './ChangeCommodityUnits';
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
import { DatePicker, TimePicker } from 'material-ui-pickers';
import { Button } from 'primereact/button';
import moment from 'moment';

const OrdersEditComponent = props => {
  const {
    pickupDate,
    from,
    to,
    name,
    number,
    handleCommodityChange,
    handleChange,
    handleChangeUnits,
    handleDialogClose,
    commodities,
    details,
    errors,
    activity,
    activeRow
  } = props;
  console.log("This is all props edit order", props)
  const config = details.config;
  const keys = Object.keys(commodities);

  return (
    <div className="orders-edit-div">
      <Divider />
      <div>
        <p>#{details.orderNumber}</p>
        {props.rates.price !== undefined ? (
          <p>
            {config.currency} <strong>{props.rates.price}</strong>
          </p>
        ) : null}
      </div>
      <Divider />
      <div className="p-grid">
        <div className="p-col-12 p-md-4">
          <p>RECEIVER</p>
          <Divider />
          <TextField
            className="text-field"
            label="Name"
            fullWidth
            name="name"
            value={name}
            onChange={handleChange}
          />
          <div style={{ marginTop: '1rem' }}>
            <TextField
              className="text-field"
              label="Number"
              fullWidth
              name="number"
              value={number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-col-12 p-md-4">
          <p>PICKUP</p>
          <Divider />
          <DatePicker
            className="text-field"
            label="Date"
            fullWidth
            autoOk
            format="DD MMM, YYYY"
            value={pickupDate}
            onChange={props.handleDateChange}
          />
          <div className="p-grid" style={{ margin: 0 }}>
            <div
              className="p-col-12 p-md-6"
              style={{ padding: '1rem 1rem 0 0' }}
            >
              <TimePicker
                className="text-field"
                ampm={false}
                label="From"
                fullWidth
                value={from}
                onChange={value => props.handleTimeChange('from', value)}
              />
            </div>
            <div
              className="p-col-12 p-md-6"
              style={{ padding: '1rem 0 0 1rem' }}
            >
              <TimePicker
                className="text-field"
                ampm={false}
                label="To"
                fullWidth
                value={to}
                onChange={value => props.handleTimeChange('to', value)}
              />
            </div>
          </div>
        </div>
        <div className="p-col-12">
          <Divider />
        </div>
        <div className="p-col-12">
          <p>ITEMS</p>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Width</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys.length
                  ? keys.map((key, index) => {
                    const item = commodities[key];
                    // eslint-disable-next-line
                    const disabled = !activeRow && activeRow != index;
                    return (
                      <TableRow
                        key={item._id ? item._id : `item-${index + 1}`}
                        className="items"
                      >
                        <TableCell>
                          <input
                            name="name"
                            value={item.name}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.name ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <MButton
                            disabled={disabled}
                            onClick={props.handleDialogOpen}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          >
                            {item.itemType.name}
                          </MButton>
                        </TableCell>
                        <TableCell>
                          <input
                            name="quantity"
                            value={item.quantity}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.quantity ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="weight"
                            value={item.weight}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.weight ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                          <span>{config.weightUnit}</span>
                        </TableCell>
                        <TableCell>
                          <input
                            name="length"
                            value={item.length}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.length ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                          <span>{config.measurementUnit}</span>
                        </TableCell>
                        <TableCell>
                          <input
                            name="width"
                            value={item.width}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.width ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                          <span>{config.measurementUnit}</span>
                        </TableCell>
                        <TableCell>
                          <input
                            name="height"
                            value={item.height}
                            disabled={disabled}
                            onChange={handleCommodityChange(index)}
                            className={errors.height ? 'error' : ''}
                            style={{
                              ...(!disabled
                                ? { border: '1px solid #dcdcdc' }
                                : {})
                            }}
                          />
                          <span>{config.measurementUnit}</span>
                        </TableCell>
                        <TableCell>
                          <button
                            data-index={index}
                            onClick={props.handleItemClick}
                            disabled={activity}
                            style={{
                              ...(!activity ? { cursor: 'pointer' } : {})
                            }}
                          >
                            <i
                              className={
                                !disabled ? 'fas fa-check' : 'fas fa-pen'
                              }
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                  : null}
                {/* <TableRow>
                  <TableCell>
                    <input
                      name="nIName"
                      value={props.nIName}
                      onChange={handleChange}
                      style={errors.nIName ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      style={errors.nICategory ? { borderColor: 'red' } : {}}
                      name="nICategory"
                      value={props.nICategory._id}
                      onChange={handleChange}
                    >
                      <option value="" />
                      {props.categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      name="nIQuantity"
                      value={props.nIQuantity}
                      onChange={handleChange}
                      style={errors.nIQuantity ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name="nIWeight"
                      value={props.nIWeight}
                      onChange={handleChange}
                      style={errors.nIWeight ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name="nILength"
                      value={props.nILength}
                      onChange={handleChange}
                      style={errors.nILength ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name="nIWidth"
                      value={props.nIWidth}
                      onChange={handleChange}
                      style={errors.nIWidth ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      name="nIHeight"
                      value={props.nIHeight}
                      onChange={handleChange}
                      style={errors.nIHeight ? { borderColor: 'red' } : {}}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                    // onClick={props.handleAddItem}
                    >
                      <i className="fas fa-plus" />
                    </a>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="p-col-12">
          <Button
            label="Change Commodity Units"
            className="p-button-raised"
            disabled={activity}
            onClick={props.handleDialogOpen}
          />
          <Button
            label="Update Order"
            className="p-button-raised"
            disabled={activity || !props.canUpdate}
            onClick={props.handleUpdateOrder}
          />
          <Button
            label="Go Back"
            className="p-button-raised p-button-secondary"
            disabled={activity}
            onClick={props.handleGoBack}
          />
        </div>
      </div>
      <Dialog
        open={props.isDialogOpen}
        onClose={props.handleDialogClose}
        maxWidth="sm"
        classes={{ paper: 'category-dialog' }}
      >
        <DialogTitle>Select Category</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth>
              <InputLabel htmlFor="parent-category">Parent Category</InputLabel>
              <Select
                value={props.parentCategory}
                onChange={props.handleParentChange}
                input={<Input id="parent-category" />}
              >
                {props.categories.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <InputLabel htmlFor="sub-category">Sub Category</InputLabel>
              <Select
                value={props.subCategory}
                onChange={props.handleSubCategoryChange}
                input={<Input id="syb-category" />}
              >
                {props.subCategories.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <MButton onClick={props.handleDialogClose} color="primary">
            Ok
          </MButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.isDialogOpen}
        onClose={props.handleDialogClose}
        maxWidth="md"
      >
        <ChangeCommodityUnits
          {...props}
          handleChange={handleChange}
          handleDialogClose={props.handleDialogClose}
        />
      </Dialog>
    </div>
  );
};

OrdersEditComponent.defaultProps = {
  rates: {}
};

OrdersEditComponent.propTypes = {
  pickupDate: PropTypes.string,
  from: PropTypes.instanceOf(moment),
  to: PropTypes.instanceOf(moment),
  name: PropTypes.string,
  number: PropTypes.string,
  nIName: PropTypes.string,
  nICategory: PropTypes.string,
  nIHeight: PropTypes.string,
  nIWeight: PropTypes.string,
  nILength: PropTypes.string,
  nIWidth: PropTypes.string,
  nIQuantity: PropTypes.string,
  handleCommodityChange: PropTypes.func,
  handleDateChange: PropTypes.func,
  handleTimeChange: PropTypes.func,
  handleItemClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleGoBack: PropTypes.func,
  handleAddItem: PropTypes.func,
  handleUpdateOrder: PropTypes.func,
  handleDialogOpen: PropTypes.func,
  handleDialogClose: PropTypes.func,
  handleParentChange: PropTypes.func,
  handleSubCategoryChange: PropTypes.func,
  commodities: PropTypes.shape(),
  categories: PropTypes.arrayOf(PropTypes.shape),
  subCategories: PropTypes.arrayOf(PropTypes.shape),
  details: PropTypes.shape(),
  errors: PropTypes.shape(),
  activity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  isDialogOpen: PropTypes.bool,
  activeRow: PropTypes.string,
  parentCategory: PropTypes.string,
  subCategory: PropTypes.string,
  rates: PropTypes.shape({ price: PropTypes.number })
};

export default OrdersEditComponent;
