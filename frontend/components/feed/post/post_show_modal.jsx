import React, { Component } from 'react'

export default class PostShowModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        caroline
        {this.props.post.body}
      </div>
    )
  }
}
