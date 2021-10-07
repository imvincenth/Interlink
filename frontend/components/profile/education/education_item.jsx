import React from 'react';
import Modal from '../../modal/modal';

class Education extends React.Component {
  render() {
    const { education, key } = this.props;
    return (
      <div>
        <div>
        
          <h1>{education.title}</h1>
          <h2>{education.company} {education.employment_type}</h2>
          <h2>{education.start_date} - {education.end_date}
          <button className="open-modal" onClick={() => this.props.openEditEducationModal(education)}>
            Edit education
          </button>
          </h2>
        </div>
      </div>
    )
  }
}

export default Education;