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

  render() {
    // if (!this.props.user) return null;

    const { education, key } = this.props;
    return (
      <li className='stat-item-section'>
        <div>
          <div style={{display: "flex", alignItems: "center"}}>
            <img style={{height: "56px", width: "56px", marginRight: "22px"}} src="https://static-exp1.licdn.com/sc/h/8zzzkhxduv0r11cuxbs48pg03" />

            <div style={{display: "flex", flexDirection: "column"}}>
              <span className='stat-first-line'>{education.school}</span>
              <span className='stat-second-line'>{education.degree} - {education.subject}</span>
              <span className='stat-third-line'>{education.start_date} - {education.end_date}</span>
            </div>
          </div>

        </div>

        <button className='stat-edit-button' onClick={() => this.props.openModal("editEducation", this.props.education)} style={this.state.currentUser ? null : {"display": "none"}}>
          <img src={window.statEditURL} />
        </button>

      </li>
    )
  }
}

export default Education;