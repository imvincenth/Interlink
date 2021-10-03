class Api::ExperiencesController < ApplicationController

  def create
    @experience = Experience.new(experience_params)

    if @experience.save
      render :show
    else
      render json: @experience.errors.full_messages, status: 422
    end
  end

  def index
    @experiences = Expreience.where(user_id: params[:user_id])
    render :index
  end

  def update
    @experience = Experience.find_by(id: params[:id])
    if @experience && @experience.update(experience_params)
      render :show
    else
      rendern json: @experience.errors.full_messages, status: 422
    end
  end

  def destroy
    @experience = Experience.find_by(id: params[:id])
    if @experience
      @experience.destroy
    end
  end

  private
  def experience_params
    params.require(:experience).permit(
      :company, 
      :title, 
      :industry, 
      :start_date, 
      :end_date, 
      :current_role,
      :user_id
    )
  end
end
