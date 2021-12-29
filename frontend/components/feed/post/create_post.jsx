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

  renderSubmit() {
    if (this.state.body.length === 0) {
      return (
        <input className='post-modal-cant-submit' type="submit" value="Post" disabled={true} />
      )
    } else {
      return (
        <input className='post-modal-can-submit' type="submit" value="Post" onSubmit={this.handleSubmit} />
      )
    }
  }

  renderPhotoSelect() {
    return (
      <div className='post-modal-alt-content-box'>
        <label className='post-modal-alt-input' htmlFor="post-photo-modal-alt">Select an image to share</label>
        <input id="post-photo-modal-alt" type="file" accept="image/*" onChange={this.handlePhoto} style={{ display: "none" }} />
      </div>
    )
  }

  renderVideoSelect() {
    return (
      <div className='post-modal-alt-content-box'>
        <label className='post-modal-alt-input' htmlFor="post-video-modal-alt">Select a video to share</label>
        <input id="post-photo-modal-alt" type="file" accept="video/*" onChange={this.handleVideo} style={{ display: "none" }} />
      </div>
    )
  }

  renderDone() {
    if (this.state.photoUrl || this.state.videoUrl) {
      return (
        <input className='post-modal-alt-done' type="submit" onSubmit={this.handleSubmit} value="Done" />
      )
    } else {
      return (
        <button className='post-modal-alt-not-done' disabled={true}>Done</button>
      )
    }
  }

  postPhoto() {
    return (
      <div className='feed-modal-background' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, photoUrl: "", photo: null })}>
        <div className='post-photo-modal-child' onClick={e => e.stopPropagation()}>

          <form onSubmit={this.handleSubmit}>

            {/* Header */}
            <button className="post-modal-x-box" onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, photoUrl: "", photo: null })}><img className="post-modal-x" src={window.xURL} /></button>
            <div className='post-modal-header'>
              <h2 className='post-modal-header-text'>Post your photo</h2>
            </div>

            {/* Content */}
            {this.state.photoUrl ? <img className='post-modal-photo' src={this.state.photoUrl} /> : this.renderPhotoSelect()}
            

            {/* Footer */}
            <div className='post-modal-footer-alt'>
              <div className='post-modal-footer-content'>
                <button className='post-modal-alt-cancel' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, photoUrl: "", photo: null })}>Cancel</button>
                {this.renderDone()}
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }

  postVideo() {
    return (
      <div className='feed-modal-background' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, videoUrl: "", video: null })}>
        <div className='post-video-modal-child' onClick={e => e.stopPropagation()}>
          <form onSubmit={this.handleSubmit}>
            
            {/* Header */}
            <button className="post-modal-x-box" onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, videoUrl: "", video: null })}><img className="post-modal-x" src={window.xURL} /></button>
            <div className='post-modal-header'>
              <h2 className='post-modal-header-text'>Post your video</h2>
            </div>

            {/* Content */}
            {this.state.videoUrl ? <video className='post-modal-video' src={this.state.videoUrl} controls></video> : this.renderVideoSelect()}

            {/* Footer */}
            <div className='post-modal-footer-alt'>
              <div className='post-modal-footer-content'>
                <button className='post-modal-alt-cancel' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false, videoUrl: "", video: null })}>Cancel</button>
                {this.renderDone()}
              </div>
            </div>

          </form>
        </div>
      </div>
    )
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
            <label className='post-modal-submit-option' htmlFor="post-image"><img className='post-modal-submit-icon' src={window.submitPhotoURL} /></label>
            <input id="post-image" type="file" accept="image/*" onChange={this.handlePhoto} style={{display: "none"}}  />
            <label className='post-modal-submit-option' htmlFor="post-video"><img className='post-modal-submit-icon' src={window.submitVideoURL} /></label>
            <input id="post-video" type="file" accept="video/*" onChange={this.handlePhoto} style={{display: "none"}}  />
          </div>

          {/* Right */}
          {this.renderSubmit()}
        </div>

      </form>
    )
  }
}
