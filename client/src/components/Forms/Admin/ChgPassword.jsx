import React, { Component } from 'react';
import axios from 'axios';
import '../../../styles/global.css';
import FormErrors from '../Utils/FormErrors.jsx';

export default class ChgPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newPassword: '',
      newPasswordError: '',
      newPasswordValid: false,
      formValid: false,
    };
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  validateField(name, value) {
    let {
      newPasswordValid,
      newPasswordError,
    } = this.state;
    switch (name) {
      case 'newPassword':
        newPasswordValid = value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i);
        newPasswordError = newPasswordValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      newPasswordValid,
      newPasswordError,
    }, this.validateForm);
  }

  validateForm() {
    const { newPasswordValid } = this.state;
    if (newPasswordValid) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validateField(name, value));
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password, newPassword } = this.state;
    axios.post('/api/admin/set_password', { username, password, newPassword }).then((res) => {
      if (res.data.success) {
        alert('password changed!');
        window.location.href = '/admin';
      } else {
        alert('wrong credentials');
        window.location.href = '/admin/logout';
      }
    }).catch((err) => { console.log(err); });
  }

  render() {
    const formErrors = {
      newPassword: this.state.newPasswordError,
    };
    function errorClasser(error) {
      return (error.length === 0 ? '' : 'has-error');
    }
    return (
      <div
        style={{
                color: 'white',
                padding: '2px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
      >
                Login:
        <form
          method="POST"
          onChange={this.handleChange}
          onSubmit={this.submitForm}
        >
          <br />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="current password"
            value={this.state.password}
          />
          <br />
          <br />
          <input
            className={errorClasser(formErrors.newPassword)}
            type="password"
            name="newPassword"
            placeholder="new password"
            value={this.state.newPassword}
          />
          <br />
          <br />
          <input type="submit" disabled={!this.state.formValid} value="Submit" />
        </form>
        <a href="/admin">back</a>
        <div className="error-msgs">
          <FormErrors formErrors={formErrors} />
        </div>
      </div>
    );
  }
}
