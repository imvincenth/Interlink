import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';

class Feed extends React.Component {
  render() {
    const { currentUser, logout } = this.props;
    return (
      <div className="feed-page">
        <div>
          <header>
            <NavbarContainer />
          </header>

          <div className="content-body">
            <SidebarContainer />

            <div className="feed">
              <h1 id="construction">UNDER CONSTRUCTION NOTHING TO SEE HERE</h1>

              <div className="feed-input-container">

              </div>

            </div>

          </div>
        </div>
        
        
      </div>
    )
  }
}

export default Feed;