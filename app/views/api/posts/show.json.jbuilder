json.partial! "api/posts/post", post: @post
json.photoUrl url_for(@post.photo) if @post.photo.attached?
json.videoUrl url_for(@post.video) if @post.video.attached?