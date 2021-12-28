import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: this.props.connections
    }

  }

  componentDidMount() {
    this.props.fetchConnections(this.props.currentUser.id);
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div className='sidebar'>
        <div className='sidebar-container'> 
          <div className='sidebar-header'>
            {/* Banner */}
            <div className='sidebar-banner'>
              {this.props.currentUser.bannerUrl ? 
                <img className='sidebar-banner-img' src={this.props.currentUser.bannerUrl} alt='sidebar banner' /> : 
                <img className='sidebar-banner-img' src='https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq' alt='sidebar banner' />
              }
            </div>

            {/* Avatar */}
            <div>
              {this.props.currentUser.profilePictureUrl ? <img className='sidebar-avatar' src={this.props.currentUser.profilePictureUrl} alt='user profile picture' /> : <img src='https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x' alt='default profile picture' />}
            </div>

            {/* Current User Info */}
            {this.props.currentUser.profilePictureUrl ? 
              <div>
                <Link className='sidebar-name' to={`/users/${this.props.currentUser.id}`}>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</Link>
              </div> : 
              <div>
                <Link className='sidebar-name' to={`/users/${this.props.currentUser.id}`}>Welcome, {this.props.currentUser.first_name}!</Link>
              </div>
            }
            
            {this.props.currentUser.profilePictureUrl ? 
              <p className='sidebar-headline'>{this.props.currentUser.headline}</p> : 
              <Link className='sidebar-headline-alt' to={`/users/${this.props.currentUser.id}`}>Add a photo</Link>
            }
            

          </div>

          {/* Information Wrap */}
          <div className='sidebar-info-wrap'>
            <div className='sidebar-info-content'>
              <div className='sidebar-connection-item'>
                <Link className='sidebar-connections-wrap' to={`/network`}>
                  <div className='sidebar-connections'>
                    {/* Left Half */}
                    <div className='sidebar-connections-left'>
                      <div className='sidebar-connections-left-top'>
                        <span>Connections</span>
                      </div>
                      <div className='sidebar-connections-left-bottom'>
                        <span>Grow your network</span>
                      </div>
                    </div>
                    {/* Right Half */}
                    <div className='sidebar-connections-right'>
                      <span>{this.props.connections.length}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className='sidebar-footer'>
          <div className='sidebar-footer-wrap'>
            <a className='sidebar-footer-item' href='https://imvincenth.github.io/Layout-Trainer/' target="_blank" rel="noopener noreferrer">Keyboard Layout Trainer</a>
            <a className='sidebar-footer-item' href='https://pantry-chef-mern.herokuapp.com/#/' target="_blank" rel="noopener noreferrer">Recipe Search Application</a>
            <a className='sidebar-footer-end' href='https://github.com/imvincenth?tab=repositories' target="_blank" rel="noopener noreferrer">Discover more of my projects</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;