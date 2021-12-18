import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import Feed from './feed';

const mSTP = ({ session, entities: { users, posts, comments, reactions } }) => {
  return {
    currentUser: users[session.id],
    posts: Object.values(posts),
    comments: Object.values(comments),
    reactions: Object.values(reactions)
  };
};

const mDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  openCreatePostModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createPost'))}>
      Start a post
    </button>
  )
});

export default connect(mSTP, mDTP)(Feed);
