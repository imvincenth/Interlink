import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchConnections } from '../../actions/connection_actions';
import { createPost } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import Feed from './feed';

const mSTP = ({ session, entities: { users, posts, comments, reactions } }) => {
  return {
    currentUser: users[session.id],
    users: Object.values(users),
    posts: Object.values(posts),
    comments: Object.values(comments),
    reactions: Object.values(reactions)
  };
};

const mDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  createPost: post => dispatch(createPost(post)),
  openCreatePostModal: (
    <button className="open-post-modal" onClick={() => dispatch(openModal('createPost'))}>
      <span className='start-a-post'>Start a post</span>
    </button>
  )
});

export default connect(mSTP, mDTP)(Feed);
