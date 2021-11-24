import React, { Component } from 'react'

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      reply_id: "",
      post_id: "",
      body: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state});
  }

  udpate(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Reply" onSubmit={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
