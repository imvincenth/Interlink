export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const update = user => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  })
);

export const fetchUsers = userId => (
  $.ajax({
    url: `/api/users`,
    method: "GET",
    data: { userId }
  })
);

export const fetchUser = userId => (
  $.ajax({
    url: `/api/users/${userId}`,
    method: "GET",
    data: { userId }
  })
);

export const deleteUser = userId => (
  $.ajax({
    url: `/api/users/${userId}`,
    method: "DELETE"
  })
);

export const udpateImg = (formData, id) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${id}`,
    data: formData,
    contentType: false,
    processData: false
  })
);
