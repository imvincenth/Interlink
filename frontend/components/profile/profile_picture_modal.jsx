import React, { Component } from 'react'

export default class ProfilePictureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 2,

      profile_picture: this.props.currentUser.profile_picture ? this.props.currentUser.profile_picture : null,
      profilePictureUrl: this.props.currentUser.profilePictureUrl ? this.props.currentUser.profilePictureUrl : ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePropic = this.handlePropic.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.profile_picture) {
      formData.append('user[profile_picture]', this.state.profile_picture);
    } else {
      formData.append('user[profile_picture]', this.props.user.profile_picture);
    }

    this.props.updatePicture(formData, this.props.currentUser.id)
      .then(() => this.props.closeModal());
  }

  handleDelete(e) {
    e.preventDefault();

    this.props.deletePicture("profile_picture")
      .then(() => this.props.closeModal());
  }

  handlePropic(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ profilePictureUrl: reader.result, profile_picture: file, page: 2 });

    if (file.size > 5242880) {
      this.setState({
        bannerErrors: "Please attach a profile picture that is less than 5MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ profilePictureUrl: "", profile_picture: null });
    }
  }

  renderPageOne() {
    return (
      <div>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>Add photo</h2>
        </div>

        {/* Page One Content */}
        <div className='propic-modal-content-page-one'>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "32px"}}>
            <p style={{fontSize: "24px", fontWeight: "400", lineHeight: "32px"}}>No professional headshot needed!</p>
            <p style={{fontSize: "24px", fontWeight: "400", lineHeight: "32px"}}>Just something that represents you.</p>
          </div>
          <div style={{display: "flex", alignItems: "center", marginBottom: "32px"}}>
            <img className='propic-modal-side-side-pictures' src={window.gollumFourURL} />
            <img className='propic-modal-side-pictures' src={window.gollumOneURL} />
            <img className='propic-modal-main-picture' src={window.gollumTwoURL} />
            <img className='propic-modal-side-pictures' src={window.gollumThreeURL} />
            <img className='propic-modal-side-side-pictures' src={window.gollumFiveURL} />
          </div>
          <p style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "14px", fontWeight: "400", lineHeight: "20px"}}>
            Take or upload a photo. You are beautiful.
          </p>
        </div>

        {/* Footer Options */}
        <footer style={{display: "flex", justifyContent: "flex-end", alignItems: "center", borderTop: "1px solid rgba(0, 0, 0, 0.08)", padding: "16px 24px"}}>
          <label className='propic-modal-upload-button' htmlFor="upload-profile-picture">
            <span className='upload-banner-button-text'>Upload photo</span>
            <input id='upload-profile-picture' type="file" onChange={this.handlePropic} accept="image/*" style={{display: "none"}} />
          </label>
        </footer>

      </div>
    )
  }

  renderPageTwo() {
    return (
      <div>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>Edit photo</h2>
        </div>

        {/* Page Two Content */}
        <div className='propic-modal-content-page-two'>
          <div>
            {this.state.profilePictureUrl ? <img className='propic-modal-preview' src={this.state.profilePictureUrl} /> : null}
          </div>
        </div>

        {/* Footer Options */}
        <footer style={{display: "flex", justifyContent: "flex-end", alignItems: "center", borderTop: "1px solid rgba(0, 0, 0, 0.08)", padding: "16px 24px"}}>
          <label className='propic-modal-change-button' htmlFor="change-chosen-profile-picture">
            <span className='propic-modal-change-button-text'>Change photo</span>
            <input id='change-chosen-profile-picture' type="file" onChange={this.handlePropic} accept="image/*" style={{display: "none"}} />
          </label>

          <label  className='propic-modal-upload-button' htmlFor="upload-banner" onClick={this.handleSubmit}>
            <span className='upload-banner-button-text'>Save photo</span>
          </label>
        </footer>

      </div>
    )
  }

  renderPageThree() {
    return (
      <div>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>Profile photo</h2>
        </div>

      </div>
    )
  }

  render() {
    return (
      <form>
        
        {this.state.page === 1 ? this.renderPageOne() : null}
        {this.state.page === 2 ? this.renderPageTwo() : null}
        {this.state.page === 3 ? this.renderPageThree() : null}

      </form>
    )
  }
}
