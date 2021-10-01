import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar-container">
        
        <div className="sidebar-header">
          <img src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="sidebar banner" />
          <div className="sidebar-avatar"></div>
          <h2 className="sidebar-name">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h2>
          <h4 className="sidebar-email">{this.props.currentUser.email}</h4>
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

      </div>
    )
  }
}

export default Sidebar;