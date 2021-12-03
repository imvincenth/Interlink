import React, { Component } from 'react'
import NavbarContainer from '../feed/navbar/navbar_container';
import ConnectionCardContainer from './connection/connection_card_container';

export default class Network extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />
        {this.props.users.map(user => <ConnectionCardContainer user={user} />)}
      </div>
    )
  }
}
