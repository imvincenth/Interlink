# == Schema Information
#
# Table name: reactions
#
#  id           :bigint           not null, primary key
#  react_type   :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  reactable_id :integer          not null
#  reactor_id   :integer          not null
#
# Indexes
#
#  index_reactions_on_reactable_id  (reactable_id)
#  index_reactions_on_reactor_id    (reactor_id)
#
class Reaction < ApplicationRecord
  validates :reactor_id, presence: true

  belongs_to :user,
    foreign_key: :reactor_id,
    class_name: :User

  belongs_to :reactable,
    polymorphic: true
end
