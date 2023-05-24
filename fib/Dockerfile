# Use the official Elixir image as the base image
FROM elixir:latest

# Set the working directory inside the container
WORKDIR /app

# Install Hex and Rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Copy the Elixir project files to the container
COPY mix.exs mix.lock ./
COPY config config
COPY assets assets

# Install the project dependencies
RUN mix deps.get
RUN mix deps.compile

# Copy the rest of the project files
COPY lib lib

# Compile the Elixir project
RUN mix compile

#Set environment variables and expose port
EXPOSE 4000
ENV REPLACE_OS_VARS=true \
    PORT=4000
    
# Set the command to start the server
ENTRYPOINT ["mix", "phx.server"]
