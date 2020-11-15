import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

// icons
import Phone from "@material-ui/icons/Phone";
import Today from "@material-ui/icons/Today";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ListAlt from "@material-ui/icons/ListAlt";
import LocationOn from "@material-ui/icons/LocationOn";
import Mail from "@material-ui/icons/Mail";
import Pageview from "@material-ui/icons/Pageview";

/** Route Constants **/
import routeConstants from "../../../constants/route-constants";

import EmptyRow from "../../../components/table/EmptyRow";
import { capitalize, getColor } from "../../../utils/functions";
import { RestrictedLink } from "../../../utils/permissions.utils";
import features from "../../../constants/feature-constants";
import actions from "../../../constants/actions-constants";
import GoogleMapComponent from "../../../components/map/GoogleMapComponent";

const UsersProfileOrderComponent = props => {
  const { data, handleChange } = props;
  const user = data.user || {};
  const contact = data.contact || {};
  const transporter = data.transporter || {};
  const pickup = data.pickup || {};
  const dropoff = data.dropoff || {};

  return data._id ? (
    <div className="p-grid">
      <div className="p-col-12 p-md-6">
        <Typography variant="h5">Order # {data._id}</Typography>
      </div>
      <div className="p-col-12 p-md-6 text-right">
        <Button
          label="Back"
          className="p-button-secondary"
          onClick={() =>
            handleChange("dialogData", {
              comp: UsersProfileOrderComponent,
              show: false,
              data
            })
          }
        />
      </div>
      <div className="p-col-12">
        <div
          className="order-status-div"
          style={{ backgroundColor: getColor(data.status) }}
        >
          <Typography variant="body2" style={{ color: "#fff" }}>
            {capitalize(data.status)}
          </Typography>
        </div>
      </div>
      <React.Fragment>
        <div className="p-col-12 p-md-4">
          <Card className="height-100">
            <div className="user-details-card-div">
              <div>
                <Typography variant="body2">
                  Customer - {user.firstName} {user.lastName}
                </Typography>
                <div>
                  <Phone style={{ fontSize: 16 }} />
                  <Typography variant="body1" style={{ marginLeft: 10 }}>
                    {user.mobile}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="body2">
                  Receiver - {contact.firstName} {contact.lastName}
                </Typography>
                <div>
                  <Phone style={{ fontSize: 16 }} />
                  <Typography variant="body1" style={{ marginLeft: 10 }}>
                    {contact.number}
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="p-col-12 p-md-4">
          <Card className="height-100">
            <div className="order-card-row-div" style={{ marginTop: 0 }}>
              <Today style={{ fontSize: 20 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {moment(data.pickupDate).format("DD MMMM, YYYY")}
              </Typography>
            </div>
            <div className="order-card-row-div">
              <ListAlt style={{ fontSize: 20 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {capitalize(data.deliveryType)}
              </Typography>
            </div>
            <div className="order-card-row-div">
              <ArrowDropUp style={{ fontSize: 20 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {pickup.address}
              </Typography>
            </div>
            <div className="order-card-row-div">
              <LocationOn style={{ fontSize: 20 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {dropoff.address}
              </Typography>
            </div>
          </Card>
        </div>
        <div className="p-col-12 p-md-4">
          <Card className="height-100">
            <Typography variant="body2">
              Transporter - {transporter.firstName} {transporter.lastName}
            </Typography>
            <div className="order-card-row-div">
              <Phone style={{ fontSize: 16 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {transporter.mobile}
              </Typography>
            </div>
            <div className="order-card-row-div">
              <Mail style={{ fontSize: 16 }} />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {transporter.email}
              </Typography>
            </div>
          </Card>
        </div>
        <div className="p-col-12 p-md-6">
          <GoogleMapComponent
            showMarkers
            mapType="static"
            mapElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: 300 }} />}
            coordinates={[pickup.location, dropoff.location]}
          />
          {/* <Map
            center={[pickup.location[1] || 0, pickup.location[0] || 0]}
            zoom={5}
            height={300}
          >
            <Marker
              anchor={[pickup.location[1] || 0, pickup.location[0] || 0]}
            />
            <Marker
              anchor={[dropoff.location[1] || 0, dropoff.location[0] || 0]}
            />
          </Map> */}
        </div>
        <div className="p-col-12 p-md-6">
          <Typography variant="h6">Items</Typography>
          <div className="overflow-x-auto">
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
                {data.commodities.length ? (
                  data.commodities.map(item => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow colSpan={4} message="No Items" />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {!data.subOrder && (
          <React.Fragment>
            <div className="p-col-12">
              <Typography variant="h6">Sub Orders</Typography>
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.routes.length ? (
                      data.routes.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item}</TableCell>
                            <TableCell>
                              {item && (
                                <RestrictedLink
                                  to={`${routeConstants.orders}/details/${item}`}
                                  target="_blank"
                                  style={{ color: "#aaa" }}
                                  featureAndAction={{
                                    feature: features.orders,
                                    action: actions.read
                                  }}
                                >
                                  <Pageview />
                                </RestrictedLink>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <EmptyRow colSpan={5} message="No sub orders." />
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  ) : null;
};

UsersProfileOrderComponent.propTypes = {
  data: PropTypes.shape({
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
  handleChange: PropTypes.func
};

export default UsersProfileOrderComponent;
