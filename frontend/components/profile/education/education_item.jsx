import React from 'react';
import Modal from '../../modal/modal';

class Education extends React.Component {
  render() {
    const { education, key } = this.props;
    return (
      <div>
        <div>
          <h1>{education.school}</h1>
          <h2>{education.degree} {education.subject}</h2>
          <h2>{education.start_date.split(" ")[1]} - {education.end_date.split(" ")[1]}
            <button className="open-modal" onClick={() => this.props.openEditEducationModal(education)}>
              <img src={window.vectorURL} alt="pen" />
            </button>
          </h2>
        </div>
      </div>
    )
  }
}

export default Education;