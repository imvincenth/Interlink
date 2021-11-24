import React, { Component } from 'react'
import CommentItemContainer from './comment/comment_item_container';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.sessionId,
      reply_id: "",
      post_id: this.props.post.id,
      body: "",

      replyField: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleReply = this.toggleReply.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.toggleReply());
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  toggleReply() {
    this.setState({ replyField: !this.state.replyField });
  }

  replyForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Reply" />
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
        <button onClick={this.toggleReply}>
          Reply
        </button>
        {this.state.replyField ? this.replyForm() : null}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}
