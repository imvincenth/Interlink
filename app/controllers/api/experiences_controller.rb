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
    @experiences = Experience.all
    render :index
  end

  def update
    @experience = Experience.find_by(id: params[:id])
    if @experience && @experience.update(experience_params, user_id: current_user.id)
      render :show
    else
      render json: @experience.errors.full_messages, status: 422
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
end
