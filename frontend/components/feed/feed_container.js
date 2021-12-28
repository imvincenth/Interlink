import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchConnections } from '../../actions/connection_actions';
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
  openCreatePostModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createPost'))}>
      Start a post
    </button>
  )
});

export default connect(mSTP, mDTP)(Feed);
