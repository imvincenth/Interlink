import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      body: "",

      
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageFile = this.handleImageFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createPost({...this.state})
      .then(() => this.props.closeModal());
  }

  handleImageFile(e) {

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
          <input type="submit" value="Post" onSubmit={this.handleSubmit} />
          <input type="file" />
        </form>
      </div>
    )
  }
}
