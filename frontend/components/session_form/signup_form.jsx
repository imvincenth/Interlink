import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleFirstErrors = this.handleFirstErrors.bind(this);
    this.handleSecondErrors = this.handleSecondErrors.bind(this);
    // this.firstErrors;
    this.secondErrors;
    this.page = 1;
  }

  pageOne() {
    this.page = 1;
    return (
      <div>
        <label>Email
          <br />
          <input type="email"
            value={this.state.email}
            onChange={this.update('email')}
            className="signup-input"
          />
        </label>
  
        <br />
    
        <label>Password (6 of more characters)
          <br />
          <input type="password"
            value={this.state.password}
            onChange={this.update('password')}
            className="signup-input"
          />
        </label>

        <br />

        <input className="session-submit" type="submit" value={"Agree & Join"} />
      </div>
    )
  }

  pageTwo() {
    this.page = 2;
    return (
      <div>
        <label>First name
          <br />
          <input type="text"
            value={this.state.first_name}
            onChange={this.update('first_name')}
            className="signup-input"
          />
        </label>
  
        <br />
  
        <label>Last name
          <br />
          <input type="text"
            value={this.state.last_name}
            onChange={this.update('last_name')}
            className="signup-input"
          />
        </label>

        <br />

        <input className="session-submit" type="submit" value={this.props.formType} onClick={this.handleSecondErrors} />
      </div>
    )
  }

  // handleFirstErrors() {
  //   this.firstErrors = this.renderOneErrors();
  // }

  handleSecondErrors() {
    this.secondErrors = this.renderTwoErrors();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit() {
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
  }

  renderOneErrors() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Email") || error.includes("Password")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <ul>
        {pageOneErrors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  renderTwoErrors() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("First") || error.includes("Last")) {
          pageTwoErrors.push(error);
        }
      })
      return(
        <ul>
          {pageTwoErrors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          Make the most of your professional life
          <br />
          <div className="signup-form">
            <br />
            {this.props.errors.length !== 2 ? this.pageOne() : this.pageTwo()}
            <br />
            {this.page === 1 ? this.renderOneErrors() : this.secondErrors}
          </div>
        </form>
        <p>Already on LinkedIn? <Link to="/api/login">Sign In</Link></p>
      </div>
    );
  }
}

export default SignupForm;