import React from 'react';
import Navbar from '../feed/navbar/navbar_container';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserStatus: false,
      alreadyConnected: false,
      pendingConnection: false,
      connectionContainer: "",

      pending: true,
      connector_id: this.props.currentUser.id,
      connectee_id: ""
    }

    this.handleConnectSubmit = this.handleConnectSubmit.bind(this);
    this.handleEditConnect = this.handleEditConnect.bind(this);
  }

  currentUserCheck() {
    if (!this.props.user || !this.props.currentUser) return null;
    this.props.currentUser.id === this.props.user.id ? this.setState({ currentUserStatus: true }) : null;
  }

  connectionStatusCheck() {
    let alreadyConnectedBool = false;
    let pendingConnectionBool = false;
    let connectionContainer = "";
    console.log(this.props.connections.length)
    for (let i = 0; i < this.props.connections.length; i++) {
      console.log("forfororesiofjdoisafjodisaj")
      console.log(this.props.connections[i].connector_id === this.props.currentUser.id || this.props.connections[i].connectee_id === this.props.currentUser.id);
      if (this.props.connections[i].connector_id === this.props.currentUser.id || this.props.connections[i].connectee_id === this.props.currentUser.id) {
        if (this.props.connections[i].pending) {
          connectionContainer = this.props.connections[i];
          pendingConnectionBool = true;
        } else {
          connectionContainer = this.props.connections[i];
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
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
      .then(this.currentUserCheck())
      .then(this.connectionStatusCheck());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.length > 0) this.props.history.replace("/404");
    if (prevProps.userId !== this.props.userId) {
      this.props.fetchUser(this.props.userId)
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
      .then(this.setState({ currentUserStatus: false }))
      .then(this.currentUserCheck())
      .then(this.connectionStatusCheck());
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state, connectee_id: this.props.userId});
  }

  handleEditConnect(e) {
    e.preventDefault();

    this.props.updateConnection({...this.state.connection, pending: false});
  }

  connectButton() {
    return (
      <button onClick={this.handleConnectSubmit}>
        Connect
      </button>
    )
  }

  updateConnectButton() {
    if (this.state.currentUserStatus) {
      return (
        <div>
          <button onClick={() => this.props.deleteConnection(this.state.connection.id)}>
            Pending
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.handleEditConnect}>
            Accept
          </button>
          <button onClick={() => this.props.deleteConnection(this.state.connection.id)}>
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
    console.log(this.state);
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
                      {this.state.currentUserStatus ? this.props.openEditProfileModal : null}
                      {!this.state.currentUserStatus ? this.connectButton() : null}

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
                    {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} user={this.props.user} />)}
                    {this.state.currentUserStatus ? this.props.openCreateExperienceModal : null}
                  </div>
                </div>

                <div className="stat-wrap-tail">
                  <h1 className="education-header">Education</h1>
                  <br />
                  <div>
                    {this.props.educations.map(education => <EducationItemContainer key={education.id} education={education} user={this.props.user} />)}
                    {this.state.currentUserStatus ? this.props.openCreateEducationModal : null}
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