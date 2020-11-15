import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";

import apiServices from "../../../service/RequestHandler";
import TransportersProfileComponent from "./TransportersProfileComponent";
import TransportersBanContainer from "../ban/TransportersBanContainer";
import { newGrowl } from "../../../components/ui/GrowlComponent";
import { deepClone } from "../../../utils/functions";
import { withStore } from "../../../utils/store.util";

class TransportersProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: undefined,
      dialogData: {
        comp: TransportersBanContainer,
        show: false
      },
      activity: true
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  async getDetails() {
    try {
      const _id = this.props.match.params.id;
      const data = await Promise.all([
        apiServices.getTransporterById({
          _id
        }),
        apiServices.getOrdersByDriver({
          _id,
          status: "all"
        }),
        apiServices.transporterCustomerCount({
          _id
        }),
        apiServices.getServiceAreas({ _id })
      ]);
      const details = Object.assign({}, data[0].data.data, {
        orders: data[1].data.data,
        users: data[2].data.data.users,
        customerCount: data[2].data.data.orders,
        serviceAreas: data[3].data
      });
      this.setState({ details, activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleActivateTransporter = async () => {
    this.setState({ activity: true });
    try {
      const response = await apiServices.getTransporterIdenfyStatus({
        transporter: this.state.details._id
      });
      if (response.status === 200 && response.data.status === "APPROVED") {
        const activateCallResponse = await apiServices.activateTransporter({
          transporter: this.state.details._id
        });
        if (activateCallResponse.data) {
          const details = deepClone(this.state.details);
          details.active = activateCallResponse.data.active;
          this.setState({ details, activity: false });
        } else {
          this.setState({ activity: false });
        }
      } else {
        this.setState({ activity: false });
        newGrowl.showGrowl(
          "error",
          "Error",
          response.data
            ? `Idenfy Status: ${response.data.status}`
            : response.message
        );
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleUpdateExpirationDate = async (name, date) => {
    this.setState({ activity: true });

    try {
      const response = await apiServices.updateTransporterAdmin({
        _id: this.state.details._id,
        [name]: moment(date).valueOf()
      });

      const details = deepClone(this.state.details);
      details[name] = response.data[name];
      this.setState({ activity: false, details });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleDocumentsClick = documents => {
    this.props.store.setMultiWithRender({
      lightBoxIsOpen: true,
      lightBoxImages: documents.map(item => ({
        src: item.path ? item.path : item
      }))
    });
  };

  handleDetailsAfterAction = data => {
    const details = deepClone(this.state.details);
    this.setState({
      details: { ...details, ...data },
      dialogData: {
        comp: () => null,
        show: false
      },
      activity: false
    });
  };

  render() {
    return (
      <TransportersProfileComponent
        {...this.state}
        handleChange={this.handleChange}
        handleDetailsAfterAction={this.handleDetailsAfterAction}
        handleActivateTransporter={this.handleActivateTransporter}
        handleDocumentsClick={this.handleDocumentsClick}
        handleUpdateExpirationDate={this.handleUpdateExpirationDate}
      />
    );
  }
}

TransportersProfileContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }),
  store: PropTypes.shape({
    setMultiWithRender: PropTypes.func
  })
};

export default withStore(TransportersProfileContainer);
