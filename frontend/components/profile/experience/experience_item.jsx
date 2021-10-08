import React from 'react';
import Modal from '../../modal/modal';

class Experience extends React.Component {
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
          </div>
          <h2>{experience.company} {experience.employment_type}</h2>
          <h2>{experience.start_date} - {experience.end_date}
          </h2>
        </div>
      </div>
    )
  }
}

export default Experience;