class ChangeReactableId < ActiveRecord::Migration[5.2]
  def change
    remove_column :reactions, :post_id
    remove_column :reactions, :comment_id
    add_column :reactions, :reactable_id, :integer, polymorphic: true
    add_index :reactions, :reactable_id
  end
end
