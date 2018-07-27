import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from './Utils/FormErrors.jsx';
import '../../styles/global.scss';


export default class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      emailError: '',
      passwordError: '',
      usernameError: '',
      emailValid: false,
      passwordValid: false,
      usernameValid: false,
      formValid: false,
    };
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  validateField(name, value) {
    let {
      emailValid,
      emailError,
      passwordValid,
      passwordError,
      usernameValid,
      usernameError,
    } = this.state;
    switch (name) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailError = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i);
        passwordError = passwordValid ? '' : ' is invalid';
        break;
      case 'username':
        usernameValid = value.match(/^[A-Z]{6,}$/i);
        usernameError = usernameValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      emailValid,
      emailError,
      passwordValid,
      passwordError,
      usernameValid,
      usernameError,
    }, this.validateForm);
  }

  validateForm() {
    const { emailValid, passwordValid, usernameValid } = this.state;
    if (emailValid && passwordValid && usernameValid) {
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
    const { username, password, email } = this.state;
    axios.post('/api/add_admin', { username, password, email }).then((res) => {
      alert(res.data.status);
      window.location.href = '/';
    }).catch((err) => { console.log(err); });
  }

  render() {
    const formErrors = {
      email: this.state.emailError,
      password: this.state.passwordError,
      username: this.state.usernameError,
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
        Add Administator:
        <form
          method="POST"
          onChange={this.handleChange}
          onSubmit={this.submitForm}
        >
          <br />
          <input
            className={errorClasser(formErrors.username)}
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
          />
          <br />
          <br />
          <input
            className={errorClasser(formErrors.email)}
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
          />
          <br />
          <br />
          <input
            className={errorClasser(formErrors.password)}
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
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
