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

  def show
    @sent_connection = Connection.find_by(connector_id: params[:id], connectee_id: params[:user_id])
    @inc_connection = Connection.find_by(connectee_id: params[:id], connector_id: params[:user_id])

    if @sent_connection || @inc_connection 
      @connection = @sent_connection || @inc_connection 
      render :show 
    else  
      render json: { error: nil }
    end

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
      render :show
    end
  end

  private
  def connection_params
    params.require(:connection).permit(:pending, :connector_id, :connectee_id)
  end
end
