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

  render() {

    if (!this.props.user) return null;

    const { experience, key } = this.props;
    return (
      <li className='stat-item-section'>
        <div>
          <div style={{display: "flex", alignItems: "center"}}>
            <img style={{height: "56px", width: "56px", marginRight: "22px"}} src="https://static-exp1.licdn.com/sc/h/aajlclc14rr2scznz5qm2rj9u" />

            <div style={{display: "flex", flexDirection: "column"}}>
              <span className='stat-first-line'>{experience.title}</span>
              <span className='stat-second-line'>{experience.company}</span>
              {experience.start_date !== "invalid" ? <span className='stat-third-line'>{experience.start_date} - {experience.end_date}</span> : null}
            </div>
          </div>

        </div>

        <button className='stat-edit-button' onClick={() => this.props.openModal("editExperience", this.props.experience)} style={this.state.currentUser ? null : {"display": "none"}}>
          <img src={window.statEditURL} />
        </button>
      </li>
    )
  }
}

export default Experience;