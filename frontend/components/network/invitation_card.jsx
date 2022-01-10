import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class InvitationCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: false,
      user: this.props.users[this.props.connection.connector_id],
      invitorConnections: [],
      mutuals: [],
      firstMutual: null
    }

    this.handleAccept = this.handleAccept.bind(this);
  }

  componentDidMount() {
    this.props.fetchConnections(this.state.user.id)
      .then(() => this.findMutuals());
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
  }

  handleAccept() {
    this.props.updateConnection({ ...this.props.connection, pending: false })
      .then(() => this.setState({ accepted: true }));
  }

  findMutuals() {
    let tempInvitorConnections = [];
    let tempMutualIDs = [];

    this.props.connections.forEach(connection => connection.connector_id === this.state.user.id || connection.connectee_id === this.state.user.id && !connection.pending ? tempInvitorConnections.push(connection) : null);
    // IDs of all of the invitor's accepted connections
    let tempInvitorConnectionIDs = tempInvitorConnections.map(connection => connection.connector_id === this.state.user.id ? connection.connectee_id : connection.connector_id);
    // IDs of all of the current user's accepted connections
    let tempCurrentUserConnectionIDs = this.props.currentUserConnections.map(connection => connection.connector_id === this.props.currentUser.id ? connection.connectee_id : connection.connector_id);
    // Filtering user IDs of the mutal connections
    tempCurrentUserConnectionIDs.forEach(id => tempInvitorConnectionIDs.includes(id) && !tempMutualIDs.includes(id) ? tempMutualIDs.push(id) : null);
    // Getting the user objects from the mutuals IDs
    let tempMutuals = tempMutualIDs.map(id => this.props.users[id]);
    // Getting name of the first mutual connection
    let tempFirstMutual;
    if (tempMutuals[0]) tempFirstMutual = `${tempMutuals[0].first_name} ${tempMutuals[0].last_name}`;
    if (!tempMutuals[0]) tempFirstMutual = null;

    this.setState({ invitorConnections: tempInvitorConnections, mutuals: tempMutuals, firstMutual: tempFirstMutual });
  }

  render() {
    // if (!this.props.currentUserConnections) return null;

    return (
      <li className='network-invitation-card'>
        <div className='network-invitation-card-left'>
          <Link to={`/users/${this.state.user.id}`}>
            {this.state.user.profilePictureUrl ? <img className='network-invitation-card-propic' src={this.state.user.profilePictureUrl} /> : <img className='network-invitation-card-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
          </Link>

          <div className='network-invitation-card-social-wrap'>
            <Link className='network-invitation-card-social' to={`/users/${this.state.user.id}`}>
              <span className='network-invitation-card-name'>{this.state.user.first_name} {this.state.user.last_name}</span>
              <span className='network-invitation-card-headline'>{this.state.user.headline}</span>
            </Link>
            {this.state.mutuals.length === 0 ? <span className='network-invitation-card-no-mutual'><img src={window.invitePlaceURL} />{this.state.user.city_district}, {this.state.user.country_region}</span> : <span className='network-invitation-card-mutual'><img src={window.inviteMutualURL} />{this.state.firstMutual} {this.state.mutuals.length > 1 ? `and ${this.state.mutuals.length - 1} other${this.state.mutuals.length > 2 ? "s" : ""}` : null}</span>}
          </div>
        </div>

        <div className='network-invitation-card-right'>
          <button className='network-invitation-card-ignore' onClick={() => this.props.deleteConnection(this.props.connection.id)}>Ignore</button>
          <button className='network-invitation-card-accept' onClick={this.handleAccept}>Accept</button>
        </div>
      </li>
    )
  }
}
