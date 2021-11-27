# == Schema Information
#
# Table name: reactions
#
#  id             :bigint           not null, primary key
#  react_type     :string
#  reactable_type :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  reactable_id   :bigint           not null
#  reactor_id     :integer          not null
#
# Indexes
#
#  index_reactions_on_reactable_type_and_reactable_id  (reactable_type,reactable_id)
#  index_reactions_on_reactor_id                       (reactor_id)
#
require 'test_helper'

class ReactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
