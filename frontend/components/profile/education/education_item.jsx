import React from 'react';

class Education extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: false
    }
  }

  currentUserCheck() {
    this.props.currentUser.id === this.props.user.id ? this.setState({ currentUser: true }) : null;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.education.user_id)
      .then(this.currentUserCheck());
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user) return null;
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchUser(this.props.user.id);
    }
  }

  editEducationButton() {
    return (
      <button className="open-modal" onClick={() => this.props.openEditEducationModal(this.props.education)}>
        <img src={window.vectorURL} alt="pen" />
      </button>
    )
  }

  deleteEducationButton() {
    return (
      <button onClick={() => this.props.deleteEducation(this.props.education.id)}>
        Delete
      </button>
    )
  }

  render() {
    // if (!this.props.user) return null;

    const { education, key } = this.props;
    return (
      <div>
        <div className="education-item-wrap">
          <div className="education-item-head">
            <h1>{education.school}</h1>
            {this.state.currentUser ? this.editEducationButton() : null}
            {this.state.currentUser ? this.deleteEducationButton() : null}
          </div>
          <h2>{education.degree} {education.subject}</h2>
          <h2>{education.start_date} - {education.end_date}</h2>
        </div>
      </div>
    )
  }
}

export default Education;