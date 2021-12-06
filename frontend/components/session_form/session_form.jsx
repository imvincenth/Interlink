import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

      hidden: true,
      valid: false,

      demoLogged: false
    };

    this.toggleShow = this.toggleShow.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  refreshPage() {
    window.location.reload(false);
  }

  demoLogin(e) {
    e.preventDefault();

    this.setState({ email: '', password: '', demoLogged: true });
    const email = "gandalf@the.grey".split("");
    let emailInput = "";
    email.forEach((input, i) => {
      setTimeout(() => {
        emailInput += input;
        this.setState({ email: emailInput });
      }, 100 * i);
    });

    const password = 'password'.split('');
    let passwordInput = "";
    password.forEach((input, i) => {
      setTimeout(() => {
        passwordInput += input;
        this.setState({ password: passwordInput });
      }, 100 * i);
    });

    setTimeout(() => this.props.demoLogin(), 1700);
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
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
          <p key={`error-${i}`} className="session-error">
            {error}
          </p>
        ))}
      </div>
    );
  }

  validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.state.email).toLowerCase())) {
      this.setState({ valid: true });
      return true;
    } else {
      this.setState({ valid: false });
      return false;
    }
  }
  
  render() {
    
    // Errors not carrying over from signup to session double checking
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("First") || error.includes("Last") || error.includes("Country") || error.includes("City") || error.includes("Headline")) {
          this.refreshPage();
        }
      });
    }

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


            <div className="session-input-box">
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className={this.props.errors.length === 1 && !this.state.valid ? "session-input invalid-session-field" : "session-input"}
                disabled={!this.state.demoLogged ? false : true} 
                autoFocus
                />
              <span className={this.props.errors.length === 1 && !this.state.valid ? "floating-label invalid" : "floating-label"}>Email</span>
            </div>
            <span>{this.props.errors.length === 1 && !this.state.valid ? this.renderErrors() : null}</span>

            <br />

            <div className="session-input-box">
              <input type={this.state.hidden ? "password" : "text"}
                value={this.state.password}
                onChange={this.update('password')}
                className={this.props.errors.length === 1 && this.state.valid ? "session-input invalid-session-field" : "session-input"}
                disabled={!this.state.demoLogged ? false : true} 
              />
              <span className={this.props.errors.length === 1 && this.state.valid ? "floating-label invalid" : "floating-label"}>Password</span>
              <button type="button" onClick={this.toggleShow}>{this.state.hidden ? "show" : "hide"}</button>
            </div>
            <span>{this.props.errors.length === 1 && this.state.valid ? <p className="session-error">Please enter a password.</p> : null}</span>

            <br />

            <input className={!this.state.demoLogged ? "session-submit" : "session-cant-submit"} 
              type="submit" onClick={this.validateEmail} 
              value={!this.state.demoLogged ? this.props.formType : "Signing in..."} 
              disabled={!this.state.demoLogged ? false : true} 
            />

            <div className="third-party-session-spacing-box">
              <div className="third-party-session-spacing-line"></div>
              <span>
                <span className="third-party-session-spacing-word">or</span>
              </span>
              <div className="third-party-session-spacing-line"></div>
            </div>

            <br />
            <div className="demo-session-box">
              {this.state.demoLogged ? <img className="robot-icon" src={happyRobotURL} alt="happy robot" /> : <img className="robot-icon" src={neutralRobotURL} alt="neutral robot" />}
              <input className={!this.state.demoLogged ? "demo-session-submit" : "demo-session-cant-submit"} 
                type="submit" 
                value={"     Demo Login"} 
                onClick={this.demoLogin} 
                disabled={!this.state.demoLogged ? false : true} 
              />
            </div>

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