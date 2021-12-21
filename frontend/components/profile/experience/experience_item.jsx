import React from 'react';
import Modal from '../../modal/modal';

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: false,
    }
  }

  currentUserCheck() {
    this.props.currentUser.id === this.props.user.id ? this.setState({ currentUser: true }) : null;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.experience.user_id)
      .then(this.currentUserCheck());
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user) return null;

    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchUser(this.props.user.id)
      // .then(() => this.currentUserCheck());
    }
  }

  editExperienceButton() {
    return (
      <button className="open-modal" onClick={() => this.props.openEditExperienceModal(this.props.experience)}>
        <img src={window.vectorURL} alt="pen" />
      </button>
    )
  }

  deleteExperienceButton() {
    return (
      <button onClick={() => this.props.deleteExperience(this.props.experience.id)}>
        Delete
      </button>
    )
  }

  render() {

    // if (!this.props.user) return null;

    const { experience, key } = this.props;
    return (
      <div>
        <div className="experience-item-wrap">
          <div className="experience-item-head">
            <h1>{experience.title}</h1>
            {this.state.currentUser ? this.editExperienceButton() : null}
            {this.state.currentUser ? this.deleteExperienceButton() : null}
          </div>
          <h2>{experience.company} {experience.employment_type}</h2>
          {experience.start_date !== "invalid" ? <h2>{experience.start_date} - {experience.end_date}</h2> : null}
        </div>
      </div>
    )
  }
}

export default Experience;