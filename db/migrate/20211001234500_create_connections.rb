class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.string :status, null: false
      t.integer :connector_id, null: false
      t.integer :connectee_id, null: false

      t.timestamps
    end

    add_index :connections, :connector_id
    add_index :connections, :connectee_id
  end
end
