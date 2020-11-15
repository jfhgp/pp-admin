import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import Page from '../../../components/layout/Page';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';
import FormMaterialSelect from '../../../components/form/FormMaterialSelect';
import RangeInput from '../../../components/form/RangeInput';
import FormMaterialSearch from '../../../components/form/FormMaterialSearch';
import TransporterListCard from '../components/TransporterListCard';
import { Button } from "primereact/button";
const filterSelectItems = [
  { label: 'Active', value: 'active' },
  { label: 'Banned', value: 'banned' },
  { label: 'Verified', value: 'isVerified' }
];

const TransportersListComponent = props => {
  const { current, activity } = props;

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid manage-users-grid">
        <div className="p-col-12" style={{ padding: '0 1rem' }}>
          <Typography variant="h5">Transporters</Typography>
        </div>
        <div className="p-col-12" style={{ padding: '1rem' }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: 'rgb(250,120,22)' }}>Transporters</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            label="Clear All Filters"
            disabled={activity}
            className="p-button-raised"
            onClick={props.handleClearFilters}
          />
        </div>
        <div
          className="p-grid p-col-12"
          style={{ display: 'flex' }}
        >
          <div className="p-lg-4">
            <p style={{ color: 'rgb(250,120,22)', fontSize: 18 }}>Search</p>
            <FormMaterialSearch
              value={props.search}
              onChange={props.handleSearchChange}
              placeholder="search by name/number/email"
              disabled={activity}
            />
          </div>
          <div className="p-lg-4">
            <p style={{ color: 'rgb(250,120,22)', fontSize: 18 }}>Status</p>
            <FormMaterialSelect
              value={props.filter}
              onChange={props.handleFilterChange}
              options={filterSelectItems}
              disabled={activity}
            />
          </div>
          <div className="p-lg-4">
            <p style={{ color: 'rgb(250,120,22)', fontSize: 18 }}>Commodity Type</p>
            <FormMaterialSelect
              value={props.categoriesId}
              onChange={e =>
                props.handleRangeChangeComplete({
                  target: {
                    name: 'categoriesId',
                    value: e.target.value
                  }
                })
              }
              options={props.categories.map(category => {
                let label = category.name;
                let value = category._id;
                return { label, value };
              })}
              disabled={activity}
            />
          </div>
          <div className="p-lg-5" style={{ margin: 20 }}>
            <p style={{ color: 'rgb(250,120,22)', fontSize: 18 }}>Age</p>
            <RangeInput
              min={18}
              max={100}
              value={props.ageValue}
              onChange={e =>
                props.handleRangeChange({
                  target: {
                    name: 'ageValue',
                    value: e
                  }
                })
              }
              onChangeComplete={e =>
                props.handleRangeChangeComplete({
                  target: {
                    name: 'ageValue',
                    value: e
                  }
                })
              }
            />
          </div>
          <div className="p-lg-5" style={{ margin: 20 }}>
            <p style={{ color: 'rgb(250,120,22)', fontSize: 18 }}>Completed Requests</p>
            <RangeInput
              value={props.completedRequestValue}
              onChange={e =>
                props.handleRangeChange({
                  target: {
                    name: 'completedRequestValue',
                    value: e
                  }
                })}
              onChangeComplete={e =>
                props.handleRangeChangeComplete({
                  target: {
                    name: 'completedRequestValue',
                    value: e
                  }
                })
              }
              min={0}
              max={5000}
            />
          </div>
        </div>
        {current.length ? (
          current.map(item => (
            <div
              key={item._id}
              className="p-col-12 p-md-4 p-lg-3"
              style={{ padding: '0px 1rem 2rem' }}
            >
              <TransporterListCard item={item} />
            </div>
          ))
        ) : (
            <div className="p-col-12">
              <EmptyDataPlaceholder message="No transporters available." />
            </div>
          )}
      </div>
    </Page >
  );
};

TransportersListComponent.propTypes = {
  activity: PropTypes.bool,
  filter: PropTypes.string,
  search: PropTypes.string,
  handleFilterChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  current: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      mobile: PropTypes.string,
      active: PropTypes.bool,
      isVerified: PropTypes.bool,
      banned: PropTypes.bool
    })
  )
};

export default TransportersListComponent;
