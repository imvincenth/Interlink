# == Schema Information
#
# Table name: connections
#
#  id           :bigint           not null, primary key
#  pending      :boolean          not null
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
class Connection < ApplicationRecord
  validates :pending, :connectee_id, :connector_id, presence: true

  belongs_to :connector,
    foreign_key: :connector_id,
    class_name: :User

  belongs_to :connectee,
    foreign_key: :connectee_id,
    class_name: :User
end
