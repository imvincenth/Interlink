import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarContainer from '../feed/navbar/navbar_container';

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedInvitations: false
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
      .then(this.props.fetchConnections(this.props.currentUser.id));
  }

  render() {
    if (!this.props.connections) return null;

    return (
      <div className="network-background">
        <NavbarContainer page="network" />

        <div className='network-wrap'>

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
              <button>See all</button>
            </header>
          </section>

        </div>

      </div>
    )
  }
}
