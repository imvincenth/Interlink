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

      commentField: false,

      reactor_id: this.props.sessionId,
      react_type: "like",
      reactable_type: "Post",
      reactable_id: this.props.post.id
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.setState({ body: "", commentField: false }));
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  commentForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {this.props.currentUser.first_name} {this.props.currentUser.last_name}:post: {post.body}
        <button className="open-modal" onClick={() => this.props.openEditPostModal(post)}>
          <img src={window.vectorURL} alt="pen" />
        </button>
        <button onClick={() => this.props.deletePost(post.id)}>
          Delete
        </button>
        <button onClick={() => this.setState({ commentField: true })}>
          Comment
        </button>
        {this.state.commentField ? this.commentForm() : null}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}
