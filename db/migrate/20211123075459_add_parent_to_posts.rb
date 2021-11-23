class AddParentToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :parent_id, :integer
    add_index :posts, :parent_id
  end
end
