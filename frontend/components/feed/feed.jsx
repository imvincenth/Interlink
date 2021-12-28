import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';
import PostItemContainer from './post/post_item_container';

class Feed extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
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

                <div className='post-modal-box'>
                  <div className='post-modal-main'>
                    <Link className='post-modal-main-picture-box' to={`/users/${this.props.currentUser.id}`}>
                      {this.props.currentUser.profilePictureUrl ? 
                        <img className='post-modal-propic' src={this.props.currentUser.profilePictureUrl} alt="profile picture" /> : 
                        <img className='post-modal-propic' src='https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x' alt="profile picture" />
                      }
                    </Link>
                    {this.props.openCreatePostModal}
                  </div>

                  <div className='post-modal-options-wrap'>
                    <button className='post-option'><img className='post-option-icon' src={window.postPhotoURL}/><span className='post-option-text'>Photo</span></button>
                    <button className='post-option'><img className='post-option-icon' src={window.postVideoURL}/><span className='post-option-text'>Video</span></button>
                    <button className='post-option'><img className='post-option-icon' src={window.postAwsURL}/><span className='post-option-text'>About AWS</span></button>
                  </div>
                </div>
                
                <h1 id="construction">UNDER CONSTRUCTION</h1>
                {this.props.posts.reverse().map(post => <PostItemContainer key={`${post.created_at}+${post.body}`} post={post} />)}


              </div>

            </div>
        </div>
        
        
      </div>
    )
  }
}

export default Feed;