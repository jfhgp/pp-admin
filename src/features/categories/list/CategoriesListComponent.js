import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button, Dialog } from '@material-ui/core/';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Page from '../../../components/layout/Page';
import CategoriesAddContainer from '../add/CategoriesAddContainer';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';
import { getNewColors } from '../../../utils/functions';

const CategoriesListComponent = props => {
  const { activity, categories, handleChange, handleCategories } = props;
  console.log("THis os all categories i received in list", categories);
  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: '0 1rem' }}
      style={{}}
    >
      <div className="p-grid" style={{ margin: 0, padding: '0 1rem' }}>
        <div className="p-col-12">
          <Typography variant="h5">Categories</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div style={{ color: getNewColors('secondary') }}>Categories</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12 text-right">
          <Button
            variant="contained"
            disabled={activity}
            onClick={() => handleChange('showDialog', true)}
          >
            Add Category
          </Button>
        </div>
        {categories.length ? (
          <div className="p-col-12" style={{ padding: '1rem 0' }}>
            <div className="c-list-div">
              {categories.map(item => (
                <div key={item._id} className={item.active ? 'transporter-list-card' : 'transporter-list-card in-active'}>
                  {item.name}
                  {!item.approved ? (
                    <div className="p-col-12">
                      <Button
                        style={{ backgroundColor: getNewColors('secondary'), color: "white" }}
                        variant="contained"
                        disabled={activity}
                        onClick={() => { if (window.confirm('Are you sure you wish to approve this category?')) props.handleApproveCategory(item) }}
                      >
                        Approve
           </Button>
                    </div>
                  ) : null}

                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="p-col-12">
              <EmptyDataPlaceholder message="No categories found." />
            </div>
          )}
      </div>
      <Dialog
        open={props.showDialog}
        onClose={() => handleChange('showDialog', false)}
        maxWidth="md"
      >
        <CategoriesAddContainer
          categories={categories}
          handleCategories={handleCategories}
        />
      </Dialog>
    </Page>
  );
};

CategoriesListComponent.propTypes = {
  activity: PropTypes.bool,
  showDialog: PropTypes.bool,
  handleChange: PropTypes.func,
  handleCategories: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool
    })
  )
};

export default CategoriesListComponent;
