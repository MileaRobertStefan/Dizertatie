defmodule FibServerWeb.Router do
  use FibServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", FibServerWeb do
    pipe_through :api

    get "/fib/:n", FibController, :fibonacci
  end
end
