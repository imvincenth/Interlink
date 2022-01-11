import React, { Component } from 'react'
import NavbarContainer from '../../feed/navbar/navbar_container';
import InvitationManagerCardContainer from './invitation_manager_card_container';

export default class InvitationManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserConnections: [],

      pendingConnectionObjs: [],
      pendingUserObjs: [],

      sentConnectionObjs: [],
      sentUserObjs: [],

      receivedTab: true,
      sentTab: false
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchConnections(this.props.currentUser.id))
      .then(() => this.filterConnections());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connections.length !== this.props.connections.length) {
      this.filterConnections();
    }
  }

  filterConnections() {
    let tempAccepted = [];
    let tempPending = [];
    let tempSent = [];
    this.props.connections.forEach(connection => (connection.connector_id === this.props.currentUser.id || connection.connectee_id === this.props.currentUser.id) && !connection.pending ? tempAccepted.push(connection) : null);
    this.props.connections.forEach(connection => (connection.connector_id !== this.props.currentUser.id && connection.connectee_id === this.props.currentUser.id) && connection.pending ? tempPending.push(connection) : null);
    this.props.connections.forEach(connection => (connection.connector_id === this.props.currentUser.id && connection.connectee_id !== this.props.currentUser.id) && connection.pending ? tempSent.push(connection) : null);
    
    let tempPendingUserIds = tempPending.map(connection => connection.connector_id === this.props.currentUser.id ? connection.connectee_id : connection.connector_id);
    let tempPendingUsers = tempPendingUserIds.map(id => this.props.users[id]);
    let tempSentUserIds = tempSent.map(connection => connection.connector_id === this.props.currentUser.id ? connection.connectee_id : connection.connector_id);
    let tempSentUsers = tempSentUserIds.map(id => this.props.users[id]);

    this.setState({ currentUserConnections: [...tempAccepted], pendingConnectionObjs: [...tempPending], pendingUserObjs: [...tempPendingUsers], sentConnectionObjs: [...tempSent], sentUserObjs: [...tempSentUsers] });
  }

  render() {
    return (
      <div className="network-background">
        <NavbarContainer page="network" />
        <div className='network-connections-wrap'>

          {/* Invitation Manager Main */}
          <section className='network-connections-main'>
            <header>
              Manage invitations
            </header>
            <div className='invitations-filter-choices'>
              <button className={this.state.receivedTab ? 'invitations-filter-choice active' : 'invitations-filter-choice'} onClick={() => this.setState({ receivedTab: true, sentTab: false })}>
                Received
              </button>

              <button className={this.state.sentTab ? 'invitations-filter-choice active' : 'invitations-filter-choice'} onClick={() => this.setState({ receivedTab: false, sentTab: true })}>
                Sent
              </button>
            </div>

            <ul>
              {this.state.receivedTab ? this.state.pendingConnectionObjs.map((connection, i) => <InvitationManagerCardContainer key={`${connection.id}${i}${connection.connector_id}`} connection={connection} user={this.state.pendingUserObjs[i]} currentUserConnections={this.state.currentUserConnections} place={i+1} type={"received"} />) : null}
              {this.state.sentTab ? this.state.sentConnectionObjs.map((connection, i) => <InvitationManagerCardContainer key={`${connection.id}${i}${connection.connector_id}`} connection={connection} user={this.state.sentUserObjs[i]} currentUserConnections={this.state.currentUserConnections} place={i+1} type={"sent"} />) : null}
            </ul>
          </section>

          {/* Project Bar */}
          <section className='project-info-bar'>
            <div className='project-info-text'>
              <h3>Project Description</h3>
              <p>RingIn is a clone of LinkedIn themed around J. R. R. Tolkien's The Lord of the Rings.</p>
              <p>This full stack project is built with...</p>
            </div>

            <ul>
              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>React</span>
                </div>
                <span className='post-info-item-desc'>Frontend structure</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Redux</span>
                </div>
                <span className='post-info-item-desc'>Frontend store</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Ruby on Rails</span>
                </div>
                <span className='post-info-item-desc'>Backend</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>PostgreSQL</span>
                </div>
                <span className='post-info-item-desc'>Database</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>AWS</span>
                </div>
                <span className='post-info-item-desc'>Media uploading and storage</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>HTML, CSS</span>
                </div>
                <span className='post-info-item-desc'></span>
              </li>
            </ul>

          </section>

        </div>
      </div>
    )
  }
}
