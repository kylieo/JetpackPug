class CreateUsers < ActiveRecord::Migration
  def change
    create_table "users", force: :cascade do |t|
	    t.text     :email
	    t.text		:user_name
	    t.text     :first_name
	    t.text		:last_name
	    t.text     :password_digest
	    t.boolean  :admin, default: :false
	    t.timestamps
	end
  end
end
