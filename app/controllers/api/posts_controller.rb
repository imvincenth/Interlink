class Api::PostsController < ApplicationController

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index
    @posts = Post.all
    render :index
  end

  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render :show
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    if @post && @post.update(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    if @post
      @post.destroy
    end
  end

  private
  def post_params
    params.require(:post).permit(:user_id, :body, :photo, :video)
  end
end
