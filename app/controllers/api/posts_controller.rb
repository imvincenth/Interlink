class Api::PostsController < ApplicationController

  

  private
  def post_params
    params.require(:post).permit(:user_id, :body)
  end
end
