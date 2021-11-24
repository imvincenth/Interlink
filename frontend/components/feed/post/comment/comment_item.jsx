import React, { Component } from 'react'

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
  }

  componentDidMount() {
    this.props.fetchComments(this.state.post_id);
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

    this.props.createComment({...this.state});
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

  replyForm() {
    return (
      <div>
        <form onSubmit={this.handleReplySubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment-box">
        {this.props.currentUser.first_name} {this.props.currentUser.last_name}:reply: {comment.body}
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
