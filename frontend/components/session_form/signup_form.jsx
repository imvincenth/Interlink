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
    // this.firstErrors;
    this.demoLogin = this.demoLogin.bind(this);
    this.flip = this.flip.bind(this);
    this.check = 0;
    this.page = 1;
  }

  refreshPage() {
    window.location.reload(false);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
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
            autoFocus
          />
        </label>
  
        <br />
        {this.renderEmailError()}

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
        {this.renderPasswordError()}

        <br />
        <input className="session-sumit" type="submit" value={"Agree & Join"} />
        
        <br />
        <input className="session-sumit" type="submit" value={"Demo Login"} onClick={this.demoLogin} />
        
        <br />
        Already on RingIn? <Link to="/login">Sign In</Link>
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
        {this.check !== 0 ? this.renderFirstNameError() : ""}
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
        {this.check !== 0 ? this.renderLastNameError() : ""}
        <br />

        <input className="session-sumit" type="submit" value={this.props.formType} onClick={this.flip} />
      </div>
    )
  }

  flip() {
    this.check++;
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
  }

  renderEmailError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Email")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <span className="error">
        {pageOneErrors}
      </span>
    );
  }

  renderPasswordError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Password")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <span className="error">
        {pageOneErrors}
      </span>
    );
  }

  renderFirstNameError() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("First")) {
          pageTwoErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageTwoErrors}
        </span>
      );
    }
  }

  renderLastNameError() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Last")) {
          pageTwoErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageTwoErrors}
        </span>
      );
    }
  }

  render() {
    this.props.errors.forEach(error => {
      if (error.includes("email")) {
        this.refreshPage();
      }
    })
    return (
      <div className="signup-form">

        <header className="signup-logo">
          <img src={namelogoURL} alt="name logo" />
          <p>Make the most of your professional life</p>
        </header>

          <form onSubmit={this.handleSubmit} className="signup-form-box">

            <div className="signup-form-container">
              {this.props.errors.length !== 2 && this.props.errors.length !== 1 ? this.pageOne() : this.pageTwo()}
            </div>
            
          </form>
      </div>
    );
  }
}

export default SignupForm;