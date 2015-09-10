User.destroy_all

u1 = User.create email: "wolf@wolf.com", user_name: "wolf", first_name: "Hunter", last_name: "Avenoir", password: "wolfwolf", password_confirmation: "wolfwolf"
u2 = User.create email: "kylieo@hotmail.com", user_name: "kylieo", first_name: "Kylie", last_name: "O'Brien-Pratt", password: "chicken", password_confirmation: "chicken"
u3 = User.create email: "rachel@gmail.com", user_name: "mooseor", first_name: "Rachel", last_name: "Brown", password: "chicken", password_confirmation: "chicken"
u4 = User.create email: "penny@hotmail.com", user_name: "penny", first_name: "Penny", last_name: "MacLean", password: "chicken", password_confirmation: "chicken"

Game.destroy_all

g1 = Game.create points: 10, user_id: u1.id
g2 = Game.create points: 15, user_id: u2.id
g3 = Game.create points: 8, user_id: u3.id
g4 = Game.create points: 0, user_id: u4.id