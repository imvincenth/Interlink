# == Schema Information
#
# Table name: reactions
#
#  id         :bigint           not null, primary key
#  react_type :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  comment_id :integer
#  post_id    :integer
#  reactor_id :integer          not null
#
# Indexes
#
#  index_reactions_on_comment_id  (comment_id)
#  index_reactions_on_post_id     (post_id)
#  index_reactions_on_reactor_id  (reactor_id)
#
class Reaction < ApplicationRecord
  validates :reactor_id, presence: true

  belongs_to :user,
    foreign_key: :reactor_id,
    class_name: :User

  belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post

  belongs_to :comment,
    foreign_key: :comment_id,
    class_name: :Comment
end
