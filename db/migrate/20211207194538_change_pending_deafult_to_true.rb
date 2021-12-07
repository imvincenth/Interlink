class ChangePendingDeafultToTrue < ActiveRecord::Migration[5.2]
  def change
    change_column :connections, :pending, :boolean, :deafult => true
  end
end
