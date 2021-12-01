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

      reactor_id: this.props.sessionId, // need to match
      react_type: "", // needs to inherit
      reactable_type: "Post",
      reactable_id: this.props.post.id, // need to match


    }

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleReactionSubmit = this.handleReactionSubmit.bind(this);
    this.react = this.react.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
    this.props.fetchPostReactions(this.props.post.id);
  }

  handleCommentSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.setState({ body: "", commentField: false }));
  }

  handleReactionSubmit(e) {
    e.preventDefault();

    this.props.createPostReaction({...this.state});
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  commentForm() {
    return (
      <div>
        <form onSubmit={this.handleCommentSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  reactionForm() {
    return (
      <div>
        <form>
          <button onClick={() => this.react("Like")} onSubmit={this.handleReactionSubmit}>
            Like
          </button>

          <button onClick={() => this.react("Celebrate")} onSubmit={this.handleReactionSubmit}>
            Celebrate
          </button>

          <button onClick={() => this.react("Support")} onSubmit={this.handleReactionSubmit}>
            Support
          </button>

          <button onClick={() => this.react("Love")} onSubmit={this.handleReactionSubmit}>
            Love
          </button>

          <button onClick={() => this.react("Insightful")} onSubmit={this.handleReactionSubmit}>
            Insightful
          </button>

          <button onClick={() => this.react("Curious")} onSubmit={this.handleReactionSubmit}>
            Curious
          </button>
        </form>
      </div>
    )
  }

  react(reaction) {
    this.setState({ react_type: reaction });;
  }

  removeReaction() {
    this.setState({ react_type: "" });
    this.props.deletePostReaction();
  }

  tempLikeButton() {
    return (
      <button onClick={() => this.react("Like")} onSubmit={this.handleReactionSubmit}>
        Like
      </button>
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
        <div>
          REACTION: {this.state.react_type}
        </div>
        {this.state.react_type.length === 0 ? this.tempLikeButton() : null}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}
