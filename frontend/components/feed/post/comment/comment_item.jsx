import React, { Component } from 'react'

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment,

      editField: false,
      replyField: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleReply = this.toggleReply.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    this.props.updateComment({...this.state});
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  toggleEdit() {
    this.setState({ editField: !this.state.editField });
  }

  toggleReply() {
    this.setState({ replyField: !this.state.replyField });
  }

  editForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Edit reply" />
        </form>
      </div>
    )
  }

  replyForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Edit reply" />
        </form>
      </div>
    )
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment-box">
        reply: {comment.body}
        <button onClick={this.toggleEdit}>
          <img src={window.vectorURL} alt="pen" />
        </button>
        {this.state.editField ? this.editForm() : null}
        <button onClick={() => this.props.deleteComment(comment.id)}>
          Delete
        </button>
        <button>
          Reply
        </button>
      </div>
    )
  }
}
