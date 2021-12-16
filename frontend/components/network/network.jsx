import React, { Component } from 'react'
import NavbarContainer from '../feed/navbar/navbar_container';
import ConnectionCardContainer from './connection/connection_card_container';

export default class Network extends Component {

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {

    return (
      <div className="network-background">
        <NavbarContainer page="network" />
      </div>
    )
  }
}
