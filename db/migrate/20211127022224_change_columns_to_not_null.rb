class ChangeColumnsToNotNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null :reactions, :reactable_id, false
    change_column_null :reactions, :reactable_type, false
  end
end
