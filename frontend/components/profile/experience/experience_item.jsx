import React from 'react';
import Modal from '../../modal/modal';

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.experience
    }

  }

  render() {
    const { experience, key } = this.props;
    return (
      <div>
        <div>
        
          <h1>{experience.title}</h1>
          <h2>{experience.company} {experience.employment_type}</h2>
          <h2>{experience.start_date} - {experience.end_date}
          <button className="open-modal" onClick={() => this.props.openEditExperienceModal(experience)}>
            Edit Experience
          </button>
          </h2>
        </div>
      </div>
    )
  }
}

export default Experience;