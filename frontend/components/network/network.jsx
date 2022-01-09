import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarContainer from '../feed/navbar/navbar_container';

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedInvitations: false,
      acceptedConnectionsCount: 0,
      pendingConnectionsCount: 0
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
      .then(this.props.fetchConnections(this.props.currentUser.id));
  }

  filterConnectionType() {
    
  }

  render() {
    if (!this.props.connections) return null;

    return (
      <div className="network-background">
        <NavbarContainer page="network" />

        <div className='network-wrap'>
          <div className='network-wrap-structure'>

          <section className='network-management-bar'>
            <h2>Manage my network</h2>
            <Link className='network-management-item' to={`/connections`}>
              <div>
                <img src={window.connectionBarURL} />
                Connections
              </div>
              <span>{this.props.connections.length}</span>
            </Link>
          </section>

          <section className='network-invitations-section'>
            <header>
              <h2>Invitations</h2>
              <Link className='network-management-see-all' to={`/invitations`}>See all</Link>
            </header>
          </section>

          </div>
        </div>

      </div>
    )
  }
}
