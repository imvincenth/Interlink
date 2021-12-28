import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      body: "",

      photoUrl: "",
      photo: null,
      videoUrl: "",
      video: null
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('post[user_id]', this.state.user_id);
    formData.append('post[body]', this.state.body);

    if (this.state.photo) {
      formData.append('post[photo]', this.state.photo);
    }

    if(this.state.video) {
      formData.append('post[video]', this.state.video);
    }

    this.props.createPost(formData)
      .then(() => this.props.closeModal());
  }

  handlePhoto(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photo: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
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
          <input type="file" onChange={this.handlePhoto} />
        </form>
      </div>
    )
  }
}
