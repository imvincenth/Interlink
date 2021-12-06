class ChangeStatusToPending < ActiveRecord::Migration[5.2]
  def change
    rename_column :connections, :status, :pending
  end
end
