import React from 'react';
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
      connectee_id: ""
    }

    this.handleConnectSubmit = this.handleConnectSubmit.bind(this);
  }

  currentUserCheck() {
    this.props.currentUser.id === this.props.userId ? this.setState({ currentUserStatus: true }) : null;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId)
      .then(this.currentUserCheck())
      .then(this.props.fetchExperiences(this.props.userId))
      .then(this.props.fetchEducations(this.props.userId))
      .then(this.props.fetchConnection(this.props.userId, this.props.currentUser.id));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.length > 0) this.props.history.replace("/404");
    if (prevProps.userId !== this.props.userId) {
      this.props.fetchUser(this.props.userId)
        .then(this.currentUserCheck())
        .then(this.props.fetchExperiences(this.props.userId))
        .then(this.props.fetchEducations(this.props.userId))
        .then(this.props.fetchConnection(this.props.userId, this.props.currentUser.id))
        .then(this.setState({ currentUserStatus: false }))
        .then(this.connectionStatusCheck());
    }
  }

  handleConnectSubmit(e) {
    e.preventDefault();

    this.props.createConnection({...this.state, connectee_id: this.props.userId});
  }

  render() {
    if (!this.props.user || !this.props.connection) return null;

    return (
      <div className="profile-background">
        <NavbarContainer page="profile" />
        <div className="profile-container">
          <div className='profile-content-wrap'>

            <section className='profile-content-main'>
              {/* Banner */}
              <div className='profile-banner-wrap'>
                {this.props.user.bannerUrl ? <img className='profile-banner' src={this.props.user.bannerUrl} /> : <img className='profile-banner' src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" />}
              </div>
        
              {/* Profile Info */}
              <div className='profile-info-wrap'>
                <div className='profile-info-propic-box'>
                  <div className='profile-picture-box'>
                    {this.props.user.profilePictureUrl ? <img /> : <img />}
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
      </div>
    )
  }
}

export default Profile;