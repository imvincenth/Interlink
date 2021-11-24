export const createComment = comment => (
  $.ajax({
    url: `/api/posts/${comment.post_id}/comments`,
    method: "POST",
    data: { comment }
  })
);

export const fetchComments = postId => (
  $.ajax({
    url: `/api/posts/${postId}/comments`,
    method: "GET"
  })
);

export const updateComment = comment => (
  $.ajax({
    url: `/api/posts/:postId/comments/${comment.id}`,
    method: "PATCH",
    data: { comment }
  })
);

export const deleteComment = commentId => (
  $.ajax({
    url: `/api/posts/:postId/comments/${commentId}`,
    method: "DELETE"
  })
);