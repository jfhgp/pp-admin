import React from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import _ from "lodash";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  Polygon,
  Circle,
  InfoWindow
} from "react-google-maps";

const defaultMapOptions = {
  mapTypeControl: false,
  streetViewControl: false
};

class GoogleMapComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isInfoOpen: false
    };



    this.mapRef = null;
    this.fitToBounds = false;
    this.handleMapRef = ref => (this.mapRef = ref);
    this.map = withGoogleMap(props => {

      const { coordinates, transporterLocation, spacesAtCurrentLocation } = props;
      const spaces = spacesAtCurrentLocation ? spacesAtCurrentLocation : []
      const defaultLocation = {
        lat: 0.0, lng: 0.0
      }
      return (
        <GoogleMap
          defaultZoom={20}
          defaultCenter={defaultLocation}
          onClick={props.handleMapClick}
          ref={this.handleMapRef}
          defaultOptions={defaultMapOptions}
        >
          {props.markerType === "single" && coordinates.length ? (
            <Marker
              position={{ lat: coordinates[1], lng: coordinates[0] }}
              onClick={props.handleMarkerClick}
            />
          ) : null}

          {props.markerType !== "single" && props.showMarkers
            ? // eslint-disable-next-line
            coordinates.map((item, index) => {
              if (item.length) {
                return (
                  <Marker
                    key={`marker-${index + 1}`}
                    position={{ lat: item[1], lng: item[0] }}
                  // onClick={this.handleOpenInfoWindow}
                  />
                );
              }
            })
            : null}

          {props.markerType !== "single" && props.showMarkers ?
            spaces.map((item, index) => {
              return (
                <Marker
                  key={item._id}
                  position={{ lat: item.location[1], lng: item.location[0] }}
                  onClick={() => { props.handleOpenInfoWindow(index) }}
                  icon={{ scaledSize: { width: 48, height: 48 }, url: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/21307727781582962162-256.png' }}
                >
                  {
                    props.isInfoOpen === index &&
                    <InfoWindow
                      options={{ maxWidth: 900 }}
                      position={{ lat: item.location[1], lng: item.location[0] }}
                      onCloseClick={props.handleOpenInfoWindow}
                    >
                      <div>
                        <Button
                          label="Use this location"
                          onClick={() => { this.props.handleUpdateSubOrder({ item }) }}
                          disabled={this.props.activity}
                        />
                        <p>Name : {item.name}</p>
                        <p>Area : {item.area}</p>
                        <p>Available Hours:</p>
                        {item.schedule.map((item, index) => {
                          return (
                            <div key={index}>
                              <p>{item.day} : {item.startTime} to {item.endTime}</p>
                            </div>
                          )
                        })}

                      </div>
                    </InfoWindow>
                  }
                </Marker>
              );
            }
            )
            : null
          }

          {
            transporterLocation.length ? (
              <Marker
                position={{
                  lat: transporterLocation[1],
                  lng: transporterLocation[0]
                }}
              />
            ) : null
          }

          {
            props.drawPolygon ? (
              <Polygon
                paths={props.coordinates.map(item => ({
                  lat: item[1],
                  lng: item[0]
                }))}
              />
            ) : null
          }

          {
            props.drawCircle && coordinates.length ? (
              <Circle
                radius={5000}
                center={{ lat: coordinates[1], lng: coordinates[0] }}
                options={{
                  strokeColor: "#ff0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#ff0000",
                  fillOpacity: 0.4
                }}
              />
            ) : null
          }
        </GoogleMap >
      );
    });
  }

  componentDidMount() {
    debugger;
    setTimeout(async () => {
      if (this.props.mapType === "static" && this.mapRef) {
        await this.setCenterAndZoom(this.props.coordinates);
        this.fitToBounds = true;
      }
    }, 0);
  }


  async componentDidUpdate() {
    debugger;
    if (this.fitToBounds && this.props.mapType === "static" && this.mapRef) {
      if (this.props.spacesAtCurrentLocation && this.props.spacesAtCurrentLocation.length > 0) {
        const spacesArray = _.map(this.props.spacesAtCurrentLocation, (item, index) => {
          return (
            [
              item.location[0],
              item.location[1]
            ]
          )
        })
        await this.setCenterAndZoom(spacesArray);
        this.fitToBounds = true;
      }
      else {
        await this.setCenterAndZoom(this.props.coordinates);
        this.fitToBounds = true;
      }
    }
  }

  setCenter(data) {
    try {
      if (data instanceof Array) {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach(item => {
          bounds.extend({ lat: item[1], lng: item[0] });
        });
        this.mapRef.panToBounds(bounds);
      } else {
        this.mapRef.panTo(data);
      }
    } catch (error) {
      //
    }
  }

  setZoom(data) {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      data.forEach(item => {
        bounds.extend({ lat: item[1], lng: item[0] });
      });
      this.mapRef.fitBounds(bounds);
    } catch (error) {
      //
    }
  }

  async setCenterAndZoom(data = []) {
    debugger;
    try {
      const bounds = new window.google.maps.LatLngBounds();
      data.forEach(item => {
        bounds.extend({
          lat: item[1],
          lng: item[0]
        });
      });
      this.mapRef.panToBounds(bounds);
      this.mapRef.fitBounds(bounds);
    } catch (error) {
      //
    }
  }

  render() {
    const Map = this.map;
    return <Map {...this.props} />;
  }
}

GoogleMapComponent.defaultProps = {
  loadingElement: <span />,
  handleMapClick: () => null,
  transporterLocation: []
};

GoogleMapComponent.propTypes = {
  mapType: PropTypes.string,
  drawCircle: PropTypes.bool,
  drawPolygon: PropTypes.bool,
  showMarkers: PropTypes.bool,
  markerType: PropTypes.string,
  handleMapClick: PropTypes.func,
  handleMarkerClick: PropTypes.func,
  coordinates: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.array)
  ]),
  transporterLocation: PropTypes.arrayOf(PropTypes.number)
};

export default GoogleMapComponent;
