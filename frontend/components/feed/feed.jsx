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
          <h1>About AWS Free Tier</h1>
          <h2>Due to the restictions of the free tier, photo and video files will be limited under 5MB and 10MB respectively.</h2>
          <p>"As part of the AWS Free Tier, you can get started with Amazon S3 for free. 
          Upon sign-up, new AWS customers receive 5GB of Amazon S3 storage in the S3 Standard storage class; 
          20,000 GET Requests; 2,000 PUT, COPY, POST, or LIST Requests; and 100 GB of Data Transfer Out each month.
          Your usage for the free tier is calculated each month across all AWS Regions except the AWS GovCloud Region 
          and automatically applied to your bill; unused monthly usage will not roll over. Restrictions apply; 
          see offer terms for more details."</p>
        </div>
      </div>
    )
  }

  postPhoto() {
    return (
      <div className='feed-modal-background' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false })}>
        <div className='post-photo-modal-child' onClick={e => e.stopPropagation()}>
          <h2>Select your photo</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="post-photo-modal1">Select an image to share</label>
            <input id="post-photo-modal1" type="file" accept="image/*" style={{visibility:"hidden", width: "0", height: "0"}} />
            <input type="submit" onSubmit={this.handleSubmit} />
          </form>
        </div>
      </div>
    )
  }

  postVideo() {
    return (
      <div className='feed-modal-background' onClick={() => this.setState({ postPhotoActive: false, postVideoActive: false, awsInfoActive: false })}>
        <div className='post-video-modal-child' onClick={e => e.stopPropagation()}>
          <h2>Select your video</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="post-video-modal1">Select a video to share</label>
            <input id="post-video-modal1" type="file" accept="video/*" style={{visibility:"hidden", width: "0", height: "0"}} />
            <input type="submit" onSubmit={this.handleSubmit} />
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
                
                <h1 id="construction">UNDER CONSTRUCTION</h1>
                
                {this.props.posts.map(post => <PostItemContainer key={`${post.created_at}+${post.body}`} post={post} />).reverse()}

              </div>

            </div>
        </div>
        
        
      </div>
    )
  }
}

export default Feed;