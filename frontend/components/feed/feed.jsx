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
      awsInfoActive: false
    }
  }
  
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  postPhoto() {
    return (
      <div>

      </div>
    )
  }

  postVideo() {
    return (
      <div>

      </div>
    )
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
                    <button className='post-option'><img className='post-option-icon' src={window.postPhotoURL}/><span className='post-option-text'>Photo</span></button>
                    <button className='post-option'><img className='post-option-icon' src={window.postVideoURL}/><span className='post-option-text'>Video</span></button>
                    <button onClick={() => this.setState({ awsInfoActive: true })} className='post-option'><img className='post-option-icon' src={window.postAwsURL}/><span className='post-option-text'>About AWS</span></button>
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