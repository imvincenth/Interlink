import React from 'react';
import Navbar from '../feed/navbar/navbar_container';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: false,
      alreadyConnected: false,
      pendingConnection: false,
      connection: "",

      pending: true,
      connector_id: this.props.currentUser.id,
      connectee_id: ""
    }
  }

  connectionStatusCheck() {
    let alreadyConnectedBool = false;
    let pendingConnectionBool = false;
    let connectionContainer = "";
    for (let i = 0; i < this.props.connections.length; i++) {
      if (this.props.connections[i].connector_id === this.props.user.id || this.props.connections[i].connectee_id === this.props.user.id) {
        if (this.props.connections[i].pending) {
          connectionContainer = this.props.connection[i];
          pendingConnectionBool = true;
        } else {
          connectionContainer = this.props.connection[i];
          alreadyConnectedBool = true;
        }
      }
    }
    this.setState({ 
      alreadyConnected: alreadyConnectedBool, 
      pendingConnection: pendingConnectionBool, 
      connection: connectionContainer 
    });
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId)
      .then(() => this.setState({ user: this.props.user, connectee_id: this.props.user.id }))
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
      .then(() => this.connectionStatusCheck());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.length > 0) this.props.history.replace("/404");
    if (prevProps.userId !== this.props.userId) {
      this.props.fetchUser(this.props.userId)
      .then(this.setState({ 
        user: this.props.user, 
        connectee_id: this.props.user.id, 
        currentUser: this.props.currentUser.id === this.props.user.id 
      }))
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
      .then(() => this.connectionStatusCheck());
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state});
  }

  connectButton() {
    return (
      <button onClick={this.handleConnectSubmit}>
        Connect
      </button>
    )
  }

  updateConnectButton() {
    if (this.state.connection.connector_id === this.props.currentUser.id) {
      return (
        <div>
          <button>
            Pending
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button>
            Accept
          </button>
          <button>
            Ignore
          </button>
        </div>
      )
    }
  }

  tempDeleteConnect() {
    return (
      <button onClick={() => this.props.deleteConnection(this.state.connection.id)}>
        Disconnect
      </button>
    )
  }

  render() {

    if (!this.props.user) return null;

    return (
      <div className="profile-background">
        <div className="profile-container">
          <Navbar />

          <div className="profile-main-wrapper">
            <div className="profile-main">
              <div className="profile-card">
                <img src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="sidebar banner" />
                <div className="profile-avatar">
                  <img src={window.gandalfURL} alt="gandalf smiling" />
                </div>
                <div className="profile-card-main">
                  <div className="profile-info">
                    <h1 className="profile-name">{this.props.user.first_name} {this.props.user.last_name}</h1>
                    <br />
                    <h2 className="profile-headline">{this.props.user.headline}</h2>
                    <h3 className="profile-location">{this.props.user.city_district}, {this.props.user.country_region}</h3>
                    <div>
                      {/* Connections Logic */}
                      {this.state.currentUserCheck ? this.props.openEditProfileModal : null}
                      {!this.state.alreadyConnected ? this.connectButton() : null}
                      {this.state.alreadyConnected && this.state.pendingConnection ? this.updateConnectButton() : null}
                      {this.state.alreadyConnected && !this.state.pendingConnection ? this.tempDeleteConnect() : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-wrap">
                <div className="stat-wrap-header">
                  <h1 className="experience-header">Experience</h1>
                  <br />
                  <div className="experience-item">
                    {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} />)}
                    {this.state.currentUserCheck ? this.props.openCreateExperienceModal : null}
                  </div>
                </div>

                <div className="stat-wrap-tail">
                  <h1 className="education-header">Education</h1>
                  <br />
                  <div>
                    {this.props.educations.map(education => <EducationItemContainer key={education.id} education={education} />)}
                    {this.state.currentUserCheck ? this.props.openCreateEducationModal : null}
                  </div>
                </div>
              </div>
          </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Profile;