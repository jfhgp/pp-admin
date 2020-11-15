import React from "react";
import PropTypes from "prop-types";

import { Typography, Menu, DialogContent, Divider } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import { Button } from "primereact/button";

import Page from "../../../../components/layout/Page";
import LocationCardComponent from "../LocationCardComponent";
import TransporterCardComponent from "../TransporterCardComponent";
import GoogleMapComponent from "../../../../components/map/GoogleMapComponent";

/**
 * Custom Marker
 */
const CustomMarker = ({ left, top }) => (
  <div className="custom-marker" style={{ left: left, top: top }}>
    <LocationOn />
  </div>
);
CustomMarker.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number
};
/**********************************************************/

/**
 * Sub Orders
 */

const SubOrdersComponent = props => {
  const {
    pickupTransporters,
    dropoffTransporters,
    activity,
    isVisible,
    details,
    creatingFrom,
    handleFindTransporters,
    transportersAtCurrentLocation,
    spacesAtCurrentLocation,
    handleSpaceSearch,
    tempRoutes,
    handleStopsClick,
    handleUpdateSubOrder
  } = props;

  return (
    <Page activity={activity} activityStyle={{}} className="add-route-page">
      <div>
        <DialogContent>
          <Divider />
          <div>
            <p>#{details.orderNumber}</p>
            <button onClick={() => props.handleDetailsAfterAction(details)}>
              <i className="fas fa-times" />
            </button>
          </div>
          <Divider />
          <div className="p-grid" style={{ margin: 0 }}>
            <div className="p-col-12">
              <LocationCardComponent
                address={details.pickup.address}
                iconType="pickup"
              />
              <LocationCardComponent
                address={details.dropoff.address}
                iconType="dropoff"
              />
            </div>
            <div className="p-col-12" style={{ padding: 0 }}>
              <Divider />
            </div>
            <div className="p-col-12" style={{ padding: "24px 0" }}>
              {isVisible && (
                <React.Fragment>
                  <GoogleMapComponent
                    showMarkers
                    mapType="static"
                    mapElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: 300 }} />}
                    coordinates={[
                      details.pickup.location,
                      details.dropoff.location,

                    ]}
                    spacesAtCurrentLocation={spacesAtCurrentLocation}
                    handleMapClick={props.handleMapClick}
                    handleOpenInfoWindow={props.handleOpenInfoWindow}
                    {...props}
                  />
                  {/* <Map
                  center={[
                    details.pickup.location[1],
                    details.pickup.location[0]
                  ]}
                  zoom={5}
                  height={300}
                  onClick={props.handleMapClick}
                > */}
                  {/* {pickup.location && (
                    <Marker anchor={[pickup.location[1], pickup.location[0]]} />
                  )}
                  {dropoff.location && (
                    <Marker
                      anchor={[dropoff.location[1], dropoff.location[0]]}
                    />
                  )} */}
                  {/* {routes.map((item, index) => (
                    <Marker
                      key={index}
                      anchor={[
                        item.dropoff.location[1],
                        item.dropoff.location[0]
                      ]}
                      onClick={props.handleMapClick}
                    />
                  ))} */}
                  {/* <Marker
                    anchor={[
                      details.pickup.location[1],
                      details.pickup.location[0]
                    ]}
                    onClick={props.handleMapClick}
                  />
                  <Marker
                    anchor={[
                      details.dropoff.location[1],
                      details.dropoff.location[0]
                    ]}
                    onClick={props.handleMapClick}
                  /> */}
                  {/* {nearby.length &&
                nearby.map(item => (
                  <CustomMarker
                    key={item._id}
                    anchor={[item.location[1], item.location[0]]}
                  />
                ))} */}
                  {/* </Map> */}
                </React.Fragment>
              )}
            </div>
            <div className="p-col-12" style={{ padding: 0 }}>
              <Divider />
            </div>
            <div className="p-col-12" style={{ paddingTop: 24 }}>
              <span>Temporary Routes</span>
              <div className="p-grid" style={{ overflowX: "auto" }}>
                {tempRoutes.map((tempRoute, index) => {
                  return (
                    <div
                      key={tempRoute._id}
                      className="p-col-12 p-lg-6 sub-order-box"
                      style={{
                        padding: "0 0.5rem 24px 0.5rem",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Typography variant="subheading">
                        Sub Order {index + 1}
                      </Typography>
                      <div>
                        <div style={{ flexGrow: 1 }}>
                          <LocationCardComponent
                            address={tempRoute.origin.name}
                            iconType="pickup"

                          />
                        </div>
                        <div>
                          <span />
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <LocationCardComponent
                            {...tempRoute.destination}
                            address={tempRoute.destination.name}
                            handleSpaceSearch={handleSpaceSearch}
                            iconType="dropoff"
                            subOrder={true}
                            handleUpdateSubOrder={handleUpdateSubOrder}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-col-12" style={{ padding: 0 }}>
              <Divider />
            </div>
            <div className="p-col-12 text-right" style={{ padding: "24px 0" }}>
              <Button
                label="Add Orders"
                onClick={e =>
                  handleStopsClick(e, [
                    { address: "Confirm", onClick: props.handleSubmit }
                  ])
                }
                disabled={tempRoutes.length === 0 || activity}
              />
              <Button
                label={tempRoutes.length ? "Reset" : "Break Order"}
                className="p-button-secondary"
                disabled={activity}
                onClick={
                  tempRoutes.length
                    ? props.handleResetTempRoutes
                    : props.handleBreakOrder
                }
                style={{ marginLeft: "1rem" }}
              />
            </div>

            {!tempRoutes.length ? (
              <div className="p-col-12 p-md-6">
                <div className="grid" style={{ margin: 0 }}>
                  <div className="p-col-12">
                    <Typography variant="title">Pickup Transporters</Typography>
                  </div>
                  {pickupTransporters.length ? (
                    pickupTransporters.map(item => (
                      <div className="p-col-12 p-lg-9" key={item._id}>
                        <TransporterCardComponent
                          item={item}
                          handleFindTransporters={handleFindTransporters}
                          handleStopsClick={handleStopsClick}
                          transporterType="pickup"
                        />
                      </div>
                    ))
                  ) : (
                      <div className="empty-transporters p-col-12 p-lg-6">
                        No Transporters found.
                      </div>
                    )}
                </div>
              </div>
            ) : null}
            {!tempRoutes.length ? (
              <div className="p-col-12 p-md-6">
                <div className="grid" style={{ margin: 0 }}>
                  <div className="p-col-12">
                    <Typography variant="title">
                      Drop off Transporters
                    </Typography>
                  </div>
                  {dropoffTransporters.length ? (
                    dropoffTransporters.map(item => (
                      <div className="p-col-12 p-lg-9" key={item._id}>
                        <TransporterCardComponent
                          item={item}
                          handleFindTransporters={handleFindTransporters}
                          handleStopsClick={handleStopsClick}
                          transporterType="dropoff"
                        />
                      </div>
                    ))
                  ) : (
                      <div className="empty-transporters p-col-12 p-lg-6">
                        No Transporters found.
                      </div>
                    )}
                </div>
              </div>
            ) : null}
            {tempRoutes.length ? (
              <div className="p-col-12 p-lg-4">
                <p>Transporters</p>
                <span>
                  At{" "}
                  {
                    tempRoutes[props.currentIndex][
                      creatingFrom === "pickup" ? "destination" : "origin"
                    ].name
                  }
                </span>
                {transportersAtCurrentLocation.length ? (
                  transportersAtCurrentLocation.map(transporter => (
                    <TransporterCardComponent
                      key={transporter._id}
                      item={transporter}
                      handleFindTransporters={handleFindTransporters}
                      handleStopsClick={handleStopsClick}
                      transporterType={creatingFrom}
                    />
                  ))
                ) : (
                    <div className="empty-transporters">
                      No Transporters found.
                    </div>
                  )}
              </div>
            ) : null}
          </div>
        </DialogContent>
      </div>
      <Menu
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleStopsClose}
        PaperProps={{ style: { maxHeight: 200 } }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {props.options.map((item, index) => (
          <p
            key={`stopOver-${index + 1}`}
            className="t-p-menu-item"
            onClick={e => (item.onClick ? item.onClick(e) : null)}
            style={
              item.onClick ? { cursor: "pointer", padding: "1rem 2rem" } : {}
            }
          >
            {item.address}
          </p>
        ))}
      </Menu>
    </Page>
  );
};

SubOrdersComponent.defaultProps = {
  dropoffTransporters: [],
  pickupTransporters: [],
  tempRoutes: []
};

SubOrdersComponent.propTypes = {
  pickupTransporters: PropTypes.arrayOf(PropTypes.shape()),
  dropoffTransporters: PropTypes.arrayOf(PropTypes.shape()),
  tempRoutes: PropTypes.arrayOf(PropTypes.shape()),
  transportersAtCurrentLocation: PropTypes.arrayOf(PropTypes.shape()),
  options: PropTypes.arrayOf(PropTypes.shape()),
  activity: PropTypes.bool,
  isVisible: PropTypes.bool,
  details: PropTypes.shape(),
  anchorEl: PropTypes.shape(),
  creatingFrom: PropTypes.string,
  handleFindTransporters: PropTypes.func,
  handleStopsClick: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  handleMapClick: PropTypes.func,
  handleBreakOrder: PropTypes.func,
  handleResetTempRoutes: PropTypes.func,
  handleStopsClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  currentIndex: PropTypes.number
};

export default SubOrdersComponent;
