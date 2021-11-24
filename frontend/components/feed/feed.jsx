import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';
import PostItemContainer from './post/post_item_container';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  
    this.fillPosts();
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts || prevState.posts !== this.state.posts) {
      this.fillPosts();
    };
  }

  fillPosts() {
    this.props.posts.forEach(post => post.parent_id === -1 && !this.state.posts.includes(post) ? this.setState({ posts: [...this.state.posts, post] }) : null);
  }

  render() {
    if (!this.props.posts) return null;

    return (
      <div className="feed-page">
        <div>
          <header>
            <NavbarContainer />
          </header>

          <div className="content-body">
            <div className="content-main-wrapper">
              <SidebarContainer />

              <div className="feed">
                {this.props.openCreatePostModal}
                <h1 id="construction">UNDER CONSTRUCTION NOTHING TO SEE HERE</h1>
                {this.state.posts.map(post => <PostItemContainer key={`${post.created_at}+${post.body}`} post={post} />)}

                <div className="feed-input-container">

                </div>

              </div>
            </div>
          </div>

        </div>
        
        
      </div>
    )
  }
}

export default Feed;