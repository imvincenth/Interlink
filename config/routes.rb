Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create, :show, :index, :update] do
      resources :experiences, only: [:index]
      resources :educations, only: [:index]
      resources :connections, only: [:index]
    end

    resources :experiences, only: [:create, :update, :destroy]
    resources :educations, only: [:create, :update, :destroy]
    resources :connections, only: [:create, :show, :update, :destroy]

    resources :posts, only: [:create, :index, :update, :destroy] do 
      resources :comments, only: [:create, :index, :update, :destroy]
    end

    resource :session, only: [:create, :destroy]
    
    resources :posts, only: [:show] do
      resources :reactions, only: [:create, :show, :index, :update, :destroy]
    end

    resources :comments, only: [:show] do
      resources :reactions, only: [:create, :show, :index, :update, :destroy]
    end
  end

  root "static_pages#root"
end
