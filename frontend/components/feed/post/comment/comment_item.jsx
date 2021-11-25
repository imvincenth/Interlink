import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment,

      editField: false,
      replyField: false
    }

    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);

    this.replyTarget = this.replyTarget.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.state.post_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments !== this.props.comments) {
      console.log("sik k you got me?");
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

    this.props.updateComment({...this.state})
      // .then(() => this.setState({ editField: false }));
  }

  handleReplySubmit(e) {
    e.preventDefault();
    let newState = {
      user_id: this.props.comment.user_id,
      reply_id: this.props.comment.id,
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
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].id === this.props.comment.user_id) {
        target = this.props.users[i];
      }
    }
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

  deleteTree() {

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
        <button onClick={() => this.props.deleteComment(comment.id)}>
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
