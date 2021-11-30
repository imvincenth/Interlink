class Api::ReactionsController < ApplicationController

  def index
    if params[:commentId]
      comment = Comment.find_by(id: params[:commentId])
      @reactions = Reaction.where(reactable_type: :Comment, reactable_id: comment.id)
    elsif params[:postId]
      post = Post.find_by(id: params[:postId])
      @reactions = Reaction.where(reactable_type: :Post, reactable_id: post.id)
    else
      render json: { error: "No reactions for this post/comment" }, status: 404
    end
    render :index
  end

  def show
    @reaction = Reaction.find_by(id: params[:id])
    if @reaction
      render :show
    else
      render json: @reaction.errors.full_messages, status: 404
    end
  end

  private
  def reaction_params
    params.require(:reaction).permit(:reactor_id, :react_type, :reactable_type, :reactable_id)
  end  
end
