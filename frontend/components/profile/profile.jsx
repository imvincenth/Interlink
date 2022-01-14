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
      connectee_id: Number(window.location.href.split("/users/")[1]),
      
      connections: [],
      connection: null,

      addSectionActive: false,
      moreActive: false,

      copySuccess: false
    }
    
    this.handleConnectSubmit = this.handleConnectSubmit.bind(this);
    this.toggleMenusOff = this.toggleMenusOff.bind(this);
    this.openExperienceCreate = this.openExperienceCreate.bind(this);
    this.openEducationCreate = this.openEducationCreate.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    console.log(Number(window.location.href.split("/users/")[1]));
  }

  currentUserCheck() {
    this.props.currentUser.id === Number(window.location.href.split("/users/")[1]) ? this.setState({ currentUserStatus: true }) : this.setState({ currentUserStatus: false });
  }

  filterConnections() {
    let tempAccepted = [];
    this.props.connections.forEach(connection => (connection.connector_id === this.props.user.id || connection.connectee_id === this.props.user.id) && !connection.pending ? tempAccepted.push(connection) : null);

    let tempCurrentConnection = "";
    this.props.connections.forEach(connection => ((connection.connector_id === this.props.currentUser.id && connection.connectee_id === this.props.user.id) || (connection.connectee_id === this.props.currentUser.id && connection.connector_id === this.props.user.id)) ? tempCurrentConnection = connection : null);

    this.setState({ connections: [...tempAccepted], connection: tempCurrentConnection });
  }

  componentDidMount() {
    this.props.fetchUser(Number(window.location.href.split("/users/")[1]))
      .then(() => this.currentUserCheck())
      .then(this.props.fetchExperiences(Number(window.location.href.split("/users/")[1])))
      .then(this.props.fetchEducations(Number(window.location.href.split("/users/")[1])))
      .then(this.props.fetchConnections(Number(window.location.href.split("/users/")[1])))
      .then(() => this.filterConnections());

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.length > 0) this.props.history.replace("/404");
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      this.props.fetchUser(Number(window.location.href.split("/users/")[1]))
        .then(() => this.currentUserCheck())
        .then(this.props.fetchExperiences(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchEducations(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchConnections(Number(window.location.href.split("/users/")[1])))
        .then(() => this.filterConnections());
    }
    if (prevProps.location.href !== this.props.location.href) {
      this.props.fetchUser(Number(window.location.href.split("/users/")[1]))
        .then(() => this.currentUserCheck())
        .then(this.props.fetchExperiences(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchEducations(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchConnections(Number(window.location.href.split("/users/")[1])))
        .then(() => this.filterConnections());
    }
    if (JSON.stringify(prevProps.connections) !== JSON.stringify(this.props.connections)) {
      this.props.fetchUser(Number(window.location.href.split("/users/")[1]))
        .then(() => this.currentUserCheck())
        .then(this.props.fetchExperiences(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchEducations(Number(window.location.href.split("/users/")[1])))
        .then(this.props.fetchConnections(Number(window.location.href.split("/users/")[1])))
        .then(() => this.filterConnections());
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state, connectee_id: this.props.userId});
  }

  openExperienceCreate() {
    this.props.openModal('createExperience', this.props.currentUser)
    this.toggleMenusOff();
  }

  openEducationCreate() {
    this.props.openModal('createEducation', this.props.currentUser)
    this.toggleMenusOff();
  }

  toggleMenusOff() {
    this.setState({ addSectionActive: false, moreActive: false });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(`https://ringedin.herokuapp.com/#/users/${this.props.user.id}`)
      .then(() => this.setState({ addSectionActive: false, moreActive: false, copySuccess: true }));
  }

  renderProfileOptions() {
    return (
      <div style={{display: "flex", paddingTop: "8px"}}>
        <button className='profile-user-option' style={this.props.user !== this.props.currentUser ? {display: "none"} : null}>Add section</button>
        <button className='profile-user-option'>More</button>
      </div>
    )
  }

  renderAddSection() {
    return (
      <ul className='profile-add-section-menu'>
        <h4>Background</h4>
        <li style={{borderBottom: "1px solid rgba(0, 0, 0, 0.08)"}} onClick={this.openExperienceCreate}>Work experience</li>
        <li onClick={this.openEducationCreate}>Education</li>
      </ul>
    )
  }

  renderMore() {
    return (
      <div className='profile-more-menu'>
        <div onClick={this.copyToClipboard}>
          <img src={window.copyLinkURL} />
          <span>Copy profile link</span>
        </div>
        <div onClick={() => this.props.deleteConnection(this.state.connection.id)} style={!this.state.currentUserStatus && !this.state.connection.pending ? null : {"display": "none"}}>
          <img src={window.copyLinkURL} />
          <span>Remove connection</span>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.user) return null;

    return (
      <div className="profile-background">
        <NavbarContainer page="profile" />
        {this.state.addSectionActive || this.state.moreActive ? <div className='profile-menu-background' onClick={this.toggleMenusOff}></div> : null}

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

                      <span className='profile-user-school' style={{display: "flex", alignItems: "center", marginRight: "16px"}}><img style={{width: "32px", height: "32px", marginRight: "8px"}} src="https://static-exp1.licdn.com/sc/h/aajlclc14rr2scznz5qm2rj9u" />{this.props.educations[0] ? this.props.educations[0].school : null}</span>
                    </div>

                    <span className='profile-user-location'>{this.props.user.city_district}, {this.props.user.country_region}</span>

                    {/* User Connections Section */}
                    <Link to={`/connections`}>
                      <span className='profile-user-connections'>{this.state.connections.length} Connection{this.state.connections.length > 1 ? "s" : ""}</span>
                    </Link>

                    {/* User Options */}
                    <div style={{display: "flex", paddingTop: "8px", position: "relative"}}>

                        {/* Is not the current user and had no connection */}
                        {!this.state.currentUserStatus && this.state.connection === "" ? <button className='profile-user-connect' onClick={() => this.props.createConnection({...this.state, connectee_id: Number(window.location.href.split("/users/")[1])})}>Connect</button> : null}
                        {/* Is not the current user and sent the connection request which is pending */}
                        {!this.state.currentUserStatus && this.state.connection && this.state.connection.connector_id === this.props.currentUser.id && this.state.connection.pending ? <button className='profile-user-option' onClick={() => this.props.deleteConnection(this.state.connection.id)}>Pending</button> : null}
                        {/* Is not the current user and but received a connection request which is pending */}
                        {!this.state.currentUserStatus && this.state.connection && this.state.connection.connectee_id === this.props.currentUser.id && this.state.connection.pending ? <button className='profile-user-connect' onClick={() => this.props.updateConnection({...this.state.connection, pending: false})}>Accept</button> : null}
                        {!this.state.currentUserStatus && this.state.connection && this.state.connection.connectee_id === this.props.currentUser.id && this.state.connection.pending ? <button className='profile-user-option' onClick={() => this.props.deleteConnection(this.state.connection.id)}>Ignore</button> : null}

                      <button className='profile-user-option' onClick={() => this.setState({ addSectionActive: true })} style={this.props.currentUser.id === this.props.user.id ? null : {"display": "none"}}>
                        Add section
                        {this.state.addSectionActive ? this.renderAddSection() : null}
                      </button>

                      <button className='profile-user-option' onClick={() => this.setState({ moreActive: true })}>
                        More
                        {this.state.moreActive ? this.renderMore() : null}
                      </button>
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

            <section className="stat-wrap">

              <div className="stat-section">
                <header>
                  <h2>Experience</h2>
                  {this.state.currentUserStatus ? <button className='stat-add-button' onClick={() => this.props.openModal("createExperience", this.props.currentUser)}><img className='profile-stat-plus-sign' src={window.plusURL} /></button> : null}
                </header>

                <ul className='profile-stats-info'>
                  {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} user={this.props.user} />)}
                </ul>
              </div>

              <hr className='stat-breakline' />

              <div className="stat-section">
                <header>
                  <h2>Education</h2>
                  {this.state.currentUserStatus ? <button className='stat-add-button' onClick={() => this.props.openModal("createEducation", this.props.currentUser)}><img className='profile-stat-plus-sign' src={window.plusURL}/></button> : null}
                </header>

                <ul className='profile-stats-info'>
                  {this.props.educations.map(education => <EducationItemContainer key={education.id} education={education} user={this.props.user} />)}
                </ul>
              </div>

            </section>
          </div>
          
        </div>
        <footer style={{height: "100px"}}></footer>
      </div>
    )
  }
}

export default Profile;