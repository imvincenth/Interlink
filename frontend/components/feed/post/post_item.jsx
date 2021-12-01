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
      react_type: "",
      reactable_type: "Post",
      reactable_id: this.props.post.id,

      currentReaction: ""
    }

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleReactionSubmit = this.handleReactionSubmit.bind(this);
    this.handleReactionEdit = this.handleReactionEdit.bind(this);
    this.react = this.react.bind(this);
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.sessionId && reaction.reactable_id === this.props.post.id) {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }
  
  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
    this.props.fetchPostReactions(this.props.post.id)
      .then(() => this.setCurrentReaction());
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

  handleReactionEdit(e) {
    e.preventDefault();

    this.props.updatePostReaction({...this.state.currentReaction, react_type: this.state.react_type});
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
        <button onClick={() => this.react("Like")}>
          Like
        </button>

        <button onClick={() => this.react("Celebrate")}>
          Celebrate
        </button>

        <button onClick={() => this.react("Support")}>
          Support
        </button>

        <button onClick={() => this.react("Love")}>
          Love
        </button>

        <button onClick={() => this.react("Insightful")}>
          Insightful
        </button>

        <button onClick={() => this.react("Curious")}>
          Curious
        </button>
      </div>
    )
  }

  react(reaction) {
    this.props.createPostReaction({...this.state, react_type: reaction})
      .then(() => this.setCurrentReaction());
  }

  removeReaction() {
    this.props.deletePostReaction(this.state.currentReaction.id)
      .then(() => this.setState({ react_type: "", currentReaction: "" }));
  }

  tempDislikeButton() {
    return (
      <button onClick={() => this.removeReaction()}>
        {this.state.react_type}
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
          reaction: {this.state.react_type}
        {this.state.currentReaction ? this.tempDislikeButton() : this.reactionForm()}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}
