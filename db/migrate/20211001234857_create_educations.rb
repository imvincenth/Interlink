class CreateEducations < ActiveRecord::Migration[5.2]
  def change
    create_table :educations do |t|
      t.integer :user_id, null: false
      t.string :school, null: false
      t.string :degree
      t.string :subject
      t.string :start_date
      t.string :end_date
      t.string :grade
      t.text :extracurriculars

      t.timestamps
    end

    add_index :educations, :user_id
  end
end
