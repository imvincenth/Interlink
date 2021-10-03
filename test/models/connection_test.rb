# == Schema Information
#
# Table name: connections
#
#  id           :bigint           not null, primary key
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  connectee_id :integer          not null
#  connector_id :integer          not null
#
# Indexes
#
#  index_connections_on_connectee_id  (connectee_id)
#  index_connections_on_connector_id  (connector_id)
#
require 'test_helper'

class ConnectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
