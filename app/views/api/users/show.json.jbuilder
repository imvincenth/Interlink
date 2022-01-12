json.partial! "api/users/user", user: @user
json.profilePictureUrl url_for(@user.profile_picture) if @user.profile_picture.attached?
json.bannerUrl url_for(@user.banner) if @user.banner.attached?
# json.profilePictureUrl @user.profile_picture.attached? ? url_for(@user.profile_picture) : ''
# json.bannerUrl @user.banner.attached? ? url_for(@user.banner) : ''