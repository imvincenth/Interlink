import React, { Component } from 'react'

export default class CommentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.action({...this.state});
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Save Changes" onSubmit={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
