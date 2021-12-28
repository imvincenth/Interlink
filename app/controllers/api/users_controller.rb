class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      exp_clone = experience_params.clone
      exp_clone[:user_id] = @user.id
      edu_clone = education_params.clone
      edu_clone[:user_id] = @user.id
      
      @exp = Experience.new(exp_clone)
      @edu = Education.new(edu_clone)
      if @exp.save
      else @edu.save
      end
      
      login(@user)
      render :show
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

  # private
  def user_params
    params.require(:user).permit(
      :email, 
      :first_name, 
      :last_name, 
      :headline, 
      :country_region, 
      :city_district, 
      :password,
      :profile_picture,
      :banner
    )
  end

  def experience_params
    params.require(:user).permit(
      :user_id,
      :title, 
      :employment_type,
      :company, 
      :location, 
      :start_date, 
      :current_role,
      :end_date, 
      :industry, 
      :headline,
      :description
    )
  end

  def education_params
    params.require(:user).permit(
      :user_id,
      :school,
      :degree,
      :subject,
      :start_date,
      :end_date,
      :grade,
      :extracurriculars
    )
  end
end