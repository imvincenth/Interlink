import React from 'react';
import Modal from '../modal/modal';
import Navbar from '../feed/navbar/navbar';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchExperiences();
    this.props.fetchEducations();
  }

  render() {
    const { currentUser, experiences, fetchExperiences, fetchEducations } = this.props;
    return (
      <div className="profile-container">
        <Modal />
        <Navbar />

        <div className="profile-main">
          <div className="profile-card">
            <img src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="sidebar banner" />
            <div className="profile-avatar">
              <img src={window.gandalfURL} alt="gandalf smiling" />
            </div>
            <div className="profile-card-main">
              <div className="profile-info">
                <h1 className="profile-name">{currentUser.first_name} {currentUser.last_name}</h1>
                <br />
                <h2 className="profile-headline">{currentUser.headline}</h2>
                <h3 className="profile-location">{currentUser.city_district}, {currentUser.country_region}</h3>
                {this.props.openEditProfileModal}
              </div>
            </div>
          </div>

          <div className="stat-wrap">
            <div className="stat-wrap-header">
              <h1 className="experience-header">Experience</h1>
              <br />
              <div className="experience-item">
                {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} />)}
                {this.props.openCreateExperienceModal}
              </div>
            </div>

            <div className="stat-wrap-tail">
              <h1 className="education-header">Education</h1>
              <br />
              <div>
                {this.props.educations.map(education => <EducationItemContainer key={education.id} education={education} />)}
                {this.props.openCreateEducationModal}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile;