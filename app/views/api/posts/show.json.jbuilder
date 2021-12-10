json.partial! "api/posts/post", post: @post
json.mediaUrl url_for(@post.media) if @post.media.attached? 