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
require 'test_helper'

class ExperienceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
