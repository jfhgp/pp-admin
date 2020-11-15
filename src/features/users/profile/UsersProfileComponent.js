import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';
import { Typography, Dialog, Divider, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import Page from '../../../components/layout/Page';
import UsersBanContainer from '../ban/UsersBanContainer';
import OrderCard from '../../../components/OrderCard';
import { getNewColors } from '../../../utils/functions';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';

class UsersProfileComponent extends Component {
  render() {
    const {
      details,
      handleChange,
      dialogData: { comp: Comp, show },
      activity,
      handleDetailsAfterAction
    } = this.props;

    const picture =
      details.picture ||
      'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png';

    return (
      <Page
        activity={activity}
        className="dashboard-div layout-page"
        activityStyle={{ margin: '0 1rem' }}
        style={{}}
      >
        <div className="p-grid" style={{ margin: 0, padding: '0 1rem' }}>
          <div className="p-col-12">
            <Typography variant="h5">User Profile</Typography>
          </div>
          <div className="p-col-12">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="Breadcrumb"
            >
              <div>Dashboard</div>
              <div style={{ color: getNewColors('secondary') }}>
                User Profile
              </div>
            </Breadcrumbs>
          </div>
          <div className="p-col-12 p-md-5 p-lg-4">
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096'
              }}
            >
              <Typography variant="h6">Profile Details</Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  className={`${
                    details.banned
                      ? 'profile-picture banned'
                      : details.active
                      ? 'profile-picture active'
                      : 'profile-picture'
                  }`}
                  style={{
                    marginTop: '1rem',
                    position: 'relative'
                  }}
                >
                  <img alt={details.firstName} src={picture} />
                  {details.banned ? (
                    <i className="fas fa-times" />
                  ) : details.active ? (
                    <i className="fas fa-check" />
                  ) : null}
                </div>
                <Typography variant="h6" style={{ fontSize: 20 }}>
                  {details.firstName} {details.lastName}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: getNewColors('dark-gray') }}
                >
                  {details.email}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: getNewColors('dark-gray') }}
                >
                  {details.mobile}
                </Typography>
              </div>
              <Divider style={{ margin: '1rem 0' }} />
              <div className="rating-div">
                <StarRatingComponent
                  name="transporter-rating"
                  value={details.rating / details.totalOrders}
                  starColor="rgb(255,218,45)"
                  emptyStarColor="#a5c8ce5e"
                  editing={false}
                />
                <span style={{ marginLeft: '0.5rem' }}>
                  ({details.totalOrders} Orders)
                </span>
              </div>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-around',
                  color: getNewColors('light-gray')
                }}
              >
                <div>
                  <div
                    style={{
                      padding: '0 1rem',
                      color: details.active ? '#000' : 'unset'
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: details.active ? 'rgb(0,175,12)' : 'unset'
                      }}
                    />{' '}
                    Active
                  </div>
                  <div
                    style={{
                      padding: '0 1rem',
                      marginTop: '0.5rem',
                      color: details.isSubDriver ? '#000' : 'unset'
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: details.isSubDriver ? 'rgb(0,175,12)' : 'unset'
                      }}
                    />{' '}
                    Sub Driver
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      padding: '0 1rem',

                      color: details.isVerified ? '#000' : 'unset'
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: details.isVerified ? 'rgb(0,175,12)' : 'unset'
                      }}
                    />{' '}
                    Verified
                  </div>

                  <div
                    style={{
                      padding: '0 1rem',
                      marginTop: '0.5rem',
                      color: details.banned ? '#000' : 'unset'
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: details.banned ? '#b10000' : 'unset'
                      }}
                    />{' '}
                    Banned
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: '1rem'
                }}
              >
                <Button
                  style={{
                    backgroundColor: !details.banned
                      ? 'rgb(195,3,3)'
                      : '#2ec1f8',
                    color: '#fff',
                    padding: '0.7rem',
                    width: '100%',
                    marginBottom: '0.5rem',
                    borderRadius: 0
                  }}
                  disabled={activity}
                  onClick={() =>
                    handleChange('dialogData', {
                      comp: UsersBanContainer,
                      show: true
                    })
                  }
                >
                  {details.banned ? 'APPROVE' : 'BAN'}
                </Button>
              </div>
            </div>
          </div>
          <div
            className="p-col-12 p-md-12 p-lg-8"
            style={{ position: 'relative', minHeight: 450 }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                position: 'absolute',
                top: 7,
                right: 7,
                bottom: 7,
                left: 7,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                Orders History
              </Typography>
              <div className="p-grid" style={{ margin: 0, overflowY: 'auto' }}>
                {details.orders.length ? (
                  details.orders.map(order => {
                    return (
                      <div className="p-col-12 p-md-6" key={order._id}>
                        <OrderCard item={order} />
                      </div>
                    );
                  })
                ) : (
                  <EmptyDataPlaceholder message="No orders available." />
                )}
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={show}
          onClose={() => handleDetailsAfterAction({})}
          maxWidth="md"
        >
          <Comp
            data={details}
            handleDetailsAfterAction={handleDetailsAfterAction}
          />
        </Dialog>
      </Page>
    );
  }
}

UsersProfileComponent.defaultProps = {
  details: {
    firstName: '-',
    lastName: '',
    email: '-',
    mobile: '-',
    orders: [],
    totalOrders: 0,
    rating: 0,
    active: false,
    isVerified: false,
    isSubDriver: false,
    banned: false,
    picture:
      'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png'
  }
};

UsersProfileComponent.propTypes = {
  handleChange: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  dialogData: PropTypes.shape({
    comp: PropTypes.func,
    show: PropTypes.bool,
    data: PropTypes.shape()
  }),
  activity: PropTypes.bool,
  details: PropTypes.shape({
    totalOrders: PropTypes.number,
    rating: PropTypes.number,
    _id: PropTypes.string,
    picture: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    active: PropTypes.bool,
    isSubDriver: PropTypes.bool,
    isVerified: PropTypes.bool,
    banned: PropTypes.bool,
    orders: PropTypes.arrayOf(PropTypes.shape())
  })
};

export default UsersProfileComponent;
