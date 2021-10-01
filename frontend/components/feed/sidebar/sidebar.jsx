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

        <div className="sidebar-tail">
          <div className="sidebar-tail-header">
            <p className="sidebar-tail-header-text">Discover more</p>
          </div>
          <div className="sidebar-tail-bottom">
            <p className="sidebar-tail-item"><a href="https://www.youtube.com/watch?v=_pGaz_qN0cw" target="_blank">Soundtrack of Life</a></p>
            <p className="sidebar-tail-item"><a href="https://www.youtube.com/watch?v=wvK-iKtkV70" target="_blank">One does not simply walk into Mordor...</a></p>
            <p className="sidebar-tail-item"><a href="https://www.youtube.com/watch?v=UHzF5KnoN20" target="_blank">If I take one more step, it'll be the farthest away from home I've even been</a></p>
            <p className="sidebar-tail-last-item"><a href="https://www.youtube.com/watch?v=rBtzudk40pE" target="_blank">You bow to no one</a></p>
          </div>
        </div>

      </div>
    )
  }
}

export default Sidebar;