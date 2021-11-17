import * as PostAPIUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

export const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
});

export const fetchPosts = userId => dispatch => (
  PostAPIUtil.fetchPosts(userId)
    .then(posts => (dispatch(receivePosts(posts))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const createPost = post => dispatch => (
  PostAPIUtil.createPost(post)
    .then(post => (dispatch(receivePost(post))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const updatePost = post => dispatch => (
  PostAPIUtil.updatePost(post)
    .then(post => (dispatch(receivePost(post))),
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const deletePost = postId => dispatch => (
  PostAPIUtil.deletePost(postId)
    .then(() => (dispatch(removePost(postId))),
    err => (dispatch(receiveErrors(err.responseJSON))))
);