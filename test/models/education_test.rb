# == Schema Information
#
# Table name: educations
#
#  id               :bigint           not null, primary key
#  degree           :string
#  end_date         :string
#  extracurriculars :text
#  grade            :string
#  school           :string           not null
#  start_date       :string
#  subject          :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer          not null
#
# Indexes
#
#  index_educations_on_user_id  (user_id)
#
require 'test_helper'

class EducationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
