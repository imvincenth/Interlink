import React, { Component } from 'react'

export default class Connection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pending: false,
      connector_id: this.props.currentUser.id,
      connectee_id: this.props.user.id
    }
  }

  render() {
    return (
      <div>
        {this.props.user.first_name}
      </div>
    )
  }
}
