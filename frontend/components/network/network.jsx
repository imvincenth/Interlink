import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarContainer from '../feed/navbar/navbar_container';
import ConnectionCardContainer from './connection/connection_card_container';

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allConnectionsOn: false,
      
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {

    return (
      <div className="network-background">
        <NavbarContainer page="network" />

        <div className='network-wrap'>
          <section className='network-management-bar'>
            <h2>Manage my network</h2>
            <div className='network-management-item'>
              
            </div>
          </section>

          <section>

          </section>
        </div>

      </div>
    )
  }
}
