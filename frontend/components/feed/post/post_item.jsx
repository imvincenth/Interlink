import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      parent_id: "",
      body: "",

      openReply: false
    }

    this.toggleReply = this.toggleReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state});
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  toggleReply() {
    this.setState({ openReply: !this.state.openReply });
  }

  replyForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Reply" onSubmit={this.handleSubmit} />
        </form>
      </div>
    )
  }

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
        <button onClick={this.toggleReply}>Reply</button>
        {this.state.openReply ? this.replyForm() : null}
      </div>
    )
  }
}
