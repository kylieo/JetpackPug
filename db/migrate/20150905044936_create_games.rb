class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
        t.integer :points #cumulative points for game instance
        t.integer :user_id
        t.timestamps
    end
  end
end
