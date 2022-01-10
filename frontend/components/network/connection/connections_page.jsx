import React, { Component } from 'react'
import NavbarContainer from '../../feed/navbar/navbar_container';
import ConnectionPageCardContainer from './connection_page_card_container';

export default class Connection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acceptedConnectionObjs: [],
      acceptedUserObjs: []
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchConnections(this.props.currentUser.id))
      .then(() => this.filterAcceptedConnections());
  }

  filterAcceptedConnections() {
    let tempAccepted = [];
    this.props.connections.forEach(connection => connection.connector_id === this.props.currentUser.id || connection.connectee_id === this.props.currentUser.id && !connection.pending ? tempAccepted.push(connection) : null);
    
    let tempUserIds = tempAccepted.map(connection => connection.connector_id === this.props.currentUser.id ? connection.connectee_id : connection.connector_id);
    let tempUsers = tempUserIds.map(id => this.props.users[id]);

    this.setState({ acceptedConnectionObjs: [...tempAccepted], acceptedUserObjs: [...tempUsers] });
  }

  render() {
    if (!this.props.connections) return null;

    return (
      <div className="network-background">
        <NavbarContainer page="network" />
          <div className='network-connections-wrap'>

            {/* Connections Section */}
            <section>
              <header>
                <h1>{this.state.acceptedConnectionObjs.length} Connections</h1>
              </header>
              <div>
                
              </div>


              <div>
                {this.state.acceptedConnectionObjs.map((connection, i) => <ConnectionPageCardContainer key={`${connection.id}${i}${connection.connector_id}`} connection={connection} user={this.state.acceptedUserObjs[i]} />)}
              </div>
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
