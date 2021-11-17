export const createPost = post => (
  $.ajax({
    url: `/api/posts`,
    method: "POST",
    data: { post }
  })
);

export const fetchPosts = () => (
  $.ajax({
    url: `/api/posts`,
    method: "GET"
  })
);

export const updatePost = post => (
  $.ajax({
    url: `/api/posts/${post.id}`,
    method: "PATCH",
    data: { post }
  })
);

export const deletePost = postId => (
  $.ajax({
    url: `/api/posts/${postId}`,
    method: "DELETE"
  })
);