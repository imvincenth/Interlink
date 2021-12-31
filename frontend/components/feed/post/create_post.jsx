import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postPhotoActive: false,
      postVideoActive: false,

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

  renderNormalContent(rows) {
    return (
      <div className='post-modal-content'>

        <div className='post-modal-content-header'>
          <div className='post-modal-content-top'>
            {this.props.currentUser.profilePictureUrl ? 
              <img className='post-modal-avatar' src={this.props.currentUser.profilePictureUrl} alt='user profile picture' /> : 
              <img className='post-modal-avatar' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt='default profile picture' />
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
                autoFocus
              >
              </textarea>
            </div>
          </div>

          <div className='post-modal-media-wrap' style={!this.state.photoUrl && !this.state.videoUrl ? {display: "none"} : null}>

            <div className='post-modal-media-options' onClick={this.state.photoUrl ? () => this.setState({ photoUrl: "", photo: null, postPhotoActive: true }) : () => this.setState({ videoUrl: "", video: null, postVideoActive: true })}>
              <button type="button" className='post-modal-media-edit' >
                <img className='post-modal-media-icon' src={window.mediaEditURL} />
              </button>
              <button type="button" className='post-modal-media-cancel' onClick={() => this.setState({ photoUrl: "", photo: null, videoUrl: "", video: null })}>
                <img className='post-modal-media-icon' src={window.mediaXURL} />
              </button>
            </div>

            <div className='post-modal-media'>
              {this.state.photoUrl ? <img className='post-modal-photo-confirm' src={this.state.photoUrl} alt="submitted photo" /> : null}
              {this.state.videoUrl ? <video className='post-modal-video-confirm' src={this.state.videoUrl} controls alt="submitted video" /> : null}
            </div>

          </div>
        </div>


      </div>
    )
  }

  renderAltSubmitOptions() {
    return (
      <div className='post-modal-footer-alt'>
        <div className='post-modal-footer-content'>
          {/* <button className='post-modal-alt-cancel' onClick={this.props.closeModal}>Cancel</button> */}
          {this.renderDone()}
        </div>
      </div>
    )
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
        <button className='post-modal-alt-done' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false })}>Done</button>
      )
    } else {
      return (
        <button className='post-modal-alt-not-done' disabled={true}>Done</button>
      )
    }
  }

  render() {
    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 1

    let modalHeader;
    if (!this.state.postPhotoActive && !this.state.postVideoActive) modalHeader = "Create a post"
    if (this.state.postPhotoActive && !this.state.postVideoActive) modalHeader = "Post your photo"
    if (!this.state.postPhotoActive && this.state.postVideoActive) modalHeader = "Post your video"

    return (
      <form onSubmit={this.handleSubmit}>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>{modalHeader}</h2>
        </div>
        
        {/* Content */}
        {!this.state.postPhotoActive && !this.state.postVideoActive ? this.renderNormalContent(rows) : null}
        {this.state.postPhotoActive && !this.state.postVideoActive ? (this.state.photoUrl ? <img className='post-modal-photo' src={this.state.photoUrl} /> : this.renderPhotoSelect()) : null}
        {!this.state.postPhotoActive && this.state.postVideoActive ? (this.state.videoUrl ? <video className='post-modal-video' src={this.state.videoUrl} controls></video> : this.renderVideoSelect()) : null}

        {/* Submit Options */}
        {this.state.postPhotoActive || this.state.postVideoActive ? this.renderAltSubmitOptions() : null}

        <div className='post-modal-submit-wrap' style={this.state.postPhotoActive || this.state.postVideoActive ? {display: "none"} : null}>
          {/* Left */}
          <div className='post-modal-submit-options'>
            <label htmlFor="post-image" onClick={() => this.setState({ postPhotoActive: true, postVideoActive: false })} className='post-modal-submit-option'><img className='post-modal-submit-icon' src={window.submitPhotoURL} />
              <input id="post-image" type="file" accept="image/*" onChange={this.handlePhoto} style={{display: "none"}}  />
            </label>

            <label htmlFor="post-video" onClick={() => this.setState({ postPhotoActive: false, postVideoActive: true })} className='post-modal-submit-option'><img className='post-modal-submit-icon' src={window.submitVideoURL} />
              <input id="post-video" type="file" accept="video/*" onChange={this.handleVideo} style={{display: "none"}}  />
            </label>
          </div>

          {/* Right */}
          {this.renderSubmit()}
        </div>
        
      </form>
    )
  }
}
