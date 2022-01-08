import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchResultCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: true,
      connector_id: this.props.currentUser.id,
      connectee_id: "",

      currentConnection: null,

      withdrawn: false,
    }

    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  componentDidMount() {
    this.connectionCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.connections) !== JSON.stringify(this.props.connections) && !this.state.withdrawn) {
      this.connectionCheck();
    }
  }

  connectionCheck() {
    let connectionTemp;
    this.props.connections.forEach(connection => connection.connectee_id === this.props.user.id || connection.connector_id === this.props.user.id ? connectionTemp = connection : null);
    this.setState({ currentConnection: connectionTemp });
  }

  handleWithdraw() {
    this.props.deleteConnection(this.state.currentConnection.id);
    this.setState({ withdrawn: true })
  }

  renderConnectOptions() {
    if (!this.state.currentConnection) {
      // No connection object exists between the current user and search result
      return (
        <div className='search-card-connect-corner' style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.15)"} : null}>
          <button className='search-card-connect' onClick={() => this.props.createConnection({...this.state, connectee_id: this.props.user.id})}>
            Connect
          </button>
        </div>
      )
    } else if (this.state.currentConnection.pending && this.state.currentConnection.connector_id === this.props.currentUser.id) {
      // If the sender of connection request is the current user
      return (
        <div className='search-card-connect-corner' onClick={this.handleWithdraw} style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.15)"} : null}>
          <button className={this.state.withdrawn ? 'search-card-withdrawn' : 'search-card-pending'} disabled={this.state.withdrawn ? true : null}>
            {this.state.withdrawn ? "Withdrawn" : "Pending"}
          </button>
        </div>
      )
    } else if (this.state.currentConnection.pending && this.state.currentConnection.connector_id === this.props.user.id) {
      // If the current user is receiving a connnection request from the user
      return (
        <div className='search-card-connect-corner' style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.15)"} : null}>
          <button className='search-card-ignore' onClick={() => this.props.deleteConnection(this.state.currentConnection.id)}>
            Ignore
          </button>
          <button className='search-card-connect' onClick={() => this.props.updateConnection({...this.state.currentConnection, pending: false})}>
            Accept
          </button>
        </div>
      )
    } else if (!this.state.currentConnection.pending) {
      // If the current user has an existing accepted connection with the search result
      return (
        <div className='search-card-connect-corner' style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.15)"} : null}>
          <button onClick={() => this.props.deleteConnection(this.state.currentConnection.id)}>
            Disconnect
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <li>
        <div className='search-result'>

          <Link className='search-card-propic-box' to={`/users/${this.props.user.id}`}>
            {this.props.user.profilePictureUrl ? 
              <img className='search-card-propic' src={this.props.user.profilePictureUrl} /> : 
              <img className='search-card-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />
            }
          </Link>

          <Link className='search-card-social-wrap' to={`/users/${this.props.user.id}`} style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.15)"} : null}>
            <span className='search-card-username'>{this.props.user.first_name} {this.props.user.last_name}</span>
            <span className='search-card-headline'>{this.props.user.headline}</span>
            <span className='search-card-location'>{this.props.user.city_district}, {this.props.user.country_region}</span>
          </Link>

          
          {this.renderConnectOptions()}

        </div>
      </li>
    )
  }
}
