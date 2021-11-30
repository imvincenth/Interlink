class Api::ReactionsController < ApplicationController

  def index
    if params[:comment_id]
      comment = Comment.find_by(id: params[:comment_id])
      @reactions = Reaction.where(reactable_type: :Comment, reactable_id: comment.id)
    elsif params[:post_id]
      post = Post.find_by(id: params[:post_id])
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

  def create
    if params[:comment_id]
      comment = Comment.find_by(id: params[:comment_id])
      @reaction = Reaction.new(reaction_params)
    elsif params[:post_id]
      post = Post.find_by(id: params[:post_id])
      @reaction = Reaction.new(reaction_params)
    end
    if @reaction && @reaction.save
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def update
    @reaction = Reaction.find_by(id: params[:id])
    if @reaction && @reaction.update(reaction_params)
      render :show
    else
      render @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find_by(id: params[:id])
    if @reaction && @reaction.destroy
      render :show
    else
      render @reaction.errors.full_messages, status: 422
    end
  end

  private
  def reaction_params
    params.require(:reaction).permit(:reactor_id, :react_type, :reactable_type, :reactable_id)
  end  
end
