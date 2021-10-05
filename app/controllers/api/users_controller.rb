class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ["There is no user with that id"], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :email, 
      :first_name, 
      :last_name, 
      :headline, 
      :country_region, 
      :city_district, 
      :password
    )
  end
end