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

              <div className="feed-input-container">
                <div className="feed-input">
                  <img src={window.quillURL} alt="quill" />
                  <form action=""></form>
                </div>
              </div>

            </div>

          </div>
        </div>
        
        <button className="header-button" onClick={logout}>Log Out</button>
      </div>
    )
  }
}

export default Feed;