export const createPostReaction = reaction => (
  $.ajax({
    url: `/api/posts/${reaction.post_id}/reactions`,
    method: "POST",
    data: { reaction }
  })
);

export const fetchPostReactions = postId => (
  $.ajax({
    url: `/api/posts/${postId}/reactions`,
    method: "GET"
  })
);

export const updatePostReaction = reaction => (
  $.ajax({
    url: `/api/posts/:postId/reactions/${reaction.id}`,
    method: "PATCH",
    data: { reaction }
  })
);

export const deletePostReaction = reactionId => (
  $.ajax({
    url: `/api/posts/:postId/reactions/${reactionId}`,
    method: "DELETE"
  })
);

export const createCommentReaction = reaction => (
  $.ajax({
    url: `/api/comments/${reaction.comment_id}/reactions`,
    method: "POST",
    data: { reaction }
  })
);

export const fetchCommentReactions = commentId => (
  $.ajax({
    url: `/api/comments/${commentId}/reactions`,
    method: "GET"
  })
);

export const updateCommentReaction = reaction => (
  $.ajax({
    url: `/api/comments/:commentId/reactions/${reaction.id}`,
    method: "PATCH",
    data: { reaction }
  })
);

export const deleteCommentReaction = reactionId => (
  $.ajax({
    url: `/api/comments/:commentId/reactions/${reactionId}`,
    method: "DELETE"
  })
);
