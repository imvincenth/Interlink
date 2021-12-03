export const createConnection = connection => (
  $.ajax({
    url: `/api/connections`,
    method: "POST",
    data: { connection }
  })
);

export const fetchConnections = userId => (
  $.ajax({
    url: `/api/posts/${userId}/connections`,
    method: "GET"
  })
);

export const updateConnection = connection => (
  $.ajax({
    url: `/api/connections/${connection.id}`,
    method: "PATCH",
    data: { connection }
  })
);

export const deleteConnection = connectionId => (
  $.ajax({
    url: `/api/connections/${connectionId}`,
    method: "DELETE"
  })
);