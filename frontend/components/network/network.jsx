import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarContainer from '../feed/navbar/navbar_container';
import InvitationCardContainer from './invitation_card_container';

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedInvitations: false,
      currentUserConnections: [],
      pendingConnections: [],
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchConnections(this.props.currentUser.id))
      .then(() => this.filterConnectionType());
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.connections) !== JSON.stringify(this.props.connections)) {
      this.filterConnectionType();
    }
  }

  filterConnectionType() {
    let tempAccepted = [];
    let tempPending = [];

    this.props.connections.forEach(connection => connection.connector_id === this.props.currentUser.id || connection.connectee_id === this.props.currentUser.id && !connection.pending ? tempAccepted.push(connection) : null);
    this.props.connections.forEach(connection => connection.connector_id !== this.props.currentUser.id && connection.connectee_id === this.props.currentUser.id && connection.pending ? tempPending.push(connection) : null);

    this.setState({ currentUserConnections: [...tempAccepted], pendingConnections: [...tempPending] });
  }

  renderRemainingInvitations() {
    return (
      this.state.pendingConnections.slice(3).map((connection, i) => <InvitationCardContainer key={`${connection.id}${i}`} connection={connection} accepted={this.state.currentUserConnections} />)
    )
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
              <span>{this.state.currentUserConnections.length}</span>
            </Link>
          </section>

          <section className='network-invitations-section'>
            <header>
              <h2>Invitations</h2>
              <Link className='network-management-see-all' to={`/invitations`}>See all {this.state.pendingConnections.length}</Link>
            </header>

            <ul className='network-invitations-wrap'>
              {this.state.pendingConnections[0] ? <InvitationCardContainer connection={this.state.pendingConnections[0]} currentUserConnections={this.state.currentUserConnections} /> : null}
              {this.state.pendingConnections[1] ? <InvitationCardContainer connection={this.state.pendingConnections[1]} currentUserConnections={this.state.currentUserConnections} /> : null}
              {this.state.pendingConnections[2] ? <InvitationCardContainer connection={this.state.pendingConnections[2]} currentUserConnections={this.state.currentUserConnections} /> : null}

              {this.state.pendingConnections.length > 3 && this.state.expandedInvitations ? this.renderRemainingInvitations() : null}

              {this.state.pendingConnections.length > 3 && this.state.expandedInvitations ? <li onClick={() => this.setState({ expandedInvitations: false })}>Show fewer</li> : null}
              {this.state.pendingConnections.length > 3 && !this.state.expandedInvitations ? <li onClick={() => this.setState({ expandedInvitations: true })}>Show more</li> : null}
            </ul>

          </section>

          </div>
        </div>

      </div>
    )
  }
}
