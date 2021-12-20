import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.page
    }
  }


  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div id="navbar-container">
        <div className="navbar-content">

        <div className="navbar-logo-box"> 
          <Link to="/">
            <img src={window.logoURL} className="navbar-logo" alt="login logo" />
          </Link>
        </div>

        <div className="navbar-search-box">
          <input type="text" />
        </div>

        <div className="navbar-list">
          <div className="navbar-item">
            <Link className={this.props.page === "feed" ? "navbar-link active" : "navbar-link transparent"} to="/feed">
              <img className={this.props.page === "feed" ? "navbar-icon active" : "navbar-icon"} src={window.feedURL} alt="feed url" />
              <h5>Home</h5>
              <div className={this.props.page === "feed" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
            </Link>
          </div>

          <div className="navbar-item">
            <Link className={this.props.page === "network" ? "navbar-link active" : "navbar-link transparent"} to="/network">
              <img className={this.props.page === "network" ? "navbar-icon active" : "navbar-icon"} src={window.networkURL} alt="feed url" />
              <h5>Network</h5>
              <div className={this.props.page === "network" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
            </Link>
          </div>

          <div className="navbar-item">
            <a className="navbar-link transparent" href="https://github.com/imvincenth">
              <img className="navbar-icon" src={window.githubURL} alt="feed url" />
              <h5>GitHub</h5>
              <div className="navbar-item-bar"></div>
            </a>
          </div>

          <div className="navbar-item">
            <a className="navbar-link transparent" href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">
              <img className="navbar-icon" src={window.linkedinURL} alt="feed url" />
              <h5>LinkedIn</h5>
              <div className="navbar-item-bar"></div>
            </a>
          </div>

          <div className="navbar-item">
            <Link className={this.props.page === "profile" ? "navbar-link active" : "navbar-link"} to={`/users/${this.props.currentUser.id}`}>
              {this.props.currentUser.profilePictureUrl ? <img className="navbar-icon-profile" src={this.props.currentUser.profilePictureUrl} alt="feed url" /> : <img className="navbar-icon-profile" src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="default profile picture" />}
              <h5 className={this.props.page === "profile" ? "navbar-me active" : "navbar-link transparent"}>Me<img className="navbar-arrow" src={window.downarrowURL} alt="down arrow" /></h5>
              <div className={this.props.page === "profile" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
            </Link>
          </div>
        </div>

        </div>
      </div>
    )
  };
};

export default Navbar;