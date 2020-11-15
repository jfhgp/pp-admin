import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

import apiServices from '../../service/RequestHandler';
import { setToken, authClass } from '../../utils/auth.util';
import routeConstants from '../../constants/route-constants';
import { extractPermissions } from '../../utils/permissions.utils';

require('../../components/style.css');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      email: '',
      password: '',
      error: false
    };

    this.messages = null;
  }

  handleLogin = async e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ activity: true });
      try {
        const response = await apiServices.login({
          email: this.state.email,
          password: this.state.password
        });

        if (response.data._id) {
          response.data.permissions = extractPermissions(response.data);
          await setToken(response.data);
          authClass.setUser = response.data;
          this.props.history.push(routeConstants.dashboard);
        } else {
          this.setState({ activity: false });
          this.showError(response.data.status, response.data.message);
        }
      } catch (error) {
        this.setState({ activity: false });
        return null;
      }
    }
  };

  showError(summary, detail) {
    this.messages.show({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: false });
  };

  isValid = () => {
    if (!this.state.email || !this.state.password) {
      this.setState({ error: true });
      return false;
    }
    return true;
  };

  handleMessagesRef = ref => (this.messages = ref);

  render() {
    const { error } = this.state;

    return (
      <div className="login-container">
        <div className="login-error-div">
          <Messages ref={this.handleMessagesRef} />
        </div>
        <div className="login-form-div">
          <Card className="login-form-card">
            <h1>Login</h1>
            <div>
              <form onSubmit={this.handleLogin}>
                <div className="centered-half">
                  <div
                    className={`p-inputgroup ${
                      error ? 'login-form-error' : ''
                    }`}
                    style={{ marginTop: 10 }}
                  >
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user" />
                    </span>
                    <InputText
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </div>
                </div>
                <div
                  className={`p-inputgroup ${error ? 'login-form-error' : ''}`}
                  style={{ margin: '10px 0' }}
                >
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock" />
                  </span>
                  <InputText
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    label="Login"
                    type="submit"
                    disabled={this.state.activity}
                  />
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};
