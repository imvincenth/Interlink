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
  }

  refreshPage() {
    window.location.reload(false);
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
      if (error.includes("First") || error.includes("Last")) {
        this.refreshPage();
      }
    })
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form-box">
          <div className="session-form">
            <br/>

              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="session-input"
                placeholder="Email"
                />

            <br/>

              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="session-input"
                placeholder="Password"
                />

            <br/>

            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
          {this.renderErrors()}
          
          <br />
          New to Interlink? <Link to="/signup" >Join Now</Link>
        </form>
      </div>
    );
  }
}

export default SessionForm;