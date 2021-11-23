import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      parent_id: this.props.post.id ? this.props.post.id : "-1",
      body: "",
      replies: [],

      openReply: false
    }

    this.toggleReply = this.toggleReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createPost({...this.state});
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  toggleReply() {
    this.setState({ openReply: !this.state.openReply });
  }

  fillReplies(parent) {
    this.props.posts.forEach(reply => reply.parent_id = parent.id ? this.setState({ replies: [...this.state.replies, reply] }) : null);
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
