import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment,

      editField: false,
      replyField: false,

      reactor_id: this.props.currentUser.id,
      react_type: "",
      reactable_type: "Comment",
      reactable_id: this.props.comment.id,

      currentReaction: ""
    }

    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.react = this.react.bind(this);

    this.replyTarget = this.replyTarget.bind(this);
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.currentUser.id && reaction.reactable_id === this.props.comment.id) {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }

  componentDidMount() {
    this.props.fetchComments(this.state.post_id)
    this.props.fetchCommentReactions(this.props.comment.id)
      .then(() => this.setCurrentReaction());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments.length !== this.props.comments.length) {
      this.setState({ body: "" });
    }
  }

  // componentWillUnmount() {
  //   // Fixing the memory leak error in console
  //   this.setState = (state,callback)=>{
  //     return;
  //   };
  // }

  handleEditSubmit(e) {
    e.preventDefault();

    this.props.updateComment({...this.state});
  }

  handleReplySubmit(e) {
    e.preventDefault();
    let newState = {
      user_id: this.props.comment.user_id,
      reply_id: !this.props.comment.reply_id ? this.props.comment.id : this.props.comment.reply_id,
      post_id: this.props.comment.post_id,
      body: this.state.body,
    };

    this.props.createComment({...newState})
      .then(() => this.setState({ replyField: false }));
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  editForm() {
    return (
      <div>
        <form onSubmit={this.handleEditSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Save Changes" />
          <button onClick={() => this.setState({ editField: false })}>Cancel</button>
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

  reactionEditForm() {
    return (
      <div>
        <button onClick={() => this.reactEdit("Like")}>
          Like
        </button>

        <button onClick={() => this.reactEdit("Celebrate")}>
          Celebrate
        </button>

        <button onClick={() => this.reactEdit("Support")}>
          Support
        </button>

        <button onClick={() => this.reactEdit("Love")}>
          Love
        </button>

        <button onClick={() => this.reactEdit("Insightful")}>
          Insightful
        </button>

        <button onClick={() => this.reactEdit("Curious")}>
          Curious
        </button>
      </div>
    )
  }

  react(reaction) {
    this.props.createCommentReaction({...this.state, react_type: reaction})
      .then(() => this.setCurrentReaction());
  }

  reactEdit(reaction) {
    this.props.updateCommentReaction({...this.state.currentReaction, react_type: reaction})
      .then(() => this.setCurrentReaction());
  }

  replyTarget() {
    let target = "";
    this.props.users.forEach(user => user.id === this.props.comment.user_id ? target = user : null);
    return (
      <div>
        <Link to={`/users/${target.id}`}>{target.first_name} {target.last_name}</Link>
      </div>
    )
  }

  replyForm() {
    return (
      <div>
        <form onSubmit={this.handleReplySubmit}>
          {this.props.comment.reply_id ? this.replyTarget() : null}
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  removeReaction() {
    this.props.deleteCommentReaction(this.state.currentReaction.id)
      .then(() => this.setState({ react_type: "", currentReaction: "" }));
  }

  deleteReply(commentId) {
    const deleteQueue = [];
    this.props.comments.forEach(comment => comment.reply_id === commentId ? deleteQueue.push(comment) : null);
    for (let comment of deleteQueue) {
      this.props.deleteComment(comment.id);
    }
    this.props.deleteComment(commentId);
  }

  tempDislikeButton() {
    return (
      <div>
        <button onClick={() => this.removeReaction()}>
          {this.state.react_type}
        </button>
        edit: {this.reactionEditForm()}
      </div>
    )
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment-box">
        {this.props.currentUser.first_name} {this.props.currentUser.last_name}{this.props.comment.reply_id ? ":reply:" : ":comment:"} {comment.body}
        <button onClick={() => this.setState({ body: this.props.comment.body, editField: true })}>
          <img src={window.vectorURL} alt="pen" />
        </button>
        {this.state.editField ? this.editForm() : null}
        <button onClick={() => this.deleteReply(comment.id)}>
          Delete
        </button>
        <button onClick={() => this.setState({ body: "", replyField: true })}>
          Reply
        </button>
        reaction: {this.state.react_type}
        {this.state.currentReaction ? this.tempDislikeButton() : this.reactionForm()}
        {this.state.replyField ? this.replyForm() : null}
      </div>
    )
  }
}
