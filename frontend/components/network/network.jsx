import React, { Component } from 'react'
import NavbarContainer from '../feed/navbar/navbar_container';
import ConnectionCardContainer from './connection/connection_card_container';

export default class Network extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="network-background">
        <NavbarContainer />
        {this.props.users.map(user => <ConnectionCardContainer key={`${user.created_at}+${user.id}`} user={user} />)}
      </div>
    )
  }
}
