class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate

  private
  def authenticate
  	# binding.pry
    @current_user = User.find_by :id =>	 session[:user_id] if session[:user_id]
  end
end