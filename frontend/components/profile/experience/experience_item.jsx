import React from 'react';
import Modal from '../../modal/modal';

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserCheck: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchUser(this.props.user.id)
      .then(this.setState({ user: this.props.user }))
      .then(this.setState({ currentUserCheck: this.props.currentUser.id === this.props.user.id }));
    }
  }

  render() {
    const { experience, key } = this.props;
    return (
      <div>
        <div className="experience-item-wrap">
          <div className="experience-item-head">
            <h1>{experience.title}</h1>
            <button className="open-modal" onClick={() => this.props.openEditExperienceModal(experience)}>
              <img src={window.vectorURL} alt="pen" />
            </button>
            <button onClick={() => this.props.deleteExperience(experience.id)}>
              Delete
            </button>
          </div>
          <h2>{experience.company} {experience.employment_type}</h2>
          {experience.start_date !== "invalid" ? <h2>{experience.start_date} - {experience.end_date}</h2> : null}
        </div>
      </div>
    )
  }
}

export default Experience;