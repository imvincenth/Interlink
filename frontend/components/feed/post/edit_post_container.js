import React from 'react';
import { connect } from 'react-redux';
import { updatePost, deletePost } from '../../../actions/post_actions';

import PostEdit from './edit_post';

const mSTP = ({ session, entities: { users } }) => ({
  currentUser: users[session.id]
});

const mDTP = dispatch => ({
  
});

export default connect(mSTP, mDTP)(PostEdit);