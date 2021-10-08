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

        <div className="profile-card">
          <img src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="sidebar banner" />
          <div className="profile-avatar">
            <img src={window.gandalfURL} alt="gandalf smiling" />
          </div>
          <h1>{currentUser.first_name} {currentUser.last_name}</h1>
          <h2>{currentUser.headline} {this.props.openEditProfileModal}</h2>
          <h2>{currentUser.city_district}, {currentUser.country_region}</h2>
        </div>

        <div className="stat-wrap">
          <div className="stat-wrap-header">
            <h1>Experience</h1>
            <div>
              {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} />)}
              {this.props.openCreateExperienceModal}
            </div>
          </div>

          <div className="stat-wrap-tail">
            <h1>Education</h1>
            <div>
              {this.props.educations.map(education => <EducationItemContainer key={education.id} education={education} />)}
              {this.props.openCreateEducationModal}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile;