import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { fetchComments, createComment } from '../../../actions/comment_actions';
import { fetchPostReactions, createPostReaction, updatePostReaction, deletePostReaction } from '../../../actions/reaction_actions';
import { fetchPost } from '../../../actions/post_actions';
import PostPage from './post_page';

const mSTP = state => ({
  post: Object.values(state.entities.posts)[0],
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.posts,
  users: state.entities.users,
  usersArr: Object.values(state.entities.users),
  reactions: Object.values(state.entities.reactions),
  comments: Object.values(state.entities.comments)
});

const mDTP = dispatch => ({
  action: post => dispatch(updatePost(post)),
  closeModal: () => dispatch(closeModal()),
  fetchComments: postId => dispatch(fetchComments(postId)),
  createComment: comment => dispatch(createComment(comment)),
  fetchPostReactions: postId => dispatch(fetchPostReactions(postId)),
  createPostReaction: reaction => dispatch(createPostReaction(reaction)),
  updatePostReaction: reaction => dispatch(updatePostReaction(reaction)),
  deletePostReaction: reactionId => dispatch(deletePostReaction(reactionId)),
  fetchPost: postId => dispatch(fetchPost(postId))
});

export default connect(mSTP, mDTP)(PostPage);