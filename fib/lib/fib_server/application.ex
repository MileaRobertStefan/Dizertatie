defmodule FibServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      FibServerWeb.Telemetry,
      # Start the Ecto repository
      # FibServer.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: FibServer.PubSub},
      # Start Finch
      {Finch, name: FibServer.Finch},
      # Start the Endpoint (http/https)
      FibServerWeb.Endpoint
      # Start a worker by calling: FibServer.Worker.start_link(arg)
      # {FibServer.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: FibServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    FibServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
