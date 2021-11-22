import React from 'react';
import Navbar from '../feed/navbar/navbar_container';
import ExperienceItemContainer from './experience/experience_item_container';
import EducationItemContainer from './education/education_item_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   user: ""
    // }

    this.user = "";
    this.experiences = [];
    this.educations = [];
  }

  componentDidMount() {
    console.log("mount");
    this.props.fetchUsers()
      .then(this.props.fetchExperiences())
      .then(this.props.fetchEducations())
      .then(this.userCheck());
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update")
    this.user = "";
    if (prevProps.userId !== this.props.userId) {
      this.props.fetchUsers()
      .then(this.props.fetchExperiences())
      .then(this.props.fetchEducations())
      .then(this.userCheck());
    }
  }

  userCheck() {
    // this.props.users.forEach(user => Number(this.props.userId) === user.id ? this.setState({ user: user }) : null);
    this.props.users.forEach(user => Number(this.props.userId) === user.id ? this.user = user : null);
  }
  
  profileCheck() {
    this.props.experiences.forEach(exp => Number(this.props.userId) === exp.user_id ? this.experiences.push(exp) : null);
    this.props.educations.forEach(edu => Number(this.props.userId) === edu.user_id ? this.educations.push(edu) : null);
  }

  render() {
    this.experiences = [];
    this.educations = [];
    this.profileCheck();

    if (!this.props.experiences || !this.props.educations || !this.props.users) return null;

    // const { currentUser } = this.props;
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
                    <h1 className="profile-name">{this.user.first_name} {this.user.last_name}</h1>
                    <br />
                    <h2 className="profile-headline">{this.user.headline}</h2>
                    <h3 className="profile-location">{this.user.city_district}, {this.user.country_region}</h3>
                    <div>
                      {this.props.openEditProfileModal}
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat-wrap">
                <div className="stat-wrap-header">
                  <h1 className="experience-header">Experience</h1>
                  <br />
                  <div className="experience-item">
                    {this.experiences.map(experience => <ExperienceItemContainer key={experience.id} experience={experience} />)}
                    {this.props.openCreateExperienceModal}
                  </div>
                </div>

                <div className="stat-wrap-tail">
                  <h1 className="education-header">Education</h1>
                  <br />
                  <div>
                    {this.educations.map(education => <EducationItemContainer key={education.id} education={education} />)}
                    {this.props.openCreateEducationModal}
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