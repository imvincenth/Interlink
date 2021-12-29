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
      video: null,

      photoErrors: "",
      videoErrors: ""
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
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

    if (file.size > 5242880) {
      this.setState({
        photoErrors: "Please attach a photo that is less than 5MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: "", photo: null });
    }
  }

  handleVideo(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ videoUrl: reader.result, video: file });

    if (file.size > 10485760) {
      this.setState({
        videoErrors: "Please attach a video that is less than 10MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ videoUrl: "", video: null });
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {

    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 1

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>Create a post</h2>
        </div>

        {/* Content */}
        <div className='post-modal-content'>

          <div className='post-modal-content-header'>
            <div className='post-modal-content-top'>
              {this.props.currentUser.profilePictureUrl ? 
                <img className='post-modal-avatar' src={this.props.currentUser.profilePictureUrl} alt='user profile picture' /> : 
                <img className='post-modal-avatar' src='https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x' alt='default profile picture' />
              }
              <div className='post-modal-name-box'>
                <div className='post-modal-name'>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                <div className='post-modal-spaceholder'></div>
              </div>
            </div>

            <div>
              <div className='post-modal-content-bottom'>
                <textarea 
                  className='post-modal-content-editor' 
                  value={this.state.body} 
                  onChange={this.update("body")} 
                  rows={rows}
                  placeholder='What do you want to talk about?'
                >
                </textarea>
              </div>
            </div>
          </div>

        </div>

        <div className='post-modal-submit-wrap'>
          {/* Left */}
          <div className='post-modal-submit-options'>
            
          </div>

          {/* Right */}

        </div>

        <input type="submit" value="Post" onSubmit={this.handleSubmit} />
        <label htmlFor="post-image">Photo</label>
        <input id="post-image" type="file" accept="image/*" onChange={this.handlePhoto} style={{display: "none"}}  />
        <label htmlFor="post-video">Video</label>
        <input id="post-video" type="file" accept="video/*" onChange={this.handlePhoto} style={{display: "none"}}  />
      </form>
    )
  }
}
