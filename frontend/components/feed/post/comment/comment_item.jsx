import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment,

      editField: false,
      replyField: false,

      deleteEvent: false
    }

    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);

    this.replyTarget = this.replyTarget.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.state.post_id);
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

  deleteReply(commentId) {
    this.props.deleteComment(commentId);
    const deleteQueue = [];
    this.props.comments.forEach(comment => comment.reply_id === commentId ? deleteQueue.push(comment) : null);
    for (let comment of deleteQueue) {
      this.props.deleteComment(comment.id);
    }
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
        {this.state.replyField ? this.replyForm() : null}
      </div>
    )
  }
}
