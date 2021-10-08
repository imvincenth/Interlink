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

              <h1>UNDER CONSTRUCTION NOTHING TO SEE HERE MOVE ALONG FOLKS</h1>

              <div className="feed-input-container">
                <div className="feed-input">
                  <img src={window.quillURL} alt="quill" />
                  <form>
                    <input type="text" />
                    <button>Start a post</button>
                  </form>
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