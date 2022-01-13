import React from 'react';
import { Link } from 'react-router-dom';
import NavbarContainer from '../feed/navbar/navbar_container';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserStatus: false,

      pending: true,
      connector_id: this.props.currentUser.id,
      connectee_id: "",

      connections: [],

    }

    this.handleConnectSubmit = this.handleConnectSubmit.bind(this);
  }

  currentUserCheck() {
    this.props.currentUser.id === this.props.userId ? this.setState({ currentUserStatus: true }) : null;
  }

  filterConnections() {
    let tempAccepted = [];
    this.props.connections.forEach(connection => (connection.connector_id === this.props.user.id || connection.connectee_id === this.props.user.id) && !connection.pending ? tempAccepted.push(connection) : null);
    this.setState({ connections: [...tempAccepted] });
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId)
      .then(this.currentUserCheck())
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnections(this.props.userId))
      .then(() => this.filterConnections());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.length > 0) this.props.history.replace("/404");
    if (prevProps.userId !== this.props.userId) {
      this.props.fetchUser(this.props.userId)
        .then(this.currentUserCheck())
        .then(this.props.fetchExperiences(this.props.userId))
        .then(this.props.fetchEducations(this.props.userId))
        .then(this.props.fetchConnections(this.props.userId))
        .then(this.setState({ currentUserStatus: false }))
        .then(() => this.filterConnections());
    }
    if (JSON.stringify(prevProps.connections) !== JSON.stringify(this.props.connections)) {
      this.filterConnections();
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state, connectee_id: this.props.userId});
  }

  renderProfileOptions() {
    return (
      <div style={{display: "flex", paddingTop: "8px"}}>
        <button className='profile-user-option' style={this.props.user !== this.props.currentUser ? {display: "none"} : null}>Add section</button>
        <button className='profile-user-option'>More</button>
      </div>
    )
  }

  render() {
    if (!this.props.user) return null;

    return (
      <div className="profile-background">
        <NavbarContainer page="profile" />
        <div className="profile-container">
          <div className='profile-content-wrap'>

            <section className='profile-content-main'>
              {/* Banner */}
              <div className='profile-banner-wrap'>
                <button className='banner-button-button' onClick={() => this.props.openModal("banner", this.props.user)} style={this.props.currentUser !== this.props.user ? {"display": "none"} : null}><img className='banner-button-img' src={window.bannerButtonURL} /></button>
                {this.props.user.bannerUrl ? <img onClick={() => this.props.openModal("bannerShow", this.props.user)} className='profile-banner' src={this.props.user.bannerUrl} /> : <img onClick={() => this.props.openModal("bannerShow", this.props.user)} className='profile-banner' src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" />}
              </div>
        
              {/* Profile Info */}
              <div className='profile-info-wrap'>
                <div className='profile-info-propic-box'>
                  <div className='profile-picture-box'>
                    <div className='profile-picture-wrap'>
                      <button className='profile-picture-edit' onClick={() => this.props.openModal("profilePicture", this.props.user)}>
                        {this.props.user.profilePictureUrl ? <img className='profile-picture' src={this.props.user.profilePictureUrl} /> : <img className='no-profile-picture' src="https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className='profile-social-wrap'>
                  <button className='profile-social-info-edit-button' style={this.props.currentUser !== this.props.user ? {"display": "none"} : null} onClick={() => this.props.openModal("editProfile", this.props.user)}><img src={window.quillURL} /></button>

                  {/* User Information */}
                  <div style={{display: "flex", flexDirection: "column", paddingBottom: "24px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div style={{display: "flex", flexDirection: "column"}}>
                        <h1 className='profile-user-name'>{this.props.user.first_name} {this.props.user.last_name}</h1>
                        <span className='profile-user-headline'>{this.props.user.headline}</span>
                      </div>

                      <span className='profile-user-school' style={{display: "flex", alignItems: "center"}}><img style={{width: "32px", height: "32px", marginRight: "8px"}} src="https://static-exp1.licdn.com/sc/h/aajlclc14rr2scznz5qm2rj9u" />{this.props.educations[0] ? this.props.educations[0].school : null}</span>
                    </div>

                    <span className='profile-user-location'>{this.props.user.city_district}, {this.props.user.country_region}</span>

                    {/* User Connections Section */}
                    <Link to={`/connections`}>
                      <span className='profile-user-connections'>{this.state.connections.length} Connection{this.state.connections.length > 1 ? "s" : ""}</span>
                    </Link>

                    {/* User Options */}
                    <div style={{display: "flex", paddingTop: "8px"}}>
                      <button className='profile-user-option'>Add section</button>
                      <button className='profile-user-option'>More</button>
                    </div>

                  </div>
                  
                </div>
              </div>

            </section>

            {/* Project Bar */}
            <section className='project-info-bar'>
              <div className='project-info-text'>
                <h3>Project Description</h3>
                <p>RingIn is a clone of LinkedIn themed around J. R. R. Tolkien's The Lord of the Rings.</p>
                <p>This full stack project is built with...</p>
              </div>

              <ul>
                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>React</span>
                  </div>
                  <span className='post-info-item-desc'>Frontend structure</span>
                </li>

                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>Redux</span>
                  </div>
                  <span className='post-info-item-desc'>Frontend store</span>
                </li>

                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>Ruby on Rails</span>
                  </div>
                  <span className='post-info-item-desc'>Backend</span>
                </li>

                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>PostgreSQL</span>
                  </div>
                  <span className='post-info-item-desc'>Database</span>
                </li>

                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>AWS</span>
                  </div>
                  <span className='post-info-item-desc'>Media uploading and storage</span>
                </li>

                <li className='post-info-item-wrap'>
                  <div className='post-info-item-header'>
                    <span className='post-info-bullet'></span>
                    <span className='post-info-item'>HTML, CSS</span>
                  </div>
                  <span className='post-info-item-desc'></span>
                </li>
              </ul>
            </section>
          </div>

        </div>

        {/* <div className="stat-wrap">
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
        </div> */}

      </div>
    )
  }
}

export default Profile;