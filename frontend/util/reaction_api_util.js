export const createReaction = reaction => (
  $.ajax({
    url: `/api/posts/${reaction.post_id}/reactions`,
    method: "POST",
    data: { reaction }
  })
);

export const fetchReactions = postId => (
  $.ajax({
    url: `/api/posts/${postId}/reactions`,
    method: "GET"
  })
);

export const updateReaction = reaction => (
  $.ajax({
    url: `/api/posts/:postId/reactions/${reaction.id}`,
    method: "PATCH",
    data: { reaction }
  })
);

export const deleteReaction = reactionId => (
  $.ajax({
    url: `/api/posts/:postId/reactions/${reactionId}`,
    method: "DELETE"
  })
);