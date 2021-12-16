json.partial! "api/users/user", user: @user
json.profilePhotoUrl url_for(@post.profile_photo) if @post.profile_photo.attached?