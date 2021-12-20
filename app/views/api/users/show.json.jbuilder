json.partial! "api/users/user", user: @user
json.profilePictureUrl url_for(@user.profile_picture) if @user.profile_picture.attached?