import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';
import PostItemContainer from './post/post_item_container';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postPhotoActive: false,
      postVideoActive: false,
      awsInfoActive: false,

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
  
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
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
      .then(() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false }));
  }


  handlePhoto(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photo: file, body: file.name });

    if (file.size > 5242880) {
      this.setState({
        photoErrors: "Please attach a photo that is less than 5MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: "", photo: null, body: "" });
    }
  }

  handleVideo(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ videoUrl: reader.result, video: file, body: file.name });

    if (file.size > 10485760) {
      this.setState({
        videoErrors: "Please attach a video that is less than 10MB."
      });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ videoUrl: "", video: null, body: "" });
    }
  }

  awsInfo() {
    return (
      <div className='feed-modal-background' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false })}>
        <div className='aws-info-child' onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className='post-modal-header'>
            <h2 className='post-modal-header-text'>About AWS Free Tier</h2>
          </div>

          {/* Content */}
          <div className='aws-modal-content'>
            <p className='aws-modal-header'>Due to the restictions of the free tier, photo and video files will be limited under 5MB and 10MB respectively.</p>
            <p className='aws-modal-text'><em>"As part of the AWS Free Tier, you can get started with Amazon S3 for free. 
            Upon sign-up, new AWS customers receive 5GB of Amazon S3 storage in the S3 Standard storage class; 
            20,000 GET Requests; 2,000 PUT, COPY, POST, or LIST Requests; and 100 GB of Data Transfer Out each month.
            Your usage for the free tier is calculated each month across all AWS Regions except the AWS GovCloud Region 
            and automatically applied to your bill; unused monthly usage will not roll over. Restrictions apply; 
            see offer terms for more details."</em></p>

            <img className='aws-modal-logo' src={window.awsURL} alt="aws logo" />
          </div>

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
    if (!this.props.posts) return null;

    const { currentUser } = this.props;
    return (
      <div className="feed-page">
          <NavbarContainer page="feed" />

          <div className="content-body">
            <div className="content-main-wrapper">

              <SidebarContainer />

              <div className="feed">
              {this.state.awsInfoActive ? this.awsInfo() : null}
              {this.state.postPhotoActive ? this.postPhoto() : null}
              {this.state.postVideoActive ? this.postVideo() : null}

                <div className='post-modal-box'>

                  <div className='post-modal-main'>
                    <Link className='post-modal-main-picture-box' to={`/users/${this.props.currentUser.id}`}>
                      {this.props.currentUser.profilePictureUrl ? 
                        <img className='post-modal-propic' src={this.props.currentUser.profilePictureUrl} alt="profile picture" /> : 
                        <img className='post-modal-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="profile picture" />
                      }
                    </Link>
                    {this.props.openCreatePostModal}
                  </div>

                  <div className='post-modal-options-wrap'>
                    {/* Photo */}
                    <label htmlFor="post-photo-modal" onClick={() => this.setState({ postPhotoActive: true })} className='post-option'><img className='post-option-icon' src={window.postPhotoURL}/>
                      <span className='post-option-text'>Photo</span>
                      <input id="post-photo-modal" type="file" onChange={this.handlePhoto} accept="image/*" style={{display: "none"}} />
                    </label>
                    {/* Video */}
                    <label htmlFor="post-video-modal" onClick={() => this.setState({ postVideoActive: true })} className='post-option'><img className='post-option-icon' src={window.postVideoURL}/>
                      <span className='post-option-text'>Video</span>
                      <input id="post-video-modal" type="file" onChange={this.handleVideo} accept="video/*" style={{display: "none"}} />
                    </label>
                    {/* About AWS */}
                    <label onClick={() => this.setState({ awsInfoActive: true })} className='post-option'><img className='post-option-icon' src={window.postAwsURL}/>
                      <span className='post-option-text'>About AWS</span>
                    </label>
                  </div>

                </div>

                <hr className='feed-breakline' />
                
                {this.props.posts.map(post => <PostItemContainer key={`${post.created_at}+${post.body}`} post={post} />).reverse()}

              </div>

            </div>
        </div>
        
        
      </div>
    )
  }
}

export default Feed;