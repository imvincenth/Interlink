import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ConnectionsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteMenu: false
    }
  }

  convertDate(connection) {
    let rawDate;
    if (connection && !connection.pending) rawDate = Date.now() - new Date(connection.updated_at);

    switch(true) {
      case (rawDate < 3600000): // less than an hour
        if (`${Math.round((rawDate/(1000 * 60)))} minutes ago` === "0 minutes ago") return "just now";
        return `${Math.round((rawDate/(1000 * 60)))} minutes ago`;
      case (rawDate >= 3600000 && rawDate < 86400000): // less than a day
        if (`${Math.floor(rawDate / (1000 * 60 * 60))} hours ago` === "1 hours ago") return "1 hour ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60))} hours ago`; 
      case (rawDate >= 86400000 && rawDate < 604800000): // less than a week
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24))} days ago` === "1 days ago") return "1 day ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24))} days ago`;
      case (rawDate >= 604800000 && rawDate < 2419200000): // less than a month
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7))} weeks ago` === "1 weeks ago") return "1 week ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7))} weeks ago`;
      case (rawDate >= 2419200000): // months
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7 * 4))} months ago` === "1 months ago") return "1 month ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7 * 4))} months ago`;
    }
  }

  renderDeleteMenu() {
    return (
      <div className='connections-page-card-delete-menu'>
        <div onClick={() => this.props.deleteConnection(this.props.connection.id)}>
          Remove connection
        </div>
      </div>
    )
  }

  render() {
    return (
      <li className='connections-page-card-wrap'  style={this.props.count !== this.props.place ? {"borderBottom" : "1px solid rgba(0, 0, 0, 0.08)"} : null}>
        <div className='network-invitation-card-left'>
          <Link to={`/users/${this.props.user.id}`}>
            {this.props.user.profilePictureUrl ? <img className='network-invitation-card-propic' src={this.props.user.profilePictureUrl} /> : <img className='network-invitation-card-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
          </Link>

          <div className='network-invitation-card-social-wrap'>
            <Link className='network-invitation-card-social' to={`/users/${this.props.user.id}`}>
              <span className='network-invitation-card-name'>{this.props.user.first_name} {this.props.user.last_name}</span>
              <span className='network-invitation-card-headline'>{this.props.user.headline}</span>
            </Link>

            <span className='network-invitation-card-no-mutual'>Connected {this.convertDate(this.props.connection)}</span>
          </div>
        </div>

        <div className='network-invitation-card-right'>
          <button className='connections-page-card-menu-button' onClick={() => this.setState({ deleteMenu: !this.state.deleteMenu })}><img src={window.postEditURL} /></button>
          {this.state.deleteMenu ? this.renderDeleteMenu() : null}
        </div>
      </li>
    )
  }
}
