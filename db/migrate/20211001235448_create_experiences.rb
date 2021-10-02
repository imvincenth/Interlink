class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :employment_type
      t.string :company, null: false
      t.string :location
      t.string :start_date, null: false
      t.boolean :current_role, null: false
      t.string :end_date, null: false
      t.string :industry, null: false
      t.text :headline
      t.text :description

      t.timestamps
    end

    add_index :experiences, :user_id
  end
end
