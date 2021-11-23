# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :integer
#  user_id    :integer          not null
#
# Indexes
#
#  index_posts_on_parent_id  (parent_id)
#  index_posts_on_user_id    (user_id)
#
class Post < ApplicationRecord
  validates :user_id, :body, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :parent,
    foreign_key: :parent_id,
    class_name: :Post,
    optional: true

  has_many :replies,
    foreign_key: :parent_id,
    class_name: :Post

end
