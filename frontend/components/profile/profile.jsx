import React from 'react';

class Profile extends React.Component {
  render() {
    const { currentUser, fetchExperiences, fetchEducations } = this.props;
    return (
      <div>
        <div className="profile-picture"></div>
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <h2>{currentUser.headline}</h2>

        <div>
         <h1>Experience</h1>
         {/* {this.props.experiences.map(experience => <h2>{experience.title}</h2>)} */}
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