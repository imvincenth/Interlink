import React, { Component } from 'react'

export default class BannerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.user.bannerUrl ? 2 : 1,

      bannerUrl: "",
      banner: null,

      bannerErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBanner = this.handleBanner.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.banner) {
      formData.append('user[banner]', this.state.banner);
      this.props.updatePicture(formData, this.props.currentUser.id)
        .then(() => this.props.closeModal());
    } else {
      this.props.action({...this.props.user})
        .then(() => this.props.closeModal());
    }

  }

  handleDelete(e) {
    e.preventDefault();

    this.props.deletePicture("banner")
      .then(() => this.props.closeModal());
  }

  handleBanner(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ bannerUrl: reader.result, banner: file, page: 2 });

    if (file.size > 5242880) {
      this.setState({
        bannerErrors: "Please attach a banner that is less than 5MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ bannerUrl: "", banner: null });
    }
  }

  render() {
    let modalHeader;
    this.state.page === 1 ? modalHeader = "Add a background" : modalHeader = "Background photo";
    
    return (
      <form>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>{modalHeader}</h2>
        </div>

        {/* Page One Content */}
        <div className='banner-choice-wrap' style={this.state.page === 2 ? {"display": "none"} : null}>
          <div className='upload-banner-circle'>
            <img className='uplaod-banner-logo' src={window.bannerUploadURL} />
          </div>

          <div style={{display: "flex", flexDirection: "column"}}>
            <h2 className='upload-photo-header'>Upload a photo</h2>
            <span className='upload-photo-text'>Showcase your personality, interests, work, or team moments</span>
            <label className='upload-banner-button' htmlFor="upload-banner">
              <span className='upload-banner-button-text'>Upload photo</span>
              <input id='upload-banner' type="file" onChange={this.handleBanner} accept="image/*" style={{display: "none"}} />
            </label>
          </div>
        </div>


        {/* Page Two Content */}
        <div className='banner-option-wrap' style={this.state.page === 1 ? {"display": "none"} : null}>
          {this.state.banner ? <img className='post-modal-photo' src={this.state.bannerUrl} /> : <img className='post-modal-photo' src={this.props.user.bannerUrl} />}

          <div style={{display: "flex", justifyContent: "space-between", padding: "16px 24px", borderTop: "1px solid rgba(0, 0, 0, 0.08)"}}>
            <label className='edit-banner-button' onClick={this.handleDelete}>
              <span className='edit-banner-button-text'>Delete photo</span>
            </label>

            <div style={{display: "flex"}}>
              <label className='apply-banner-change'>
                <span onClick={() => this.setState({ page: 1 })}>Change photo</span>
              </label>

              <label className='apply-banner-done'>
                <span onClick={this.handleSubmit}>Apply</span>
              </label>
            </div>
          </div>
        </div>
        
      </form>
    )
  }
}
