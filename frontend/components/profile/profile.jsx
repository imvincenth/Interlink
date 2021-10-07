import React from 'react';
import Modal from '../modal/modal';

import ExperienceItemContainer from './experience/experience_item_container';

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchExperiences();
  }

  render() {
    const { currentUser, experiences, fetchExperiences, fetchEducations } = this.props;
    return (
      <div>
        <Modal />
        <div className="profile-picture"></div>
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <h2>{currentUser.headline} {this.props.openEditProfileModal}</h2>
        <h2>{currentUser.city_district}, {currentUser.country_region}</h2>

        <div>
         <h1>Experience</h1>
            {this.props.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} />)}

         {this.props.openCreateExperienceModal}
        </div>

        <div>
          <h1>Education</h1>
        </div>

      </div>
    )
  }
}

export default Profile;