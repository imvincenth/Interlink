import React from 'react';

class Experience extends React.Component {
  render() {
    const { experience, key } = this.props;
    console.log(key);
    return (
      <div>
        <div>
          <h1>{experience.title}</h1>
          <h2>{experience.company} {experience.employment_type}</h2>
          <h2>{experience.start_date} - {experience.end_date} {this.props.openEditExperienceModal}</h2>
        </div>
      </div>
    )
  }
}

export default Experience;