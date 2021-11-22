import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        {post.body}
        <button className="open-modal" onClick={() => this.props.openEditPostModal(post)}>
          <img src={window.vectorURL} alt="pen" />
        </button>
        <button onClick={() => this.props.deletePost(post.id)}>
          Delete
        </button>
      </div>
    )
  }
}
