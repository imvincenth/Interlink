export const createConnection = connection => (
  $.ajax({
    url: `/api/posts/${connection.post_id}/connections`,
    method: "POST",
    data: { connection }
  })
);

export const fetchConnections = postId => (
  $.ajax({
    url: `/api/posts/${postId}/connections`,
    method: "GET"
  })
);

export const updateConnection = connection => (
  $.ajax({
    url: `/api/posts/:postId/connections/${connection.id}`,
    method: "PATCH",
    data: { connection }
  })
);

export const deleteConnection = connectionId => (
  $.ajax({
    url: `/api/posts/:postId/connections/${connectionId}`,
    method: "DELETE"
  })
);