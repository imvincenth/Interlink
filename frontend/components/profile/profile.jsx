import React from 'react';
import Navbar from '../feed/navbar/navbar_container';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserStatus: false,

      pending: true,
      connector_id: this.props.currentUser.id,
      connectee_id: ""
    }

    this.handleConnectSubmit = this.handleConnectSubmit.bind(this);
  }

  connectionStatusCheck() {
    if (!this.props.user || !this.props.currentUser) return null;

    let currentUserBool = false;

    if (this.props.currentUser.id === this.props.user.id) {
      currentUserBool = true;
    }

    this.setState({ 
      currentUserStatus: currentUserBool,
    });
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId)
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
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
      .then(this.connectionStatusCheck());
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state, connectee_id: this.props.userId});
  }


  render() {
    if (!this.props.user) return null;

    for (let i = 0; i < this.props.connections.length; i++) {
      if (this.props.connections[i].connector_id === this.props.currentUser.id || this.props.connections[i].connectee_id === this.props.currentUser.id) {
        if (this.props.connections[i].pending) {
          this.connection = this.props.connections[i];
        }
      }
    };

    let existingConnection;
    let pendingConnection;
    let alreadyConnected;

    if (this.connection) {
      if (this.connection.pending) {
        existingConnection = true;
        pendingConnection = true;
        alreadyConnected = false;
      } else {
        existingConnection = true;
        pendingConnection = false;
        alreadyConnected = true;
      }
    } else {
      existingConnection = false;
    }

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