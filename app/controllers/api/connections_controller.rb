class Api::ConnectionsController < ApplicationController

  def create
    @connection = Connection.new(connection_params)

    if @connection.save
      render :show
    else
      render json: @connection.errors.full_messages, status: 422
    end
  end

  def index
    # @connections = Connection.all
    if params[:user_id]
      @connections = Connection.where("connector_id = ? OR connectee_id = ?", params[:user_id], params[:user_id])
    else
      render json: @connections.errors.full_messages, status: 404 
    end
    
    render :index
  end

  def update
    @connection = Connection.find_by(id: params[:id])
    if @connection && @connection.update(connection_params)
      render :show
    else
      render json: @connection.errors.full_messages, status: 422
    end
  end

  def destroy
    @connection = Connection.find_by(id: params[:id])
    if @connection
      @connection.destroy
    end
  end

  private
  def connection_params
    params.require(:connection).permit(:pending, :connector_id, :connectee_id)
  end
end
