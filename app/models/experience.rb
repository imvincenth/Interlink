# == Schema Information
#
# Table name: experiences
#
#  id              :bigint           not null, primary key
#  company         :string           not null
#  current_role    :boolean          not null
#  description     :text
#  employment_type :string
#  end_date        :string           not null
#  headline        :text
#  industry        :string           not null
#  location        :string
#  start_date      :string           not null
#  title           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :integer          not null
#
# Indexes
#
#  index_experiences_on_user_id  (user_id)
#
class Experience < ApplicationRecord
  validates :user_id, :company, :title, :industry, :start_date, :end_date, presence: true
  validates :current_role, inclusion: [true, false]

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
