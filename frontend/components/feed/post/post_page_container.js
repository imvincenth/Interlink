import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPost, deletePost } from '../../../actions/post_actions';
import { fetchComments } from '../../../actions/comment_actions';
import { openModal } from '../../../actions/modal_actions';
import { createComment } from '../../../actions/comment_actions';
import { fetchPostReactions, createPostReaction, updatePostReaction, deletePostReaction } from '../../../actions/reaction_actions';
import Post from './post_page';

const mSTP = (state, ownProps) => ({
  sessionId: state.session.id,
  currentUser: state.entities.users[state.session.id],
  comments: Object.values(state.entities.comments),
  reactions: Object.values(state.entities.reactions),
  postId: ownProps.match.params.postId,
  post: state.entities.posts
});

const mDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPost: postId => dispatch(fetchPost(postId)),
  fetchComments: postId => dispatch(fetchComments(postId)),
  openEditPostModal: post => dispatch(openModal("editPost", post)),
  deletePost: post => dispatch(deletePost(post)),
  createComment: comment => dispatch(createComment(comment)),
  fetchPostReactions: postId => dispatch(fetchPostReactions(postId)),
  createPostReaction: reaction => dispatch(createPostReaction(reaction)),
  updatePostReaction: reaction => dispatch(updatePostReaction(reaction)),
  deletePostReaction: reactionId => dispatch(deletePostReaction(reactionId))
});

export default connect(mSTP, mDTP)(Post);