import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchResultCard extends Component {
  render() {
    return (
      <li>
        <Link to={`/users/${this.props.user.id}`}>
          {this.props.user.first_name} {this.props.user.last_name}
        </Link>
      </li>
    )
  }
}
