import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div className="sidebar-container">
        
        <div className="sidebar-header">
          <img src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="sidebar banner" />
          <div className="sidebar-avatar">
            {this.props.currentUser.profilePictureUrl ? <img src={this.props.currentUser.profilePictureUrl} alt="user profile picture" /> : <img src="https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x" alt="default profile picture" />}
          </div>
          <h2 className="sidebar-name">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h2>
          <h4 className="sidebar-email">{this.props.currentUser.headline}</h4>
        </div>

        <div className="sidebar-info-wrap">
          <div className="sidebar-info-item">
            <p className="sidebar-connection">Connections</p>
            <p className="sidebar-number">10</p>
          </div>
          <div className="sidebar-info-item">
            <p className="sidebar-growyournetwork">Grow your network</p>
          </div>
        </div>

        <div className="sidebar-tail">
          <div className="sidebar-tail-header">
            <p className="sidebar-tail-item"><a href="https://www.youtube.com/watch?v=_pGaz_qN0cw" target="_blank">Soundtrack of Life</a></p>
            <p className="sidebar-tail-item"><a href="https://youtu.be/wvK-iKtkV70?t=67" target="_blank">One does not simply walk into Mordor...</a></p>
            <p className="sidebar-tail-item"><a href="https://www.youtube.com/watch?v=mJZZNHekEQw" target="_blank">Balrog</a></p>
            <p className="sidebar-tail-last-item"><a href="https://www.youtube.com/watch?v=EOA1wBw_Jt4" target="_blank">Rohan</a></p>
          </div>
          <div className="sidebar-tail-bottom">
            <p className="sidebar-tail-header-text">Discover more</p>
          </div>
          <button className="header-button" onClick={this.props.logout}>Log Out</button>
        </div>

      </div>
    )
  }
}

export default Sidebar;