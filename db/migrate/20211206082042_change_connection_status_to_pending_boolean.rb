class ChangeConnectionStatusToPendingBoolean < ActiveRecord::Migration[5.2]
  def change
    remove_column :connections, :status
    add_column :connections, :status, :boolean, null: false
  end
end
