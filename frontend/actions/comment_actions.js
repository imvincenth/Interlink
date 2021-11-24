import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
});

export const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
});

export const fetchComments = postId => dispatch => (
  CommentAPIUtil.fetchComments(postId)
    .then(comments => (dispatch(receiveComments(comments))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const createComment = comment => dispatch => (
  CommentAPIUtil.createComment(comment)
    .then(comment => (dispatch(receiveComment(comment))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const updateComment = comment => dispatch => (
  CommentAPIUtil.updateComment(comment)
    .then(comment => (dispatch(receiveComment(comment))),
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const deleteComment = commentId => dispatch => (
  CommentAPIUtil.deleteComment(commentId)
    .then(() => (dispatch(removeComment(commentId))),
    err => (dispatch(receiveErrors(err.responseJSON))))
);