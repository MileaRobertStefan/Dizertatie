defmodule FibServerWeb.FibController do
  use FibServerWeb, :controller

  def fibonacci(conn, %{"n" => n}) do

    fib_n = fibonacci_number(String.to_integer(n))
    json(conn, %{fibonacci_number: fib_n})
  end

  defp fibonacci_number(n) when n < 2, do: n
  defp fibonacci_number(n) do
    fibonacci_number(n - 1) + fibonacci_number(n - 2)
  end
end
