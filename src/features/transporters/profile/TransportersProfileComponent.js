import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider, Typography, Menu, Dialog, Button } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import StarRatingComponent from 'react-star-rating-component';

import Page from '../../../components/layout/Page';
import TransportersBanContainer from '../ban/TransportersBanContainer';
import OrderCard from '../../../components/OrderCard';
import { getNewColors } from '../../../utils/functions';
import EmptyDataPlaceholder from '../../../components/layout/EmptyDataPlaceholder';
import TransporterTravellingCard from '../components/TransporterTravellingCard';
import VehicleCardComponent from '../../vehicles/components/VehicleCardComponent';

class TransportersProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      options: []
    };
  }

  handleClick = (event, options) => {
    this.setState({ anchorEl: event.currentTarget, options });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, options: [] });
  };

  render() {
    const {
      details,
      handleChange,
      dialogData: { comp: Comp, show },
      activity,
      handleDetailsAfterAction,
      handleDocumentsClick,
      handleUpdateExpirationDate
    } = this.props;
    console.log("THis is the all props i received", this.props)
    const users = details.users ? details.users : []
    const count = details.customerCount ? details.customerCount : {}
    const picture =
      details.picture ||
      'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png';
    const bankInfo = details.bankInfo || {};

    return (
      <Page
        activity={activity}
        className="dashboard-div layout-page"
        activityStyle={{ margin: '0 1rem' }}
        style={{}}
      >
        <div
          className="p-grid transporter-profile-grid"
          style={{ margin: 0, padding: '0 1rem' }}
        >
          <div className="p-col-12">
            <Typography variant="h5">Transporter Profile</Typography>
          </div>
          <div className="p-col-12">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="Breadcrumb"
            >
              <div>Dashboard</div>
              <div style={{ color: getNewColors('secondary') }}>
                Transporter Profile
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
                {!details.active ? (
                  <Button
                    style={{
                      backgroundColor: 'rgb(0,175,12)',
                      color: '#fff',
                      padding: '0.7rem',
                      width: '100%',
                      marginBottom: '0.5rem',
                      borderRadius: 0
                    }}
                    disabled={details.active || activity}
                    onClick={this.props.handleActivateTransporter}
                  >
                    ACTIVATE
                  </Button>
                ) : null}

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
                      comp: TransportersBanContainer,
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
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Customer Wise Request</Typography>
              <div
                style={{
                  overflowY: 'auto'
                }}
              >
                {users.length ? (
                  users.map(user => {
                    return (
                      <div key={user._id}>
                        <div
                          style={{
                            display: 'flex',
                            marginTop: '1rem'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p>
                              Customer:{' '}
                              <span>
                                {user.firstName} {user.lastName}
                              </span>
                            </p>
                            <StarRatingComponent
                              name="user-rating"
                              value={user.rating / user.totalOrders}
                              editing={false}
                              emptyStarColor="#bbb"
                            />
                          </div>
                          <div style={{ justifyContent: "flex-end", paddingRight: 30 }}>
                            <p>
                              <span style={{ fontSize: 20 }}>
                                {count[user._id] || '0'}
                              </span>
                            </p>
                          </div>
                        </div>


                        <Divider />
                      </div>
                    )
                  })
                ) : (
                    <EmptyDataPlaceholder message="No Data available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Service Areas</Typography>
              <div
                style={{
                  overflowY: 'auto'
                }}
              >
                {details.serviceAreas.length ? (
                  details.serviceAreas.map(area => {
                    const split = area.name ? area.name.split(',') : false;

                    return split ? (
                      <div key={area._id}>
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: '1rem',
                            marginTop: '1rem'
                          }}
                        >
                          <i
                            className="fas fa-map-marker-alt"
                            style={{
                              fontSize: '1rem',
                              marginRight: 10,
                              color: getNewColors('secondary')
                            }}
                          />
                          <div>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                                color: getNewColors('blue'),
                                lineHeight: '14px'
                              }}
                            >
                              {split[split.length - 1]}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                color: getNewColors('gray'),
                                marginTop: 3
                              }}
                            >
                              {area.name}
                            </p>
                          </div>
                        </div>
                        <Divider />
                      </div>
                    ) : null;
                  })
                ) : (
                    <EmptyDataPlaceholder message="No service areas available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Bank Information</Typography>
              {bankInfo._id ? (
                <div
                  style={{
                    marginTop: '1rem'
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    style={{
                      color: getNewColors('secondary'),
                      margin: 0,
                      fontSize: '1rem',
                      lineHeight: '14px'
                    }}
                  >
                    Account # 1
                  </Typography>
                  <Divider style={{ margin: '10px 0 1rem 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        maxWidth: 150,
                        width: '100%',
                        color: getNewColors('blue'),
                        fontSize: '1rem'
                      }}
                    >
                      IBAN:
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        color: getNewColors('gray'),
                        fontSize: '1rem'
                      }}
                    >
                      {bankInfo.iban}
                    </Typography>
                  </div>
                </div>
              ) : (
                  <EmptyDataPlaceholder message="No bank information available." />
                )}
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Travelling Information</Typography>
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                {details.travelling.length ? (
                  details.travelling.map(travel => {
                    return (
                      <div key={travel._id}>
                        <TransporterTravellingCard
                          travelling={travel}
                          onStopsClick={e =>
                            this.handleClick(e, travel.stopOvers)
                          }
                        />
                      </div>
                    );
                  })
                ) : (
                    <EmptyDataPlaceholder message="No travelling information available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Vehicles Information</Typography>
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                {details.vehicles.length ? (
                  details.vehicles.map((vehicle, index) => {
                    return (
                      <div key={vehicle._id}>
                        <VehicleCardComponent
                          vehicles={details.vehicles}
                          vehicle={vehicle}
                          type="transporter"
                          index={index}
                          onDocumentsClick={() =>
                            handleDocumentsClick(vehicle.documents)
                          }
                          handleVehiclesAfterAction={handleDetailsAfterAction}
                        />
                      </div>
                    );
                  })
                ) : (
                    <EmptyDataPlaceholder message="No vehicles information available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Identity</Typography>
              <div
                style={{
                  marginTop: '1rem',
                  overflowX: 'auto'
                }}
              >
                {details.identity.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="p-col-12">
                      <DatePicker
                        format="D MMMM YYYY"
                        helperText="Expiration date for transporter's identification."
                        value={
                          details.idCardExpiry !== 0
                            ? details.idCardExpiry
                            : null
                        }
                        error={
                          details.idCardExpiry === 0 ||
                          moment().isAfter(moment(details.idCardExpiry))
                        }
                        onChange={date =>
                          handleUpdateExpirationDate('idCardExpiry', date)
                        }
                        disabled={activity}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      {details.identity.map((id, index) => {
                        return (
                          <div
                            key={`identity-${index + 1}`}
                            className="p-col-12 p-md-6"
                          >
                            <img
                              alt="Identification"
                              src={id.path}
                              style={{ width: '100%', cursor: 'pointer' }}
                              onClick={() =>
                                handleDocumentsClick(details.identity)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                    <EmptyDataPlaceholder message="No identity information available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">Visa</Typography>
              <div
                style={{
                  marginTop: '1rem',
                  overflowX: 'auto'
                }}
              >
                {details.visa.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="p-col-12">
                      <DatePicker
                        format="D MMMM YYYY"
                        helperText="Expiration date for transporter's visa."
                        value={
                          details.visaExpiry !== 0 ? details.visaExpiry : null
                        }
                        error={
                          details.visaExpiry === 0 ||
                          moment().isAfter(moment(details.visaExpiry))
                        }
                        onChange={date =>
                          handleUpdateExpirationDate('visaExpiry', date)
                        }
                        disabled={activity}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      {details.visa.map((item, index) => {
                        return (
                          <div
                            key={`visa-${index + 1}`}
                            className="p-col-12 p-md-6"
                          >
                            <img
                              alt="Visa"
                              src={item.path}
                              style={{ width: '100%', cursor: 'pointer' }}
                              onClick={() => handleDocumentsClick(details.visa)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                    <EmptyDataPlaceholder message="No visa information available." />
                  )}
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-6">
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: 5,
                boxShadow: '0px 2px 5px -2px #00000096',
                height: 400,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6">License</Typography>
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                {details.license.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="p-col-12">
                      <DatePicker
                        format="D MMMM YYYY"
                        helperText="Expiration date for transporter's license."
                        value={
                          details.licenseExpiry !== 0
                            ? details.licenseExpiry
                            : null
                        }
                        error={
                          details.licenseExpiry === 0 ||
                          moment().isAfter(moment(details.licenseExpiry))
                        }
                        onChange={date =>
                          handleUpdateExpirationDate('licenseExpiry', date)
                        }
                        disabled={activity}
                      />
                    </div>
                    <div style={{ display: 'flex' }}>
                      {details.license.map((item, index) => {
                        return (
                          <div
                            key={`license-${index + 1}`}
                            className="p-col-12 p-md-6"
                          >
                            <img
                              alt="License"
                              src={item.path}
                              style={{ width: '100%', cursor: 'pointer' }}
                              onClick={() =>
                                handleDocumentsClick(details.license)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                    <EmptyDataPlaceholder message="No license information available." />
                  )}
              </div>
            </div>
          </div>
        </div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          PaperProps={{ style: { maxHeight: 200 } }}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          {this.state.options.map((item, index) => (
            <p key={`stopOver-${index + 1}`} className="t-p-menu-item">
              {item.address}
            </p>
          ))}
        </Menu>
        <Dialog
          open={show}
          onClose={() =>
            handleChange('dialogData', {
              comp: Comp,
              show: false
            })
          }
        >
          <Comp
            data={details}
            handleChange={handleChange}
            handleDetailsAfterAction={handleDetailsAfterAction}
          />
        </Dialog>
      </Page >
    );
  }
}

export default TransportersProfileComponent;

TransportersProfileComponent.defaultProps = {
  details: {
    firstName: '-',
    lastName: '',
    email: '-',
    mobile: '-',
    mode: [],
    orders: [],
    serviceAreas: [],
    identity: [],
    vehicles: [],
    visa: [],
    license: [],
    travelling: [],
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

TransportersProfileComponent.propTypes = {
  handleChange: PropTypes.func,
  handleActivateTransporter: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  handleDocumentsClick: PropTypes.func,
  handleUpdateExpirationDate: PropTypes.func,
  dialogData: PropTypes.shape({
    show: PropTypes.bool,
    data: PropTypes.shape()
  }),
  activity: PropTypes.bool,
  details: PropTypes.shape({
    totalOrders: PropTypes.number,
    rating: PropTypes.number,
    _id: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    active: PropTypes.bool,
    isSubDriver: PropTypes.bool,
    isVerified: PropTypes.bool,
    banned: PropTypes.bool,
    bankInfo: PropTypes.shape(),
    travellingInfo: PropTypes.shape(),
    mode: PropTypes.arrayOf(PropTypes.string),
    serviceAreas: PropTypes.arrayOf(PropTypes.shape()),
    orders: PropTypes.arrayOf(PropTypes.shape()),
    stopOvers: PropTypes.arrayOf(PropTypes.shape())
  })
};
