import React, { Component } from 'react'

export default class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.post.id,
      user_id: this.props.post.user_id,
      body: ""
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.action({...this.state})
      .then(() => this.props.closeModal());
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
          <input type="submit" value="Post" onSubmit={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
