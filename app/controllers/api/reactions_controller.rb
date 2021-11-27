class Api::ReactionsController < ApplicationController

  def index
    if params[:]
  end

  private
  def reaction_params
    params.require(:reaction).permit(:reactor_id, :react_type, :reactable_type, :reactable_id)
  end  
end
