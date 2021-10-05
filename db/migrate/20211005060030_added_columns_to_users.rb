class AddedColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :headline, :string, null: false
    add_column :users, :country_region, :string, null: false
    add_column :users, :city_district, :string, null: false
  end
end
