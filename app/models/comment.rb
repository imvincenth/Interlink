# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  comment_id :integer
#  post_id    :integer
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_comment_id  (comment_id)
#  index_comments_on_post_id     (post_id)
#  index_comments_on_user_id     (user_id)
#
class Comment < ApplicationRecord
  validates :user_id, :body, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :comment,
    foreign_key: :comment_id,
    class_name: :Comment

  belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post

  has_many :replies,
    foreign_key: :comment_id,
    class_name: :Comment
end
