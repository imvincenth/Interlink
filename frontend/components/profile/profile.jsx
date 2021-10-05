import React from 'react';

class Profile extends React.Component {
  render() {
    const { currentUser, fetchExperiences, fetchEducations } = this.props;
    return (
      <div>
        <div className="profile-picture"></div>
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <h2>{currentUser.headline}</h2>

        
      </div>
    )
  }
}

export default Profile;