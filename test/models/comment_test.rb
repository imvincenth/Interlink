# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer
#  reply_id   :integer
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_post_id   (post_id)
#  index_comments_on_reply_id  (reply_id)
#  index_comments_on_user_id   (user_id)
#
require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
