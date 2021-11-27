class ChangeReactableIdToSeparateColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :reactions, :reactable_id
    add_reference :reactions, :reactable, polymorphic: true, index: true
  end
end
