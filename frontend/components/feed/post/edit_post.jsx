import React, { Component } from 'react'

export default class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.post
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
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  renderNormalContent() {
    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 1

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
              {/* <div className='post-modal-spaceholder'></div> */}
            </div>
          </div>

          <div>
            <div className='post-modal-content-bottom'>
              <textarea 
                className='post-modal-content-editor' 
                value={this.state.body} 
                onChange={this.update("body")} 
                rows={rows}
                // placeholder='What do you want to talk about?'
                autoFocus
              >
              </textarea>
            </div>
          </div>

          <div className='post-modal-media-wrap'>

            {/* <div className='post-modal-media-options'>
              <button type="button" className='post-modal-media-edit' onClick={() => this.setState({ postPhotoActive: this.state.photoUrl ? true : false, postVideoActive: this.state.videoUrl ? true : false })}>
                <img className='post-modal-media-icon' src={window.mediaEditURL} />
              </button>
              <button type="button" className='post-modal-media-cancel' onClick={() => this.setState({ photoUrl: "", photo: null, videoUrl: "", video: null })}>
                <img className='post-modal-media-icon' src={window.mediaXURL} />
              </button>
            </div> */}

            <div className='post-modal-media'>
              {this.state.photoUrl ? <img className='post-modal-photo-confirm' src={this.state.photoUrl} alt="submitted photo" /> : null}
              {this.state.videoUrl ? <video className='post-modal-video-confirm' src={this.state.videoUrl} controls autoPlay muted alt="submitted video" /> : null}
            </div>

          </div>
        </div>


      </div>
    )
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          {/* Header */}
          <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
          <div className='post-modal-header'>
            <h2 className='post-modal-header-text'>Edit post</h2>
          </div>

          {/* Content */}
          {this.renderNormalContent()}

          <div className='post-modal-submit-wrap'>
            {/* Left */}
            <div className='post-modal-submit-options'>
              <label htmlFor="post-image" className={'post-modal-submit-option not'}><img className='post-modal-submit-icon' src={window.submitPhotoURL} />
                {/* {!this.state.photoUrl && !this.state.videoUrl ? <input id="post-image" type="file" accept="image/*" onChange={this.handlePhoto} style={{display: "none"}} /> : null} */}
              </label>

              <label htmlFor="post-video" className={'post-modal-submit-option not'}><img className='post-modal-submit-icon' src={window.submitVideoURL} />
                {/* {!this.state.photoUrl && !this.state.videoUrl ? <input id="post-video" type="file" accept="video/*" onChange={this.handleVideo} style={{display: "none"}} /> : null} */}
              </label>
            </div>

            {/* Right */}
            {this.renderSubmit()}
          </div>

        </form>
      </div>
    )
  }
}
