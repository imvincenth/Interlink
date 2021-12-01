import React from 'react';
import { connect } from 'react-redux';
import { fetchComments, createComment, updateComment, deleteComment } from '../../../../actions/comment_actions';
import { fetchCommentReactions, createCommentReaction, updateCommentReaction, deleteCommentReaction } from '../../../../actions/reaction_actions';
import Comment from './comment_item';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  users: Object.values(state.entities.users),
  comments: Object.values(state.entities.comments),
  reactions: Object.values(state.entities.reactions)
});

const mDTP = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  fetchCommentReactions: commentId => dispatch(fetchCommentReactions(commentId)),
  createCommentReaction: reaction => dispatch(createCommentReaction(reaction)),
  updateCommentReaction: reaction => dispatch(updateCommentReaction(reaction)),
  deleteCommentReaction: reactionId => dispatch(deleteCommentReaction(reactionId))
});

export default connect(mSTP, mDTP)(Comment);