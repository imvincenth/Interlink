class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def index
    # @comments = Comment.where(post_id: params[:post_id]) -- n + 1 --
    @comments = Comment.all

    if @comments
      render :index
    else
      render json: @comments.errors.full_messages, status: 404
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment && @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment
      @comment.destroy
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:user_id, :body, :reply_id, :post_id)
  end
end
