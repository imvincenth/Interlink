import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment-box">
        {comment.body}
        <button>
          <img src={window.vectorURL} alt="pen" />
        </button>
        <button onClick={() => this.props.deleteComment(comment.id)}>
          Delete
        </button>
      </div>
    )
  }
}
