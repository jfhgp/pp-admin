import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import Page from '../../../components/layout/Page';
import OrderCard from '../../../components/OrderCard';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';
import FormMaterialSelect from '../../../components/form/FormMaterialSelect';
import FormMaterialSearch from '../../../components/form/FormMaterialSearch';
import { getNewColors } from '../../../utils/functions';

const filterSelectItems = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Picked', value: 'picked' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' }
];

const OrdersListComponent = props => {
  const { current, activity } = props;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid orders-list-grid">
        <div className="p-col-12">
          <Typography variant="h5">Orders</Typography>
        </div>
        <div className="p-col-12 p-md-4">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors('secondary') }}>Orders</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12">
          <div className="p-grid p-justify-end">
            <div className="p-col-12 p-md-6 p-lg-4">
              <FormMaterialSelect
                value={props.filter}
                onChange={props.handleFilterChange}
                options={filterSelectItems}
                disabled={activity}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-4">
              <FormMaterialSearch
                value={props.search}
                onChange={props.handleChange}
                name="search"
                placeholder="search by order #"
                disabled={activity}
              />
            </div>
          </div>
        </div>
        {current.length ? (
          current.map(item => {
            return (
              <div
                key={item._id}
                className="p-col-12 p-md-6 p-lg-4"
                style={{ padding: '0 1rem 2rem 1rem' }}
              >
                <OrderCard item={item} activity={activity} />
              </div>
            );
          })
        ) : (
          <div className="p-col-12">
            <EmptyDataPlaceholder message="No orders available." />
          </div>
        )}
      </div>
    </Page>
  );
};

OrdersListComponent.propTypes = {
  current: PropTypes.arrayOf(PropTypes.object),
  activity: PropTypes.bool,
  classes: PropTypes.shape(),
  search: PropTypes.string,
  filter: PropTypes.string,
  handleChange: PropTypes.func,
  handleFilterChange: PropTypes.func
};

export default OrdersListComponent;
