class Api::ConnectionsController < ApplicationController

  

  private
  def connection_params
    params.require(:connection).permit(:status, :connector_id, :connectee_id)
  end
end
