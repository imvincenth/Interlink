import React, { Component } from 'react'
import NavbarContainer from '../../feed/navbar/navbar_container';

export default class Connection extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="network-background">
        <NavbarContainer page="network" />

      </div>
    )
  }
}
