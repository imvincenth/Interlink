import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Feed from './feed';

const mSTP = ({ session, entities: { users, posts } }) => {
  return {
    currentUser: users[session.id],
    posts: posts,
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  openCreatePostModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createPost'))}>
      <img src={window.plusURL} />
    </button>
  )
});

export default connect(mSTP, mDTP)(Feed);
