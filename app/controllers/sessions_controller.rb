class SessionsController < ApplicationController
  def index
  end

  def new
  end

  def create
    user = User.find_by :email => params[:email]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to user_path( user )
    else
      flash[:notice] = "Invalid login, please try again."
      redirect_to login_path
    end
  end

  def edit
  end

  def show
  end

  def update
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end