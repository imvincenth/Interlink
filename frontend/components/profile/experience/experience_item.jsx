import React from 'react';
// import Modal from '../../modal/modal';

class Experience extends React.Component {
  render() {
    const { experience } = this.props;
    return (
      <div>
        <div>
          {/* <Modal /> */}
          <h1>{experience.title}</h1>
          <h2>{experience.company} {experience.employment_type}</h2>
          <h2>{experience.start_date} - {experience.end_date} {this.props.openEditExperienceModal}</h2>
        </div>
      </div>
    )
  }
}

export default Experience;