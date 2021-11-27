# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#
class Post < ApplicationRecord
  validates :user_id, :body, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  has_many :comments,
    foreign_key: :post_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :reactions,
    as: :reactable,
    dependent: :destroy
end
