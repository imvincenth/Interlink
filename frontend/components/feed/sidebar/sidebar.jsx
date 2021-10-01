import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar-container">
        <div>
          <div>avatar</div>
          <h2>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h2>
          <h4>{this.props.currentUser.email}</h4>
        </div>

        <div>
          <Link to="/">
            <span>Connections</span>
            <span>Grow your network</span>
          </Link>
        </div>

        <div>
          stats
        </div>

      </div>
    )
  }
}

export default Sidebar;