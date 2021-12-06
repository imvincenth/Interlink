import React from 'react';

class Education extends React.Component {
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

  editEducationButton() {
    return (
      <button className="open-modal" onClick={() => this.props.openEditEducationModal(education)}>
        <img src={window.vectorURL} alt="pen" />
      </button>
    )
  }

  deleteEducationButton() {
    return (
      <button onClick={() => this.props.deleteEducation(education.id)}>
        Delete
      </button>
    )
  }

  render() {
    const { education, key } = this.props;
    return (
      <div>
        <div className="education-item-wrap">
          <div className="education-item-head">
            <h1>{education.school}</h1>
            {this.state.currentUserCheck ? this.editEducationButton() : null}
            {this.state.currentUserCheck ? this.deleteEducationButton() : null}
          </div>
          <h2>{education.degree} {education.subject}</h2>
          <h2>{education.start_date} - {education.end_date}</h2>
        </div>
      </div>
    )
  }
}

export default Education;