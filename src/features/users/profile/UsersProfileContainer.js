import React, { Component } from 'react';
import PropTypes from 'prop-types';

import apiServices from '../../../service/RequestHandler';
import UsersProfileComponent from './UsersProfileComponent';
import { deepClone } from '../../../utils/functions';

export default class TransportersProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: undefined,
      dialogData: {
        comp: () => null,
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
        apiServices.getUserById({
          _id
        }),
        apiServices.getOrdersByUserId({
          _id
        })
      ]);

      const details = Object.assign({}, data[0].data, {
        orders: data[1].data.data
      });
      this.setState({ details, activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
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
      <UsersProfileComponent
        {...this.state}
        handleChange={this.handleChange}
        handleDetailsAfterAction={this.handleDetailsAfterAction}
      />
    );
  }
}

TransportersProfileContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  })
};
