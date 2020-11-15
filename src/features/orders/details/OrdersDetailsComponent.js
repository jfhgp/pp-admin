import React from "react";
import PropTypes from "prop-types";

import {
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import LocationOn from "@material-ui/icons/LocationOn";
import moment from "moment";
// import Map from "pigeon-maps";
// import Marker from "pigeon-marker";
import { Button } from "primereact/button";

/** Route Constants **/
import routeConstants from "../../../constants/route-constants";

import Page from "../../../components/layout/Page";
import SubOrdersContainer from "../components/sub-orders/SubOrdersContainer";
import OrdersCancelContainer from "../cancel/OrdersCancelContainer";
import AssignTransporterComponent from "./AssignTransporterComponent";
import MapOverlayComponent from "../components/MapOverlayComponent";
import OrdersEditContainer from "../edit/OrdersEditContainer";
import { getNewColors, isEmpty } from "../../../utils/functions";
import { RestrictedLink } from "../../../utils/permissions.utils";
import features from "../../../constants/feature-constants";
import actionConstants from "../../../constants/actions-constants";
import GoogleMapComponent from "../../../components/map/GoogleMapComponent";

const hideOrderLocationOn = [
  "pending",
  "delivered",
  "accepted",
  "cancelledbyuser",
  "cancelledbytransporter",
  "cancelledbyadmin"
];

const getActions = details => {
  switch (details.status) {
    case "delivered": {
      return { refund: true, assign: false };
    }
    case "accepted": {
      return { cancel: true, refund: true, update: true, assign: true };
    }
    case "pending": {
      return {
        cancel: true,
        subOrder: details.subOrder || details.routes.length ? false : true,
        assign: true,
        refund: true,
        update: true
      };
    }
    case "picked": {
      return { cancel: true, refund: true, update: true, assign: true };
    }
    case "onmyway": {
      return { cancel: true, refund: true, update: true, assign: true };
    }
    default: {
      return {};
    }
  }
};

const getMaxWidth = comp => {
  switch (comp) {
    case "order-cancel": {
      return "sm";
    }
    case "add-route": {
      return false;
    }
    case "order-assign": {
      return "xl";
    }
    case "order-update": {
      return false;
    }
    default: {
      return false;
    }
  }
};

const OrdersDetailsComponent = props => {
  const {
    activity,
    details,
    routeDialogVisible,
    handleChange,
    modalData: { Comp, component },
    handleSetModalData,
    handleGetDetails,
    handleOverlay,
    mapOverlay,
    handleDetailsAfterAction
  } = props;

  const transporter = details.transporter || {};
  const user = details.user || {};
  const contact = details.contact || {};
  const pickup = details.pickup || {};
  const dropoff = details.dropoff || {};
  const config = details.config || {};
  const pickupTime = details.pickupTime || {};
  const timeLogs = details.timeLogs || {};
  const commodities = details.commodities || [];
  const routes = details.routes || [];
  const pickupImages = details.pickupImages || [];
  const deliveredImages = details.deliveredImages || [];
  const actions = getActions(details);

  return (
    <Page
      activity={activity}
      className="dashboard-div layout-page"
      activityStyle={{ margin: "0 1rem" }}
      style={{}}
    >
      <div className="p-grid orders-details-grid">
        <div className="p-col-12 padding-01rem">
          <Typography variant="h5">Order Details</Typography>
        </div>
        <div className="p-col-12">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="Breadcrumb"
          >
            <div>Dashboard</div>
            <div>Orders</div>
            <div>Details</div>
          </Breadcrumbs>
        </div>
        <div className="p-col-12 details-box">
          <div>
            {/** @TODO
            Use media queries for responsive design
            */}
            <div className="p-grid">
              <div className="p-col-12 padding-01rem">
                <Divider />
                <div className="details-header">
                  <div>
                    <p>#{details.orderNumber}</p>
                    <p>
                      {details.config.currency} {details.rates.price}
                    </p>
                    <div>
                      <p>{moment(details.pickupDate).format("DD MMM, YYYY")}</p>
                      <p>
                        {pickupTime.from} - {pickupTime.to}
                      </p>
                      <p>{details.deliveryType.toUpperCase()}</p>
                    </div>
                  </div>
                  <div style={{ color: getNewColors(details.status) }}>
                    {details.status.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="p-col-12 p-md-6 p-lg-4 padding-0">
                <Divider style={{ marginLeft: "1rem" }} />
                <div className="padding-01rem">
                  <p>CUSTOMER</p>
                  <Divider />
                  <RestrictedLink
                    to={`${routeConstants.users}/${user._id}`}
                    target="_blank"
                    featureAndAction={{
                      feature: features.users,
                      action: actionConstants.read
                    }}
                  >
                    <div>
                      <p>
                        <i className="fas fa-user" />
                        {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <i className="fas fa-mobile-alt" />
                        {user.mobile}
                      </p>
                      <p>
                        <i className="fas fa-envelope" />
                        {user.email}
                      </p>
                    </div>
                  </RestrictedLink>
                </div>
              </div>
              <div className="p-col-12 p-md-6 p-lg-4 padding-0">
                <Divider />
                <div className="padding-01rem">
                  <p>RECEIVER</p>
                  <Divider />
                  <div>
                    <p>
                      <i className="fas fa-user" />
                      {contact.name}
                    </p>
                    <p>
                      <i className="fas fa-mobile-alt" />
                      {contact.number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-col-12 p-md-6 p-lg-4 padding-0">
                <Divider style={{ marginRight: "1rem" }} />
                <div className="padding-01rem">
                  <p>TRANSPORTER</p>
                  <Divider />
                  <RestrictedLink
                    to={
                      transporter._id
                        ? `${routeConstants.transporters}/${transporter._id}`
                        : "#"
                    }
                    target="_blank"
                    featureAndAction={{
                      feature: features.transporters,
                      action: actionConstants.read
                    }}
                  >
                    <div>
                      <p>
                        <i className="fas fa-user" />
                        {transporter.firstName} {transporter.lastName}
                      </p>
                      <p>
                        <i className="fas fa-mobile-alt" />
                        {transporter.mobile}
                      </p>
                      <p>
                        <i className="fas fa-envelope" />
                        {transporter.email}
                      </p>
                    </div>
                  </RestrictedLink>
                </div>
              </div>
              <div className="p-col-12">
                <Divider />
              </div>
              <div className="p-col-12 p-md-6 padding-01rem">
                <div>
                  <div>
                    <i className="fas fa-dot-circle" />
                    <i className="fas fa-circle" />
                    <i className="fas fa-circle" />
                    <i className="fas fa-circle" />
                    <i className="fas fa-circle" />
                  </div>
                  <p>{pickup.address}</p>
                </div>
                <div style={{ marginTop: 7 }}>
                  <i className="fas fa-paper-plane" />
                  <p>{dropoff.address}</p>
                </div>
              </div>
              <div className="p-col-12 p-md-6 padding-01rem">
                <GoogleMapComponent
                  showMarkers
                  mapType="static"
                  mapElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: 200 }} />}
                  coordinates={[pickup.location, dropoff.location]}
                >
                  {hideOrderLocationOn.indexOf(details.status) === -1 &&
                    transporter.location && (
                      <CurrentLocationMarker
                        anchor={[
                          transporter.location[1],
                          transporter.location[0]
                        ]}
                        handleHover={handleOverlay}
                        mapOverlay={mapOverlay}
                      />
                    )}
                </GoogleMapComponent>
                {/* <Map
                  center={[pickup.location[1], pickup.location[0]]}
                  zoom={5}
                  height={200}
                >
                  {hideOrderLocationOn.indexOf(details.status) === -1 &&
                    transporter.location && (
                      <CurrentLocationMarker
                        anchor={[
                          transporter.location[1],
                          transporter.location[0]
                        ]}
                        handleHover={handleOverlay}
                        mapOverlay={mapOverlay}
                      />
                    )}
                  <Marker anchor={[pickup.location[1], pickup.location[0]]} />
                  <Marker anchor={[dropoff.location[1], dropoff.location[0]]} />
                </Map> */}
              </div>
              <div className="p-col-12">
                <Divider />
              </div>
              <div className="p-col-12 p-md-6 padding-01rem">
                <p>ITEMS</p>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Volume</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {commodities.length ? (
                        commodities.map(item => {
                          return (
                            <TableRow key={item._id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                {item.weight} {config.weightUnit}
                              </TableCell>
                              <TableCell>
                                {item.length}x{item.width}x{item.height}{" "}
                                {config.measurementUnit}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan="4" className="text-center">
                            No items.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="p-col-12 p-md-6 padding-01rem">
                <p>SUB ORDERS</p>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Transporter</TableCell>
                        <TableCell>Pickup</TableCell>
                        <TableCell>Dropoff</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {routes.length ? (
                        routes.map((item, index) => {
                          return (
                            <TableRow key={item._id || `route-${index + 1}`}>
                              <TableCell>
                                {item.transporter.firstName}{" "}
                                {item.transporter.lastName}
                              </TableCell>
                              <TableCell>{item.pickup.address}</TableCell>
                              <TableCell>{item.dropoff.address}</TableCell>
                              <TableCell>
                                <RestrictedLink
                                  to={`${routeConstants.orders}/details/${item._id}`}
                                  target="_blank"
                                  featureAndAction={{
                                    feature: features.orders,
                                    action: actionConstants.read
                                  }}
                                >
                                  <i className="fas fa-caret-square-right" />
                                </RestrictedLink>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan="4" className="text-center">
                            No sub orders.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div
                className="p-col-12 p-md-6 padding-01rem"
                style={{ margin: "1rem 0" }}
              >
                <p>TIME LOGS</p>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Pictures</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!isEmpty(timeLogs) ? (
                        Object.keys(timeLogs).map((key, index) => (
                          <TableRow key={`route-${index + 1}`}>
                            <TableCell style={{ textTransform: "capitalize" }}>
                              {key}
                            </TableCell>
                            <TableCell>
                              {moment(timeLogs[key]).format(
                                "DD MMM, YYYY - hh:mm a"
                              )}
                            </TableCell>
                            <TableCell>
                              {key === "picked" && pickupImages.length ? (
                                <button
                                  onClick={() =>
                                    props.handleImagesClick(pickupImages)
                                  }
                                >
                                  <i className="far fa-file-image" />
                                </button>
                              ) : null}
                              {key === "delivered" && deliveredImages.length ? (
                                <button
                                  onClick={() =>
                                    props.handleImagesClick(deliveredImages)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="far fa-file-image" />
                                </button>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan="3" className="text-center">
                            No logs found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {isEmpty(actions, "object") ? null : (
                <div className="p-col-12 ">
                  <div>
                    {actions.update ? (
                      <Button
                        label="Update Order"
                        disabled={activity}
                        className="p-button-raised p-button-secondary"
                        onClick={() =>
                          handleSetModalData(
                            true,
                            OrdersEditContainer,
                            "order-update"
                          )
                        }
                      />
                    ) : null}
                    {actions.assign ? (
                      <Button
                        label="Assign Transporter"
                        disabled={activity}
                        className="p-button-raised"
                        onClick={() =>
                          handleSetModalData(
                            true,
                            AssignTransporterComponent,
                            "order-assign"
                          )
                        }
                      />
                    ) : null}
                    {actions.refund ? (
                      <Button
                        label="Refund Order"
                        disabled={activity}
                        className="p-button-raised"
                      />
                    ) : null}
                    {actions.subOrder ? (
                      <Button
                        label="Add Sub Order"
                        disabled={activity}
                        className="p-button-raised"
                        onClick={() =>
                          handleSetModalData(
                            true,
                            SubOrdersContainer,
                            "sub-orders"
                          )
                        }
                      />
                    ) : null}
                    {actions.cancel ? (
                      <Button
                        label="Cancel Order"
                        className="p-button-raised p-button-danger"
                        disabled={activity}
                        onClick={() =>
                          handleSetModalData(
                            true,
                            OrdersCancelContainer,
                            "order-cancel"
                          )
                        }
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen={component === "order-update" || component === "sub-orders"}
        open={routeDialogVisible}
        onClose={() => handleChange("routeDialogVisible", false)}
        className="orders-details-dialog"
        maxWidth={getMaxWidth(component)}
      >
        <Comp
          isVisible={routeDialogVisible}
          details={details}
          routes={details.routes}
          handleGetDetails={handleGetDetails}
          handleDetailsAfterAction={handleDetailsAfterAction}
        />
      </Dialog>
    </Page>
  );
};

OrdersDetailsComponent.defaultProps = {
  details: {
    _id: "",
    orderNumber: "",
    pickupDate: new Date().toISOString(),
    pickupTime: { from: "", to: "" },
    deliveryType: "type",
    status: "status",
    user: {
      firstName: "-",
      lastName: "",
      mobile: "-",
      email: "-"
    },
    contact: {
      name: "-",
      number: "-"
    },
    transporter: {
      firstName: "-",
      lastName: "",
      mobile: "-",
      email: "-",
      location: [0, 0]
    },
    pickup: {
      address: "-",
      location: [0, 0]
    },
    dropoff: {
      address: "-",
      location: [0, 0]
    },
    commodities: [],
    config: { weightUnit: "kg", measurementUnit: "m", currency: "EUR" },
    routes: [],
    timeLogs: {},
    rates: { price: 0 }
  }
};

OrdersDetailsComponent.propTypes = {
  activity: PropTypes.bool,
  details: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.shape(),
    contact: PropTypes.shape(),
    transporter: PropTypes.shape(),
    pickup: PropTypes.shape(),
    dropoff: PropTypes.shape(),
    pickupDate: PropTypes.string,
    deliveryType: PropTypes.string,
    commodities: PropTypes.arrayOf(PropTypes.object)
  }),
  routeDialogVisible: PropTypes.bool,
  handleChange: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  modalData: PropTypes.shape({ Comp: PropTypes.func }),
  handleSetModalData: PropTypes.func,
  handleGetDetails: PropTypes.func,
  handleOverlay: PropTypes.func,
  handleImagesClick: PropTypes.func,
  mapOverlay: PropTypes.shape()
};

export default OrdersDetailsComponent;

/**
 * Current Location
 */

const CurrentLocationMarker = ({ left, top, handleHover, mapOverlay }) => {
  return (
    <div className="current-location-marker" style={{ left: left, top: top }}>
      <MapOverlayComponent mapOverlay={mapOverlay} />
      <span
        onClick={() =>
          handleHover(!mapOverlay.visible, { content: "Your order location." })
        }
      >
        <LocationOn />
      </span>
    </div>
  );
};

CurrentLocationMarker.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  handleHover: PropTypes.func,
  handleDetailsAfterAction: PropTypes.func,
  mapOverlay: PropTypes.shape()
};
