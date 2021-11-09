import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  refreshPage() {
    window.location.reload(false);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <div>
        {this.props.errors.map((error, i) => (
          <span key={`error-${i}`} className="error">
            {error}
          </span>
        ))}
      </div>
    );
  }
  
  render() {
    this.props.errors.forEach(error => {
      if (error.includes("First") || error.includes("Last") || error.includes("Country") || error.includes("City") || error.includes("Headline")) {
        this.refreshPage();
      }
    });
    return (
      <div className="session-form">

        <header className="session-form-header">
          <Link to="/"><img src={namelogoURL} className="loginpage-logo" alt="name logo" /></Link>
        </header>

        <form onSubmit={this.handleSubmit} className="session-form-box">

          <div className="session-form-container">

            <div className="form-header-text">
              <h1>Sign in</h1>
              <p>Stay updated on your professional world</p>
            </div>

            <span>{this.props.errors.length === 1 ? this.renderErrors() : null}</span>

              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="session-input"
                placeholder="Email"
                autoFocus
                />

              <br />

              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="session-input"
                placeholder="Password"
                />

            <br />


            <input className="session-submit" type="submit" value={this.props.formType} />

            <br />
            <input className="demo-session-submit" type="submit" value={"Demo Login"} onClick={this.demoLogin} />

          </div>
          
          <div>
            <p className="signup-redirect">New to RingIn?<Link className="redirect-link" to="/signup" >Join Now</Link></p>
          </div>

        </form>
      </div>
    );
  }
}

export default SessionForm;